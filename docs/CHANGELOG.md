# Changelog

## 0.1.0 (2026-05-31)

### Componentes (38)
- **Layout:** Box, Card (CardHeader, CardBody, CardFooter)
- **Formularios:** Button, Input, Textarea, Select, Autocomplete, PasswordInput, SearchInput, NumberInput, DateInput, ColorInput, RangeInput, FileInput
- **Visualización:** Badge, Chip, Switch, Progress, Skeleton, Meter, Image
- **Navegación:** Tabs, Accordion, Breadcrumbs, Pagination, Navbar, Footer
- **Overlays:** Tooltip, Popover, Modal, Drawer, Alert, Loader, LoaderBar, LoaderOverlay
- **Utilidades:** ThemeToggle, LogoWatermark, ErrorBoundary, Icons, FloatingOverlays

### Refactorizaciones
- Autocomplete: migrado de `<datalist>` a dropdown controlado con `createPortal`, roles ARIA (`combobox`/`listbox`/`option`), `aria-activedescendant`
- Input: envuelto con `forwardRef` para soportar refs desde Autocomplete
- Barrel exports (`index.ts`) añadidos a todos los 38 componentes
- FloatingOverlays: componente interno que orquesta Modal/Alert/LoaderOverlay/Drawer

### Documentación
- `docs/COMPONENTES.md`: 1167 líneas con todos los componentes, props, ejemplos, z-index ladder
- Sección Autocomplete reescrita (sin `<datalist>`)
- Breadcrumbs, Popover, Pagination, FloatingOverlays documentados

### Testing (138 tests, 13 archivos)
- **Nuevos tests:** Autocomplete (16), Box (14), Input (11), Select (18)
- **Tests existentes:** Button (6), Badge (6), Chip (9), Switch (9), Alert (11), Tabs (13), Progress (9), Loader (6), Skeleton (10)
- Setup: `Element.prototype.scrollIntoView = vi.fn()` en src/test/setup.ts

### Infraestructura
- CI/CD: Husky + lint-staged (pre-commit hooks), GitHub Actions workflow
- E2E: Playwright con tests de navegación y overlays

### Variables CSS
- `--border` → `#d1d5db` en modo claro (inputs más contrastados)
- `--bg` → `#f7f7f7` en modo claro (cards con `--card-bg: #fff` se distinguen del fondo)
