const FAILURE_COOLDOWN_MS = 2000;

// Bounded, demand-driven image cache. Pending jobs are deleted on every outcome;
// a resolved Promise must never become a second owner of an evicted Image.
export function createFrameCache({frameCount=36,limit=9,concurrency=3,load,onChange,now=()=>performance.now()}={}){
  if(!Number.isInteger(frameCount)||frameCount<1||!Number.isInteger(limit)||limit<1||
    !Number.isInteger(concurrency)||concurrency<1||concurrency>limit||typeof load!=='function')
    throw new TypeError('A loader and positive integer cache limits are required.');
  const cached=new Map(),jobs=new Map(),active=new Map(),queued=new Map(),failed=new Map();
  let protectedIndices=new Set(),disposed=false;
  const normalize=index=>{
    if(!Number.isInteger(index))throw new TypeError('Frame index must be an integer.');
    return ((index%frameCount)+frameCount)%frameCount;
  };
  function touch(index,image){cached.delete(index);cached.set(index,image);return image;}
  function makeSpace(){
    while(cached.size+active.size>=limit){
      const victim=[...cached.keys()].find(index=>!protectedIndices.has(index));
      if(victim===undefined)return false;
      cached.delete(victim);
    }
    return true;
  }
  function cancel(job){
    if(jobs.get(job.index)!==job)return;
    job.cancelled=true;jobs.delete(job.index);queued.delete(job.index);active.delete(job.index);
    job.controller?.abort();job.resolve(null);
  }
  function finish(job,image){
    // A cancelled loader may still resolve after its index has been requested
    // again. Its late result must not replace the newer image or pending job.
    if(disposed||job.cancelled||jobs.get(job.index)!==job)return;
    jobs.delete(job.index);active.delete(job.index);queued.delete(job.index);
    if(image)touch(job.index,image);else failed.set(job.index,now()+FAILURE_COOLDOWN_MS);
    job.resolve(image||null);
    try{onChange?.(job.index,image?'loaded':'failed');}finally{pump();}
  }
  function pump(){
    if(disposed)return;
    while(active.size<concurrency&&queued.size){
      const preferred=[...protectedIndices].find(index=>queued.has(index));
      const index=preferred===undefined?queued.keys().next().value:preferred;
      if(!makeSpace())return;
      const job=queued.get(index);queued.delete(index);active.set(index,job);
      job.controller=new AbortController();
      Promise.resolve().then(()=>job.cancelled?null:load(index,{signal:job.controller.signal}))
        .then(image=>finish(job,image),()=>finish(job,null));
    }
  }
  function request(rawIndex){
    const index=normalize(rawIndex);
    if(disposed)return Promise.resolve(null);
    const retryAt=failed.get(index);
    if(retryAt!==undefined&&now()<retryAt)return Promise.resolve(null);
    if(cached.has(index))return Promise.resolve(touch(index,cached.get(index)));
    if(jobs.has(index))return jobs.get(index).promise;
    failed.delete(index);
    let resolve;const promise=new Promise(done=>{resolve=done;});
    const job={index,promise,resolve,cancelled:false,controller:null};
    jobs.set(index,job);queued.set(index,job);pump();return promise;
  }
  function retryFailed(rawIndex) {
    const index = normalize(rawIndex);
    // A reconnect may retry the active angle once. An active or already
    // recovered frame has no failure to consume, so repeated events deduplicate.
    return failed.delete(index) ? request(index) : Promise.resolve(null);
  }
  function setProtected(indices){
    const next=new Set(indices.map(normalize));
    if(next.size>limit)throw new RangeError('Protected frames exceed cache capacity.');
    protectedIndices=next;
    for(const job of [...jobs.values()])if(!next.has(job.index))cancel(job);
    pump();
  }
  function peek(rawIndex){
    const index=normalize(rawIndex),image=cached.get(index);
    return image?touch(index,image):null;
  }
  function diagnostics(){return {
    limit,cachedCount:cached.size,inFlight:active.size,queuedCount:queued.size,
    pendingCount:jobs.size,failedCount:failed.size,retainedSlots:cached.size+active.size,
    cachedIndices:[...cached.keys()],protectedIndices:[...protectedIndices],disposed
  };}
  function dispose(){
    if(disposed)return;disposed=true;
    for(const job of [...jobs.values()])cancel(job);
    cached.clear();queued.clear();active.clear();failed.clear();protectedIndices.clear();
  }
  return {request,retryFailed,peek,setProtected,diagnostics,dispose};
}
