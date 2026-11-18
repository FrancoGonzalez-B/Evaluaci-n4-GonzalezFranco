# Guía para explicar mi portafolio

Esta guía sirve para estudiar el código del proyecto. Las preguntas son de práctica y no corresponden a un cuestionario oficial del curso.

## Presentación breve

Una explicación inicial que puedes adaptar con tus palabras:

> Mi proyecto migra el portafolio de la Evaluación 2 a React con TypeScript. Conservé la fotografía, los colores, la tipografía y los proyectos. Separé la interfaz en páginas y componentes, cambié las anclas por rutas y agregué una consulta a la API pública de GitHub. La interfaz muestra carga, éxito, error y resultado vacío. También tiene un filtro local, un formulario controlado y un tema compartido mediante Context.

Después muestra la presentación, Proyectos y Contacto. Señala el dato que llega de GitHub y demuestra una interacción que puedas explicar.

## Recorrido de los archivos

| Archivo o carpeta | Qué debes poder explicar |
| --- | --- |
| `src/main.tsx` | Inicia React y coloca los proveedores alrededor de la aplicación |
| `src/App.tsx` | Define rutas y qué página corresponde a cada dirección |
| `src/pages/` | Reúne los componentes de cada vista |
| `src/components/` | Contiene piezas reutilizables y el formulario |
| `src/data/` | Guarda contenido personal y proyectos fuera del JSX |
| `src/types/` | Describe las formas permitidas de props, estado, eventos y datos de API |
| `src/services/github.ts` | Hace la petición, comprueba su respuesta y conserva datos válidos |
| `src/hooks/useGithubRepositories.ts` | Relaciona el ciclo de vida de la vista con carga, datos, errores y cancelación |
| `src/context/ThemeContext.tsx` | Comparte el tema y lo guarda en el navegador |
| CSS global y modular | Define colores base y estilos BEM de cada parte |

## Conceptos con ejemplos del proyecto

**Componente:** una función que devuelve parte de la interfaz. `ProjectCard` representa una tarjeta y se reutiliza para varios trabajos.

**Props:** datos que un componente recibe del padre. La página entrega un proyecto a `ProjectCard`; la tarjeta no modifica ese proyecto.

**Estado:** información que cambia durante el uso y hace que React vuelva a renderizar. Ejemplos: lo escrito en el formulario, el filtro y el tema.

**`useState`:** permite leer un estado y actualizarlo con su función de actualización. Se crea un nuevo valor; no se modifica directamente el objeto anterior.

**`useEffect`:** sincroniza el componente con algo externo después del renderizado. Aquí inicia la consulta a GitHub o guarda el tema en `localStorage`.

**Limpieza del efecto:** se ejecuta al desmontar el componente o antes de repetir el efecto. `AbortController` cancela la petición que ya no necesita esa vista.

**Context:** comparte una preferencia entre componentes sin pasarla por todos los niveles como prop. Aquí se usa para el tema; el texto de un formulario sigue siendo estado local.

**TypeScript:** comprueba que los datos se usan con la forma esperada. `string | null` significa que un campo puede contener texto o no tener valor. `unknown` obliga a comprobar datos externos antes de usarlos; `any` desactiva esas comprobaciones.

**React Router:** decide qué vista mostrar según la dirección. `Link` navega dentro de la aplicación; `NavLink` además permite marcar la ruta activa. Un `<a>` se usa para un repositorio externo o para `mailto`.

**Renderizado condicional:** muestra una interfaz según el estado. La lista no presenta tarjetas mientras está cargando ni presenta un error como si fueran datos.

**`map` y `key`:** `map` convierte cada proyecto en una tarjeta. `key` identifica cada tarjeta para que React pueda relacionarla con su dato entre renderizados; debe ser estable, como el identificador del proyecto.

**BEM:** un nombre permite reconocer el bloque, su elemento o una variante. `.project-card` es un bloque, `.project-card__title` es su título y `.button--primary` es una variante del botón.

**Grid y Flexbox:** Grid distribuye las tarjetas en columnas y filas. Flexbox ordena elementos en una dirección, como un menú o el contenido de una tarjeta.

## El recorrido de la API

1. Se abre Proyectos y se monta la lista de repositorios.
2. El hook establece el estado de carga e inicia el servicio.
3. El servicio usa datos correctos de la caché si existen; si no, consulta GitHub con `fetch`.
4. Comprueba el estado HTTP y la forma del JSON.
5. Si obtiene datos válidos, React muestra las tarjetas. Si falla, muestra el error y permite reintentar.
6. El filtro trabaja sobre los datos recibidos. Una búsqueda sin coincidencias muestra el estado vacío.
7. Al abandonar la vista se cancela la petición pendiente con la limpieza del efecto.

Debes poder localizar cada paso en los archivos; memorizar este listado sin mirar el código no basta para defenderlo.

## Accesibilidad y formulario

- Las etiquetas semánticas indican la función de las regiones: `header`, `nav`, `main`, `section`, `article` y `footer`.
- `label` nombra un campo; `htmlFor` coincide con el `id` del control al que describe.
- ARIA aporta información cuando hace falta: por ejemplo, un nombre accesible, un estado o el anuncio de un mensaje nuevo.
- Un lector de pantalla usa esa estructura y esos nombres para presentar el contenido de forma no visual.
- `:focus-visible` permite reconocer qué control recibirá una acción del teclado.
- El formulario guarda sus campos en estado, valida los datos y prepara un correo. Abrir `mailto` no demuestra que se haya entregado un mensaje.

## Preguntas para practicar

1. ¿Qué conservaste de la E2 y qué cambió al migrarlo?
2. ¿Por qué separaste datos, componentes, tipos y servicios?
3. ¿Qué prop recibe una tarjeta y dónde se la entrega su padre?
4. ¿Qué diferencia hay entre props y estado?
5. ¿Qué sucede cuando escribes en el filtro?
6. ¿Cuáles son los cuatro estados de la API y cómo los puede ver el usuario?
7. ¿Para qué sirve `response.ok`?
8. ¿Qué ocurre si abandonas Proyectos mientras carga?
9. ¿Qué diferencia hay entre `unknown` y `any`?
10. ¿Por qué el tema usa Context y el formulario no?
11. ¿Para qué necesita el `map` una `key`?
12. ¿Qué hacen `BrowserRouter`, `Route` y `NavLink`?
13. ¿Cómo se reconoce una clase BEM?
14. ¿Cómo asociaste un `label` con su campo?
15. ¿Qué hace realmente el formulario cuando los datos son válidos?
16. ¿Qué hace `npm run build` y para qué sirve `dist/`?
17. ¿Qué diferencia hay entre commit, push, pull request y merge?
18. ¿Qué aportó la IA y qué parte puedes explicar por tu cuenta?

Practica respondiendo cada pregunta en dos o tres frases y señalando el archivo correspondiente. Si una respuesta no te resulta clara, vuelve al código y ejecuta esa parte del sitio.
