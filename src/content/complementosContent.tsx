/* eslint-disable react-refresh/only-export-components */
import { useState } from "react";
import type { AlertVariant, AlertPosition } from "../types";
import { Box } from "../components/box/Box";
import { Typography } from "../components/typography";
import { Card, CardHeader, CardBody, CardFooter } from "../components/card";
import { Image } from "../components/image/Image";
import { Meter } from "../components/meter/Meter";
import { Accordion } from "../components/accordion/Accordion";
import { Breadcrumbs } from "../components/breadcrumbs";
import { Button } from "../components/button/Button";
import { ThemeToggle } from "../components/theme-toggle/ThemeToggle";
import { LogoWatermark } from "../components/logo-watermark/LogoWatermark";
import { Tooltip } from "../components/tooltip/Tooltip";
import { Input } from "../components/input";
import { Autocomplete } from "../components/autocomplete";
import { Select } from "../components/select";
import { Badge } from "../components/badge";
import { Chip } from "../components/chip";
import { Switch } from "../components/switch";
import { Textarea } from "../components/textarea";
import { Progress } from "../components/progress";
import { Skeleton } from "../components/skeleton";
import { Tabs } from "../components/tabs";
import { Popover } from "../components/popover";
import { Pagination } from "../components/pagination";
import cardStyles from "../components/card/Card.module.css";
import { PasswordInput } from "../components/password-input";
import { SearchInput } from "../components/search-input";
import { NumberInput } from "../components/number-input";
import { DateInput } from "../components/date-input";
import { ColorInput } from "../components/color-input";
import { RangeInput } from "../components/range-input";
import { FileInput } from "../components/file-input";
import { Loader, LoaderBar } from "../components/loader";
import { Divider } from "../components/divider";
import { Stepper } from "../components/stepper";
import { Table } from "../components/table";
import { AspectRatio } from "../components/aspect-ratio";
import { Avatar } from "../components/avatar";
import { Rating } from "../components/rating";
import { Timeline } from "../components/timeline";
import { EmptyState } from "../components/empty-state";
import { Stack, HStack, VStack } from "../components/stack";
import { FormField } from "../components/form-field";
import { FormGroup } from "../components/form-group";
import { DataTable } from "../components/data-table";
import type { Column as DataColumn } from "../components/data-table";
import {
  MenuIcon, SearchIcon, ClearIcon, EyeIcon, EyeOffIcon,
  SunIcon, MoonIcon, ChevronUpIcon, ChevronDownIcon,
  CalendarIcon, UploadIcon, FileIcon, CheckIcon,
  InfoIcon, SuccessIcon, WarningIcon, ErrorIcon,
  GitHubIcon, TwitterIcon, YouTubeIcon, LinkedInIcon, CloseIcon,
} from "../components/icons";
import { misHabilidades } from "../data/skills";

export const categories = [
  { id: "overview", label: "Overview" },
  { id: "buttons", label: "Buttons" },
  { id: "inputs", label: "Inputs" },
  { id: "layout", label: "Layout" },
  { id: "display", label: "Display" },
  { id: "theme", label: "Theme" },
  { id: "icons", label: "Icons" },
  { id: "overlays", label: "Overlays" },
] as const;

export type CategoryId = (typeof categories)[number]["id"];

/* ---------- Overview ---------- */
export function renderOverviewSection() {
  return (
    <Box display="grid" gridTemplateColumns="1fr" gap="1.5rem" alignItems="start" width="100%" textAlign="left">
      <Card>
        <CardHeader>
          <Typography variant="h3" gutterBottom>Complementos 🧩</Typography>
        </CardHeader>
        <CardBody>
          <Typography variant="body2">
            Esta página reúne todos los componentes UI del proyecto. Cada sección
            muestra un grupo de componentes con sus props, variantes y ejemplos
            de uso. Navegá por las categorías para explorar botones, inputs,
            layouts, displays y overlays.
          </Typography>
        </CardBody>
      </Card>
    </Box>
  );
}

/* ---------- Buttons ---------- */
export function renderButtonsSection(bs: Record<string, string>) {
  return (
    <Box display="grid" gridTemplateColumns="1fr" gap="1.5rem" alignItems="start" width="100%" textAlign="left">
      <Card>
        <CardHeader>
          <Typography variant="h3" gutterBottom>Button 🎛️</Typography>
        </CardHeader>
        <CardBody>
          <Box display="flex" gap="0.5rem" flexWrap="wrap">
            <Button variant="default">Default</Button>
            <Button variant="info">Info</Button>
            <Button variant="success">Success</Button>
            <Button variant="warning">Warning</Button>
            <Button variant="danger">Danger</Button>
          </Box>
        </CardBody>
        <CardFooter>
          <figure className={bs.figure}>
            <Typography variant="caption" component="figcaption" className={bs.figcaption}>
              &#x1f4a1; <strong>Button</strong> acepta{" "}
              <code>variant="default | info | success | warning | danger"</code>{" "}
              para cambiar color de texto, borde y hover.
            </Typography>
          </figure>
        </CardFooter>
      </Card>
      <Card>
        <CardHeader>
          <Typography variant="h3" gutterBottom>Tooltip 💬</Typography>
        </CardHeader>
        <CardBody>
          <Box display="flex" gap="1rem" alignItems="center" justifyContent="center">
            <Tooltip content="Hola, soy un tooltip">
              <Button variant="info">Hover me</Button>
            </Tooltip>
            <Tooltip content="CSS ::after con attr(data-tooltip)">
              <Typography variant="body2" component="span">&#x1f446; Pasa el mouse</Typography>
            </Tooltip>
          </Box>
        </CardBody>
        <CardFooter>
          <figure className={bs.figure}>
            <Typography variant="caption" component="figcaption" className={bs.figcaption}>
              &#x1f4a1; <strong>Tooltip</strong> es CSS-only: usa{" "}
              <code>::after</code> + <code>attr(data-tooltip)</code>.
              Fondo y color se adaptan al tema vía <code>--text-h</code>{" "}
              y <code>--bg</code>.
            </Typography>
          </figure>
        </CardFooter>
      </Card>
    </Box>
  );
}

/* ---------- Inputs ---------- */
interface InputsState {
  inputValue: string; setInputValue: (v: string) => void;
  autocompleteValue: string; setAutocompleteValue: (v: string) => void;
  selectValue: string; setSelectValue: (v: string) => void;
  selectFramework: string; setSelectFramework: (v: string) => void;
  selectSm: string; setSelectSm: (v: string) => void;
  selectMd: string; setSelectMd: (v: string) => void;
  selectLg: string; setSelectLg: (v: string) => void;
  textareaValue: string; setTextareaValue: (v: string) => void;
  passwordValue: string; setPasswordValue: (v: string) => void;
  searchValue: string; setSearchValue: (v: string) => void;
  numberValue: number; setNumberValue: (v: number) => void;
  dateValue: string; setDateValue: (v: string) => void;
  colorValue: string; setColorValue: (v: string) => void;
  rangeValue: number; setRangeValue: (v: number) => void;
}

export function renderInputsSection(st: InputsState, bs: Record<string, string>) {
  return (
    <Box display="grid" gridTemplateColumns="1fr" gap="1.5rem" alignItems="start" width="100%" textAlign="left">
      <Card>
        <CardHeader>
          <Typography variant="h3" gutterBottom>Input ⌨️</Typography>
        </CardHeader>
        <CardBody>
          <Input value={st.inputValue} onChange={(e) => st.setInputValue(e.target.value)} placeholder="Escribe algo..." label="Input base" />
          <Box display="flex" gap="0.5rem" flexWrap="wrap">
            <Input value="" onChange={() => {}} placeholder="sm" size="sm" />
            <Input value="" onChange={() => {}} placeholder="md" size="md" />
            <Input value="" onChange={() => {}} placeholder="lg" size="lg" />
          </Box>
          <Box display="flex" gap="0.5rem" flexWrap="wrap">
            <Input value="" onChange={() => {}} placeholder="Info" variant="info" />
            <Input value="" onChange={() => {}} placeholder="Success" variant="success" />
            <Input value="" onChange={() => {}} placeholder="Warning" variant="warning" />
            <Input value="" onChange={() => {}} placeholder="Danger" variant="danger" />
          </Box>
          <Input value="" onChange={() => {}} placeholder="Con error..." error="Este campo es obligatorio" />
          <Box display="flex" gap="0.5rem" flexWrap="wrap">
            <Input value="" onChange={() => {}} label="Outlined" placeholder="default" />
            <Input value="" onChange={() => {}} design="filled" label="Filled" placeholder="relleno" />
            <Input value="" onChange={() => {}} design="standard" label="Standard" placeholder="linea" />
          </Box>
        </CardBody>
        <CardFooter>
          <figure className={bs.figure}>
            <Typography variant="caption" component="figcaption" className={bs.figcaption}>
              &#x1f4a1; <strong>Input</strong> base reutilizable con <code>variant</code>,{" "}
              <code>size</code>, <code>label</code>, <code>error</code>, <code>design</code>. Usa
              las mismas variables semánticas que Button.
            </Typography>
          </figure>
        </CardFooter>
      </Card>
      <Card>
        <CardHeader>
          <Typography variant="h3" gutterBottom>Autocomplete 🔍</Typography>
        </CardHeader>
        <CardBody>
          <Autocomplete value={st.autocompleteValue} onChange={st.setAutocompleteValue}
            options={["JavaScript", "TypeScript", "Python", "Java", "C#", "Ruby", "Go", "Rust", "Kotlin", "Swift", "PHP", "HTML", "CSS", "React", "Vue"]}
            placeholder="Busca un lenguaje..." label="Lenguajes de programación" />
        </CardBody>
        <CardFooter>
          <figure className={bs.figure}>
            <Typography variant="caption" component="figcaption" className={bs.figcaption}>
              &#x1f4a1; <strong>Autocomplete</strong> usa{" "}
              <code>&lt;Input&gt;</code> + <code>&lt;datalist&gt;</code>{" "}
              nativo. Sin JavaScript para el filtrado — accesible y mobile-friendly.
            </Typography>
          </figure>
        </CardFooter>
      </Card>
      <Card>
        <CardHeader>
          <Typography variant="h3" gutterBottom>Select ▼</Typography>
        </CardHeader>
        <CardBody>
          <Box display="flex" gap="0.5rem" flexWrap="wrap" justifyContent="center">
            <Select options={["React", "Vue", "Svelte", "Angular", "Solid"]} value={st.selectFramework} onChange={st.setSelectFramework} placeholder="Elegí un framework..." label="Framework favorito" />
          </Box>
          <Box display="flex" gap="1rem" alignItems="center" justifyContent="center" mb="1rem">
            <Select options={["Opción A", "Opción B", "Opción C"]} value={st.selectValue} onChange={st.setSelectValue} placeholder="Normal" />
            <Select options={["Info", "Success", "Warning", "Danger"]} value={st.selectValue} onChange={st.setSelectValue} variant="info" placeholder="Info" />
          </Box>
          <Box display="flex" gap="1rem" alignItems="center" justifyContent="center" mb="1rem">
            <Select options={["Error"]} value={st.selectSm} onChange={st.setSelectSm} size="sm" placeholder="sm" />
            <Select options={["Error"]} value={st.selectMd} onChange={st.setSelectMd} placeholder="md" />
            <Select options={["Error"]} value={st.selectLg} onChange={st.setSelectLg} size="lg" placeholder="lg" />
          </Box>
        </CardBody>
        <CardFooter>
          <figure className={bs.figure}>
            <Typography variant="caption" component="figcaption" className={bs.figcaption}>
              &#x1f4a1; <strong>Select</strong> dropdown personalizado con{" "}
              <code>variant</code>, <code>size</code>, <code>label</code>,{" "}
              <code>error</code>, <code>disabled</code>. Keyboard: Enter/Esc,
              flechas. Opciones seleccionada con checkmark.
            </Typography>
          </figure>
        </CardFooter>
      </Card>
      <Card>
        <CardHeader>
          <Typography variant="h3" gutterBottom>Textarea 📝</Typography>
        </CardHeader>
        <CardBody>
          <Textarea value={st.textareaValue} onChange={(e) => st.setTextareaValue(e.target.value)} placeholder="Escribí algo..." label="Descripción" />
          <Box display="flex" gap="0.5rem" flexWrap="wrap">
            <Textarea value="" onChange={() => {}} placeholder="sm" size="sm" />
            <Textarea value="" onChange={() => {}} placeholder="md" size="md" />
            <Textarea value="" onChange={() => {}} placeholder="lg" size="lg" />
          </Box>
          <Box display="flex" gap="0.5rem" flexWrap="wrap">
            <Textarea value="" onChange={() => {}} placeholder="Info" variant="info" />
            <Textarea value="" onChange={() => {}} placeholder="Success" variant="success" />
          </Box>
          <Textarea value="" onChange={() => {}} placeholder="Con error..." error="Este campo es obligatorio" />
        </CardBody>
        <CardFooter>
          <figure className={bs.figure}>
            <Typography variant="caption" component="figcaption" className={bs.figcaption}>
              &#x1f4a1; <strong>Textarea</strong> multilínea con misma API que Input.{" "}
              <code>variant</code>, <code>size</code>, <code>label</code>,{" "}
              <code>error</code>, <code>rows</code>.
            </Typography>
          </figure>
        </CardFooter>
      </Card>
      <Card>
        <CardHeader>
          <Typography variant="h3" gutterBottom>PasswordInput 🔐</Typography>
        </CardHeader>
        <CardBody>
          <PasswordInput value={st.passwordValue} onChange={(e) => st.setPasswordValue(e.target.value)} placeholder="Ingresá tu contraseña..." label="Contraseña" />
          <Box display="flex" gap="0.5rem" flexWrap="wrap">
            <PasswordInput value="" onChange={() => {}} placeholder="sm" size="sm" />
            <PasswordInput value="" onChange={() => {}} placeholder="md" size="md" />
            <PasswordInput value="" onChange={() => {}} placeholder="lg" size="lg" />
          </Box>
          <PasswordInput value="" onChange={() => {}} placeholder="Con error..." error="Contraseña inválida" />
        </CardBody>
        <CardFooter>
          <figure className={bs.figure}>
            <Typography variant="caption" component="figcaption" className={bs.figcaption}>
              &#x1f4a1; <strong>PasswordInput</strong> con toggle show/hide.{" "}
              <code>variant</code>, <code>size</code>, <code>label</code>, <code>error</code>.
            </Typography>
          </figure>
        </CardFooter>
      </Card>
      <Card>
        <CardHeader>
          <Typography variant="h3" gutterBottom>SearchInput 🔍</Typography>
        </CardHeader>
        <CardBody>
          <SearchInput value={st.searchValue} onChange={(e) => st.setSearchValue(e.target.value)} onClear={() => st.setSearchValue("")} placeholder="Buscar..." label="Buscar" />
          <Box display="flex" gap="0.5rem" flexWrap="wrap">
            <SearchInput value="" onChange={() => {}} placeholder="sm" size="sm" />
            <SearchInput value="" onChange={() => {}} placeholder="md" size="md" />
            <SearchInput value="" onChange={() => {}} placeholder="lg" size="lg" />
          </Box>
          <Box display="flex" gap="0.5rem" flexWrap="wrap">
            <SearchInput value="Con valor" onChange={() => {}} placeholder="..." />
          </Box>
        </CardBody>
        <CardFooter>
          <figure className={bs.figure}>
            <Typography variant="caption" component="figcaption" className={bs.figcaption}>
              &#x1f4a1; <strong>SearchInput</strong> con lupa SVG a la izquierda y botón X
              para limpiar. <code>onClear</code> para manejo externo.
            </Typography>
          </figure>
        </CardFooter>
      </Card>
      <Card>
        <CardHeader>
          <Typography variant="h3" gutterBottom>NumberInput 🔢</Typography>
        </CardHeader>
        <CardBody>
          <NumberInput value={st.numberValue} onChange={(e) => st.setNumberValue(Number(e.target.value))} label="Cantidad" min={0} max={100} />
          <Box display="flex" gap="0.5rem" flexWrap="wrap">
            <NumberInput value={0} onChange={() => {}} placeholder="sm" size="sm" min={0} />
            <NumberInput value={0} onChange={() => {}} placeholder="md" size="md" min={0} />
            <NumberInput value={0} onChange={() => {}} placeholder="lg" size="lg" min={0} />
          </Box>
          <Box display="flex" gap="0.5rem" flexWrap="wrap">
            <NumberInput value={0} onChange={() => {}} min={0} variant="info" />
            <NumberInput value={0} onChange={() => {}} min={0} variant="success" />
            <NumberInput value={0} onChange={() => {}} min={0} variant="danger" />
          </Box>
        </CardBody>
        <CardFooter>
          <figure className={bs.figure}>
            <Typography variant="caption" component="figcaption" className={bs.figcaption}>
              &#x1f4a1; <strong>NumberInput</strong> con steppers ▲▼. Spinners nativos ocultos.{" "}
              <code>min</code>, <code>max</code>, <code>step</code>. Clamp en blur.
            </Typography>
          </figure>
        </CardFooter>
      </Card>
      <Card>
        <CardHeader>
          <Typography variant="h3" gutterBottom>DateInput 📅</Typography>
        </CardHeader>
        <CardBody>
          <DateInput value={st.dateValue} onChange={(e) => st.setDateValue(e.target.value)} label="Fecha" />
          <Box display="flex" gap="0.5rem" flexWrap="wrap">
            <DateInput value="" onChange={() => {}} size="sm" />
            <DateInput value="" onChange={() => {}} size="md" />
            <DateInput value="" onChange={() => {}} size="lg" />
          </Box>
        </CardBody>
        <CardFooter>
          <figure className={bs.figure}>
            <Typography variant="caption" component="figcaption" className={bs.figcaption}>
              &#x1f4a1; <strong>DateInput</strong> usa el date picker nativo del browser.{" "}
              Icono calendario decorativo. <code>min</code>, <code>max</code>.
            </Typography>
          </figure>
        </CardFooter>
      </Card>
      <Card>
        <CardHeader>
          <Typography variant="h3" gutterBottom>ColorInput 🎨</Typography>
        </CardHeader>
        <CardBody>
          <ColorInput value={st.colorValue} onChange={(e) => st.setColorValue(e.target.value)} label="Color favorito" />
          <Box display="flex" gap="0.5rem" flexWrap="wrap">
            <ColorInput value="#ef4444" onChange={() => {}} size="sm" />
            <ColorInput value="#22c55e" onChange={() => {}} size="md" />
            <ColorInput value="#3b82f6" onChange={() => {}} size="lg" />
          </Box>
          <Box display="flex" gap="0.5rem" flexWrap="wrap">
            <ColorInput value="#f472b6" onChange={() => {}} variant="info" />
            <ColorInput value="#eab308" onChange={() => {}} variant="success" />
            <ColorInput value="#a855f7" onChange={() => {}} variant="danger" />
          </Box>
        </CardBody>
        <CardFooter>
          <figure className={bs.figure}>
            <Typography variant="caption" component="figcaption" className={bs.figcaption}>
              &#x1f4a1; <strong>ColorInput</strong> swatch + hex display. Click abre el
              color picker nativo. <code>variant</code>, <code>size</code>.
            </Typography>
          </figure>
        </CardFooter>
      </Card>
      <Card>
        <CardHeader>
          <Typography variant="h3" gutterBottom>RangeInput 🎚️</Typography>
        </CardHeader>
        <CardBody>
          <RangeInput value={st.rangeValue} onChange={(e) => st.setRangeValue(Number(e.target.value))} label="Volumen" showValue min={0} max={100} />
          <Box display="flex" flexDirection="column" gap="0.5rem">
            <RangeInput value={30} onChange={() => {}} size="sm" label="sm" />
            <RangeInput value={60} onChange={() => {}} size="md" label="md" />
            <RangeInput value={85} onChange={() => {}} size="lg" label="lg" />
          </Box>
          <Box display="flex" flexDirection="column" gap="0.5rem">
            <RangeInput value={40} onChange={() => {}} variant="info" />
            <RangeInput value={70} onChange={() => {}} variant="success" />
            <RangeInput value={20} onChange={() => {}} variant="warning" />
            <RangeInput value={90} onChange={() => {}} variant="danger" />
          </Box>
        </CardBody>
        <CardFooter>
          <figure className={bs.figure}>
            <Typography variant="caption" component="figcaption" className={bs.figcaption}>
              &#x1f4a1; <strong>RangeInput</strong> slider custom con track+fill+thumb.{" "}
              <code>variant</code>, <code>size</code>, <code>showValue</code>,{" "}
              <code>min</code>, <code>max</code>, <code>step</code>.
            </Typography>
          </figure>
        </CardFooter>
      </Card>
      <Card>
        <CardHeader>
          <Typography variant="h3" gutterBottom>FileInput 📎</Typography>
        </CardHeader>
        <CardBody>
          <FileInput label="Subí un archivo" accept=".pdf,.jpg,.png" onChange={(files) => console.log("Archivos:", files)} />
          <Box display="flex" gap="0.5rem" flexWrap="wrap" justifyContent="center">
            <Box style={{ flex: 1 }}>
              <FileInput label="Múltiples archivos" multiple onChange={() => {}}>
                <Typography variant="body2" component="span">
                  <strong style={{ color: "var(--accent)" }}>Arrastrá</strong> varios archivos o hacé clic
                </Typography>
              </FileInput>
            </Box>
          </Box>
        </CardBody>
        <CardFooter>
          <figure className={bs.figure}>
            <Typography variant="caption" component="figcaption" className={bs.figcaption}>
              &#x1f4a1; <strong>FileInput</strong> drop zone con drag & drop.{" "}
              <code>accept</code>, <code>multiple</code>. Muestra nombre y tamaño. Botón X para remover.
            </Typography>
          </figure>
        </CardFooter>
      </Card>
      <Card>
        <CardHeader>
          <Typography variant="h3" gutterBottom>FormField + FormGroup 📋</Typography>
        </CardHeader>
        <CardBody>
          <FormGroup legend="Datos de contacto">
            <FormField label="Nombre" htmlFor="ff-name" helperText="Nombre y apellido">
              <Input id="ff-name" placeholder="Ej: Juan Pérez" />
            </FormField>
            <FormField label="Email" htmlFor="ff-email" error="Email inválido">
              <Input id="ff-email" value="mal-formato" onChange={() => {}} error="Email inválido" hideErrorText />
            </FormField>
            <FormField label="País" htmlFor="ff-country" required>
              <Input id="ff-country" placeholder="Argentina" />
            </FormField>
            <FormField label="Comentarios" helperText="Máx. 500 caracteres">
              <Textarea placeholder="Escribí algo..." />
            </FormField>
          </FormGroup>
        </CardBody>
        <CardFooter>
          <figure className={bs.figure}>
            <Typography variant="caption" component="figcaption" className={bs.figcaption}>
              &#x1f4a1; <strong>FormField</strong> envuelve inputs con <code>label</code>, <code>error</code>,
              <code>helperText</code>, <code>required</code>. <strong>FormGroup</strong> agrupa campos con <code>legend</code>.
              Compatible con React Hook Form (<code>src/content/react-hook-form.md</code>).
            </Typography>
          </figure>
        </CardFooter>
      </Card>
    </Box>
  );
}

/* ---------- Layout ---------- */
export function renderLayoutSection(s: Record<string, string>, bs: Record<string, string>) {
  return (
    <Box display="grid" gridTemplateColumns="1fr" gap="1.5rem" alignItems="start" width="100%" textAlign="left">
      <Card>
        <CardHeader>
          <Typography variant="h3" gutterBottom>Box 📦</Typography>
        </CardHeader>
        <CardBody>
          <Box>Este es un Box — un div con estilos base</Box>
          <Box display="flex" justifyContent="center" p={12} mt="0.5rem">
            <Typography variant="body2" component="span">Box extiende las props nativas de <code>&lt;div&gt;</code></Typography>
          </Box>
        </CardBody>
        <CardFooter>
          <figure className={bs.figure}>
            <Typography variant="caption" component="figcaption" className={bs.figcaption}>
              &#x1f4a1; <strong>Box</strong> aplica <code>--card-bg</code>, <code>border-radius: 16px</code>,{' '}
              <code>border</code>, <code>box-shadow</code> y <code>padding: 20px</code>.
              Acepta todas las props de un <code>&lt;div&gt;</code> nativo vía <code>ComponentPropsWithoutRef&lt;"div"&gt;</code>.
            </Typography>
          </figure>
        </CardFooter>
      </Card>
      <Card>
        <CardHeader>
          <Typography variant="h3" gutterBottom>Card 🃏</Typography>
        </CardHeader>
        <CardBody>
          <Card>
            <Typography variant="body1">Un Card puede contener cualquier contenido.</Typography>
          </Card>
          <Card>
            <Typography variant="h4">Título</Typography>
            <Typography variant="body1">Cuerpo del card con múltiples elementos.</Typography>
          </Card>
        </CardBody>
        <CardFooter>
          <figure className={bs.figure}>
            <Typography variant="caption" component="figcaption" className={bs.figcaption}>
              &#x1f4a1; <strong>Card</strong> compone <strong>Box</strong> y agrega{' '}
              <code>flex-direction: column</code>, <code>gap: 1rem</code>,{' '}
              <code>overflow: hidden</code> y efecto hover con elevación. Prop:{' '}
              <code>children: ReactNode</code>.
            </Typography>
          </figure>
        </CardFooter>
      </Card>
      <Card>
        <CardHeader>
          <Typography variant="h3" gutterBottom>Image 🖼️</Typography>
        </CardHeader>
        <CardBody>
          <Image src="/src/assets/html-code-image.webp" alt="Ejemplo sin caption"
            style={{ width: "100%", height: 192, objectFit: "cover", borderRadius: 12 }} />
          <Image src="/src/assets/css-code-image.webp" alt="Ejemplo con caption"
            caption="Imagen con caption descriptivo debajo"
            style={{ width: "100%", height: 192, objectFit: "cover", borderRadius: 12 }} />
        </CardBody>
        <CardFooter>
          <figure className={bs.figure}>
            <Typography variant="caption" component="figcaption" className={bs.figcaption}>
              &#x1f4a1; <strong>Image</strong> extiende <code>&lt;img&gt;</code> nativo ({' '}
              <code>Omit&lt;ComponentPropsWithoutRef&lt;"img"&gt;, "children"&gt;</code>
              ). Prop adicional: <code>caption?: string</code>. Si se provee, renderiza un{' '}
              <code>&lt;figcaption&gt;</code> debajo.
            </Typography>
          </figure>
        </CardFooter>
      </Card>
      <Card>
        <CardHeader>
          <Typography variant="h3" gutterBottom>Meter 📊</Typography>
        </CardHeader>
        <CardBody>
          <Box display="flex" flexDirection="column" gap="1rem">
            {misHabilidades.map((skill) => (
              <Box key={skill.name} display="flex" flexDirection="column" gap="0.25rem">
                <Box display="flex" justifyContent="space-between" alignItems="center">
                  <span className={s.skillName}>{skill.name}</span>
                  <span className={s.skillValue}>{skill.value}%</span>
                </Box>
                <Meter value={skill.value} min={0} max={100} />
              </Box>
            ))}
          </Box>
        </CardBody>
        <CardFooter>
          <figure className={bs.figure}>
            <Typography variant="caption" component="figcaption" className={bs.figcaption}>
              &#x1f4a1; <strong>Meter</strong> renderiza un <code>&lt;meter&gt;</code> nativo.
              Props: <code>value</code> (number, requerido), <code>min</code> (default 0),{' '}
              <code>max</code> (default 1). Los valores de ejemplo usan <code>min=0 max=100</code>.
            </Typography>
          </figure>
        </CardFooter>
      </Card>
      <Card>
        <CardHeader>
          <Typography variant="h3" gutterBottom>Accordion 📑</Typography>
        </CardHeader>
        <CardBody>
          <Accordion items={[
            { question: "¿Qué es Accordion?", answer: "Un componente que muestra contenido expandible usando details/summary nativos." },
            { question: "¿Qué props acepta?", answer: "Acepta items: AccordionItem[]. Cada item tiene question: string y answer: string." },
            { question: "¿Es accesible?", answer: "Sí, usa elementos HTML nativos que soportan navegación por teclado y lectores de pantalla." },
          ]} />
        </CardBody>
        <CardFooter>
          <figure className={bs.figure}>
            <Typography variant="caption" component="figcaption" className={bs.figcaption}>
              &#x1f4a1; <strong>Accordion</strong> recibe <code>items: AccordionItem[]</code>.{' '}
              Cada <code>AccordionItem</code>: <code>{'{ question: string; answer: string }'}</code>.
              Usa <code>&lt;details&gt;</code> / <code>&lt;summary&gt;</code> nativos del navegador.
            </Typography>
          </figure>
        </CardFooter>
      </Card>
      <Card>
        <CardHeader>
          <Typography variant="h3" gutterBottom>Breadcrumbs 🍞</Typography>
        </CardHeader>
        <CardBody>
          <Breadcrumbs items={[
            { label: "Inicio", href: "#home" },
            { label: "Componentes", href: "#complementos" },
            { label: "Layout" },
          ]} />
        </CardBody>
        <CardFooter>
          <figure className={bs.figure}>
            <Typography variant="caption" component="figcaption" className={bs.figcaption}>
              &#x1f4a1; <strong>Breadcrumbs</strong> navegación de ruta con{" "}
              <code>&lt;nav&gt;</code> + <code>aria-label="breadcrumb"</code>.{" "}
              Último ítem con <code>aria-current="page"</code>.{" "}
              <code>separator</code> personalizable (default "/").
            </Typography>
          </figure>
        </CardFooter>
      </Card>
      <PaginationDemo />
      <Card>
        <CardHeader>
          <Typography variant="h3" gutterBottom>Divider ➖</Typography>
        </CardHeader>
        <CardBody>
          <Box display="flex" flexDirection="column" gap="1rem">
            <Typography variant="body2">Horizontal</Typography>
            <Divider />
            <Divider size="md" />
            <Divider size="lg" variant="info" />
            <Divider label="Con texto" />
            <Divider label="Info" variant="info" size="md" />
            <Typography variant="body2">Vertical</Typography>
            <Box display="flex" gap="1rem" style={{ height: 60 }} alignItems="center">
              <span>Izquierda</span>
              <Divider orientation="vertical" />
              <span>Centro</span>
              <Divider orientation="vertical" size="md" variant="danger" />
              <span>Derecha</span>
            </Box>
          </Box>
        </CardBody>
        <CardFooter>
          <figure className={cardStyles.figure}>
            <Typography variant="caption" component="figcaption" className={cardStyles.figcaption}>
              &#x1f4a1; <strong>Divider</strong> separador horizontal (<code>hr</code>) o vertical (<code>span</code>).
              <code>orientation</code> (horizontal/vertical), <code>size</code>, <code>variant</code>,
              <code>label</code> (texto centrado en modo horizontal).
            </Typography>
          </figure>
        </CardFooter>
      </Card>
      <Card>
        <CardHeader>
          <Typography variant="h3" gutterBottom>Stepper 👣</Typography>
        </CardHeader>
        <CardBody>
          <Box display="flex" flexDirection="column" gap="1.5rem">
            <Typography variant="body2">Horizontal (paso 2 de 4)</Typography>
            <Stepper steps={["Carrito", "Pago", "Envío", "Confirmación"]} activeStep={2} />
            <Typography variant="body2">Vertical (paso 1 de 3)</Typography>
            <Stepper steps={["Registro", "Verificación", "Bienvenida"]} activeStep={1} orientation="vertical" />
            <Typography variant="body2">Con alternativeLabel (paso 0)</Typography>
            <Stepper steps={["Paso 1", "Paso 2", "Paso 3"]} activeStep={0} alternativeLabel />
          </Box>
        </CardBody>
        <CardFooter>
          <figure className={cardStyles.figure}>
            <Typography variant="caption" component="figcaption" className={cardStyles.figcaption}>
              &#x1f4a1; <strong>Stepper</strong> progreso multi-paso con <code>steps</code> (string[]),
              <code>activeStep</code>, <code>orientation</code>, <code>alternativeLabel</code>.
              Círculos numerados, checkmark en completados, accent en activo.
            </Typography>
          </figure>
        </CardFooter>
      </Card>
      <Card>
        <CardHeader>
          <Typography variant="h3" gutterBottom>Table 📋</Typography>
        </CardHeader>
        <CardBody>
          <Table
            columns={[
              { key: "name", label: "Nombre" },
              { key: "role", label: "Rol" },
              { key: "status", label: "Estado" },
            ]}
            data={[
              { name: "Juan Pérez", role: "Desarrollador", status: "Activo" },
              { name: "María García", role: "Diseñadora", status: "Activo" },
              { name: "Carlos López", role: "DevOps", status: "Inactivo" },
              { name: "Ana Martínez", role: "Product Manager", status: "Activo" },
            ]}
            variant="default"
            size="md"
            striped
          />
          <Box display="flex" flexDirection="column" gap="0.5rem" mt="1rem">
            <Typography variant="body2">Variants informativas</Typography>
            <Table
              columns={[{ key: "col", label: "Columna" }]}
              data={[{ col: "Info" }, { col: "Success" }, { col: "Warning" }, { col: "Danger" }]}
              variant="info" size="sm"
            />
          </Box>
        </CardBody>
        <CardFooter>
          <figure className={cardStyles.figure}>
            <Typography variant="caption" component="figcaption" className={cardStyles.figcaption}>
              &#x1f4a1; <strong>Table</strong> datos tabulares con <code>columns</code> y <code>data</code>.
              <code>variant</code> (colorea header), <code>size</code>, <code>striped</code>,
              <code>stickyHeader</code>. Scroll horizontal automático.
            </Typography>
          </figure>
        </CardFooter>
      </Card>
      <Card>
        <CardHeader>
          <Typography variant="h3" gutterBottom>AspectRatio 📐</Typography>
        </CardHeader>
        <CardBody>
          <Box display="flex" flexDirection="column" gap="1rem">
            <Typography variant="body2">16:9</Typography>
            <AspectRatio>
              <img src="/src/assets/html-code-image.webp" alt="16:9"
                style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: 8 }} />
            </AspectRatio>
            <Typography variant="body2">4:3</Typography>
            <AspectRatio ratio={4 / 3} maxWidth={400}>
              <img src="/src/assets/css-code-image.webp" alt="4:3"
                style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: 8 }} />
            </AspectRatio>
            <Typography variant="body2">1:1 cuadrado</Typography>
            <AspectRatio ratio={1} maxWidth={200}>
              <img src="/src/assets/html-code-image.webp" alt="1:1"
                style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: 8 }} />
            </AspectRatio>
          </Box>
        </CardBody>
        <CardFooter>
          <figure className={cardStyles.figure}>
            <Typography variant="caption" component="figcaption" className={cardStyles.figcaption}>
              &#x1f4a1; <strong>AspectRatio</strong> mantiene relación de aspecto con técnica <code>padding-bottom</code>.
              <code>ratio</code> (default 16/9), <code>maxWidth</code>, <code>children</code> se renderiza absoluto adentro.
            </Typography>
          </figure>
        </CardFooter>
      </Card>
      <Card>
        <CardHeader>
          <Typography variant="h3" gutterBottom>Stack / HStack / VStack 🧱</Typography>
        </CardHeader>
        <CardBody>
          <VStack gap="0.75rem">
            <Typography variant="body2"><strong>VStack</strong> — vertical con gap 1rem</Typography>
            <VStack gap="0.5rem" style={{ padding: "0.75rem", border: "1px solid var(--border)", borderRadius: 8 }}>
              <Box style={{ padding: "0.5rem", background: "var(--accent-bg)", borderRadius: 4 }}>Item 1</Box>
              <Box style={{ padding: "0.5rem", background: "var(--accent-bg)", borderRadius: 4 }}>Item 2</Box>
              <Box style={{ padding: "0.5rem", background: "var(--accent-bg)", borderRadius: 4 }}>Item 3</Box>
            </VStack>
            <Typography variant="body2"><strong>HStack</strong> — horizontal con gap 0.5rem</Typography>
            <HStack gap="0.5rem">
              <Box style={{ padding: "0.5rem 1rem", background: "var(--accent-bg)", borderRadius: 4 }}>A</Box>
              <Box style={{ padding: "0.5rem 1rem", background: "var(--accent-bg)", borderRadius: 4 }}>B</Box>
              <Box style={{ padding: "0.5rem 1rem", background: "var(--accent-bg)", borderRadius: 4 }}>C</Box>
            </HStack>
            <Typography variant="body2"><strong>Stack</strong> — genérico con prop <code>direction</code></Typography>
            <Stack direction="row" gap="0.75rem" alignItems="center">
              <span>⚡</span>
              <span>Stack acepta todas las props de Box</span>
            </Stack>
          </VStack>
        </CardBody>
        <CardFooter>
          <figure className={cardStyles.figure}>
            <Typography variant="caption" component="figcaption" className={cardStyles.figcaption}>
              &#x1f4a1; <strong>Stack</strong> (genérico con <code>direction</code>), <strong>HStack</strong> (row, gap 0.5rem),
              <strong>VStack</strong> (column, gap 1rem). Extienden BoxProps, aceptan <code>gap</code> y layout props.
            </Typography>
          </figure>
        </CardFooter>
      </Card>
      <Card>
        <CardHeader>
          <Typography variant="h3" gutterBottom>DataTable 📊</Typography>
        </CardHeader>
        <CardBody>
          <DataTable
            columns={[
              { key: "name", label: "Nombre", sortable: true, filterable: true },
              { key: "role", label: "Rol", sortable: true },
              { key: "status", label: "Estado" },
            ] as DataColumn<{ name: string; role: string; status: string }>[]}
            data={[
              { name: "Ana Martínez", role: "Admin", status: "Activo" },
              { name: "Bob Johnson", role: "Editor", status: "Activo" },
              { name: "Carlos López", role: "User", status: "Inactivo" },
              { name: "Diana Ruiz", role: "Admin", status: "Activo" },
              { name: "Elena García", role: "Editor", status: "Activo" },
              { name: "Frank Torres", role: "User", status: "Activo" },
            ]}
            striped
            selectable
            pageSize={5}
          />
        </CardBody>
        <CardFooter>
          <figure className={cardStyles.figure}>
            <Typography variant="caption" component="figcaption" className={cardStyles.figcaption}>
              &#x1f4a1; <strong>DataTable</strong> tabla genérica con sorting, filtro, paginación,
              selección de filas y toggle de columnas. <code>columns</code> (key, label, sortable, filterable, render, width),
              <code>data</code>, <code>pageSize</code>, <code>selectable</code>, <code>striped</code>.
            </Typography>
          </figure>
        </CardFooter>
      </Card>
    </Box>
  );
}

/* ---------- Display ---------- */
interface DisplayState {
  chips: string[]; setChips: (v: string[] | ((prev: string[]) => string[])) => void;
  switchChecked: boolean; setSwitchChecked: (v: boolean) => void;
  switchDefault: boolean; setSwitchDefault: (v: boolean) => void;
  switchInfo: boolean; setSwitchInfo: (v: boolean) => void;
  switchSuccess: boolean; setSwitchSuccess: (v: boolean) => void;
  switchWarning: boolean; setSwitchWarning: (v: boolean) => void;
  switchDanger: boolean; setSwitchDanger: (v: boolean) => void;
  switchSm: boolean; setSwitchSm: (v: boolean) => void;
  switchMd: boolean; setSwitchMd: (v: boolean) => void;
  switchLg: boolean; setSwitchLg: (v: boolean) => void;
  progressValue: number; setProgressValue: (v: number | ((prev: number) => number)) => void;
}

export function renderDisplaySection(st: DisplayState, bs: Record<string, string>) {
  return (
    <Box display="grid" gridTemplateColumns="1fr" gap="1.5rem" alignItems="start" width="100%" textAlign="left">
      <Card>
        <CardHeader>
          <Typography variant="h3" gutterBottom>Badge 🔴</Typography>
        </CardHeader>
        <CardBody>
          <Box display="flex" gap="0.5rem" flexWrap="wrap" justifyContent="center">
            <span style={{ position: "relative", display: "inline-block" }}>
              <Button>Notificaciones</Button>
              <Badge variant="default" size="sm">3</Badge>
            </span>
            <span style={{ position: "relative", display: "inline-block" }}>
              <Button variant="info">Mensajes</Button>
              <Badge variant="info" size="md">7</Badge>
            </span>
            <span style={{ position: "relative", display: "inline-block" }}>
              <Button variant="success">Logros</Button>
              <Badge variant="success" size="lg">99+</Badge>
            </span>
          </Box>
          <Box display="flex" gap="0.5rem" flexWrap="wrap" justifyContent="center">
            <Badge variant="default" standalone>default</Badge>
            <Badge variant="info" standalone>info</Badge>
            <Badge variant="success" standalone>success</Badge>
            <Badge variant="warning" standalone>warning</Badge>
            <Badge variant="danger" standalone>danger</Badge>
          </Box>
        </CardBody>
        <CardFooter>
          <figure className={bs.figure}>
            <Typography variant="caption" component="figcaption" className={bs.figcaption}>
              &#x1f4a1; <strong>Badge</strong> indicador con <code>variant</code> y <code>size</code>.{" "}
              Modo <code>standalone</code> o posicionado sobre un contenedor padre.
            </Typography>
          </figure>
        </CardFooter>
      </Card>
      <Card>
        <CardHeader>
          <Typography variant="h3" gutterBottom>Chip 🏷️</Typography>
        </CardHeader>
        <CardBody>
          <Box display="flex" gap="0.5rem" flexWrap="wrap" justifyContent="center">
            {st.chips.map((chip) => (
              <Chip key={chip} label={chip} onRemove={() => st.setChips((prev) => prev.filter((c) => c !== chip))} />
            ))}
            {st.chips.length === 0 && (
              <Button variant="info" onClick={() => st.setChips(["React", "TypeScript", "Vite", "CSS"])}>
                Restaurar chips
              </Button>
            )}
          </Box>
          <Box display="flex" gap="0.5rem" flexWrap="wrap" justifyContent="center">
            <Chip label="Info" variant="info" />
            <Chip label="Success" variant="success" />
            <Chip label="Warning" variant="warning" />
            <Chip label="Danger" variant="danger" />
            <Chip label="Desactivado" variant="default" disabled />
          </Box>
        </CardBody>
        <CardFooter>
          <figure className={bs.figure}>
            <Typography variant="caption" component="figcaption" className={bs.figcaption}>
              &#x1f4a1; <strong>Chip</strong> tag removible con <code>variant</code>, <code>size</code>,{" "}
              <code>disabled</code>. Botón X para eliminar.
            </Typography>
          </figure>
        </CardFooter>
      </Card>
      <Card>
        <CardHeader>
          <Typography variant="h3" gutterBottom>Switch 🔘</Typography>
        </CardHeader>
        <CardBody>
          <Box display="flex" flexDirection="column" alignItems="center" gap="1rem">
            <Switch checked={st.switchChecked} onChange={st.setSwitchChecked} label="Alternar opción" />
          </Box>
          <Box display="flex" gap="0.5rem" flexWrap="wrap" justifyContent="center">
            <Switch checked={st.switchDefault} onChange={st.setSwitchDefault} variant="default" />
            <Switch checked={st.switchInfo} onChange={st.setSwitchInfo} variant="info" />
            <Switch checked={st.switchSuccess} onChange={st.setSwitchSuccess} variant="success" />
            <Switch checked={st.switchWarning} onChange={st.setSwitchWarning} variant="warning" />
            <Switch checked={st.switchDanger} onChange={st.setSwitchDanger} variant="danger" />
          </Box>
          <Box display="flex" gap="0.5rem" flexWrap="wrap" justifyContent="center">
            <Switch checked={st.switchSm} onChange={st.setSwitchSm} size="sm" />
            <Switch checked={st.switchMd} onChange={st.setSwitchMd} size="md" />
            <Switch checked={st.switchLg} onChange={st.setSwitchLg} size="lg" />
          </Box>
          <Box display="flex" gap="0.5rem" flexWrap="wrap" justifyContent="center">
            <Switch checked={false} onChange={() => {}} label="Deshabilitado" disabled />
          </Box>
        </CardBody>
        <CardFooter>
          <figure className={bs.figure}>
            <Typography variant="caption" component="figcaption" className={bs.figcaption}>
              &#x1f4a1; <strong>Switch</strong> toggle booleano con{" "}
              <code>variant</code> (default/info/success/warning/danger),{" "}
              <code>size</code> (sm/md/lg), <code>label</code>, <code>disabled</code>.{" "}
              <code>role="switch"</code> y <code>aria-checked</code>.
            </Typography>
          </figure>
        </CardFooter>
      </Card>
      <Card>
        <CardHeader>
          <Typography variant="h3" gutterBottom>Progress 📊</Typography>
        </CardHeader>
        <CardBody>
          <Box display="flex" flexDirection="column" gap="0.5rem">
            <Progress value={st.progressValue} label="Progreso" showValue variant="default" />
            <Progress value={30} label="Info" showValue variant="info" />
            <Progress value={60} label="Success" showValue variant="success" />
            <Progress value={45} showValue variant="warning" />
            <Progress value={80} showValue variant="danger" />
          </Box>
          <Box display="flex" gap="0.5rem" flexWrap="wrap" justifyContent="center">
            <Button variant="info" onClick={() => st.setProgressValue((p) => Math.min(100, p + 10))}>+10%</Button>
            <Button variant="warning" onClick={() => st.setProgressValue((p) => Math.max(0, p - 10))}>-10%</Button>
          </Box>
        </CardBody>
        <CardFooter>
          <figure className={bs.figure}>
            <Typography variant="caption" component="figcaption" className={bs.figcaption}>
              &#x1f4a1; <strong>Progress</strong> barra determinada 0-100%.{" "}
              <code>variant</code>, <code>size</code>, <code>label</code>,{" "}
              <code>showValue</code>. Transición suave al cambiar.
            </Typography>
          </figure>
        </CardFooter>
      </Card>
      <Card>
        <CardHeader>
          <Typography variant="h3" gutterBottom>Skeleton 💀</Typography>
        </CardHeader>
        <CardBody>
          <Box display="flex" flexDirection="column" alignItems="center" gap="1rem">
            <Skeleton variant="text" count={3} />
            <Skeleton variant="text" width="60%" />
          </Box>
          <Box display="flex" gap="0.5rem" flexWrap="wrap" justifyContent="center">
            <Skeleton variant="circle" width="48px" height="48px" />
            <Skeleton variant="rect" width="120px" height="80px" />
            <Skeleton variant="rect" width="80px" height="80px" />
          </Box>
        </CardBody>
        <CardFooter>
          <figure className={bs.figure}>
            <Typography variant="caption" component="figcaption" className={bs.figcaption}>
              &#x1f4a1; <strong>Skeleton</strong> placeholder de carga con shimmer.{" "}
              Variants: <code>text</code> (líneas), <code>circle</code>,{" "}
              <code>rect</code>. Prop <code>count</code> para repetir.
            </Typography>
          </figure>
        </CardFooter>
      </Card>
      <Card>
        <CardHeader>
          <Typography variant="h3" gutterBottom>Tabs 📑</Typography>
        </CardHeader>
        <CardBody>
          <Tabs tabs={[
            { label: "HTML", content: "HTML (HyperText Markup Language) es el lenguaje estándar para crear páginas web." },
            { label: "CSS", content: "CSS (Cascading Style Sheets) controla colores, fuentes, espaciado y layout responsivo." },
            { label: "JS", content: "JavaScript permite agregar interactividad a las páginas web mediante el manejo del DOM y eventos." },
          ]} />
        </CardBody>
        <CardFooter>
          <figure className={bs.figure}>
            <Typography variant="caption" component="figcaption" className={bs.figcaption}>
              &#x1f4a1; <strong>Tabs</strong> navegación por pestañas con keyboard{" "}
              (flechas izquierda/derecha, Home/End). Indicador animado.
            </Typography>
          </figure>
        </CardFooter>
      </Card>
      <Card>
        <CardHeader>
          <Typography variant="h3" gutterBottom>Avatar 👤</Typography>
        </CardHeader>
        <CardBody>
          <Box display="flex" gap="1rem" flexWrap="wrap" justifyContent="center" alignItems="center">
            <Avatar src="/src/assets/html-code-image.webp" alt="JP" />
            <Avatar alt="JD" color="info" />
            <Avatar alt="María García" color="success" size="lg" variant="rounded" />
            <Avatar alt="AB" color="warning" />
            <Avatar alt="CL" color="danger" />
          </Box>
          <Box display="flex" gap="0.5rem" flexWrap="wrap" justifyContent="center" alignItems="center" mt="0.5rem">
            <Avatar alt="SM" size="sm" />
            <Avatar alt="MD" size="md" />
            <Avatar alt="LG" size="lg" />
          </Box>
          <Box display="flex" gap="0.5rem" flexWrap="wrap" justifyContent="center" alignItems="center" mt="0.5rem">
            <Avatar alt="Circle" variant="circle" />
            <Avatar alt="Rounded" variant="rounded" />
            <Avatar alt="Square" variant="square" />
          </Box>
        </CardBody>
        <CardFooter>
          <figure className={cardStyles.figure}>
            <Typography variant="caption" component="figcaption" className={cardStyles.figcaption}>
              &#x1f4a1; <strong>Avatar</strong> foto de perfil o iniciales. <code>src</code>, <code>alt</code>,
              <code>size</code> (sm/md/lg), <code>variant</code> (circle/rounded/square), <code>color</code> (Variant).
              Fallback a iniciales de <code>alt</code> cuando no hay <code>src</code>.
            </Typography>
          </figure>
        </CardFooter>
      </Card>
      <Card>
        <CardHeader>
          <Typography variant="h3" gutterBottom>Rating ⭐</Typography>
        </CardHeader>
        <CardBody>
          <Box display="flex" flexDirection="column" gap="1rem" alignItems="center">
            <Box display="flex" flexDirection="column" gap="0.5rem" alignItems="center">
              <Typography variant="body2">Interactivo (por defecto 5 estrellas)</Typography>
              <RatingDemo />
            </Box>
            <Box display="flex" gap="1rem" flexWrap="wrap" justifyContent="center">
              <Box display="flex" flexDirection="column" alignItems="center" gap="0.25rem">
                <Typography variant="caption">ReadOnly</Typography>
                <Rating value={3} readOnly />
              </Box>
              <Box display="flex" flexDirection="column" alignItems="center" gap="0.25rem">
                <Typography variant="caption">sm</Typography>
                <Rating value={2} size="sm" />
              </Box>
              <Box display="flex" flexDirection="column" alignItems="center" gap="0.25rem">
                <Typography variant="caption">md</Typography>
                <Rating value={3} size="md" readOnly />
              </Box>
              <Box display="flex" flexDirection="column" alignItems="center" gap="0.25rem">
                <Typography variant="caption">lg</Typography>
                <Rating value={4} size="lg" />
              </Box>
            </Box>
          </Box>
        </CardBody>
        <CardFooter>
          <figure className={cardStyles.figure}>
            <Typography variant="caption" component="figcaption" className={cardStyles.figcaption}>
              &#x1f4a1; <strong>Rating</strong> valoración por estrellas. <code>value</code>, <code>onChange</code>,
              <code>count</code> (default 5), <code>size</code>, <code>readOnly</code>, <code>icon</code> (custom).
              Keyboard: Arrow keys + Enter. ARIA <code>radiogroup</code>.
            </Typography>
          </figure>
        </CardFooter>
      </Card>
      <Card>
        <CardHeader>
          <Typography variant="h3" gutterBottom>Timeline 📅</Typography>
        </CardHeader>
        <CardBody>
          <Timeline items={[
            { title: "Primera versión", description: "Lanzamiento inicial con componentes base.", time: "Ene 2025", color: "default" },
            { title: "Nuevos componentes", description: "Se agregaron inputs, forms y overlays.", time: "Mar 2025", color: "info" },
            { title: "Tema oscuro", description: "Soporte completo de light/dark mode con CSS variables.", time: "Jun 2025", color: "success" },
            { title: "v1.0 estable", description: "Todos los tests pasando, CI/CD configurado.", time: "Sep 2025", color: "warning" },
          ]} />
        </CardBody>
        <CardFooter>
          <figure className={cardStyles.figure}>
            <Typography variant="caption" component="figcaption" className={cardStyles.figcaption}>
              &#x1f4a1; <strong>Timeline</strong> línea de tiempo vertical. Items: <code>title</code>, <code>description</code>,
              <code>time</code>, <code>icon</code>, <code>color</code> (Variant). Línea conectora + dots.
            </Typography>
          </figure>
        </CardFooter>
      </Card>
      <Card>
        <CardHeader>
          <Typography variant="h3" gutterBottom>EmptyState 📭</Typography>
        </CardHeader>
        <CardBody>
          <Box display="flex" flexDirection="column" gap="1rem">
            <EmptyState
              icon={<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M9 12h6M12 9v6"/></svg>}
              title="Sin resultados"
              description="No encontramos nada que coincida con tu búsqueda. Probá con otros términos."
              action={<Button variant="info">Limpiar filtros</Button>}
            />
            <Divider />
            <Box display="flex" gap="1rem" flexWrap="wrap">
              <EmptyState
                icon={<span>📦</span>}
                title="Carrito vacío"
                description="Agregá productos para empezar a comprar."
              />
              <EmptyState
                icon={<span>🔔</span>}
                title="Sin notificaciones"
                description="No tenés notificaciones pendientes."
              />
            </Box>
          </Box>
        </CardBody>
        <CardFooter>
          <figure className={cardStyles.figure}>
            <Typography variant="caption" component="figcaption" className={cardStyles.figcaption}>
              &#x1f4a1; <strong>EmptyState</strong> placeholder para datos vacíos. <code>icon</code>, <code>title</code>,
              <code>description</code>, <code>action</code> (ReactNode, ej. Button). Centrado con gap.
            </Typography>
          </figure>
        </CardFooter>
      </Card>
      <Card>
        <CardHeader>
          <Typography variant="h3" gutterBottom>Typography 🔤</Typography>
        </CardHeader>
        <CardBody>
          <Box display="flex" flexDirection="column" gap="0.75rem">
            <Typography variant="h1">h1. Heading</Typography>
            <Typography variant="h2">h2. Heading</Typography>
            <Typography variant="h3">h3. Heading</Typography>
            <Typography variant="h4">h4. Heading</Typography>
            <Typography variant="h5">h5. Heading</Typography>
            <Typography variant="h6">h6. Heading</Typography>
            <Typography variant="body1">body1. Texto base del sistema — 18px (16px en mobile). Usado para párrafos y contenido general.</Typography>
            <Typography variant="body2">body2. Texto secundario — 15px (14px en mobile). Ideal para descripciones y metadata.</Typography>
            <Typography variant="caption">caption. Texto auxiliar — 13px. Para notas, pies de figura y etiquetas pequeñas.</Typography>
            <Typography variant="code">code. const typography = "monospace con background";</Typography>
          </Box>
          <Typography variant="h5" gutterBottom style={{ marginTop: "1rem" }}>Props</Typography>
          <Box display="flex" flexDirection="column" gap="0.5rem">
            <Typography variant="body2"><code>variant</code> — h1 | h2 | h3 | h4 | h5 | h6 | body1 | body2 | caption | code</Typography>
            <Typography variant="body2"><code>component</code> — override del elemento HTML (ej. h3 como <code>span</code>)</Typography>
            <Typography variant="body2"><code>gutterBottom</code> — agrega margin-bottom: 0.5em</Typography>
            <Typography variant="body2"><code>align</code> — left | center | right</Typography>
            <Typography variant="body2"><code>noWrap</code> — nowrap con ellipsis</Typography>
            <Typography variant="body2"><code>color</code> — override de color (ej. <code>"var(--accent)"</code>)</Typography>
          </Box>
          <Typography variant="h6" gutterBottom style={{ marginTop: "1rem" }}>Con <code>component</code> y <code>align</code></Typography>
          <Typography variant="h5" component="span" align="center" style={{ display: "block", color: "var(--accent)" }}>
            h5 renderizado como span, centrado, en accent
          </Typography>
        </CardBody>
        <CardFooter>
          <figure className={bs.figure}>
            <Typography variant="caption" component="figcaption" className={bs.figcaption}>
              &#x1f4a1; <strong>Typography</strong> sistema tipográfico completo con variantes predefinidas.
              Cada variante define font-size, weight, line-height, letter-spacing y color.
              Responsive automático a 1024px. Respeta el tema light/dark vía variables CSS.
            </Typography>
          </figure>
        </CardFooter>
      </Card>
    </Box>
  );
}
const colorTokens = [
  { v: "--accent", light: "#aa3bff", dark: "#c084fc" },
  { v: "--accent-bg", light: "rgba(170,59,255,0.1)", dark: "rgba(192,132,252,0.15)" },
  { v: "--accent-border", light: "rgba(170,59,255,0.5)", dark: "rgba(192,132,252,0.5)" },
  { v: "--info", light: "#3b82f6", dark: "#60a5fa" },
  { v: "--info-bg", light: "rgba(59,130,246,0.12)", dark: "rgba(96,165,250,0.15)" },
  { v: "--success", light: "#22c55e", dark: "#4ade80" },
  { v: "--success-bg", light: "rgba(34,197,94,0.12)", dark: "rgba(74,222,128,0.15)" },
  { v: "--warning", light: "#eab308", dark: "#fde047" },
  { v: "--warning-bg", light: "rgba(234,179,8,0.15)", dark: "rgba(253,224,71,0.15)" },
  { v: "--danger", light: "#ef4444", dark: "#f87171" },
  { v: "--danger-bg", light: "rgba(239,68,68,0.12)", dark: "rgba(248,113,113,0.15)" },
  { v: "--text", light: "#6b6375", dark: "#9ca3af" },
  { v: "--text-h", light: "#08060d", dark: "#f3f4f6" },
  { v: "--bg", light: "#ffffff", dark: "#16171d" },
  { v: "--card-bg", light: "#ffffff", dark: "#1f2028" },
  { v: "--border", light: "#e5e4e7", dark: "#2e303a" },
  { v: "--code-bg", light: "#f4f3ec", dark: "#1f2028" },
  { v: "--meter-bg", light: "#e5e7eb", dark: "#2e303a" },
  { v: "--meter-value", light: "#2563eb", dark: "#60a5fa" },
  { v: "--gradient-end", light: "#f472b6", dark: "#a855f7" },
];

export function renderThemeSection(s: Record<string, string>, bs: Record<string, string>) {
  return (
    <Box display="grid" gridTemplateColumns="1fr" gap="1.5rem" alignItems="start" width="100%" textAlign="left">
      <Card>
        <CardHeader>
          <Typography variant="h3" gutterBottom>ThemeToggle 🌓</Typography>
        </CardHeader>
        <CardBody>
          <ThemeToggle />
        </CardBody>
        <CardFooter>
          <figure className={bs.figure}>
            <Typography variant="caption" component="figcaption" className={bs.figcaption}>
              &#x1f4a1; <strong>ThemeToggle</strong> es un componente auto-contenido (sin props).{" "}
              Lee/escribe <code>localStorage("theme")</code>, setea{" "}
              <code>data-theme</code> en <code>&lt;html&gt;</code> y dispara un evento{" "}
              <code>themechange</code> en <code>window</code> para sincronizar
              todos los componentes del sitio.
            </Typography>
          </figure>
        </CardFooter>
      </Card>
      <Card>
        <CardHeader>
          <Typography variant="h3" gutterBottom>LogoWatermark 🖼️</Typography>
        </CardHeader>
        <CardBody>
          <LogoWatermark size={48} />
        </CardBody>
        <CardFooter>
          <figure className={bs.figure}>
            <Typography variant="caption" component="figcaption" className={bs.figcaption}>
              &#x1f4a1; <strong>LogoWatermark</strong> combina una imagen webp con
              gradient text via <code>background-clip: text</code>. Escucha{" "}
              <code>themechange</code> para refrescar el gradiente. Props:{ " " }
              <code>size?: number</code>.
            </Typography>
          </figure>
        </CardFooter>
      </Card>
      <Card>
        <CardHeader>
          <Typography variant="h3" gutterBottom>Design Tokens — Colors 🎨</Typography>
        </CardHeader>
        <CardBody>
          <Box display="flex" gap="0.75rem" flexWrap="wrap">
            {colorTokens.map((t) => (
              <Box key={t.v} display="flex" flexDirection="column" alignItems="center" gap="0.25rem">
                <Box className={s.swatchColor} style={{ background: `var(${t.v})` }} />
                <span className={s.swatchLabel}>{t.v}</span>
              </Box>
            ))}
          </Box>
        </CardBody>
        <CardFooter>
          <figure className={bs.figure}>
            <Typography variant="caption" component="figcaption" className={bs.figcaption}>
              &#x1f4a1; Los swatches usan <code>background: var(--nombre)</code> y se renderizan
              con el valor real del tema activo (light/dark). Cada variable se define en{" "}
              <code>:root</code> y se sobrescribe en <code>[data-theme="dark"]</code>.{" "}
              Los componentes mapean su prop <code>variant</code> a estas variables semánticas
              via clases CSS. La variable <code>--shadow</code> (no mostrada) es un box-shadow
              compuesto que también cambia con el tema.
            </Typography>
          </figure>
        </CardFooter>
      </Card>
      <Card>
        <CardHeader>
          <Typography variant="h3" gutterBottom>Design Tokens — Typography ✍️</Typography>
        </CardHeader>
        <CardBody>
          <Box display="flex" flexDirection="column" gap="0.5rem">
            <Box><code>--sans</code>: <span style={{ fontFamily: "var(--sans)" }}>Inter, system-ui</span> — cuerpo general</Box>
            <Box><code>--heading</code>: <span style={{ fontFamily: "var(--heading)", fontWeight: 600 }}>Inter</span> — títulos</Box>
            <Box><code>--mono</code>: <span style={{ fontFamily: "var(--mono)" }}>ui-monospace, Consolas</span> — código</Box>
          </Box>
          <Typography variant="caption" style={{ marginTop: "1rem" }}>
            Body: 18px (16px en &le;1024px). H1: 56px, H2: 24px.{" "}
            Inter weights cargados: 400, 500, 600, 700 via @fontsource/inter.
          </Typography>
        </CardBody>
        <CardFooter>
          <figure className={bs.figure}>
            <Typography variant="caption" component="figcaption" className={bs.figcaption}>
              &#x1f4a1; Tipografía auto-alojada con <code>@fontsource/inter</code>. Sin
              dependencia externa a Google Fonts.
            </Typography>
          </figure>
        </CardFooter>
      </Card>
      <Card>
        <CardHeader>
          <Typography variant="h3" gutterBottom>Design Tokens — Sizes & Spacing 📐</Typography>
        </CardHeader>
        <CardBody>
          <Box display="flex" flexDirection="column" gap="0.5rem">
            <Box><strong>Tipo Size</strong>: <code>"sm" | "md" | "lg"</code> — usado en Inputs, Switch, Select, Progress, etc.</Box>
            <Box><strong>Breakpoints</strong>: sm=640, md=768, lg=1024, xl=1280px</Box>
            <Box><strong>Gap system</strong>: 0.5rem (flexRow), 1rem (flexRowLg), 1.5rem (grid)</Box>
            <Box><strong>Border radius</strong>: 16px (cards/box), 12px (imágenes, inputs), 8px (varios), 9999px (chips/badges)</Box>
            <Box><strong>Z-index ladder</strong>: Navbar 100, Tooltip 100, Select 150, Drawer overlay 250, Drawer 260, Modal overlay 200, Alert 300, LoaderOverlay 1000</Box>
          </Box>
        </CardBody>
        <CardFooter>
          <figure className={bs.figure}>
            <Typography variant="caption" component="figcaption" className={bs.figcaption}>
              &#x1f4a1; Los tamaños se definen por clase CSS en cada componente (ej.{ " " }
              <code>.sm &#123; --thumb-size: 18px &#125;</code>). El hook{" "}
              <code>useMediaQuery</code> permite responsive en JS.
            </Typography>
          </figure>
        </CardFooter>
      </Card>
    </Box>
  );
}

/* ---------- Icons ---------- */
const iconList = [
  { Icon: MenuIcon, name: "MenuIcon", size: 16, usedIn: "Drawer menú" },
  { Icon: SearchIcon, name: "SearchIcon", size: 14, usedIn: "SearchInput" },
  { Icon: ClearIcon, name: "ClearIcon", size: 10, usedIn: "SearchInput, Chip" },
  { Icon: EyeIcon, name: "EyeIcon", size: 16, usedIn: "PasswordInput" },
  { Icon: EyeOffIcon, name: "EyeOffIcon", size: 16, usedIn: "PasswordInput" },
  { Icon: SunIcon, name: "SunIcon", size: 12, usedIn: "ThemeToggle" },
  { Icon: MoonIcon, name: "MoonIcon", size: 12, usedIn: "ThemeToggle" },
  { Icon: ChevronUpIcon, name: "ChevronUpIcon", size: 8, usedIn: "NumberInput" },
  { Icon: ChevronDownIcon, name: "ChevronDownIcon", size: 8, usedIn: "NumberInput, Select" },
  { Icon: CalendarIcon, name: "CalendarIcon", size: 15, usedIn: "DateInput" },
  { Icon: UploadIcon, name: "UploadIcon", size: 20, usedIn: "FileInput" },
  { Icon: FileIcon, name: "FileIcon", size: 14, usedIn: "FileInput" },
  { Icon: CheckIcon, name: "CheckIcon", size: 12, usedIn: "Select" },
  { Icon: InfoIcon, name: "InfoIcon", size: 18, usedIn: "Alert" },
  { Icon: SuccessIcon, name: "SuccessIcon", size: 18, usedIn: "Alert" },
  { Icon: WarningIcon, name: "WarningIcon", size: 18, usedIn: "Alert" },
  { Icon: ErrorIcon, name: "ErrorIcon", size: 18, usedIn: "Alert" },
  { Icon: GitHubIcon, name: "GitHubIcon", size: 22, usedIn: "Footer" },
  { Icon: TwitterIcon, name: "TwitterIcon", size: 22, usedIn: "Footer" },
  { Icon: YouTubeIcon, name: "YouTubeIcon", size: 22, usedIn: "Footer" },
  { Icon: LinkedInIcon, name: "LinkedInIcon", size: 22, usedIn: "Footer" },
  { Icon: CloseIcon, name: "CloseIcon", size: 14, usedIn: "Modal, Drawer, Chip, Alert, FileInput" },
];

export function renderIconsSection(s: Record<string, string>, bs: Record<string, string>) {
  return (
    <Box display="grid" gridTemplateColumns="1fr" gap="1.5rem" alignItems="start" width="100%" textAlign="left">
      <Card>
        <CardHeader>
          <Typography variant="h3" gutterBottom>Iconos disponibles 🎯</Typography>
          <Typography variant="caption">
            Todos los iconos se importan desde <code>"./icons"</code> o <code>"../components/icons"</code>.
            Cada icono acepta <code>size?: number</code>, <code>className?: string</code>,{" "}
            <code>style?: React.CSSProperties</code>.
          </Typography>
        </CardHeader>
        <CardBody>
          <Box display="grid" gridTemplateColumns="repeat(auto-fill, minmax(160px, 1fr))" gap="1rem">
            {iconList.map((item) => (
              <Box key={item.name} className={s.iconItem}>
                <item.Icon size={24} />
                <span className={s.iconName}>{item.name}</span>
                <span className={s.iconMeta}>default: {item.size}px</span>
                <span className={s.iconMeta}>usado en: {item.usedIn}</span>
                <code className={s.iconImport}>import {"{"}{item.name}{"}"} from "../icons"</code>
              </Box>
            ))}
          </Box>
        </CardBody>
        <CardFooter>
          <figure className={bs.figure}>
            <Typography variant="caption" component="figcaption" className={bs.figcaption}>
              &#x1f4a1; Los iconos SVG usan <code>stroke="currentColor"</code> (UI) o{" "}
              <code>fill="currentColor"</code> (social). Heredan el color del texto
              del contenedor padre.
            </Typography>
          </figure>
        </CardFooter>
      </Card>
    </Box>
  );
}

/* ---------- Overlays ---------- */
interface OverlaysState {
  modalSmall: boolean; setModalSmall: (v: boolean) => void;
  modalMedium: boolean; setModalMedium: (v: boolean) => void;
  modalLarge: boolean; setModalLarge: (v: boolean) => void;
  modalXl: boolean; setModalXl: (v: boolean) => void;
  showAlert: (variant: AlertVariant, position: AlertPosition, duration?: number) => void;
  overlayOpen: boolean; setOverlayOpen: (v: boolean) => void;
  drawerOpen: boolean; setDrawerOpen: (v: boolean) => void;
  drawerPosition: "left" | "right"; setDrawerPosition: (v: "left" | "right") => void;
}

export function renderOverlaysSection(st: OverlaysState, bs: Record<string, string>) {
  return (
    <Box display="grid" gridTemplateColumns="1fr" gap="1.5rem" alignItems="start" width="100%" textAlign="left">
      <Card>
        <CardHeader>
          <Typography variant="h3" gutterBottom>Modal 🪟</Typography>
        </CardHeader>
        <CardBody>
          <Box display="flex" gap="0.5rem" flexWrap="wrap" justifyContent="center">
            <Button variant="info" onClick={() => st.setModalSmall(true)}>Abrir sm</Button>
            <Button onClick={() => st.setModalMedium(true)}>Abrir md</Button>
            <Button variant="warning" onClick={() => st.setModalLarge(true)}>Abrir lg</Button>
            <Button variant="danger" onClick={() => st.setModalXl(true)}>Abrir xl</Button>
          </Box>
        </CardBody>
        <CardFooter>
          <figure className={bs.figure}>
            <Typography variant="caption" component="figcaption" className={bs.figcaption}>
              &#x1f4a1; <strong>Modal</strong> recibe <code>isOpen</code>,{" "}
              <code>onClose</code>, <code>size</code>, <code>title</code>,{" "}
              <code>footer</code>, <code>closeOnOverlay</code>. Bloquea scroll,
              cierra con Escape y overlay click.
            </Typography>
          </figure>
        </CardFooter>
      </Card>
      <Card>
        <CardHeader>
          <Typography variant="h3" gutterBottom>Alert 🔔</Typography>
        </CardHeader>
        <CardBody>
          <Box display="flex" gap="0.5rem" flexWrap="wrap" justifyContent="center">
            <Button variant="info" onClick={() => st.showAlert("info", "top-right")}>Info</Button>
            <Button variant="success" onClick={() => st.showAlert("success", "top-right")}>Success</Button>
            <Button variant="warning" onClick={() => st.showAlert("warning", "top-right", 8000)}>Warning</Button>
            <Button variant="danger" onClick={() => st.showAlert("danger", "top-left")}>Danger</Button>
          </Box>
          <Box display="flex" gap="0.5rem" flexWrap="wrap" justifyContent="center" mt="0.5rem">
            <Button variant="default" onClick={() => st.showAlert("info", "bottom-right", 0)}>Sin auto-cierre</Button>
            <Button variant="default" onClick={() => st.showAlert("success", "bottom-left", 3000)}>3s + abajo izq</Button>
          </Box>
        </CardBody>
        <CardFooter>
          <figure className={bs.figure}>
            <Typography variant="caption" component="figcaption" className={bs.figcaption}>
              &#x1f4a1; <strong>Alert</strong> recibe <code>variant</code> (info/success/warning/danger),{" "}
              <code>position</code>, <code>duration</code> (ms, 0 = no auto),{" "}
              <code>closable</code>, <code>message</code> y <code>description</code>.
            </Typography>
          </figure>
        </CardFooter>
      </Card>
      <Card>
        <CardHeader>
          <Typography variant="h3" gutterBottom>Loader 🌀</Typography>
        </CardHeader>
        <CardBody>
          <Box display="flex" gap="1rem" alignItems="center" justifyContent="center" mb="1rem">
            <Loader size="sm" /> <Loader size="md" /> <Loader size="lg" />
          </Box>
          <Box display="flex" gap="1rem" alignItems="center" justifyContent="center" mb="1rem">
            <Loader variant="info" /> <Loader variant="success" /> <Loader variant="warning" /> <Loader variant="danger" />
          </Box>
          <Box display="flex" gap="1rem" alignItems="center" justifyContent="center" mb="1rem">
            <Loader size="sm" label="Cargando..." />
          </Box>
          <Typography variant="h3" gutterBottom>LoaderBar 📊</Typography>
          <Box display="flex" flexDirection="column" gap="0.5rem">
            <LoaderBar /> <LoaderBar variant="info" /> <LoaderBar variant="success" />
            <LoaderBar variant="warning" /> <LoaderBar variant="danger" />
          </Box>
        </CardBody>
        <CardFooter>
          <figure className={bs.figure}>
            <Typography variant="caption" component="figcaption" className={bs.figcaption}>
              &#x1f4a1; <strong>Loader</strong> spinner circular con sizes y variants.{" "}
              <strong>LoaderBar</strong> barra lineal indeterminada. Ambos
              usan las mismas variables de color semánticas.
            </Typography>
          </figure>
        </CardFooter>
      </Card>
      <Card>
        <CardHeader>
          <Typography variant="h3" gutterBottom>LoaderOverlay 🔲</Typography>
        </CardHeader>
        <CardBody>
          <Box display="flex" justifyContent="center">
            <Button onClick={() => st.setOverlayOpen(true)}>Abrir overlay</Button>
          </Box>
        </CardBody>
        <CardFooter>
          <figure className={bs.figure}>
            <Typography variant="caption" component="figcaption" className={bs.figcaption}>
              &#x1f4a1; <strong>LoaderOverlay</strong> fondo semi-transparente con{" "}
              <code>backdrop-filter</code>. Bloquea scroll y centra el loader.
            </Typography>
          </figure>
        </CardFooter>
      </Card>
      <Card>
        <CardHeader>
          <Typography variant="h3" gutterBottom>Popover 💬</Typography>
        </CardHeader>
        <CardBody>
          <Box display="flex" gap="1rem" flexWrap="wrap" justifyContent="center">
            <Popover content={<span>Menú de acciones</span>}>
              <Button variant="info">Click</Button>
            </Popover>
            <Popover content={<span>Información adicional sobre este elemento</span>} position="right">
              <Button>Más info</Button>
            </Popover>
          </Box>
        </CardBody>
        <CardFooter>
          <figure className={bs.figure}>
            <Typography variant="caption" component="figcaption" className={bs.figcaption}>
              &#x1f4a1; <strong>Popover</strong> overlay contextual a click.{" "}
              <code>position</code>: top/bottom/left/right. Cierra con Escape
              o click fuera. Renderizado con <code>createPortal</code>.
            </Typography>
          </figure>
        </CardFooter>
      </Card>
      <Card>
        <CardHeader>
          <Typography variant="h3" gutterBottom>Drawer 🗄️</Typography>
        </CardHeader>
        <CardBody>
          <Box display="flex" gap="0.5rem" flexWrap="wrap" justifyContent="center">
            <Button onClick={() => { st.setDrawerPosition("right"); st.setDrawerOpen(true); }}>Abrir derecha</Button>
            <Button onClick={() => { st.setDrawerPosition("left"); st.setDrawerOpen(true); }}>Abrir izquierda</Button>
          </Box>
        </CardBody>
        <CardFooter>
          <figure className={bs.figure}>
            <Typography variant="caption" component="figcaption" className={bs.figcaption}>
              &#x1f4a1; <strong>Drawer</strong> panel lateral deslizable con overlay.{" "}
              <code>position</code> (left/right), <code>size</code>,{" "}
              <code>title</code>. Bloquea scroll + Escape para cerrar.
            </Typography>
          </figure>
        </CardFooter>
      </Card>
    </Box>
  );
}

function PaginationDemo() {
  const [page, setPage] = useState(1);
  return (
    <Card>
      <CardHeader>
        <Typography variant="h3" gutterBottom>Paginación 📄</Typography>
      </CardHeader>
      <CardBody>
        <Box display="flex" justifyContent="center">
          <Pagination current={page} total={10} onChange={setPage} />
        </Box>
      </CardBody>
      <CardFooter>
        <figure className={cardStyles.figure}>
          <Typography variant="caption" component="figcaption" className={cardStyles.figcaption}>
            &#x1f4a1; <strong>Pagination</strong> navegación entre páginas con
            elipsis automática y <code>aria-current="page"</code>.
          </Typography>
        </figure>
      </CardFooter>
    </Card>
  );
}

function RatingDemo() {
  const [value, setValue] = useState(3);
  return (
    <Rating value={value} onChange={setValue} />
  );
}
