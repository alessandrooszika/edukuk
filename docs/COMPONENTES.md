# edukuk — Guía de Componentes

> Documentación completa de todos los componentes UI del proyecto.
> Tipos compartidos definidos en `src/types/index.ts`.

## Tipos comunes

```ts
type Variant = "default" | "info" | "success" | "warning" | "danger"
type Size    = "sm" | "md" | "lg"
type ModalSize = "sm" | "md" | "lg" | "xl"
type AlertVariant = "info" | "success" | "warning" | "danger"
type AlertPosition = "top-right" | "top-left" | "bottom-right" | "bottom-left"
type InputDesign = "outlined" | "filled" | "standard"
type TypographyVariant = "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "body1" | "body2" | "caption" | "code"
```

---

## 1. Layout

### Box

`src/components/box/Box.tsx`

Contenedor genérico que reemplaza a `<div>`. Acepta props de layout como si fueran CSS inline. Soporta `ref` via `forwardRef`.

**Props:**

| Prop | Tipo | Default | Descripción |
|------|------|---------|-------------|
| `display` | `CSSProperties["display"]` | — | Valor `display` |
| `flexDirection` | `CSSProperties["flexDirection"]` | — | Dirección flex |
| `flexWrap` | `CSSProperties["flexWrap"]` | — | Wrap flex |
| `gap` | `string \| number` | — | Gap (number → px) |
| `alignItems` | `CSSProperties["alignItems"]` | — | Alineación eje cruzado |
| `justifyContent` | `CSSProperties["justifyContent"]` | — | Alineación eje principal |
| `p`, `px`, `py`, `pt`, `pr`, `pb`, `pl` | `string \| number` | — | Padding (number → px) |
| `m`, `mx`, `my`, `mt`, `mr`, `mb`, `ml` | `string \| number` | — | Margin (number → px) |
| `width`, `maxWidth` | `string \| number` | — | Ancho (number → px) |
| `gridTemplateColumns` | `string` | — | Columnas de grid |
| `textAlign` | `CSSProperties["textAlign"]` | — | Alineación texto |
| `className` | `string` | `""` | Clase CSS adicional |
| `style` | `CSSProperties` | — | Estilos inline adicionales |
| `children` | `ReactNode` | — | Contenido |
| Resto | `ComponentPropsWithoutRef<"div">` | — | Atributos nativos de `<div>` |

**Comportamiento:** Los valores numéricos en spacing/dimensiones se convierten automáticamente a `px`. Las props de layout se mezclan en `style`. El `className` se pasa al elemento raíz.

**Ejemplo:**
```tsx
<Box display="flex" gap={16} p="1rem" alignItems="center">
  <span>Item 1</span>
  <span>Item 2</span>
</Box>
```

---

### Card

`src/components/card/Card.tsx`

Contenedor elevado con borde redondeado, sombra y padding. Acepta **BoxProps** para layout (`p`, `gap`, `display`, `flexDirection`, etc.) y opcionalmente `variant` para color semántico.

**Props:**

| Prop | Tipo | Default | Descripción |
|------|------|---------|-------------|
| `children` | `ReactNode` | — | Contenido del card |
| `variant` | `Variant` | `"default"` | Color semántico (borde + fondo tintado) |
| Resto | `BoxProps` | — | Layout: `p`, `gap`, `display`, `flexDirection`, `m`, `width`, etc. |

**Subcomponentes:**

| Componente | Props | CSS |
|---|---|---|
| `CardHeader` | `children` + BoxProps | `flex column; gap: 0.5rem` |
| `CardBody` | `children` + BoxProps | `flex column; gap: 1rem` |
| `CardFooter` | `children` + BoxProps | sin estilo propio |

**CSS Card:** `--card-bg` como fondo, `border-radius: 16px`, `border: 1px solid var(--card-border)`, `box-shadow: var(--shadow)`, `padding: 20px`. En hover: sombra más profunda + borde `--accent-border`.

**CSS variant:** Cambia `border-color` y `background` al tono de la variante. En hover, `border-color` se vuelve el color completo.

```tsx
{/* Sin subcomponentes (backward compat) */}
<Card>
  <h3>Título</h3>
  <p>Contenido</p>
</Card>

{/* Con subcomponentes */}
<Card>
  <CardHeader><h2>Título</h2></CardHeader>
  <CardBody><p>Contenido</p></CardBody>
  <CardFooter><figure>...</figure></CardFooter>
</Card>

{/* Configurable */}
<Card variant="info" p={32} gap="2rem">
  <CardHeader p={0}><h2>Info</h2></CardHeader>
  <CardBody display="flex" flexDirection="row" gap="0.5rem">
    <span>A</span><span>B</span>
  </CardBody>
</Card>
```

---

### Image

`src/components/image/Image.tsx`

Wrapper de `<img>` con `<figure>` y `figcaption` opcional.

**Props:**

| Prop | Tipo | Default | Descripción |
|------|------|---------|-------------|
| `caption` | `string` | — | Texto del pie de imagen |
| Resto | `Omit<ComponentPropsWithoutRef<"img">, "children">` | — | Atributos nativos de `<img>` |

```tsx
<Image src="/logo.webp" alt="Logo" caption="Logotipo de edukuk" />
```

---

### ImageViewer

`src/components/image-viewer/ImageViewer.tsx`

Visor overlay (lightbox) para imágenes a pantalla completa, con navegación por teclado y gestos táctiles.

**Componentes exportados:** `ImageViewerProvider`, `useImageViewer`, `ImageViewer`

**Props de ImageViewerProvider:**

| Prop | Tipo | Default | Descripción |
|------|------|---------|-------------|
| `children` | `ReactNode` | **requerido** | Componentes que pueden abrir el visor |

**Retorno de `useImageViewer()`:**

```ts
{ openViewer: (opts: { src?: string; alt?: string; images?: { src: string; alt?: string }[]; index?: number }) => void }
```

**Prop `viewer` en Image:** El componente `Image` acepta `viewer: boolean`. Al hacer clic, Enter o Space abre la imagen en el visor. Requiere `ImageViewerProvider` en un ancestro.

**Comportamiento:** Overlay fixed con `z-index: 300` vía `createPortal`. Panel focusable con `useFocusTrap`. Keyboard: Escape cierra, ArrowLeft/ArrowRight navega (enfoque al botón correspondiente). Touch swipe (threshold 50px) en móvil. Botones de navegación ocultos en <1024px (`useMediaQuery`). Contador "2 / 5" para galería. Animaciones fadeIn overlay + scaleIn imagen.

```tsx
<ImageViewerProvider>
  <Image src="/foto.webp" alt="Foto" viewer />
  <button onClick={() => openViewer({ images: gallery, index: 2 })}>
    Abrir galería
  </button>
</ImageViewerProvider>
```

---

### Meter

`src/components/meter/Meter.tsx`

Barra de medición usando el elemento `<meter>` nativo.

**Props:**

| Prop | Tipo | Default | Descripción |
|------|------|---------|-------------|
| `value` | `number` | **requerido** | Valor actual |
| `min` | `number` | — | Mínimo (default nativo del browser) |
| `max` | `number` | — | Máximo (default nativo del browser) |

**CSS variables:** `--meter-bg` para el track, `--meter-value` para el relleno.

```tsx
<Meter value={75} min={0} max={100} />
```

---

### Accordion

`src/components/accordion/Accordion.tsx`

Acordeón colapsable usando `<details>` / `<summary>` nativos. Sin JavaScript necesario.

**Props:**

| Prop | Tipo | Default | Descripción |
|------|------|---------|-------------|
| `items` | `AccordionItem[]` | **requerido** | Array de objetos `{ question, answer }` |

```tsx
<Accordion items={[
  { question: "¿Qué es?", answer: "Un componente de acordeón." },
  { question: "¿Cómo se usa?", answer: "Con la prop items." },
]} />
```


---

### Breadcrumbs

`src/components/breadcrumbs/Breadcrumbs.tsx`

Navegación de ruta jerárquica con `<nav aria-label="breadcrumb">` y `<ol>`. Sin JavaScript necesario.

**Props:**

| Prop | Tipo | Default | Descripción |
|------|------|---------|-------------|
| `items` | `BreadcrumbItem[]` | **requerido** | Array de rutas `{ label: string; href?: string }` |
| `separator` | `string` | `"/"` | Separador entre ítems |

**BreadcrumbItem:**

| Prop | Tipo | Descripción |
|------|------|-------------|
| `label` | `string` | Texto visible |
| `href` | `string` | Si se provee, renderiza `<a>`; si no, `<span>` con `aria-current="page"` |

**Comportamiento:** El último ítem (sin `href`) marca la página actual con `aria-current="page"`. Los ítems con `href` son links navegables. El `<nav>` tiene `aria-label="breadcrumb"` para lectores de pantalla.

```tsx
<Breadcrumbs items={[
  { label: "Inicio", href: "#home" },
  { label: "Componentes", href: "#complementos" },
  { label: "Layout" },
]} />
```

---

### Stack / HStack / VStack

`src/components/stack/Stack.tsx`

Thin wrappers de **Box** con `display:flex` predefinido. Cada uno exporta su propio componente.

**Props:**

| Prop | Tipo | Default | Descripción |
|------|------|---------|-------------|
| `as` | `"div"` | `"div"` | Elemento raíz (siempre `"div"`, reservado para futura expansión) |
| `children` | `ReactNode` | — | Contenido |
| Resto | `BoxProps` | — | Layout: `gap`, `p`, `m`, `alignItems`, `justifyContent`, etc. |

**Comportamiento:**
- **Stack:** `display: flex`, `flexDirection: column` (sin gap default).
- **HStack:** `display: flex`, `flexDirection: row`, `gap: 0.5rem`.
- **VStack:** `display: flex`, `flexDirection: column`, `gap: 1rem`.

Los valores booleanos en `BoxProps` se ignoran silenciosamente. Las props numéricas se convierten a `px`.

```tsx
<HStack gap={8}>
  <span>Item 1</span>
  <span>Item 2</span>
</HStack>

<VStack gap="0.5rem">
  <p>Párrafo 1</p>
  <p>Párrafo 2</p>
</VStack>
```

---

### Divider

`src/components/divider/Divider.tsx`

Línea divisoria horizontal (`<hr>`) o vertical (`<span>`). Sin JavaScript.

**Props:**

| Prop | Tipo | Default | Descripción |
|------|------|---------|-------------|
| `orientation` | `"horizontal" \| "vertical"` | `"horizontal"` | Dirección |
| `variant` | `Variant` | `"default"` | Color de la línea |
| `size` | `Size` | `"md"` | Grosor |
| `label` | `string` | — | Texto opcional centrado (solo horizontal) |
| `className` | `string` | `""` | Clase adicional |

**Comportamiento:** Horizontal usa `<hr>` con label optativo centrado vía `::before`/`::after`. Vertical usa `<span>`. En modo vertical, el label se ignora.

```tsx
<Divider />
<Divider label="Sección" />
<Divider orientation="vertical" size="lg" />
```

---

### Stepper

`src/components/stepper/Stepper.tsx`

Indicador de progreso por pasos con checkmark en completados.

**Props:**

| Prop | Tipo | Default | Descripción |
|------|------|---------|-------------|
| `steps` | `string[]` | **requerido** | Array de labels |
| `activeStep` | `number` | **requerido** | Paso activo (0-indexed) |
| `orientation` | `"horizontal" \| "vertical"` | `"horizontal"` | Dirección |
| `alternativeLabel` | `boolean` | `false` | Label debajo del círculo (horizontal) |

**Comportamiento:** Cada paso muestra un círculo con número, checkmark en completados, o número en activo. Los conectores usan `position: absolute`. Círculos con `background: var(--card-bg)` para ocultar la línea detrás. Keyboard: ArrowLeft/ArrowRight navega cuando `role="tablist"`.

```tsx
<Stepper
  steps={["Registro", "Pago", "Confirmación"]}
  activeStep={1}
  alternativeLabel
/>
```

---

### Table

`src/components/table/Table.tsx`

Tabla HTML con variantes visuales. Sin JavaScript.

**Props:**

| Prop | Tipo | Default | Descripción |
|------|------|---------|-------------|
| `columns` | `{ key: string; label: string }[]` | **requerido** | Definición de columnas |
| `data` | `Record<string, any>[]` | **requerido** | Datos a renderizar |
| `variant` | `Variant` | `"default"` | Color de acento |
| `size` | `Size` | `"md"` | Tamaño de celdas |
| `striped` | `boolean` | `false` | Filas alternadas |
| `stickyHeader` | `boolean` | `false` | Header fijo al scrollear |

**Comportamiento:** `<table>` semántica con `<thead>`/`<tbody>`. Columnas con `key` se mapean al data. Header usa `var(--accent-bg)`. Striped pares con `var(--border)`. Hover consistente en todas las filas.

```tsx
<Table
  columns={[{ key: "name", label: "Nombre" }, { key: "age", label: "Edad" }]}
  data={[{ name: "Ana", age: 30 }, { name: "Luis", age: 25 }]}
  striped
/>
```

---

### AspectRatio

`src/components/aspect-ratio/AspectRatio.tsx`

Contenedor que mantiene una relación de aspecto fija sobre su contenido.

**Props:**

| Prop | Tipo | Default | Descripción |
|------|------|---------|-------------|
| `ratio` | `number` | `16/9` | Relación ancho/alto (ej: `16/9`, `4/3`, `1`) |
| `maxWidth` | `string \| number` | — | Ancho máximo (number → px) |
| `children` | `ReactNode` | — | Contenido |

**Comportamiento:** Usa CSS `aspect-ratio` en lugar del `padding-bottom` trick. Soporta `maxWidth` correctamente (no depende del ancho del padre).

```tsx
<AspectRatio ratio={4/3} maxWidth={400}>
  <iframe src="..." />
</AspectRatio>
```

---

### DataTable

`src/components/data-table/DataTable.tsx`

Tabla de datos genérica (`<T>`) con sort, filter, selección, paginación y visibilidad de columnas.

**Props:**

| Prop | Tipo | Default | Descripción |
|------|------|---------|-------------|
| `columns` | `DataColumn<T>[]` | **requerido** | Definición de columnas con key, label, sortable, filterable, visible |
| `data` | `T[]` | **requerido** | Datos a renderizar |
| `pageSize` | `number` | `10` | Filas por página |
| `selectable` | `boolean` | `false` | Checkbox de selección |
| `onSelectionChange` | `(selected: T[]) => void` | — | Callback al cambiar selección |
| `striped` | `boolean` | `false` | Filas alternadas |
| `stickyHeader` | `boolean` | `false` | Header fijo |
| `emptyMessage` | `string` | `"No hay datos"` | Mensaje cuando no hay resultados |

**DataColumn\<T\>:**

| Prop | Tipo | Default | Descripción |
|------|------|---------|-------------|
| `key` | `keyof T` | **requerido** | Campo del data |
| `label` | `string` | **requerido** | Texto del header |
| `sortable` | `boolean` | `false` | Permitir ordenamiento |
| `filterable` | `boolean` | `false` | Incluir en búsqueda |
| `visible` | `boolean` | `true` | Visible inicialmente |

**Comportamiento:** Sort cíclico (asc → desc → none). Filter busca text en columnas filterable (case-insensitive). Paginación reusa componente Pagination. Select all usa checkbox indeterminado (`ref.indeterminate`). Col visibility toggle con dropdown. Hook form: compatible con `useController`.

```tsx
<DataTable
  columns={[
    { key: "name", label: "Nombre", sortable: true, filterable: true },
    { key: "email", label: "Email", sortable: true },
  ]}
  data={users}
  selectable
  onSelectionChange={setSelected}
/>
```

---

### SplitPane

`src/components/split-pane/SplitPane.tsx`

Panel dividido redimensionable con drag. Divide el espacio en dos paneles (primario + secundario) separados por un divider arrastrable.

**Props:**

| Prop | Tipo | Default | Descripción |
|------|------|---------|-------------|
| `primary` | `ReactNode` | **requerido** | Panel primario (tamaño controlado) |
| `secondary` | `ReactNode` | **requerido** | Panel secundario (ocupa resto) |
| `defaultSize` | `number` | `300` | Tamaño inicial del panel primario (px) |
| `minSize` | `number` | `100` | Tamaño mínimo del panel primario |
| `maxSize` | `number` | `Infinity` | Tamaño máximo del panel primario |
| `orientation` | `"horizontal" \| "vertical"` | `"horizontal"` | Eje de división |
| `className` | `string` | `""` | Clase adicional |

**Comportamiento:** Usa `pointermove`/`pointerup` en `document` para arrastrar. El divider tiene 4px de ancho con cursor `col-resize` o `row-resize`. En hover se pinta de `--accent`.

```tsx
<SplitPane
  primary={<nav>Menú lateral</nav>}
  secondary={<main>Contenido</main>}
  defaultSize={240}
  minSize={160}
/>
```

---

### Sidebar

`src/components/sidebar/Sidebar.tsx`

Panel lateral colapsable con toggle animado. Ideal para menús secundarios o paneles de herramientas.

**Props:**

| Prop | Tipo | Default | Descripción |
|------|------|---------|-------------|
| `isOpen` | `boolean` | **requerido** | Visible o no |
| `onToggle` | `() => void` | **requerido** | Callback al toggle |
| `children` | `ReactNode` | **requerido** | Contenido del sidebar |
| `side` | `"left" \| "right"` | `"left"` | Lado de anclaje |
| `width` | `string \| number` | `"260px"` | Ancho (number → px) |
| `className` | `string` | `""` | Clase adicional |

**Comportamiento:** Se desliza con `transform: translateX()` y transición de 0.25s. Tiene botón toggle con ChevronLeftIcon que rota según el estado. Cuando está cerrado, el panel se oculta completamente (translateX(-100%) para left, translateX(100%) para right). Usa `aria-label` para accesibilidad.

```tsx
<Sidebar isOpen={sidebarOpen} onToggle={() => setSidebarOpen(!sidebarOpen)} side="left">
  <nav>Items del menú</nav>
</Sidebar>
```

---

## 2. Botones

### Button

`src/components/button/Button.tsx`

Botón con variantes de color, ghost e icon-only. Extiende `<button>` nativo.

**Props:**

| Prop | Tipo | Default | Descripción |
|------|------|---------|-------------|
| `variant` | `Variant \| "ghost"` | `"default"` | Variante de color |
| `iconOnly` | `boolean` | `false` | Modo solo icono (32×32, sin borde/bg) |
| `type` | `string` | `"button"` | Tipo de botón |
| `children` | `ReactNode` | — | Contenido |
| Resto | `ComponentPropsWithoutRef<"button">` | — | Atributos nativos (onClick, disabled, aria-\*, tabIndex, etc.) |

**Variantes:**

| Variante | Texto | Borde | Hover bg |
|----------|-------|-------|----------|
| `default` | `--text-h` | `--border` | `--accent-bg` |
| `info` | `--info` | `--info` | `--info-bg` |
| `success` | `--success` | `--success` | `--success-bg` |
| `warning` | `--warning` | `--warning` | `--warning-bg` |
| `danger` | `--danger` | `--danger` | `--danger-bg` |
| `ghost` | `--text` | Sin borde | `--accent-bg` |

**iconOnly:** Botón cuadrado de 32×32 sin padding ni borde, ideal para íconos.
**ghost:** Sin borde ni fondo en reposo, solo aparece en hover — usado en la navbar.

```tsx
<Button variant="info">Info</Button>
<Button variant="danger" disabled>Eliminar</Button>
<Button iconOnly aria-label="Cerrar" onClick={onClose}>
  <CloseIcon />
</Button>
<Button variant="ghost">Inicio</Button>
```

---

## 3. Inputs

### Input

`src/components/input/Input.tsx`

Campo de texto base con label, error, variantes y tamaños.

**Props:**

| Prop | Tipo | Default | Descripción |
|------|------|---------|-------------|
| `variant` | `Variant` | `"default"` | Color de foco |
| `size` | `Size` | `"md"` | Tamaño |
| `label` | `string` | — | Texto del label (renderiza `<label htmlFor={id}>`) |
| `error` | `string` | — | Mensaje de error (aria-invalid, role="alert") |
| `hideErrorText` | `boolean` | `false` | Suprime el texto de error pero mantiene borde rojo + aria-invalid |
| `id` | `string` | `useId()` | ID auto-generado |
| Resto | `Omit<InputHTMLAttributes<HTMLInputElement>, "size">` | — | Atributos nativos |

**Tamaños:** `sm` (32px height), `md` (40px), `lg` (48px).
**Foco:** Borde del color de la variante + glow con `box-shadow`.
**Error:** Borde `--danger` + glow rojo.

```tsx
<Input label="Email" placeholder="tu@email.com" />
<Input label="Nombre" error="Campo obligatorio" variant="danger" />
<Input size="lg" variant="success" />
```

---

### Textarea

`src/components/textarea/Textarea.tsx`

Área de texto multilínea con misma API que Input.

**Props:** Mismas que Input, más:

| Prop | Tipo | Default | Descripción |
|------|------|---------|-------------|
| `rows` | `number` | `3` | Filas visibles |
| Resto | `Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, "size">` | — | Atributos nativos |

**Resize:** `vertical` solamente.
**Tamaños:** `sm` (60px), `md` (80px), `lg` (100px) min-height.

```tsx
<Textarea label="Descripción" rows={5} />
```

---

### Select

`src/components/select/Select.tsx`

Dropdown personalizado con portal, keyboard navigation y checkmark.

**Props:**

| Prop | Tipo | Default | Descripción |
|------|------|---------|-------------|
| `options` | `(string \| SelectOption)[]` | **requerido** | Opciones (string o `{ value, label? }`) |
| `value` | `string` | **requerido** | Valor actual |
| `onChange` | `(value: string) => void` | **requerido** | Callback al seleccionar |
| `placeholder` | `string` | `"Seleccionar..."` | Texto cuando no hay selección |
| `variant` | `Variant` | `"default"` | Color de foco |
| `size` | `Size` | `"md"` | Tamaño |
| `label` | `string` | — | Label |
| `error` | `string` | — | Mensaje de error |
| `disabled` | `boolean` | `false` | Deshabilitado |

**Keyboard:** Enter/Space abre, Arrow keys navega, Enter/Space selecciona, Escape cierra.
**Dropdown:** Renderizado con `createPortal` a `document.body`. Posición calculada con `getBoundingClientRect()`. Se actualiza en scroll/resize.

```tsx
<Select
  options={["React", "Vue", "Angular", "Svelte"]}
  value={framework}
  onChange={setFramework}
  label="Framework"
/>
```

---

### Autocomplete

`src/components/autocomplete/Autocomplete.tsx`

Autocomplete con dropdown controlado via `createPortal`. Filtrado case-insensitive con `useMemo`.

**Props:**

| Prop | Tipo | Default | Descripción |
|------|------|---------|-------------|
| `options` | `string[]` | **requerido** | Opciones de autocompletado |
| `value` | `string` | **requerido** | Valor actual |
| `onChange` | `(value: string) => void` | **requerido** | Callback |
| `placeholder` | `string` | `"Escribe..."` | Placeholder |
| `variant` | `Variant` | `"default"` | Color de foco |
| `size` | `Size` | `"md"` | Tamaño |
| `label` | `string` | — | Label |
| `error` | `string` | — | Error |
| `disabled` | `boolean` | — | Deshabilitado |

**Comportamiento:** Compone `Input` + dropdown `<ul>` via `createPortal`. Filtrado case-insensitive con `useMemo`. Keyboard: ArrowDown/ArrowUp navega, Enter selecciona, Escape cierra. Click fuera cierra. ARIA: `role="combobox"`, `aria-expanded`, `aria-controls`, `aria-activedescendant`, `role="listbox"`, `role="option"`, `aria-selected`. Muestra "Sin resultados" cuando no hay coincidencias.

```tsx
<Autocomplete
  options={["JavaScript", "TypeScript", "Python", "Rust"]}
  value={lang}
  onChange={setLang}
  label="Lenguaje"
/>
```

---

### PasswordInput

`src/components/password-input/PasswordInput.tsx`

Input de contraseña con toggle show/hide (EyeIcon / EyeOffIcon).

**Props:** Mismas que Input (excepto `type` que se controla internamente).

**Comportamiento:** El toggle tiene `tabIndex={-1}` para no interferir con el foco del input. Alterna entre `type="password"` y `type="text"`.

```tsx
<PasswordInput label="Contraseña" placeholder="Ingresá tu contraseña..." />
```

---

### SearchInput

`src/components/search-input/SearchInput.tsx`

Input de búsqueda con lupa a la izquierda y botón X para limpiar.

**Props:** Mismas que Input, más:

| Prop | Tipo | Default | Descripción |
|------|------|---------|-------------|
| `onClear` | `() => void` | — | Callback al limpiar |

**Comportamiento:** El wrapper tiene `role="search"`. Cuando hay valor, muestra `ClearIcon` a la derecha. Si no se provee `onClear`, limpia el valor internamente.

```tsx
<SearchInput label="Buscar" placeholder="Buscar..." onClear={() => setValue("")} />
```

---

### NumberInput

`src/components/number-input/NumberInput.tsx`

Input numérico con steppers (+/-) con hold-to-repeat.

**Props:** Mismas que Input, más:

| Prop | Tipo | Default | Descripción |
|------|------|---------|-------------|
| `min` | `number` | — | Valor mínimo |
| `max` | `number` | — | Valor máximo |
| `step` | `number` | `1` | Paso de incremento |

**Comportamiento:** Spinners nativos ocultos (webkit + Firefox). Steppers con hold-to-repeat (300ms delay, 80ms intervalo). Clamp en blur.

```tsx
<NumberInput label="Cantidad" min={0} max={100} step={5} />
```

---

### DateInput

`src/components/date-input/DateInput.tsx`

Input de fecha con date picker nativo del browser.

**Props:** Mismas que Input.

**Comportamiento:** El icono de calendario nativo se superpone transparente sobre todo el input para que sea clickeable. El `CalendarIcon` decorativo tiene `pointer-events: none`.

```tsx
<DateInput label="Fecha" />
```

---

### ColorInput

`src/components/color-input/ColorInput.tsx`

Selector de color con swatch + hex display.

**Props:**

| Prop | Tipo | Default | Descripción |
|------|------|---------|-------------|
| `value` | `string` | `"#aa3bff"` | Color en hex |
| `variant` | `Variant` | `"default"` | Borde en foco |
| `size` | `Size` | `"md"` | Tamaño |
| `label` | `string` | — | Label |
| `error` | `string` | — | Error |
| Resto | `Omit<InputHTMLAttributes<...>, "size" \| "type" \| "value">` | — | Atributos nativos |

**Comportamiento:** Click en el área visible abre el color picker nativo. Muestra el swatch de color y el valor hex. Keyboard: Enter/Space para abrir. Si el color es blanco puro, muestra un borde interior para visibilidad.

```tsx
<ColorInput label="Color favorito" value="#aa3bff" />
```

---

### RangeInput

`src/components/range-input/RangeInput.tsx`

Slider custom con track relleno y thumb circular.

**Props:**

| Prop | Tipo | Default | Descripción |
|------|------|---------|-------------|
| `variant` | `Variant` | `"default"` | Color del relleno |
| `size` | `Size` | `"md"` | Tamaño |
| `label` | `string` | — | Label |
| `showValue` | `boolean` | `false` | Muestra el valor numérico |
| `min` | `number` | `0` | Mínimo |
| `max` | `number` | `100` | Máximo |
| `step` | `number` | — | Paso (default nativo) |
| Resto | `Omit<InputHTMLAttributes<...>, "size" \| "type">` | — | Atributos nativos |

**Comportamiento:** El `<input type="range">` nativo es transparente y maneja la interacción. Un thumb y track personalizados se superponen con estilos CSS. El fill se calcula como porcentaje con offset de medio thumb.

```tsx
<RangeInput label="Volumen" showValue min={0} max={100} />
```

---

### FileInput

`src/components/file-input/FileInput.tsx`

Zona de carga con drag & drop, soporte para múltiples archivos.

**Props:**

| Prop | Tipo | Default | Descripción |
|------|------|---------|-------------|
| `accept` | `string` | — | Tipos de archivo aceptados (ej. `.pdf,.jpg`) |
| `multiple` | `boolean` | `false` | Permitir múltiples archivos |
| `label` | `string` | — | Label |
| `error` | `string` | — | Error |
| `variant` | `Variant` | `"default"` | Color de acento |
| `disabled` | `boolean` | `false` | Deshabilitado |
| `onChange` | `(files: File[]) => void` | — | Callback con archivos |
| `value` | `FileInfo[]` | — | Archivos controlados |
| `children` | `ReactNode` | — | Contenido personalizado del drop zone |

**Comportamiento:** Drag & drop + click para seleccionar. Muestra lista de archivos con nombre, tamaño y botón de eliminar. Estados visuales para dragOver y disabled.

```tsx
<FileInput label="Subí un archivo" accept=".pdf,.jpg,.png" multiple />
```

---

### FormField

`src/components/form-field/FormField.tsx`

Wrapper de campos de formulario con label, error, helperText y required.

**Props:**

| Prop | Tipo | Default | Descripción |
|------|------|---------|-------------|
| `label` | `string` | — | Texto del label |
| `htmlFor` | `string` | — | `htmlFor` del label (conecta al `id` del input) |
| `error` | `string` | — | Mensaje de error (role="alert") |
| `helperText` | `string` | — | Texto de ayuda adicional |
| `required` | `boolean` | `false` | Muestra asterisco rojo |
| `children` | `ReactNode` | **requerido** | Componente de input/envuelto |

**Comportamiento:** Organiza label arriba, children en medio, error abajo. El error usa `role="alert"` con borde rojo. Compatible con cualquier componente que acepte `id` y `error` (Input, Select, etc.). Recomendado usar `hideErrorText` en Input cuando está dentro de FormField para evitar duplicar el mensaje.

```tsx
<FormField label="Email" htmlFor="email" error="Campo requerido" required>
  <Input id="email" error="Campo requerido" hideErrorText />
</FormField>
```

---

### FormGroup

`src/components/form-group/FormGroup.tsx`

Agrupación visual de campos usando `<fieldset>` y `<legend>`.

**Props:**

| Prop | Tipo | Default | Descripción |
|------|------|---------|-------------|
| `legend` | `string` | — | Título del grupo |
| `children` | `ReactNode` | **requerido** | Campos del formulario |

**Comportamiento:** Renderiza `<fieldset>` con borde y padding. `<legend>` con `font-weight: 600`. Sin JavaScript. Gap entre hijos con flex column.

```tsx
<FormGroup legend="Datos personales">
  <Input label="Nombre" />
  <Input label="Apellido" />
</FormGroup>
```

---

### TreeSelect

`src/components/tree-select/TreeSelect.tsx`

Selector jerárquico con árbol expandible en dropdown via `createPortal`. Compone trigger `<button>` + dropdown con árbol, similar a Select pero para datos jerárquicos.

**Props:**

| Prop | Tipo | Default | Descripción |
|------|------|---------|-------------|
| `options` | `TreeNode[]` | **requerido** | Nodos del árbol (`{ id, label, icon?, children?, disabled? }`) |
| `value` | `string` | **requerido** | ID del nodo seleccionado |
| `onChange` | `(value: string) => void` | **requerido** | Callback al seleccionar |
| `placeholder` | `string` | `"Seleccionar..."` | Texto cuando no hay selección |
| `label` | `string` | — | Label del campo |
| `error` | `string` | — | Mensaje de error |
| `disabled` | `boolean` | `false` | Deshabilitado |
| `className` | `string` | `""` | Clase adicional |

**Comportamiento:** Usa `useFloatingUI` para posicionar el dropdown, `useClickOutside` para cerrar, `useFocusTrap` para el foco. Keyboard: ArrowDown/ArrowUp navega, ArrowRight expande nodo, ArrowLeft colapsa, Enter/Space selecciona hoja o toggle en nodos con hijos, Escape cierra. `role="tree"` con `treeitem`, `aria-expanded`, `aria-selected`, `aria-level`.

```tsx
<TreeSelect
  options={[
    { id: "frontend", label: "Frontend", children: [
      { id: "react", label: "React" },
      { id: "vue", label: "Vue" },
    ]},
    { id: "backend", label: "Backend", children: [
      { id: "node", label: "Node.js" },
    ]},
  ]}
  value={selected}
  onChange={setSelected}
  label="Tecnología"
/>
```

---

## 4. Display

### Badge

`src/components/badge/Badge.tsx`

Indicador numérico posicionado (notificación) o standalone.

**Props:**

| Prop | Tipo | Default | Descripción |
|------|------|---------|-------------|
| `children` | `ReactNode` | **requerido** | Contenido del badge |
| `variant` | `Variant` | `"default"` | Color de fondo |
| `size` | `Size` | `"md"` | Tamaño |
| `standalone` | `boolean` | `false` | Modo inline (sin posicionamiento absoluto) |
| `className` | `string` | `""` | Clase adicional |

**Tamaños:** `sm` (16px), `md` (20px), `lg` (24px).
**Posicionado:** Cuando `standalone=false`, requiere que el padre tenga `position: relative`. Se ubica en `top: -8px; left: 100%; margin-left: -8px`.
**Standalone:** Se renderiza como inline-flex, ideal para listas de variantes.

```tsx
{/* Posicionado sobre un botón */}
<span style={{ position: "relative", display: "inline-block" }}>
  <Button>Notificaciones</Button>
  <Badge variant="danger" size="sm">3</Badge>
</span>

{/* Standalone */}
<Badge variant="default" standalone>default</Badge>
```

---

### Chip

`src/components/chip/Chip.tsx`

Tag removible con variantes, tamaños y disabled.

**Props:**

| Prop | Tipo | Default | Descripción |
|------|------|---------|-------------|
| `label` | `string` | **requerido** | Texto del chip |
| `onRemove` | `() => void` | — | Callback al eliminar (si no se provee, no muestra botón X) |
| `variant` | `Variant` | `"default"` | Color |
| `size` | `Size` | `"md"` | Tamaño |
| `disabled` | `boolean` | `false` | Deshabilitado |
| `className` | `string` | `""` | Clase adicional |

```tsx
<Chip label="React" onRemove={() => removeItem("React")} />
<Chip label="CSS" variant="success" />
<Chip label="Desactivado" disabled />
```

---

### Switch

`src/components/switch/Switch.tsx`

Toggle booleano con `role="switch"` y `aria-checked`.

**Props:**

| Prop | Tipo | Default | Descripción |
|------|------|---------|-------------|
| `checked` | `boolean` | **requerido** | Estado actual |
| `onChange` | `(checked: boolean) => void` | **requerido** | Callback con nuevo valor |
| `label` | `string` | — | Texto visible |
| `variant` | `Variant` | `"default"` | Color cuando está activo |
| `size` | `Size` | `"md"` | Tamaño |
| `disabled` | `boolean` | `false` | Deshabilitado |

**Tamaños:** `sm` (28×16, thumb 12px), `md` (40×22, thumb 18px), `lg` (52×28, thumb 24px).

```tsx
<Switch checked={notifications} onChange={setNotifications} label="Notificaciones" />
```

---

### Progress

`src/components/progress/Progress.tsx`

Barra de progreso determinada 0–100%.

**Props:**

| Prop | Tipo | Default | Descripción |
|------|------|---------|-------------|
| `value` | `number` | **requerido** | Valor 0–100 |
| `variant` | `Variant` | `"default"` | Color del relleno |
| `size` | `Size` | `"md"` | Altura de la barra |
| `label` | `string` | — | Texto visible |
| `showValue` | `boolean` | `false` | Muestra el porcentaje |

**Tamaños:** `sm` (4px), `md` (8px), `lg` (12px) altura.
**Animación:** El ancho del relleno tiene transición `0.4s cubic-bezier(0.34, 1.56, 0.64, 1)`.

```tsx
<Progress value={65} label="Progreso" showValue variant="success" />
```

---

### Skeleton

`src/components/skeleton/Skeleton.tsx`

Placeholder de carga con shimmer animation.

**Props:**

| Prop | Tipo | Default | Descripción |
|------|------|---------|-------------|
| `variant` | `"text" \| "circle" \| "rect"` | `"text"` | Forma del skeleton |
| `width` | `string \| number` | — | Ancho (auto según variant) |
| `height` | `string \| number` | — | Alto (auto según variant) |
| `count` | `number` | `1` | Cantidad de skeletons (apilados) |
| `className` | `string` | `""` | Clase adicional |

**Variantes:** `text` (border-radius 4px, height 1em), `circle` (border-radius 50%, 2.5em), `rect` (border-radius 8px).
**Shimmer:** Gradiente lineal animado con `background-position`. Usa variables `--skeleton` y `--skeleton-shine`.

```tsx
<Skeleton variant="text" count={3} width="60%" />
<Skeleton variant="circle" width={48} height={48} />
<Skeleton variant="rect" width="100%" height={200} />
```

---

### Tabs

`src/components/tabs/Tabs.tsx`

Navegación por pestañas con indicador animado y keyboard navigation.

**Props:**

| Prop | Tipo | Default | Descripción |
|------|------|---------|-------------|
| `tabs` | `Tab[]` | **requerido** | Array de `{ label: string; content: ReactNode }` |
| `defaultIndex` | `number` | `0` | Pestaña inicial |
| `variant` | `Variant` | `"default"` | Color del indicador |
| `onChange` | `(index: number) => void` | — | Callback al cambiar |
| `className` | `string` | `""` | Clase adicional |

**Keyboard:** ArrowLeft/ArrowRight navega, Home/End va al primero/último.
**ARIA:** `role="tablist"` con `aria-orientation="horizontal"`. Cada tab tiene `role="tab"`, `aria-selected`, `aria-controls` apuntando al panel. El panel activo tiene `role="tabpanel"` y `aria-labelledby` apuntando al tab.
**Indicador:** Animado con `width` + `transform: translateX()`.
**Scroll:** `overflow-x: auto` con scrollbar oculto.

```tsx
<Tabs
  tabs={[
    { label: "HTML", content: "HyperText Markup Language" },
    { label: "CSS", content: "Cascading Style Sheets" },
  ]}
  variant="info"
/>
```

---

### Avatar

`src/components/avatar/Avatar.tsx`

Representación visual de usuario con imagen o iniciales.

**Props:**

| Prop | Tipo | Default | Descripción |
|------|------|---------|-------------|
| `src` | `string` | — | URL de imagen (si falla, muestra initials) |
| `alt` | `string` | — | Texto alternativo (genera initials desde la primera letra) |
| `size` | `Size` | `"md"` | Tamaño |
| `variant` | `"circle" \| "rounded" \| "square"` | `"circle"` | Forma |
| `color` | `Variant` | `"default"` | Color de borde en foco |

**Tamaños:** `sm` (32px), `md` (48px), `lg` (64px).

```tsx
<Avatar src="/user.jpg" alt="Ana García" />
<Avatar alt="Luis Pérez" variant="rounded" size="lg" color="info" />
```

---

### Rating

`src/components/rating/Rating.tsx`

Selector de calificación por estrellas con hover y keyboard.

**Props:**

| Prop | Tipo | Default | Descripción |
|------|------|---------|-------------|
| `value` | `number` | **requerido** | Valor actual |
| `onChange` | `(value: number) => void` | **requerido** | Callback |
| `count` | `number` | `5` | Cantidad de estrellas |
| `size` | `Size` | `"md"` | Tamaño |
| `readOnly` | `boolean` | `false` | Solo lectura |

**Tamaños:** `sm` (16px), `md` (24px), `lg` (32px).

**Comportamiento:** SVG inline por estrella. Hover pinta estrellas temporalmente. Click fija el valor. Keyboard: ArrowLeft/ArrowRight navega, Enter confirma. ARIA: `role="radiogroup"`, cada estrella `role="radio"`, `aria-checked`, `aria-posinset`, `aria-setsize`.

```tsx
<Rating value={3} onChange={setRating} />
<Rating value={4} readOnly size="lg" count={10} />
```

---

### Timeline

`src/components/timeline/Timeline.tsx`

Línea de tiempo vertical con dots, conectores y cards de contenido.

**Props:**

| Prop | Tipo | Default | Descripción |
|------|------|---------|-------------|
| `items` | `TimelineItem[]` | **requerido** | Array de eventos |

**TimelineItem:**

| Prop | Tipo | Descripción |
|------|------|-------------|
| `title` | `string` | Título del evento |
| `description` | `string` | Descripción opcional |
| `time` | `string` | Fecha/hora opcional |
| `icon` | `ReactNode` | Icono personalizado (reemplaza el dot numérico) |
| `color` | `Variant` | Color del dot y línea |

**Comportamiento:** Dots con índice numérico o icono. Línea conectora vertical de 2px entre dots. Cada contenido dentro de un Card. Sin JavaScript.

```tsx
<Timeline items={[
  { title: "Nace el proyecto", description: "Primer commit", time: "Ene 2024", color: "info" },
  { title: "Release v1", time: "Mar 2024" },
]} />
```

---

### EmptyState

`src/components/empty-state/EmptyState.tsx`

Estado vacío con icono, título, descripción y acción.

**Props:**

| Prop | Tipo | Default | Descripción |
|------|------|---------|-------------|
| `icon` | `ReactNode` | — | Icono grande (renderizado con `fontSize: 48px`) |
| `title` | `string` | — | Título |
| `description` | `string` | — | Descripción opcional |
| `action` | `ReactNode` | — | Acción (botón, link, etc.) |

**Comportamiento:** Centrado con flex column. Padding 3rem. El icono se renderiza dentro de un Box con `fontSize: 48px`. Sin JavaScript.

```tsx
<EmptyState
  icon={<SearchIcon />}
  title="Sin resultados"
  description="No se encontraron elementos"
  action={<Button>Crear nuevo</Button>}
/>
```

---

### Typography

`src/components/typography/Typography.tsx`

Sistema tipográfico con 10 variantes predefinidas. Renderiza el tag HTML semántico según la variante o `component`.

**Props:**

| Prop | Tipo | Default | Descripción |
|------|------|---------|-------------|
| `variant` | `TypographyVariant` | `"body1"` | Variante tipográfica |
| `component` | `ElementType` | — | Tag HTML override (ej: `component="h2"` en variant body1) |
| `gutterBottom` | `boolean` | `false` | Margen inferior de 0.5em |
| `noWrap` | `boolean` | `false` | `white-space: nowrap` + text-overflow ellipsis |
| `align` | `CSSProperties["textAlign"]` | — | Alineación de texto |
| Resto | `HTMLAttributes<HTMLElement>` | — | Atributos nativos |

**Variantes y defaults:**

| Variante | Tag | Desktop (>1024px) | Móvil (≤1024px) | Font-weight | Color |
|----------|-----|------------------|----------------|-------------|-------|
| `h1` | `<h1>` | 56px | 40px | 600 | `--text-h` |
| `h2` | `<h2>` | 32px | 28px | 600 | `--text-h` |
| `h3` | `<h3>` | 24px | 22px | 600 | `--text-h` |
| `h4` | `<h4>` | 20px | 18px | 600 | `--text-h` |
| `h5` | `<h5>` | 18px | 16px | 600 | `--text-h` |
| `h6` | `<h6>` | 16px | 15px | 600 | `--text-h` |
| `body1` | `<p>` | 18px | 16px | 400 | `--text` |
| `body2` | `<p>` | 15px | 14px | 400 | `--text` |
| `caption` | `<span>` | 13px | 12px | 400 | `--text` |
| `code` | `<code>` | 15px | 14px | 400 | `--text-h` + `--code-bg` |

```tsx
<Typography variant="h1" gutterBottom>Título principal</Typography>
<Typography variant="body1">Párrafo con texto normal.</Typography>
<Typography variant="caption" noWrap>Texto pequeño sin wrap</Typography>
<Typography variant="code">const x = 42;</Typography>
<Typography variant="h2" component="h3" align="center">H2 con tag h3 centrado</Typography>
```

---

## 5. Overlays

### Modal

`src/components/modal/Modal.tsx`

Diálogo modal con backdrop, focus trapping y cierre por Escape.

**Props:**

| Prop | Tipo | Default | Descripción |
|------|------|---------|-------------|
| `isOpen` | `boolean` | **requerido** | Visible o no |
| `onClose` | `() => void` | **requerido** | Callback al cerrar |
| `title` | `string` | — | Título del modal |
| `children` | `ReactNode` | **requerido** | Contenido |
| `size` | `ModalSize` | `"md"` | Ancho máximo |
| `footer` | `ReactNode` | — | Footer del modal |
| `closeOnOverlay` | `boolean` | `true` | Cerrar al clickear fuera |
| `showCloseButton` | `boolean` | `true` | Mostrar botón X |

**Tamaños:** `sm` (360px), `md` (500px), `lg` (680px), `xl` (900px) max-width.
**Focus trapping:** Tab y Shift+Tab ciclan entre elementos enfocables dentro del modal.
**Scroll:** Bloquea el scroll del body mientras está abierto. Calcula el ancho del scrollbar para evitar layout shift.

```tsx
<Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title="Confirmar" size="sm">
  <p>¿Estás seguro?</p>
</Modal>
```

---

### Drawer

`src/components/drawer/Drawer.tsx`

Panel lateral deslizable con overlay. `role="dialog"`, `aria-modal="true"`, `aria-labelledby` (conecta al `title`).

**Props:**

| Prop | Tipo | Default | Descripción |
|------|------|---------|-------------|
| `isOpen` | `boolean` | **requerido** | Visible o no |
| `onClose` | `() => void` | **requerido** | Callback al cerrar |
| `position` | `"left" \| "right"` | `"right"` | Lado de apertura |
| `size` | `Size` | `"md"` | Ancho |
| `title` | `string` | — | Título |
| `children` | `ReactNode` | **requerido** | Contenido |

**Tamaños:** `sm` (300px), `md` (400px), `lg` (500px) width.
**Bloqueo scroll:** Bloquea el scroll del body.
**Animación:** Slide-in desde `--slide-from` (100% o -100%).
**Focus trapping:** Tab/Shift+Tab ciclan entre elementos enfocables dentro del panel. Auto-foco en el panel al abrir. Cierre con Escape.

```tsx
<Drawer isOpen={drawerOpen} onClose={() => setDrawerOpen(false)} position="left" title="Menú">
  <nav>...</nav>
</Drawer>
```

---


### Popover

`src/components/popover/Popover.tsx`

Overlay contextual que se abre al hacer click en el trigger. Renderizado con `createPortal`.

**Props:**

| Prop | Tipo | Default | Descripción |
|------|------|---------|-------------|
| `content` | `ReactNode` | **requerido** | Contenido del popover |
| `children` | `ReactNode` | **requerido** | Elemento disparador |
| `position` | `"top" \| "bottom" \| "left" \| "right"` | `"bottom"` | Dirección del popover |

**Comportamiento:** Click en el trigger abre/cierra. Cierra con Escape o click fuera. Se reposiciona en scroll/resize. `z-index: 150`.

```tsx
<Popover content={<span>Acciones</span>}>
  <Button>Click</Button>
</Popover>
<Popover content={<span>Info extra</span>} position="right">
  <Button>Más info</Button>
</Popover>
```

---

### Alert

`src/components/alert/Alert.tsx`

Notificación toast flotante con auto-cierre y posicionamiento.

**Props:**

| Prop | Tipo | Default | Descripción |
|------|------|---------|-------------|
| `isOpen` | `boolean` | **requerido** | Visible o no |
| `onClose` | `() => void` | **requerido** | Callback al cerrar |
| `message` | `string` | **requerido** | Mensaje principal |
| `description` | `string` | — | Descripción adicional |
| `variant` | `AlertVariant` | `"info"` | Color (info/success/warning/danger) |
| `position` | `AlertPosition` | `"top-right"` | Posición en pantalla |
| `duration` | `number` | `5000` | Auto-cierre en ms (0 = sin auto) |
| `closable` | `boolean` | `true` | Mostrar botón de cerrar |

**Posiciones:** `top-right`, `top-left`, `bottom-right`, `bottom-left`. Con animación slide-in desde el lado correspondiente.
**Responsive:** En ≤480px se vuelve full-width.

```tsx
<Alert
  isOpen={alertOpen}
  onClose={() => setAlertOpen(false)}
  message="Archivo guardado"
  variant="success"
  position="bottom-right"
/>
```

---

### Tooltip

`src/components/tooltip/Tooltip.tsx`

Tooltip CSS-only con pseudo-elementos. Sin JavaScript para mostrar/ocultar.

**Props:**

| Prop | Tipo | Default | Descripción |
|------|------|---------|-------------|
| `content` | `string` | **requerido** | Texto del tooltip |
| `children` | `ReactNode` | **requerido** | Elemento disparador |
| `position` | `"top" \| "bottom" \| "left" \| "right"` | `"top"` | Dirección |

**Comportamiento:** Usa `::after` (texto) y `::before` (flecha) con `attr(data-tooltip)`. En dispositivos táctiles, aparece tras 500ms de presión sostenida. En mouse, aparece inmediatamente en hover.

```tsx
<Tooltip content="Guardar cambios" position="bottom">
  <Button iconOnly><SaveIcon /></Button>
</Tooltip>
```

---

### Loader

`src/components/loader/Loader.tsx`

Spinner circular animado con conic-gradient.

**Props:**

| Prop | Tipo | Default | Descripción |
|------|------|---------|-------------|
| `size` | `Size` | `"md"` | Tamaño |
| `variant` | `Variant` | `"default"` | Color |
| `label` | `string` | — | Texto junto al spinner |

**Tamaños:** `sm` (20px, ring 2px), `md` (32px, ring 3px), `lg` (48px, ring 4px).
**Animación:** Rotación 360° continua.

```tsx
<Loader size="lg" label="Cargando..." />
```

---

### LoaderBar

`src/components/loader/LoaderBar.tsx`

Barra de carga lineal indeterminada con slide animation.

**Props:**

| Prop | Tipo | Default | Descripción |
|------|------|---------|-------------|
| `variant` | `Variant` | `"default"` | Color |
| `className` | `string` | `""` | Clase adicional |

**Animación:** El indicador (40% width) se desliza de -40% a 100% infinitamente.

```tsx
<LoaderBar variant="info" />
```

---

### LoaderOverlay

`src/components/loader/LoaderOverlay.tsx`

Overlay full-screen con backdrop-filter y loader centrado.

**Props:**

| Prop | Tipo | Default | Descripción |
|------|------|---------|-------------|
| `isOpen` | `boolean` | **requerido** | Visible o no |
| `children` | `ReactNode` | — | Contenido personalizado (default: Loader) |
| `label` | `string` | — | Texto del loader |
| `blockScroll` | `boolean` | `true` | Bloquear scroll del body |

**z-index:** 1000 (por encima de todos los componentes).

```tsx
<LoaderOverlay isOpen={loading} label="Procesando…">
  <p>Contenido personalizado</p>
</LoaderOverlay>
```


---

### FloatingOverlays

`src/components/floating-overlays/FloatingOverlays.tsx`

**Nota:** Componente interno de la página de demostración. Compone Modal, Alert, LoaderOverlay y Drawer con estado compartido.

**Props:**

| Prop | Tipo | Descripción |
|------|------|-------------|
| `modalSmall/Medium/Large/Xl` | `boolean` + setter | Control de 4 modales de distintos tamaños |
| `overlayOpen` | `boolean` + setter | LoaderOverlay |
| `drawerOpen` + `drawerPosition` | `boolean` + `"left"|"right"` | Drawer lateral |
| `alert` | `{ open, variant, position, duration }` | Estado de la alerta |
| `showAlert` | `(variant, position, duration?) => void` | Disparar alerta |
| `onCloseAlert` | `() => void` | Cerrar alerta |

**Comportamiento:** Orquesta la visibilidad de todos los overlays de la página de demostración. No es un componente para uso directo.


---

### OnlineBanner

`src/components/online-banner/OnlineBanner.tsx`

Banner fijo full-width que indica pérdida de conexión. Auto-desaparece al reconectarse.

**Props:** Ninguna. El componente es auto-contenido.

**Comportamiento:** Usa `useOnlineStatus()` que escucha eventos `online`/`offline` + `navigator.onLine`. Cuando está offline, muestra un banner fijo en la parte superior con ícono WarningIcon y mensaje traducido (`online_banner.message`). `role="alert"`. `z-index: 101` (por encima de Navbar). Animación slideDown.

```tsx
<OnlineBanner />
```

---

### Toast

`src/components/toast/Toast.tsx`

Sistema de notificaciones stackeables con `ToastProvider` + `useToast()`.

**ToastProvider props:**

| Prop | Tipo | Default | Descripción |
|------|------|---------|-------------|
| `children` | `ReactNode` | **requerido** | App a envolver |
| `defaultPosition` | `ToastPosition` | `"top-right"` | Posición por defecto |
| `defaultDuration` | `number` | `5000` | Duración por defecto (ms, 0 = sin auto) |

**useToast() returns:**

| Método | Firma | Descripción |
|--------|-------|-------------|
| `addToast` | `(opts) => string` | Agrega toast. `opts: { message, variant?, duration?, position? }`. Retorna ID. |
| `removeToast` | `(id: string) => void` | Elimina toast con animación |

**ToastPosition:** `"top-right" | "top-left" | "bottom-right" | "bottom-left"`

**Comportamiento:** El `ToastProvider` debe envolver la app. Los toasts se agrupan por posición y se renderizan en contenedores fijos con `z-index: 300`. Cada toast tiene: ícono semántico (InfoIcon, SuccessIcon, WarningIcon, ErrorIcon), mensaje, botón de cerrar, `role="alert"`. Auto-dismiss con animación de salida (250ms). Escape cierra el último toast. `aria-live="polite"` en cada grupo.

```tsx
// En App.tsx
<ToastProvider defaultPosition="top-right">
  <App />
</ToastProvider>

// En cualquier componente hijo
const { addToast } = useToast();
<Button onClick={() => addToast({ message: "Guardado", variant: "success" })}>
  Guardar
</Button>
```

---

## 6. Navegación

### Navbar

`src/components/navbar/Navbar.tsx`

Barra de navegación superior fija con marca, enlaces y theme toggle.

**Props:** Ninguna. El componente es auto-contenido.

**Composición:** LogoWatermark (enlace a `#home`), enlace "Complementos" a `#complementos`, ThemeToggle.

```tsx
// Se usa directamente en App.tsx
<Navbar />
```

---

### Footer

`src/components/footer/Footer.tsx`

Pie de página con marca, navegación, redes sociales y contacto.

**Props:** Ninguna. El componente es auto-contenido.

**Secciones:** Logo + descripción, Navegación (Inicio, Complementos), Redes (GitHub, X, YouTube, LinkedIn con iconos), Contacto (email, ThemeToggle), copyright.

```tsx
<Footer />
```

---

### Pagination

`src/components/pagination/Pagination.tsx`

Navegación entre páginas con elipsis automática.

**Props:**

| Prop | Tipo | Default | Descripción |
|------|------|---------|-------------|
| `current` | `number` | **requerido** | Página actual |
| `total` | `number` | **requerido** | Total de páginas |
| `onChange` | `(page: number) => void` | **requerido** | Callback al cambiar |
| `siblingCount` | `number` | `1` | Número de páginas alrededor de la actual |
| `className` | `string` | `""` | Clase adicional |

**Comportamiento:** Muestra primera, última y páginas alrededor de la actual con elipsis. Flechas anteriorsiguiente con `aria-label`. Botón activo con `aria-current="page"`. Se oculta si `total < 2`. Keyboard: Enter para navegar.

```tsx
<Pagination current={page} total={10} onChange={setPage} />
```

---

### LanguageSwitcher

`src/components/language-switcher/LanguageSwitcher.tsx`

Toggle para cambiar entre español e inglés. Usa `react-i18next`.

**Props:** Ninguna. El componente es auto-contenido.

**Comportamiento:** Lee el idioma actual de `i18n.language`. Al hacer clic, alterna entre `es` y `en`, persistiendo en `localStorage("lang")`. Muestra "ES" o "EN" según el idioma actual. Envuelto en Tooltip con texto traducido. Ideal para navbar.

```tsx
<LanguageSwitcher />
```

---

## 7. Theme

### ThemeToggle

`src/components/theme-toggle/ThemeToggle.tsx`

Switch para alternar entre tema claro y oscuro.

**Props:** Ninguna. Auto-contenido.

**Comportamiento:** Lee/escribe `localStorage("theme")`. Setea `data-theme` en `<html>`. Dispara evento `themechange` en `window` para sincronizar todos los componentes. El icono muestra sol/luna según el tema activo.

```tsx
<ThemeToggle />
```

---

### LogoWatermark

`src/components/logo-watermark/LogoWatermark.tsx`

Logotipo con gradiente animado y efecto de watermark.

**Props:**

| Prop | Tipo | Default | Descripción |
|------|------|---------|-------------|
| `size` | `number` | — | Tamaño en píxeles (default definido internamente) |

**Comportamiento:** Combina imagen webp con texto con `background-clip: text` y gradiente. Escucha el evento `themechange` para refrescar el gradiente.

```tsx
<LogoWatermark size={48} />
```

---

## 8. Utilidades

### ErrorBoundary

`src/components/error-boundary/ErrorBoundary.tsx`

**Nota:** Implementado como class component (requisito de React para error boundaries).

**Props:**

| Prop | Tipo | Default | Descripción |
|------|------|---------|-------------|
| `children` | `ReactNode` | **requerido** | Componentes a envolver |
| `fallback` | `ReactNode` | — | UI de error personalizada (default: mensaje genérico con botón de recargar) |

```tsx
<ErrorBoundary fallback={<p>Algo salió mal</p>}>
  <MiComponente />
</ErrorBoundary>
```

---

### Iconos

`src/components/icons/Icons.tsx`

22 iconos SVG listos para usar. Todos comparten `IconProps`:

```ts
interface IconProps {
  size?: number;       // Tamaño en px (default específico por icono)
  className?: string;  // Clase CSS
  style?: React.CSSProperties; // Estilos inline
}
```

**Todos los iconos:**

| Icono | Default | stroke/fill | Usado en |
|-------|---------|-------------|----------|
| `MenuIcon` | 16px | stroke | Drawer menú |
| `SearchIcon` | 14px | stroke | SearchInput |
| `ClearIcon` | 10px | stroke | SearchInput, Chip |
| `EyeIcon` | 16px | stroke | PasswordInput |
| `EyeOffIcon` | 16px | stroke | PasswordInput |
| `SunIcon` | 12px | stroke | ThemeToggle |
| `MoonIcon` | 12px | stroke | ThemeToggle |
| `ChevronUpIcon` | 8px | stroke | NumberInput |
| `ChevronDownIcon` | 8px | stroke | NumberInput, Select |
| `ChevronLeftIcon` | 14px | stroke | ImageViewer |
| `ChevronRightIcon` | 8px | stroke | ImageViewer |
| `CalendarIcon` | 15px | stroke | DateInput |
| `UploadIcon` | 20px | stroke | FileInput |
| `FileIcon` | 14px | stroke | FileInput |
| `CheckIcon` | 12px | stroke | Select |
| `InfoIcon` | 18px | stroke | Alert |
| `SuccessIcon` | 18px | stroke | Alert |
| `WarningIcon` | 18px | stroke | Alert |
| `ErrorIcon` | 18px | stroke | Alert |
| `GitHubIcon` | 22px | fill | Footer |
| `TwitterIcon` | 22px | fill | Footer |
| `YouTubeIcon` | 22px | fill | Footer |
| `LinkedInIcon` | 22px | fill | Footer |
| `CloseIcon` | 14px | stroke | Modal, Drawer, Chip, Alert, FileInput, ImageViewer |

**Importación:**
```tsx
import { MenuIcon, CloseIcon } from "../components/icons"
// o
import { MenuIcon } from "./icons"  // desde components/
```

Los iconos UI usan `stroke="currentColor"` y los sociales `fill="currentColor"` — heredan el color del texto del contenedor padre.

---

## 9. Business

### TreeView

`src/components/tree-view/TreeView.tsx`

Árbol jerárquico con expand/colapse, keyboard navigation y ARIA tree.

**Props:**

| Prop | Tipo | Default | Descripción |
|------|------|---------|-------------|
| `data` | `TreeNode[]` | **requerido** | Array de nodos `{ id, label, icon?, children?, disabled? }` |
| `selectedId` | `string` | — | ID del nodo seleccionado |
| `onSelect` | `(id: string) => void` | — | Callback al seleccionar |
| `defaultExpandedIds` | `string[]` | `[]` | IDs expandidos inicialmente |
| `className` | `string` | `""` | Clase adicional |

**Comportamiento:** Usa `flattenTree()` para aplanar nodos visibles según `expandedIds`. Keyboard: ArrowDown/ArrowUp navega, ArrowRight expande, ArrowLeft colapsa, Enter/Space selecciona, Home/End va al primero/último. ARIA: `role="tree"`, `treeitem` con `aria-expanded`, `aria-selected`, `aria-disabled`, `aria-level`. Los nodos con hijos muestran un toggle ChevronRightIcon que rota 90° al expandir.

```tsx
<TreeView
  data={[
    { id: "1", label: "Documentos", children: [
      { id: "1a", label: "Proyectos", children: [
        { id: "1a1", label: "edukuk" },
        { id: "1a2", label: "playground" },
      ]},
    ]},
    { id: "2", label: "Imágenes" },
  ]}
  selectedId={selected}
  onSelect={setSelected}
/>
```

---

### VirtualizedList

`src/components/virtualized-list/VirtualizedList.tsx`

Lista con renderizado virtualizado. Solo renderiza los items visibles + overscan, ideal para listas largas (1000+ items).

**Props:**

| Prop | Tipo | Default | Descripción |
|------|------|---------|-------------|
| `items` | `T[]` | **requerido** | Array de datos |
| `itemHeight` | `number` | **requerido** | Altura fija de cada item (px) |
| `renderItem` | `(item: T, index: number) => ReactNode` | **requerido** | Render de cada item |
| `height` | `number` | `400` | Altura del contenedor (px) |
| `overscan` | `number` | `3` | Items extras arriba/abajo del viewport |
| `className` | `string` | `""` | Clase adicional |
| `style` | `CSSProperties` | — | Estilos inline |

**Comportamiento:** Calcula `startIdx`/`endIdx` según `scrollTop` + `height` + `overscan`. Renderiza items con `position: absolute` y `top: i * itemHeight`. Scroll listener pasivo. Contenedor con `overflow-y: auto`. Sin dependencias externas.

```tsx
<VirtualizedList
  items={items}
  itemHeight={50}
  height={400}
  renderItem={(item, i) => <div>Item {i}: {item.name}</div>}
/>
```

---

### CommandPalette

`src/components/command-palette/CommandPalette.tsx`

Paleta de comandos tipo Ctrl+K con búsqueda, agrupación y shortcuts.

**Props:**

| Prop | Tipo | Default | Descripción |
|------|------|---------|-------------|
| `isOpen` | `boolean` | **requerido** | Visible o no |
| `onClose` | `() => void` | **requerido** | Callback al cerrar |
| `groups` | `CommandGroup[]` | **requerido** | Grupos de comandos |
| `onExecute` | `(id: string) => void` | — | Callback al ejecutar |

**CommandGroup:** `{ heading: string; items: Command[] }`

**Command:**

| Prop | Tipo | Descripción |
|------|------|-------------|
| `id` | `string` | Identificador único |
| `label` | `string` | Texto visible |
| `description` | `string` | Descripción opcional |
| `icon` | `ReactNode` | Icono opcional |
| `shortcut` | `string` | Shortcut (ej: "Ctrl+K") |
| `category` | `string` | Categoría (no usado visualmente) |

**Comportamiento:** Overlay modal con `z-index: 200`. Input con `role="combobox"`. Filtrado case-insensitive por label + description. ArrowDown/ArrowUp navega, Enter ejecuta, Escape cierra. `useBodyScrollLock`, `useFocusTrap`, `useClickOutside`. Muestra grupos con headings y shortcuts como `<kbd>`. Animación slideDown + fadeIn.

```tsx
<CommandPalette
  isOpen={open}
  onClose={() => setOpen(false)}
  groups={[
    {
      heading: "Navegación",
      items: [
        { id: "home", label: "Ir a Inicio", icon: <HomeIcon />, shortcut: "Ctrl+1" },
        { id: "complementos", label: "Ir a Complementos", icon: <GridIcon />, shortcut: "Ctrl+2" },
      ],
    },
  ]}
  onExecute={(id) => console.log("Ejecutar:", id)}
/>
```

---

## CSS variables del sistema

```css
/* Colores (cambian con data-theme) */
--text           /* Texto secundario */
--text-h         /* Texto principal (high emphasis) */
--bg             /* Fondo de página */
--card-bg        /* Fondo de cards, modales, drawers */
--border         /* Bordes generales */
--card-border    /* Bordes de cards (más visibles) */
--code-bg        /* Fondo de código */
--accent         /* Color de acento principal */
--accent-bg      /* Fondo de acento (hover, etc.) */
--accent-border  /* Borde de acento */
--info, --success, --warning, --danger  /* Colores semánticos */
--meter-bg       /* Fondo de track (Meter, Progress, RangeInput) */
--meter-value    /* Color de relleno (Meter) */
--gradient-end   /* Color secundario del gradiente del logo */
--shadow         /* Sombra de cards */
--skeleton       /* Fondo base de skeleton */
--skeleton-shine /* Destello del shimmer */
```

```css
/* Tipografía */
--sans: "Inter", system-ui, sans-serif;
--heading: "Inter", system-ui, sans-serif;
--mono: ui-monospace, Consolas, monospace;
```

```css
/* Z-index ladder */
Navbar              100
Tooltip             100
OnlineBanner        101
Select              150
Autocomplete        150
Popover             150
Modal overlay       200
Drawer overlay      250
Drawer panel        260
Alert               300
ImageViewer         300
LoaderOverlay      1000
```

```css
/* Border radius */
Cards / Box       16px
Imágenes, inputs  12px
Varios             8px
Chips / Badges  9999px
```

```css
/* Breakpoints (useMediaQuery hook) */
sm:  640px
md:  768px
lg: 1024px
xl: 1280px
```


