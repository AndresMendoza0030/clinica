# Probar el catálogo de Citas en una revisión privada

Configure estas variables únicamente en el Worker de revisión, protegido por el control de acceso del entorno.

| Variable | Valor |
| --- | --- |
| CITAS_PILOT_ENABLED | `true` |
| CITAS_PILOT_ORIGIN | Origen HTTPS de la instancia de Citas del piloto, sin barra final |
| CITAS_PILOT | Binding opcional al Worker de Citas para consultar su catálogo de referencia |

Las fichas buscan por nombre o alias dentro de su página, sección y categoría. Una coincidencia única habilita la solicitud. Citas recibe un identificador en el fragmento, vuelve a comprobarlo contra sus estudios y referencias vigentes y borra el fragmento. Recepción conserva el contacto por WhatsApp. Si el catálogo está inaccesible, la ficha sigue mostrando su contenido habitual.

Luna acepta nombres y alias, y presenta las variantes disponibles para que el paciente elija la que indica la boleta. La consulta al catálogo de Citas contiene únicamente la ruta del catálogo completo. Se reutiliza durante un minuto por entorno. Los dominios clinicadrmendoza.com y www.clinicadrmendoza.com mantienen el piloto desactivado incluso si reciben estas variables.

Ejecute `node tests/booking-catalog.mjs` y las regresiones de Luna. Para el recorrido desde una ficha, pruebe Hemograma + plaquetas y un estudio habilitado para agenda. Confirme que se conserva el estudio y que la primera pantalla distingue la selección de horario de la revisión de boleta.

La prueba histórica `tests/search-metadata.mjs` falla con el mismo resultado en la revisión y en el commit de origen `e9bb776`. El sitemap omite la página de Historia. El piloto conserva las rutas existentes.
