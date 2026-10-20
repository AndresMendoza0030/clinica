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
