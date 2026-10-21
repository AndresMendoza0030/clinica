// Shared source of location details, preserved from the existing site.
export const locations = [
 {id:'matriz',name:'Clínica Matriz',label:'SEDE PRINCIPAL',image:'sede-matriz',address:'9.ª Avenida Sur #411, Barrio La Merced, San Miguel.',phone:'2661-2345',phoneHref:'tel:+50326612345',whatsapp:'7820-5613',whatsappHref:'https://wa.me/50378205613',maps:'https://maps.app.goo.gl/cXRW57bte2G2VioK6',lat:'13.477069',lng:'-88.182489'},
 {id:'farid',name:'Plaza Farid',label:'AVENIDA ROOSEVELT',image:'plaza-farid',address:'Avenida Roosevelt Norte #412, Barrio San Felipe, San Miguel.',phone:'2669-7475',phoneHref:'tel:+50326697475',whatsapp:'7819-5960',whatsappHref:'https://wa.me/50378195960',maps:'https://maps.app.goo.gl/1KysDJYFLpXdvZMi6',lat:'13.4847581',lng:'-88.1853542'},
 {id:'advanced',name:'Advanced Radiology',label:'AVENIDA ROOSEVELT',image:'sede-advanced',address:'Avenida Roosevelt Norte #411, San Miguel.',phone:'2669-7988',phoneHref:'tel:+50326697988',whatsapp:'7844-8608',whatsappHref:'https://wa.me/50378448608',maps:'https://maps.app.goo.gl/RGyf8VcgsaMdJWHx5',lat:'13.4846653',lng:'-88.1857434'},
];
const paths={
 pin:'<path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="2.5"/>',
 phone:'<path d="m7 3 3 5-3 2a15 15 0 0 0 7 7l2-3 5 3v3a2 2 0 0 1-2 2C9.6 21.4 2.6 14.4 2 5a2 2 0 0 1 2-2Z"/>',
 chat:'<path d="M21 11.5a9 9 0 0 1-9 9 10 10 0 0 1-4-.9L3 21l1.5-4.5A9 9 0 1 1 21 11.5Z"/><path d="M8 8.5c.5 3 2 4.5 5.5 6l2-2-2-1-1 1a6 6 0 0 1-2-2l1-1-1-2Z"/>',
 arrow:'<path d="M5 12h14m-6-6 6 6-6 6"/>',route:'<path d="m21 3-7 18-3-8-8-3Z"/><path d="m11 13 5-5"/>',
 clock:'<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',plus:'<path d="M5 12h14M12 5v14"/>',up:'<path d="M12 20V4m-6 6 6-6 6 6"/>',
};
export const ContactIcon=(name)=>`<svg class="contact-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${paths[name]||paths.arrow}</svg>`;
