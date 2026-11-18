# Verificación de la versión React

Revisión del 18 de noviembre de 2026. Se usaron Vite local, Playwright y Microsoft Edge en modo sin ventana. Las pruebas se ejecutaron con apoyo de Codex; no se atribuyen al estudiante comprobaciones manuales que no realizó.

## Resultado

- Compilación de producción: correcta con `npm run build` y TypeScript `strict`.
- Revisión de cambios: `git diff --check`, sin errores de espacios.
- Comprobaciones funcionales: **18 correctas, 0 fallidas**. El detalle está en [resultado.json](resultado.json).
- Las tres rutas se revisaron a 320 px y no presentaron desbordamiento horizontal.
- Se revisaron visualmente las capturas de presentación y contacto en móvil y presentación en escritorio.

Se comprobaron redirección inicial, fotografía, ruta activa, navegación sin recarga, salto al contenido con Tab/Enter y foco visible, filtro y resultado vacío, validación y foco al primer campo incorrecto, correo preparado, persistencia del tema, 404 y retorno al inicio. No aparecieron errores JavaScript en el recorrido.

La API se comprobó con respuestas controladas para carga, éxito, error HTTP y reintento, vacío, formato inválido y caída de red. También se verificaron caché y cancelación al desmontar la vista. Una comprobación separada consultó GitHub realmente y mostró sus seis repositorios públicos.

## Contraste calculado desde los colores CSS

| Combinación | Ratio |
| --- | --- |
| Texto de acento claro `#b6462b` sobre fondo `#f7f5ef` | 4.94:1 |
| Texto de acento claro `#b6462b` sobre panel `#fffefa` | 5.34:1 |
| Botón de tema oscuro: texto `#14221f` sobre `#f08d6c` | 6.83:1 |
| Botón de contacto: texto `#142c27` sobre `#e5a18a` | 6.90:1 |

Estas combinaciones superan 4.5:1 para texto normal. Son cálculos de esas parejas de colores; no constituyen una auditoría completa de todos los elementos del sitio.

## Evidencias

- [Presentación en escritorio](inicio-escritorio.png)
- [Presentación a 320 px](sobre-mi-320.png)
- [Contacto a 320 px](contacto-320.png)
- [Proyectos a 320 px con repositorio de prueba identificado](proyectos-320.png)

Los datos simulados pertenecen exclusivamente a la prueba; no se incorporaron al código de producción como proyectos del autor.

## Límites

No se ejecutaron Lighthouse ni un lector de pantalla. La comprobación de teclado verifica el salto al contenido y su indicador de foco; conviene que el estudiante recorra además todos los controles con Tab y Shift+Tab. El formulario prepara un enlace `mailto`; no se probó la entrega de correos y el sitio no tiene un backend de envío. La auditoría de dependencias todavía informa avisos de desarrollo del árbol de Vite/picomatch; no se presenta un informe de vulnerabilidades limpio.
