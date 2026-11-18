# Inventario del portafolio recuperado

Este documento identifica el contenido y las interacciones conservadas desde el portafolio de la Evaluación 2 y muestra dónde se implementaron en React.

## Contenido visual de la E2

| Elemento original | Recuperación en la E4 |
| --- | --- |
| Presentación personal, carrera y ubicación | `src/pages/HomePage.tsx` |
| Fotografía circular con borde claro | `public/images/franco-gonzalez.jpeg` y `src/index.css` |
| Paleta marfil, verde oscuro y terracota | Variables CSS en `src/index.css` |
| Títulos serif y jerarquía visual | Estilos de títulos en `src/index.css` |
| Tarjetas de proyectos | `src/data/projects.ts` y `src/components/ProjectCard.tsx` |
| Bloque oscuro de contacto | `src/pages/ContactPage.tsx` y `src/index.css` |
| Menú superior y pie de página | `src/components/SiteLayout.tsx` |
| Capturas del diseño original | `docs/referencias/` |

## Interacciones recuperadas y migradas

| Función de la E2 | Implementación en la E4 |
| --- | --- |
| Menú hacia presentación, proyectos y contacto | `NavLink` y rutas de React Router en `src/App.tsx` |
| Formulario con nombre, correo y mensaje | Formulario controlado en `src/pages/ContactPage.tsx` |
| Contacto por correo | Enlace `mailto` directo y correo preparado desde el formulario |
| Navegación con teclado | Indicador `:focus-visible` y botón “Saltar al contenido” |
| Diseño adaptable | Media queries de 600, 900 y 1200 px en `src/index.css` |

## Funciones añadidas para la E4

- Repositorios públicos de GitHub consultados desde `src/services/github.ts`.
- Estados de carga, error, reintento, éxito y resultado vacío en `src/components/GithubRepositoryList.tsx`.
- Filtro local por nombre, descripción o lenguaje, sin nuevas llamadas a la API.
- Tema claro/oscuro compartido por `ThemeContext` y conservado en el navegador.
- Página de ruta no encontrada.

## Alcance conocido

El formulario valida y prepara un mensaje para la aplicación de correo del visitante; no existe un servicio backend para enviar mensajes. La API consulta información pública y puede mostrar un error temporal si GitHub limita las solicitudes o no hay conexión.
