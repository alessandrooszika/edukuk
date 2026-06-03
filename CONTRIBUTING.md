# Contribuyendo a edukuk

## Setup

```bash
pnpm install
pnpm dev          # Dev server (localhost:5173)
pnpm storybook    # Storybook (localhost:6006)
```

## Commands

| Comando | Descripción |
|---------|-------------|
| `pnpm build` | TypeCheck + build Vite |
| `pnpm test` | 511 tests unitarios (Vitest) |
| `pnpm test:e2e` | 19 tests E2E (Playwright) |
| `pnpm lint` | ESLint |
| `pnpm build-storybook` | Build estático de Storybook |

## Cómo agregar un componente

1. Crear carpeta `src/components/MiComponente/`
2. `MiComponente.tsx` — `export const MiComponente = (...) => { ... }` (sin default export)
3. `MiComponente.module.css` — prefijos CSS: `wrapper`, `trigger`, `dropdown`, `option`, `btn`, `header`, `body`, `footer`, `overlay`, `panel`
4. `index.ts` — barrel export: `export { MiComponente } from "./MiComponente"`
5. `MiComponente.test.tsx` — test unitario con Vitest + Testing Library
6. Si aplica: `MiComponente.stories.tsx` — story en `src/stories/`

## Convenciones

- Sin `default export`, solo `export const` / `export function`
- `React.lazy` usa `.then((m) => ({ default: m.ComponentName }))`
- CSS Modules con `classNameStrategy: "non-scoped"`
- `forwardRef` para componentes que aceptan ref
- Valores numéricos en spacing → se convierten a px
- Tema oscuro vía `[data-theme="dark"]` en CSS

## Checklist antes de un PR

- [ ] `pnpm build` — 0 errores de compilación
- [ ] `pnpm test` — todos los tests pasando
- [ ] `pnpm lint` — sin errores
- [ ] Componente documentado en `docs/COMPONENTES.md`
- [ ] Traducciones ES/EN en `src/i18n/locales/`
- [ ] Story en Storybook (si aplica)
