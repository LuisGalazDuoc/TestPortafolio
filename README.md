# Portafolio Personal
Portafolio responsivo con secciones de introduccion, proyectos, dos bloques de noticias (cargadas desde JSON) y contacto, con cambio de tema Dia/Noche y pruebas unitarias.

> 📸 **Capturas de pantalla:** agrega aquí las imágenes de tu portafolio (`docs/captura-escritorio.png`, `docs/captura-movil.png`) y enlázalas:
> `![Escritorio](docs/captura-escritorio.png)`

## Instalación y ejecución
```bash
npm install        # instala dependencias (genera package-lock.json: súbelo al repositorio)
npm run dev        # servidor de desarrollo en http://localhost:5173
npm run build      # build de producción en dist/
npm run preview    # previsualiza el build
npm run lint       # análisis estático
```

## Pruebas
```bash
npm test           # modo watch
npm run test:run   # ejecución única
npm run coverage   # informe de cobertura (consola + coverage/index.html)
```
El plan de pruebas documentado está en [`docs/plan-de-pruebas.md`](docs/plan-de-pruebas.md).

### Nota sobre Vitest vs. Jasmine/Karma
Este proyecto usa **Vitest**, el runner estándar actual para proyectos Vite (Karma está deprecado). Los conceptos son equivalentes:

| Jasmine / Karma | Vitest |
|-----------------|--------|
| `describe`, `it`, `beforeEach` | `describe`, `it`, `beforeEach` (igual) |
| `expect(x).toBe(y)` | `expect(x).toBe(y)` (igual) |
| `jasmine.createSpy()` | `vi.fn()` |
| `spyOn(obj, 'm')` | `vi.spyOn(obj, 'm')` |
| Karma + navegadores | jsdom (o modo browser de Vitest) |
| `karma-coverage` / Istanbul | `@vitest/coverage-v8` |

## Estructura
```
public/
  data/            # JSON: profile, projects, news-tech, news-campus
  images/          # imágenes
src/
  components/      # Section, NavBar, Intro, ProjectCard, ProjectsSection,
                   # NewsItem, NewsSection, ContactForm, Footer, ThemeToggle, AsyncState
  hooks/           # useFetchJson, useTheme
  services/        # dataService (lectura de JSON)
  utils/           # validadores y formateo de fechas
  test/            # setup, mockFetch, fixtures
  App.jsx · main.jsx · index.css
docs/plan-de-pruebas.md
.github/workflows/deploy.yml
```

## Personalización
1. Edita `public/data/profile.json` (nombre, rol, biografía, foto, redes).
2. Edita `public/data/projects.json` (mínimo 3 proyectos: imagen, título, descripción, tecnologías, enlace).
3. Edita `public/data/news-tech.json` y `news-campus.json` (título, fecha `YYYY-MM-DD`, contenido).
4. Reemplaza las imágenes de `public/images/` conservando el `alt` descriptivo en el JSON.

## Despliegue en GitHub Pages
```bash
git init
git add .
git commit -m "feat: portafolio inicial con React, Vite y Vitest"
git branch -M main
git remote add origin https://github.com/<usuario>/<repositorio>.git
git push -u origin main
```
En GitHub: **Settings → Pages → Source: GitHub Actions**. Cada push a `main` ejecuta lint, pruebas con cobertura, build y publicación.
(Para un repositorio `<usuario>.github.io` la URL es `https://<usuario>.github.io`.)

## Mapa de cumplimiento del enunciado
| Requisito | Dónde |
|-----------|-------|
| React modular y reutilizable (IE2.1.1) | `src/components`, `Section` y `AsyncState` reutilizados |
| State y props, documentación (IE2.1.2) | `useState` en `ContactForm`/hooks; `PropTypes` en todos los componentes |
| Responsivo + Bootstrap (IE2.1.3) | Navbar, Card, Button, Form y Grid (`Row`/`Col`), tema Día/Noche |
| Introducción, Proyectos (≥3), Noticias (2 secciones) | `Intro`, `ProjectsSection`, `NewsSection` ×2 |
| Datos desde JSON | `public/data/*.json` + `useFetchJson` |
| Pruebas: render, eventos, estado, DOM (IE2.2.1) | `src/**/*.test.jsx` |
| Plan de pruebas y mocks (IE2.3.1) | `docs/plan-de-pruebas.md`, `src/test/` |
| Informe de cobertura (IE2.3.2) | `npm run coverage` |
| Git + README | Este archivo + workflow |
| Accesibilidad | `alt` en imágenes, enlace "saltar al contenido", etiquetas de formulario, `aria-invalid`, foco por teclado, `prefers-reduced-motion` |
| Rendimiento | Imágenes SVG/lazy-loading con dimensiones, build minificado de Vite, sin dependencias JS innecesarias |

## Guía para la presentación final
1. Muestra el sitio publicado y alterna Día/Noche y el tamaño de pantalla.
2. Explica el flujo de datos: JSON → `useFetchJson` → estado → props → componentes.
3. Muestra un componente reutilizable (`ProjectCard`) y su prueba.
4. Ejecuta `npm run coverage` y comenta el informe.
5. Menciona por qué Vitest reemplaza a Karma/Jasmine.
