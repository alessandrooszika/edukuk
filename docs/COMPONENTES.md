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
| `CloseIcon` | 14px | stroke | Modal, Drawer, Chip, Alert, FileInput |

**Importación:**
```tsx
import { MenuIcon, CloseIcon } from "../components/icons"
// o
import { MenuIcon } from "./icons"  // desde components/
```

Los iconos UI usan `stroke="currentColor"` y los sociales `fill="currentColor"` — heredan el color del texto del contenedor padre.

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
Select              150
Autocomplete        150
Popover             150
Modal overlay       200
Drawer overlay      250
Drawer panel        260
Alert               300
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



