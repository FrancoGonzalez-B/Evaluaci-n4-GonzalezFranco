# Declaración y bitácora de uso de inteligencia artificial

## 1. Herramientas utilizadas

- ChatGPT/Codex para interpretar los requisitos, proponer y modificar código, revisar la estructura y apoyar las explicaciones. La sesión de cierre identifica el modelo como **GPT-6.1-sol**; no se registraron versiones de los modelos de las conversaciones anteriores.
- Visual Studio Code como editor y entorno de trabajo del estudiante.
- Git y GitHub para el historial, las ramas y el pull request.
- Documentación oficial de React, React Router, Vite y GitHub REST como referencia técnica.

El apoyo de IA fue amplio: participó tanto en la implementación como en la documentación. No se presenta este proyecto como un trabajo escrito completamente sin asistencia.

## 2. Propósito de uso

Se solicitó ayuda para migrar el portafolio HTML/CSS de la E2 a React con TypeScript, interpretar la rúbrica y los documentos del curso, separar responsabilidades, tipar los datos, configurar rutas y consultar repositorios públicos de GitHub.

Después de leer los requisitos más detallados, se usó la asistencia para refactorizar el CSS con BEM, centralizar tipos y datos, extraer el formulario, incorporar cancelación de peticiones, revisar accesibilidad y preparar el flujo de Git y despliegue.

## 3. Prompts representativos

Estos son mensajes reales del estudiante, conservando su escritura:

> “perfecto ahora mira esto tenemos q hacer eso tranformar este portafolio en esto te paso el link del repo trabajaremos en mi vs”

Ese mensaje incluía las capturas de la rúbrica y el enlace al repositorio nuevo.

> “ve estoy y con todo lo que has visto dime que falta?”

Ese mensaje acompañaba el archivo de la Sesión 29, después de haber compartido el documento de requisitos técnicos.

> “yap y terminalo”

La última instrucción solicitó completar los ajustes identificados. No se inventaron preguntas técnicas para reemplazar estos prompts.

## 4. Output recibido

La IA propuso y escribió una estructura React/TypeScript con páginas, tarjetas reutilizables, datos separados, un contexto de tema, un servicio de GitHub y un hook de consulta. También redactó la documentación y una guía de estudio.

La primera propuesta usó `HashRouter`, un CSS global, algunos tipos dentro de los componentes y una bandera para evitar actualizar una vista desmontada. Al contrastarla con el PDF técnico se identificó que esa propuesta todavía necesitaba ajustes para cumplir la especificación más estricta.

La revisión posterior produjo una migración a `BrowserRouter` desde `react-router-dom`, CSS modular con BEM, tipos centralizados, datos personales fuera del JSX, un componente de formulario y cancelación mediante `AbortController`.

## 5. Ajustes, refactorización y verificación

Los cambios se basaron en el portafolio original, las capturas de la rúbrica, el PDF de requisitos y la Sesión 29. Se conservaron la fotografía, la paleta, la tipografía de títulos y los trabajos de la E2. Se corrigieron la estructura inicial de estilos, el contraste de algunos controles y la jerarquía de encabezados de la primera versión React.

GitHub REST se eligió por su relación con el portafolio y porque esta consulta pública no necesita credenciales. El formulario mantiene un alcance explícito: valida y prepara un correo; su confirmación no afirma que un servidor haya enviado el mensaje.

La implementación y estas correcciones fueron asistidas por IA. Este registro no atribuye al estudiante revisiones manuales que todavía no haya realizado.

**Estado de la verificación:** la versión final completó `npm run build` con TypeScript estricto y `git diff --check`. Se ejecutaron 18 comprobaciones funcionales con Playwright y Microsoft Edge sin ventana: redirección inicial, fotografía, ruta activa, navegación SPA, salto al contenido y foco, API/filtro, validación del formulario, persistencia del tema, página 404, diseño de las tres rutas a 320 px y ausencia de errores JavaScript. También se comprobaron carga, error HTTP con reintento, respuesta vacía, datos mal formados, caída de red, reutilización de la caché y cancelación de peticiones al salir de Proyectos.

Los estados de error y casos límite se probaron con respuestas simuladas identificadas como datos de prueba. En una comprobación separada, la API real de GitHub devolvió los seis repositorios públicos y se mostraron sus tarjetas. Las capturas de escritorio y móvil se revisaron visualmente. El [informe y las evidencias](docs/verificacion/README.md) registran el alcance de estas comprobaciones. No se ejecutaron Lighthouse ni un lector de pantalla, por lo que no se atribuyen resultados de esas herramientas ni una certificación completa WCAG.

La auditoría inicial de npm señaló avisos en dependencias de desarrollo del árbol de Vite. Cualquier cambio de este resultado debe respaldarse con una nueva consulta, no deducirse de que la compilación funciona.

## 6. Reflexión crítica final

Esta reflexión fue redactada con asistencia de IA y describe el proceso; no sustituye la reflexión personal del estudiante sobre lo que puede explicar sin ayuda.

El proceso muestra que generar una primera versión no garantiza cumplir una rúbrica: hubo que contrastar el código con documentos más específicos y corregir decisiones de rutas, estilos y cancelación de peticiones. Un riesgo de deuda cognitiva es usar `useEffect`, Context, tipos o BEM sin comprender por qué están allí.

Para defender este proyecto, el autor necesita explicar el recorrido de un dato desde la API hasta una tarjeta, la diferencia entre props y estado, la función de la limpieza del efecto, la validación del formulario y el flujo de una rama a `main`. La [guía de estudio](docs/GUIA_ESTUDIO.md) permite practicar estas explicaciones sobre el código entregado. La confianza en el resultado debe apoyarse en su ejecución y revisión, además de la asistencia recibida.
