# Plan de pruebas

**Herramientas:** Vitest (runner + aserciones), React Testing Library (renderizado y DOM), user-event (interacción), jsdom (entorno de navegador), `@vitest/coverage-v8` (cobertura).
**Ejecución:** `npm run test:run` · **Cobertura:** `npm run coverage` (reporte HTML en `coverage/index.html`).
**Mocks:** `fetch` simulado con `mockFetch` (`src/test/mockFetch.js`), `matchMedia` y `localStorage` simulados en `src/test/setup.js`, funciones espía con `vi.fn()`.

| ID | Componente / módulo | Caso de prueba | Resultado esperado |
|----|---------------------|----------------|--------------------|
| CP-01 | `dataService` | Petición exitosa | Devuelve el JSON y consulta la ruta indicada |
| CP-02 | `dataService` | Respuesta HTTP 404 | Lanza error descriptivo |
| CP-03 | `validators` | Datos válidos / vacíos / correo inválido | `{}` o mensajes de error por campo |
| CP-04 | `validators` | Formato de fecha ISO | Fecha legible en español, sin desfase |
| CP-05 | `useFetchJson` | Carga, éxito, error y cambio de ruta | Estados `loading` → `data` / `error` correctos |
| CP-06 | `useTheme` | Defecto, preferencia del sistema, persistencia, alternar | `data-bs-theme` y `localStorage` consistentes |
| CP-07 | `Section`, `AsyncState` | Región accesible; carga, error, vacío | Roles ARIA y mensajes correctos |
| CP-08 | `NavBar`, `ThemeToggle` | Enlaces, menú colapsable, cambio Día/Noche | Anclas correctas y callbacks invocados |
| CP-09 | `Intro` | Nombre, foto con `alt`, biografía, redes | Contenido visible y enlaces seguros |
| CP-10 | `ProjectCard` | Título, imagen, tecnologías, enlace | Props renderizadas; `target` y `rel` seguros |
| CP-11 | `ProjectsSection` | Carga desde JSON (≥3), vacío, error, `source` | Tarjetas o mensaje según el caso |
| CP-12 | `NewsSection`, `NewsItem` | Noticias desde JSON, vacío, error de red | Título, fecha (`<time>`), contenido |
| CP-13 | `ContactForm` | Validación, envío válido, limpieza, eventos | Errores `aria-invalid`; `onSubmit` con datos |
| CP-14 | `Footer` | Año actual y nombre | Texto de copyright correcto |
| CP-15 | `App` (integración) | Secciones, 2 bloques de noticias, tema, error de perfil | Página completa funcional y resiliente |

## Criterios de aceptación
- 100 % de las pruebas en verde.
- Cobertura mínima configurada: líneas/sentencias/funciones 80 %, ramas 75 % (la ejecución falla si no se cumple).
