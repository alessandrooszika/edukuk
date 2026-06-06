# edukuk 🎨

<img src="https://raw.githubusercontent.com/alessandrooszika/edukuk/main/public/favicon-dark.webp" width="100" alt="edukuk">

[![CI](https://github.com/alessandrooszika/edukuk/actions/workflows/ci.yml/badge.svg)](https://github.com/alessandrooszika/edukuk/actions/workflows/ci.yml)
[![deploy](https://img.shields.io/github/deployments/alessandrooszika/edukuk/github-pages?label=deploy&logo=github)](https://alessandrooszika.github.io/edukuk/)

> Componentes UI en React 19 + TypeScript + Vite
>
> 61 componentes, 0 dependencias de UI externas

## Instalación

```bash
pnpm add edukuk react react-dom
pnpm add -D @fontsource/inter  # opcional, tipografía Inter
```

```tsx
import { Button, Card } from "edukuk";
import "edukuk/styles";

function App() {
  return <Card><Button>Hola mundo</Button></Card>;
}
```

> Si usás i18n, envolvés tu app con `I18nextProvider`:
> ```tsx
> import { I18nextProvider } from "react-i18next";
> import i18n from "tu-config-de-i18n";
> import { Button } from "edukuk";
> createRoot(root).render(
>   <I18nextProvider i18n={i18n}><App /></I18nextProvider>
> );
> ```

## Stack

- **React 19** + TypeScript 6 + Vite 8
- CSS Modules (sin Tailwind ni librerías UI)
- pnpm, Vitest + Testing Library, Playwright

## Componentes

| Categoría | Componentes |
|-----------|------------|
| **Botones** | Button |
| **Layout** | Box, Card (Header/Body/Footer), Stack/HStack/VStack, AspectRatio, Divider, Stepper, Table, DataTable, SplitPane, Sidebar, Image, ImageViewer, RevealCard |
| **Inputs** | Input, Textarea, Select, Autocomplete, PasswordInput, SearchInput, NumberInput, DateInput, ColorInput, RangeInput, FileInput, FormField, FormGroup, TreeSelect |
| **Display** | Badge, Chip, Switch, Progress, Skeleton, Tabs, Avatar, Rating, Timeline, EmptyState, Typography, Meter, Accordion |
| **Business** | TreeView, VirtualizedList, Toast, CommandPalette |
| **Overlays** | Modal, Drawer, Alert, Popover, Tooltip, Loader, LoaderBar, LoaderOverlay, OnlineBanner |
| **Navegación** | Navbar, Footer, Pagination, Breadcrumbs, LanguageSwitcher |
| **Theme** | ThemeToggle, LogoWatermark |
| **Utils** | ErrorBoundary, 27 iconos SVG |

## Arrancar

```bash
pnpm install
pnpm run dev          # Dev server
pnpm run test         # 511 unit + 19 e2e
pnpm run build        # 0 errores
pnpm run lint         # ESLint
pnpm run storybook    # Catálogo visual (localhost:6006)
pnpm run build-storybook  # Export estático
```

## Features

- 🌓 Tema claro/oscuro con variables CSS + `prefers-color-scheme`
- ♿ ARIA completo, keyboard navigation, focus trapping
- 📱 Touch + PointerEvents (hold-to-repeat, long-press tooltip)
- 🌐 i18n multi-idioma (ES/EN) con LanguageSwitcher
- 📦 Sin dependencias de UI externas
- ⚡ React Compiler habilitado
- 🧪 511 tests unitarios + 19 E2E con Playwright
- 🪝 Hooks compartidos: useOnlineStatus, useToast, useFloatingUI, useFocusTrap
- 🔧 Pre-commit hooks con lint-staged

## Docs

- [Guía completa de componentes](docs/COMPONENTES.md)
- [Storybook online](https://alessandrooszika.github.io/edukuk/storybook) — catálogo visual de componentes
- Storybook local: `pnpm run storybook` (puerto 6006 por defecto)

## Autor

- **Alessandro Oszika** — Desarrollo y diseño
- **[DeepSeek V4 Flash Free](https://deepseek.com) + [Opencode](https://opencode.ai)** — Asistencia y generación de código

## Licencia

MIT
