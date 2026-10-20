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
