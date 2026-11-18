# Registro de uso de inteligencia artificial

## 1. Herramientas utilizadas

- ChatGPT/Codex como asistente de planificación, explicación y apoyo de programación.
- Visual Studio Code para abrir, revisar y ejecutar el proyecto.
- Git y GitHub para organizar el repositorio y el flujo de cambios.
- Documentación oficial de React, Vite, React Router y GitHub REST API como referencias técnicas.

## 2. Para qué se utilizaron

La asistencia se usó para interpretar la rúbrica, planificar la migración del portafolio estático a React con TypeScript, separar componentes y tipos, diseñar las rutas, preparar la consulta a una API pública y organizar la documentación. La identidad visual y los contenidos personales se basaron en el portafolio de la E2.

## 3. Prompt recibido

Solicitud principal del estudiante:

> “perfecto ahora mira esto tenemos q hacer eso tranformar este portafolio en esto te paso el link del repo trabajaremos en mi vs”

El prompt estuvo acompañado por la rúbrica de la Evaluación 4 y el enlace al repositorio nuevo.

## 4. Qué se ajustó de la propuesta

- Se conservó la paleta, tipografía, fotografía y estructura visual del portafolio de la E2.
- Se usó GitHub REST API para que los datos mostrados correspondan a repositorios públicos reales de la cuenta del estudiante.
- Se incorporaron tipos para la respuesta de API y estados diferenciados para carga, error y éxito.
- Se usó `HashRouter` para que las rutas del sitio puedan funcionar en hosting estático.
- Se dejó explícito que el formulario no envía datos a un servidor; valida y prepara un correo.
- Los nombres y descripciones de los proyectos deben confirmarse con el estudiante para mantenerlos fieles a su trabajo real.

## 5. Cómo se verificó

- `npm run build`: completado. TypeScript compiló y Vite generó la carpeta `dist`.
- `git diff --check`: completado, sin errores de espacios en los cambios.
- La vista previa interactiva y la navegación por las rutas no se pudieron revisar desde este entorno porque el navegador de trabajo no logró conectarse al servidor local. Falta recorrerlas desde Visual Studio Code.
- También falta comprobar manualmente en el navegador los estados de la API, el filtro, el reintento, el tema, el formulario, el foco de teclado y el diseño en móvil.
- `npm audit` informa alertas altas en dependencias de desarrollo de Vite (`picomatch`, `fdir` y `tinyglobby`). Se ejecutó `npm audit fix`, pero el registro de paquetes disponible sigue ofreciendo `picomatch` 4.0.7, que el aviso clasifica como afectado; no se forzó una actualización de versión mayor ni se reemplazó la herramienta de compilación.

## 6. Reflexión final

La IA ayudó a organizar requisitos y proponer una estructura inicial, pero las decisiones deben revisarse contra la rúbrica y el portafolio original. El estudiante debe poder explicar qué hace cada ruta, cómo se consulta la API, cómo se administra el estado y qué limitaciones tiene el formulario. La información personal y las descripciones de proyectos deben ser confirmadas por el estudiante antes de la entrega.
