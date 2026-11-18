# Portafolio React de Franco González

Proyecto Integrado Final de Desarrollo Frontend (ICINF1107). Migra el portafolio de la Evaluación 2 a React con TypeScript. Conserva la fotografía, los contenidos, la paleta marfil, verde y terracota, los títulos en Georgia y el bloque oscuro de contacto.

## Referencia del portafolio original

![Portafolio original de la Evaluación 2](docs/captura-e2.png)

El [repositorio de la E2](https://github.com/FrancoGonzalez-B/portafolio-franco) se conserva aparte. Las referencias móviles están en `docs/referencias/`. El [inventario](INVENTARIO.md) explica qué se recuperó y qué cambió.

## Instalación y ejecución

Requisitos: Node.js 20.19 o superior y npm. Abre la carpeta del proyecto en Visual Studio Code y usa **Terminal > Nueva terminal**.

1. Instala las dependencias:

   ```bash
   npm install
   ```

2. Inicia Vite en desarrollo:

   ```bash
   npm run dev
   ```

   Abre la dirección que aparece en la terminal. Vite actualiza la página al guardar cambios.

3. Comprueba TypeScript y genera el sitio de producción:

   ```bash
   npm run build
   ```

   El resultado se guarda en `dist/`. Esta carpeta se genera automáticamente y no se sube como código fuente.

4. Revisa la compilación de producción:

   ```bash
   npm run preview
   ```

   Abre el enlace indicado por Vite. Para detener cualquiera de los servidores, presiona `Ctrl + C` en su terminal.

## Rutas y navegación

`BrowserRouter`, `Routes`, `Route`, `Link` y `NavLink` se importan de `react-router-dom`.

| Ruta de la aplicación | Contenido |
| --- | --- |
| `/sobre-mi` | Presentación personal y fotografía |
| `/proyectos` | Trabajos de la E2 y repositorios de GitHub |
| `/contacto` | Correo y formulario |
| `/` | Redirección a la presentación |
| Cualquier otra ruta | Página 404 con enlace para volver al inicio |

La barra indica la ruta activa y permite volver al inicio desde cualquier vista. El `basename` usa `import.meta.env.BASE_URL`; Vite establece la base del repositorio en `vite.config.ts`. La navegación entre vistas no usa anclas de sección ni recarga todo el documento.

## API pública: GitHub REST

Se eligió GitHub porque permite mostrar trabajo público real del autor dentro de su portafolio. No requiere API key para esta consulta y evita incorporar credenciales al código del navegador.

**URL base:** `https://api.github.com`

**Endpoint:**

```text
GET /users/FrancoGonzalez-B/repos?sort=updated&per_page=6
```

| Parámetro | Valor | Propósito |
| --- | --- | --- |
| Usuario de la ruta | `FrancoGonzalez-B` | Cuenta de cuyos repositorios públicos se obtienen los datos |
| `sort` | `updated` | Pedir primero los repositorios actualizados recientemente |
| `per_page` | `6` | Limitar la respuesta a seis repositorios |

La respuesta esperada es un arreglo de objetos JSON. Este ejemplo ilustra los campos utilizados; no representa una respuesta almacenada ni un repositorio que se atribuya al autor:

```json
[
  {
    "id": 123456,
    "name": "ejemplo-portafolio",
    "description": "Descripción pública del repositorio",
    "html_url": "https://github.com/usuario/ejemplo-portafolio",
    "language": "TypeScript",
    "stargazers_count": 0,
    "updated_at": "2026-11-18T12:00:00Z",
    "fork": false,
    "size": 120
  }
]
```

`description` y `language` pueden ser `null`; la interfaz ofrece texto alternativo cuando faltan. Los tipos viven en `src/types/`, y el servicio comprueba la estructura recibida. No se usa `any`.

El hook inicia la consulta con `fetch` desde `useEffect`. Su limpieza usa `AbortController` para cancelar una petición al desmontar la vista. Se conserva en memoria una respuesta válida para reutilizarla al volver a Proyectos; el filtro se aplica localmente y no genera una nueva petición.

| Estado | Respuesta visible |
| --- | --- |
| Cargando | Aviso mientras se espera la respuesta |
| Éxito | Tarjetas con nombre, descripción, lenguaje, estrellas y enlace al código |
| Error | Mensaje y botón para reintentar |
| Vacío | Mensaje cuando no hay repositorios o el filtro no encuentra coincidencias |

La API puede limitar las consultas anónimas o fallar si no hay conexión. Esos casos se comunican al visitante. [Documentación oficial del endpoint](https://docs.github.com/en/rest/repos/repos#list-repositories-for-a-user).

## Componentes, estado y formulario

- Las páginas reúnen componentes con responsabilidades concretas; las tarjetas reciben datos mediante props tipadas.
- El filtro y el formulario tienen estado local con `useState`.
- `ThemeContext` comparte el tema claro/oscuro y lo conserva en `localStorage` mediante un efecto.
- `ContactForm` valida nombre, correo y mensaje, muestra errores y prepara un enlace `mailto` cuando los datos son válidos.

El formulario abre la aplicación de correo del visitante. El sitio no tiene un servidor que entregue mensajes por su cuenta, y la confirmación de validación no afirma que un correo ya se haya enviado.

## CSS, accesibilidad y diseño adaptable

Los estilos globales contienen variables, reset y reglas comunes. Los componentes y páginas tienen estilos separados con BEM: bloque (`.project-card`), elemento (`.project-card__title`) y modificador (`.button--primary`). Se mantiene la identidad de la E2 y se ajustan colores cuando lo requiere el contraste.

El sitio incluye HTML semántico, una jerarquía de encabezados, texto alternativo en la fotografía, campos asociados mediante `htmlFor` e `id`, mensajes de estado accesibles y foco visible. Los controles usan botones y enlaces reales. El diseño parte de móvil y debe funcionar desde 320 px sin desplazamiento horizontal.

La compilación y las 18 comprobaciones funcionales pasaron. Se verificaron navegación SPA, teclado, formulario, tema, API y las tres rutas a 320 px sin desbordamiento. El [informe de verificación](docs/verificacion/README.md) incluye las evidencias y ratios de contraste calculados; no se ejecutaron Lighthouse ni un lector de pantalla. Los detalles del proceso también están en [uso_ia.md](uso_ia.md). Para repetir la comprobación manual:

1. Usa solo `Tab`, `Shift + Tab` y `Enter` para recorrer menú, tema, filtro, formulario y enlaces.
2. Comprueba que “Saltar al contenido” mueve el foco al contenido principal y que siempre se ve el foco del teclado.
3. Revisa las tres rutas y la 404 en escritorio y a 320 px de ancho.
4. Envía el formulario vacío, con correo inválido y con datos válidos.
5. Comprueba la API con conexión normal, un filtro sin coincidencias y un fallo de red seguido de reintento.

## Publicación en GitHub Pages

El archivo `.github/workflows/deploy.yml` compila y publica `dist/` cuando se integra un cambio en `main`; también permite iniciar el despliegue manualmente.

1. En GitHub abre el repositorio y ve a **Settings > Pages**.
2. En **Build and deployment > Source**, selecciona **GitHub Actions**.
3. Integra el pull request en `main` o ejecuta el flujo desde **Actions**.
4. Espera a que termine el trabajo de despliegue y abre la URL que muestra GitHub Pages.

Durante la compilación se prepara `404.html` con la aplicación para que GitHub Pages pueda servir el punto de entrada al abrir una ruta directamente. La ruta comodín de React muestra la vista 404 si esa dirección no existe. El workflow define `VITE_BASE_PATH` a partir del nombre actual del repositorio; `vite.config.ts` usa esa variable y tiene como base local predeterminada `/Evaluaci-n4-GonzalezFranco/`.

El repositorio actual es [Evaluaci-n4-GonzalezFranco](https://github.com/FrancoGonzalez-B/Evaluaci-n4-GonzalezFranco). Su nombre todavía requiere el ajuste de administración solicitado en la evaluación: en **Settings > General > Repository name**, cambiarlo a `evaluacion_4-franco_gonzalez`. Después se debe actualizar la URL del remoto local con `git remote set-url origin NUEVA_URL`. El despliegue toma automáticamente el nuevo nombre; para que la dirección local coincida, también se puede actualizar la base predeterminada de `vite.config.ts`.

## Dónde cambiar mi contenido

| Cambio | Archivo |
| --- | --- |
| Colores claros y oscuros | Variables CSS de `src/index.css` |
| Nombre, correo, carrera, presentación y navegación | `src/data/portfolio.ts` |
| Trabajos de la E2 | `src/data/projects.ts` |
| Fotografía | `public/images/franco-gonzalez.jpeg` |
| Dirección y parámetros de la API | `src/services/github.ts` |
| Rutas | `src/App.tsx` |

## Organización

```text
.
├── .github/workflows/deploy.yml
├── docs/
│   ├── captura-e2.png
│   ├── referencias/
│   └── GUIA_ESTUDIO.md
├── public/images/
├── src/
│   ├── components/     # Tarjetas, layout, lista y formulario; CSS propio
│   ├── context/        # Tema compartido
│   ├── data/           # Datos personales, navegación y proyectos
│   ├── hooks/          # Consulta y estado asíncrono
│   ├── pages/          # Vistas de React Router; CSS propio
│   ├── services/       # Comunicación con GitHub y caché
│   ├── styles/         # Botones y estilos compartidos
│   ├── types/          # Tipos e interfaces
│   ├── App.tsx
│   ├── index.css       # Variables, reset y estilos comunes
│   └── main.tsx
├── INVENTARIO.md
├── README.md
└── uso_ia.md
```

## Flujo de Git y documentos

Los cambios se preparan en ramas, se guardan con mensajes `feat:`, `fix:`, `style:` o `docs:` y se revisan en un pull request antes de integrarse a `main`. La descripción del pull request registra qué se cambió, cómo se comprobó y qué limitaciones quedan.

- [INVENTARIO.md](INVENTARIO.md): correspondencia entre la E2 y esta versión.
- [uso_ia.md](uso_ia.md): declaración del apoyo de IA, ajustes y verificación.
- [Guía de estudio](docs/GUIA_ESTUDIO.md): explicación del proyecto y preguntas para practicar su defensa.
