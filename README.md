# edukuk 🎨

<img src="https://raw.githubusercontent.com/alessandrooszika/edukuk/main/public/favicon-dark.webp" width="100" alt="edukuk">

> Componentes UI en React 19 + TypeScript + Vite
>
> 52 componentes, 0 dependencias de UI externas

## Stack

- **React 19** + TypeScript 6 + Vite 8
- CSS Modules (sin Tailwind ni librerías UI)
- pnpm, Vitest + Testing Library, Playwright

## Componentes

| Categoría | Componentes |
|-----------|------------|
| **Layout** | Box, Card (Header/Body/Footer), Stack/HStack/VStack, AspectRatio, Divider, Stepper, Table, DataTable |
| **Inputs** | Input, Textarea, Select, Autocomplete, PasswordInput, SearchInput, NumberInput, DateInput, ColorInput, RangeInput, FileInput, FormField, FormGroup |
| **Display** | Badge, Chip, Switch, Progress, Skeleton, Tabs, Avatar, Rating, Timeline, EmptyState, Typography, Image, Meter, Accordion |
| **Business** | TreeView, VirtualizedList, Toast |
| **Overlays** | Modal, Drawer, Alert, Popover, Tooltip, Loader, LoaderBar, LoaderOverlay |
| **Navegación** | Navbar, Footer, Pagination, Breadcrumbs |
| **Theme** | ThemeToggle, LogoWatermark |
| **Utils** | ErrorBoundary, 22 iconos SVG |

## Arrancar

```bash
pnpm install
pnpm run dev        # Dev server
pnpm run test       # 445 tests
pnpm run build      # 0 errores
pnpm run lint       # ESLint
```

## Features

- 🌓 Tema claro/oscuro con variables CSS + `prefers-color-scheme`
- ♿ ARIA completo, keyboard navigation, focus trapping
- 📱 Touch + PointerEvents (hold-to-repeat, long-press tooltip)
- 📦 Sin dependencias de UI externas
- ⚡ React Compiler habilitado
- 🧪 445 tests unitarios + E2E con Playwright
- 🔧 Pre-commit hooks con lint-staged

## Docs

- [Guía completa de componentes](docs/COMPONENTES.md)

## Autor

- **Alessandro Oszika** — Desarrollo y diseño
- **[DeepSeek V4 Flash Free](https://deepseek.com) + [Opencode](https://opencode.ai)** — Asistencia y generación de código

## Licencia

MIT
