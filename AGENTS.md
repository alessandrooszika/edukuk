# edukuk — Contexto para Agentes IA

## Stack
- React 19 + TypeScript 6 + Vite 8
- CSS Modules (classNameStrategy: "non-scoped" en vitest)
- pnpm (no npm/npx)
- Vitest 4 + Testing Library + jsdom
- Sin librerías UI externas ni Tailwind

## Estructura
```
src/
  components/    # 38 componentes, cada uno en su carpeta con index.ts (barrel export)
  pages/         # HomePage, ComplementosPage (lazy-loaded)
  styles/        # index.css (variables CSS globales), breakpoints.ts
  types/         # index.ts (Variant, Size, ModalSize, AlertVariant, AlertPosition)
  hooks/         # hooks custom
  data/          # datos de ejemplo
  content/       # contenido markdown/doc
  test/          # setup.ts (importa @testing-library/jest-dom, mock scrollIntoView)
```

## Convenciones
- Nombre de carpeta = nombre del componente exportado
- Componentes sin `default export`, solo `export const` / `export function`
- Cada carpeta de componente tiene `index.ts` con barrel export
- `React.lazy` usa `.then((m) => ({ default: m.ComponentName }))`
- CSS Modules: archivo `Componente.module.css`, importado como `styles`
- Prefijos CSS: `wrapper`, `input`, `trigger`, `dropdown`, `option`, `btn`, `header`, `body`, `footer`, `overlay`, `panel`
- Tema oscuro vía `[data-theme="dark"]` en CSS, toggle dispara evento `themechange` en window
- Paleta: púrpura (`#aa3bff` light / `#c084fc` dark) con variables semánticas (`--accent`, `--danger`, etc.)

## Componentes clave
- **Box**: `forwardRef<HTMLDivElement, BoxProps>` — contenedor genérico, props de layout (display, gap, padding, margin, etc.), valores number → px
- **Card**: compuesto por CardHeader, CardBody, CardFooter — extienden BoxProps
- **Button**: extiende `ComponentPropsWithoutRef<"button">` con `...rest`
- **Input**: `forwardRef<HTMLInputElement, InputProps>`
- **Select**: trigger `<button>`, dropdown via `createPortal`, `role="listbox"`
- **Autocomplete**: input `role="combobox"`, dropdown via `createPortal`, `aria-activedescendant`
- **Popover**: click-triggered, `createPortal`, 4 posiciones, z-index 150
- **Tooltip**: hover-triggered, texto-only (vs Popover que acepta ReactNode)
- **Pagination**: elipsis con siblings, oculto si `< 2` páginas

## Z-index ladder
| Componente | z-index |
|-----------|---------|
| Navbar | 100 |
| Tooltip | 100 |
| Select dropdown | 150 |
| Autocomplete dropdown | 150 |
| Popover | 150 |
| Modal overlay | 200 |
| Drawer overlay | 250 |
| Drawer panel | 260 |
| Alert | 300 |
| LoaderOverlay | 1000 |

## Tests
- 138 tests unitarios, 13 archivos, todos pasando
- E2E: Playwright con Chromium, 2 specs (navegación, overlays)
- Componentes con test: Box, Button, Input, Select, Autocomplete, Chip, Switch, Alert, Tabs, Progress, Loader, Skeleton, Badge
- Setup: `Element.prototype.scrollIntoView = vi.fn()` en setup.ts
- CSS modules: `classNameStrategy: "non-scoped"` en vitest.config.ts

## Routing
- Hash-based (`#home`, `#complementos`)
- Hashes inválidos redirigen a `#home`
- `overflow-x: clip` en `#root` (no `hidden`) para sticky navbar

## Build
- `pnpm run build` = `tsc -b && vite build`
- `pnpm run test` = `vitest run`
- `pnpm run test:e2e` = `playwright test`
- `pnpm run lint` = `eslint .`
- Pre-commit hook: `lint-staged` corre eslint --fix + tsc --noEmit en staged files
- 0 errores de compilación
