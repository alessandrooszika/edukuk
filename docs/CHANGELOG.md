# Changelog

## 0.3.0 (2026-06-01)

### Nuevos componentes
- **TreeView:** árbol jerárquico con expand/colapse, keyboard nav (ArrowUp/Down/Right/Left, Home/End), ARIA tree/treeitem, selectedId + onSelect
- **VirtualizedList:** lista con renderizado virtualizado (solo items visibles + overscan), scroll sin lag para 1000+ items
- **Toast:** sistema de notificaciones stackeables con ToastProvider + useToast(), 4 posiciones, auto-dismiss, variantes semánticas

### Mejoras
- **CI:** agregado `packageManager` en package.json para pnpm/action-setup, actions actualizadas de v4 a v6 (Node 24)
- **TreeView:** espaciado entre nodos con `gap` en el contenedor
- **README:** documentación completa del proyecto con stack, componentes, features y autor

### Testing (445 tests, 53 archivos)
- **Nuevos tests:** TreeView (10), VirtualizedList (3), Toast (5)
- **Total:** 445 tests pasando, 53 archivos de test, 0 errores

---

## 0.2.0 (2026-05-31)

### Componentes (49)
- **Layout:** Box, Card (CardHeader, CardBody, CardFooter), Stack (HStack, VStack), Divider, Stepper, Table, AspectRatio, DataTable
- **Formularios:** Button, Input, Textarea, Select, Autocomplete, PasswordInput, SearchInput, NumberInput, DateInput, ColorInput, RangeInput, FileInput, FormField, FormGroup
- **Visualización:** Badge, Chip, Switch, Progress, Skeleton, Meter, Image, Avatar, Rating, Timeline, EmptyState
- **Navegación:** Tabs, Accordion, Breadcrumbs, Pagination, Navbar, Footer
- **Overlays:** Tooltip, Popover, Modal, Drawer, Alert, Loader, LoaderBar, LoaderOverlay
- **Utilidades:** ThemeToggle, LogoWatermark, ErrorBoundary, Icons, FloatingOverlays

### Componentes nuevos
- **Stack/HStack/VStack:** thin wrappers de Box con `display:flex` + `flexDirection` + `gap` predefinidos
- **Divider:** línea horizontal (`<hr>`) o vertical (`<span>`) con label opcional
- **Stepper:** indicador de progreso por pasos con checkmark, orientation, alternativeLabel
- **Table:** tabla HTML con variant, size, striped, stickyHeader
- **AspectRatio:** contenedor con relación de aspecto fija vía CSS `aspect-ratio`
- **DataTable:** tabla genérica `<T>` con sort, filter, paginación, selección y col visibility
- **Avatar:** imagen o iniciales con size (sm/md/lg), variant (circle/rounded/square), color
- **Rating:** estrellas hover/click con keyboard y ARIA radiogroup
- **Timeline:** línea de tiempo vertical con dots + conectores + cards
- **EmptyState:** estado vacío con icono, título, descripción, acción
- **FormField:** wrapper de formulario con label, error, helperText, required
- **FormGroup:** `<fieldset>` + `<legend>` para agrupar campos

### Mejoras
- **Input:** nueva prop `hideErrorText` — suprime el texto de error pero mantiene borde rojo + aria-invalid (útil dentro de FormField)
- **DataTable:** sin `useMemo` (React 19 compiler), usa `Record<string, any>` con generic `<T>`
- **Routing:** hashes inválidos ahora muestran página 404 en vez de redirigir silenciosamente a home
- **NotFoundPage:** página 404 con mensajes irónicos personalizados para hashes como `#admin`, `#secret`, `#api`, etc.

### Páginas
- **NotFoundPage:** nueva página lazy-loaded con gradiente 404, Badge "Área restringida" para hashes especiales, y mensajes irónicos contextuales

### Documentación
- `docs/COMPONENTES.md`: +12 secciones (Stack, Divider, Stepper, Table, AspectRatio, DataTable, Avatar, Rating, Timeline, EmptyState, FormField, FormGroup)
- `src/content/react-hook-form.md`: nueva guía de integración con React Hook Form

### Testing (165 tests, 17 archivos)
- **Nuevos tests:** Stack (7), FormField (5), FormGroup (4), DataTable (8)
- **Total:** 165 tests pasando, 17 archivos de test

---

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
