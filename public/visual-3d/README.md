# Identidad 3D — estudio 01

Abrir `index.html` con sus recursos relativos. Vista de propuesta independiente: no sustituye el inicio institucional.

- Emblema: reconstrucción geométrica CSS del símbolo adjunto, 4 cuadrantes, 25 capas por cuadrante. Giro, separación y orientación manual. No es un archivo GLB ni un modelo industrial.
- Tomografía y radiólogo: renders generados con ImageGen, convertidos a WebP. Perspectiva CSS suave, no rotación volumétrica de los objetos.
- Pausa manual, reduced-motion, suspensión en pestaña oculta, diseño móvil, sin dependencias externas.
- Los renders son ilustrativos, no representan modelos Siemens ni empleados reales.

## Dirección de arte / prompts
Tomografía: render 3D de producto, tomógrafo blanco y grafito con detalles rojo brillante, vista elevada tres cuartos, equipo y mesa completos, fondo gris cálido, materiales realistas, sombras suaves, sin marcas ni texto.
Radiólogo: render 3D, profesional adulto de espaldas en estación de dos monitores diagnósticos, bata blanca, mobiliario blanco/grafito y acentos rojos, cámara elevada trasera, estudios ficticios sin identificadores, fondo gris cálido, sin marcas ni texto.

## Integración
Los archivos de `public/` se sirven con Workers Static Assets (configuración en wrangler.toml). Ruta de revisión `/visual-3d/`. Reutilizar imágenes mediante `/visual-3d/assets/tomografia.webp` y `/visual-3d/assets/radiologo.webp`.

## Preview integrada del sitio
La portada y los encabezados de estudios y laboratorio ahora usan los renders mediante `components/visual-upgrade.js`, aplicado por el Worker al HTML del servidor. La capa deja intacto el portal de pacientes y conserva el contenido clínico original. Plaza Farid usa el render arquitectónico aprobado, no la maqueta geométrica interactiva.

Nuevos recursos: RM, TAC, US, RX, mamografía, laboratorio, radiólogo y Plaza Farid, en WebP de 1536 px y versiones de 720 px. Los equipos son ilustraciones genéricas, no fotografías de modelos Siemens; la fachada se basa en la foto proporcionada. El logo original se aloja localmente para reducir dependencias.

Validación: `node tests/visual-upgrade.mjs`. Revisión en Chromium a 1440 y 390 px; navegación móvil, ausencia de desbordamiento horizontal, recursos de portada y siete encabezados internos. Para pruebas locales se utilizó una copia del mismo script externo de Tailwind porque el navegador de pruebas no tiene salida directa a Internet. El sitio mantiene su dependencia preexistente del CDN de Tailwind y fuentes Google.

## Carrusel fotográfico de portada

La portada utiliza `components/home-carousel.js` con tres imágenes generadas para esta propuesta: médico ilustrativo con el logo original en la gabacha, recepción recreada a partir de la fotografía proporcionada (mostrador despejado y sillas alineadas), y revisión de estudios por el mismo médico ilustrativo. No representan personal real ni una reforma realizada. Los renders del catálogo y la fachada aprobada se conservan.

Los recursos `portada-medico`, `portada-recepcion` y `portada-interpretacion` se sirven como WebP local de 1536 y 720 px. La primera imagen tiene prioridad de carga y precarga adaptable; las siguientes utilizan carga diferida. La selección de tamaño contempla el recorte de las fotos para mantener nitidez.

Carrusel sin avance automático, con scroll-snap nativo, gesto táctil, arrastre con ratón, flechas, indicadores y teclado (flechas, Inicio y Fin). Incluye etiquetas accesibles, anuncio de cambio de imagen y respeto a movimiento reducido. Sin JavaScript conserva el desplazamiento nativo y oculta los botones inactivos.

Verificación en Chromium a 1440 y 390 px: imágenes cargadas, navegación circular, indicadores, teclado, arrastre de ratón, gesto táctil mediante eventos de entrada, movimiento reducido y alternativa sin JavaScript; sin errores de JavaScript ni desbordamiento horizontal. Las diez rutas de la prueba de integración siguen funcionando.
