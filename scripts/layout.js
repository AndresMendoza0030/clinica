async function loadPartial(id, file) {
  const el = document.getElementById(id);
  if (!el) return;

  const response = await fetch(file);
  const html = await response.text();
  el.innerHTML = html;
}

async function loadLayout() {
  await loadPartial("site-header", "header.html");
  await loadPartial("site-sedes", "sedes-contacto.html");
  await loadPartial("site-footer", "footer.html");
  await loadPartial("site-whatsapp", "whatsapp.html");
}

document.addEventListener("DOMContentLoaded", loadLayout);

function setMap(lat, lng) {
  const frame = document.getElementById("mapFrame");
  if (frame) {
    frame.src = `https://www.google.com/maps?q=${lat},${lng}&z=17&output=embed`;
  }
}