/* eslint-disable react-refresh/only-export-components */
type T = (k: string, opts?: Record<string, unknown>) => string;
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
import { TreeView } from "../components/tree-view";
import type { TreeNode } from "../components/tree-view";
import { VirtualizedList } from "../components/virtualized-list";
import { ToastProvider, useToast } from "../components/toast";
import { TreeSelect } from "../components/tree-select";
import { SplitPane } from "../components/split-pane";
import { CommandPalette } from "../components/command-palette";
import type { Command } from "../components/command-palette";
import { Sidebar } from "../components/sidebar";
import {
  MenuIcon, SearchIcon, ClearIcon, EyeIcon, EyeOffIcon,
  SunIcon, MoonIcon, ChevronUpIcon, ChevronDownIcon,
  CalendarIcon, UploadIcon, FileIcon, CheckIcon,
  InfoIcon, SuccessIcon, WarningIcon, ErrorIcon,
  GitHubIcon, TwitterIcon, YouTubeIcon, LinkedInIcon, CloseIcon,
} from "../components/icons";
import htmlCodeImage from "../assets/html-code-image.webp";
import cssCodeImage from "../assets/css-code-image.webp";
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
  { id: "business", label: "Business" },
] as const;

export type CategoryId = (typeof categories)[number]["id"];

/* ---------- Overview ---------- */
export function renderOverviewSection(t: T) {
  return (
    <Box display="grid" gridTemplateColumns="1fr" gap="1.5rem" alignItems="start" width="100%" textAlign="left">
      <Card>
        <CardHeader>
          <Typography variant="h3" gutterBottom>{t("complementos.overview_heading")}</Typography>
        </CardHeader>
        <CardBody>
          <Typography variant="body2">
            {t("complementos.overview_text")}
          </Typography>
        </CardBody>
      </Card>
    </Box>
  );
}

/* ---------- Buttons ---------- */
export function renderButtonsSection(t: T, bs: Record<string, string>) {
  return (
    <Box display="grid" gridTemplateColumns="1fr" gap="1.5rem" alignItems="start" width="100%" textAlign="left">
      <Card>
        <CardHeader>
          <Typography variant="h3" gutterBottom>{t("complementos.section_button")}</Typography>
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
              {t("complementos.figcaption.button")}
            </Typography>
          </figure>
        </CardFooter>
      </Card>
      <Card>
        <CardHeader>
          <Typography variant="h3" gutterBottom>{t("complementos.section_tooltip")}</Typography>
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
              {t("complementos.figcaption.tooltip")}
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

export function renderInputsSection(t: T, st: InputsState, bs: Record<string, string>) {
  return (
    <Box display="grid" gridTemplateColumns="1fr" gap="1.5rem" alignItems="start" width="100%" textAlign="left">
      <Card>
        <CardHeader>
          <Typography variant="h3" gutterBottom>{t("complementos.section_input")}</Typography>
        </CardHeader>
        <CardBody>
          <Input value={st.inputValue} onChange={(e) => st.setInputValue(e.target.value)} placeholder={t("complementos.input_placeholder")} label={t("complementos.input_label_base")} />
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
          <Input value="" onChange={() => {}} placeholder="Con error..." error={t("complementos.input_error")} />
          <Box display="flex" gap="0.5rem" flexWrap="wrap">
            <Input value="" onChange={() => {}} label="Outlined" placeholder={t("complementos.input_placeholder_outlined")} />
            <Input value="" onChange={() => {}} design="filled" label="Filled" placeholder={t("complementos.input_placeholder_filled")} />
            <Input value="" onChange={() => {}} design="standard" label="Standard" placeholder={t("complementos.input_placeholder_standard")} />
          </Box>
        </CardBody>
        <CardFooter>
          <figure className={bs.figure}>
            <Typography variant="caption" component="figcaption" className={bs.figcaption}>
              {t("complementos.figcaption.input")}
            </Typography>
          </figure>
        </CardFooter>
      </Card>
      <Card>
        <CardHeader>
          <Typography variant="h3" gutterBottom>{t("complementos.section_autocomplete")}</Typography>
        </CardHeader>
        <CardBody>
          <Autocomplete value={st.autocompleteValue} onChange={st.setAutocompleteValue}
            options={["JavaScript", "TypeScript", "Python", "Java", "C#", "Ruby", "Go", "Rust", "Kotlin", "Swift", "PHP", "HTML", "CSS", "React", "Vue"]}
            placeholder={t("complementos.autocomplete_placeholder")} label={t("complementos.autocomplete_label")} />
        </CardBody>
        <CardFooter>
          <figure className={bs.figure}>
            <Typography variant="caption" component="figcaption" className={bs.figcaption}>
              {t("complementos.figcaption.autocomplete")}
            </Typography>
          </figure>
        </CardFooter>
      </Card>
      <Card>
        <CardHeader>
          <Typography variant="h3" gutterBottom>{t("complementos.section_select")}</Typography>
        </CardHeader>
        <CardBody>
          <Box display="flex" gap="0.5rem" flexWrap="wrap" justifyContent="center">
            <Select options={["React", "Vue", "Svelte", "Angular", "Solid"]} value={st.selectFramework} onChange={st.setSelectFramework} placeholder={t("complementos.select_placeholder_framework")} label={t("complementos.select_label_framework")} />
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
              {t("complementos.figcaption.select")}
            </Typography>
          </figure>
        </CardFooter>
      </Card>
      <Card>
        <CardHeader>
          <Typography variant="h3" gutterBottom>{t("complementos.section_textarea")}</Typography>
        </CardHeader>
        <CardBody>
          <Textarea value={st.textareaValue} onChange={(e) => st.setTextareaValue(e.target.value)} placeholder={t("complementos.textarea_placeholder")} label={t("complementos.textarea_label")} />
          <Box display="flex" gap="0.5rem" flexWrap="wrap">
            <Textarea value="" onChange={() => {}} placeholder="sm" size="sm" />
            <Textarea value="" onChange={() => {}} placeholder="md" size="md" />
            <Textarea value="" onChange={() => {}} placeholder="lg" size="lg" />
          </Box>
          <Box display="flex" gap="0.5rem" flexWrap="wrap">
            <Textarea value="" onChange={() => {}} placeholder="Info" variant="info" />
            <Textarea value="" onChange={() => {}} placeholder="Success" variant="success" />
          </Box>
          <Textarea value="" onChange={() => {}} placeholder="Con error..." error={t("complementos.textarea_error")} />
        </CardBody>
        <CardFooter>
          <figure className={bs.figure}>
            <Typography variant="caption" component="figcaption" className={bs.figcaption}>
              {t("complementos.figcaption.textarea")}
            </Typography>
          </figure>
        </CardFooter>
      </Card>
      <Card>
        <CardHeader>
          <Typography variant="h3" gutterBottom>{t("complementos.section_password")}</Typography>
        </CardHeader>
        <CardBody>
          <PasswordInput value={st.passwordValue} onChange={(e) => st.setPasswordValue(e.target.value)} placeholder={t("complementos.password_placeholder")} label={t("complementos.password_label")} />
          <Box display="flex" gap="0.5rem" flexWrap="wrap">
            <PasswordInput value="" onChange={() => {}} placeholder="sm" size="sm" />
            <PasswordInput value="" onChange={() => {}} placeholder="md" size="md" />
            <PasswordInput value="" onChange={() => {}} placeholder="lg" size="lg" />
          </Box>
          <PasswordInput value="" onChange={() => {}} placeholder="Con error..." error={t("complementos.password_error")} />
        </CardBody>
        <CardFooter>
          <figure className={bs.figure}>
            <Typography variant="caption" component="figcaption" className={bs.figcaption}>
              {t("complementos.figcaption.password")}
            </Typography>
          </figure>
        </CardFooter>
      </Card>
      <Card>
        <CardHeader>
          <Typography variant="h3" gutterBottom>{t("complementos.section_search")}</Typography>
        </CardHeader>
        <CardBody>
          <SearchInput value={st.searchValue} onChange={(e) => st.setSearchValue(e.target.value)} onClear={() => st.setSearchValue("")} placeholder={t("complementos.search_placeholder")} label={t("complementos.search_label")} />
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
              {t("complementos.figcaption.search")}
            </Typography>
          </figure>
        </CardFooter>
      </Card>
      <Card>
        <CardHeader>
          <Typography variant="h3" gutterBottom>{t("complementos.section_number")}</Typography>
        </CardHeader>
        <CardBody>
          <NumberInput value={st.numberValue} onChange={(e) => st.setNumberValue(Number(e.target.value))} label={t("complementos.number_label")} min={0} max={100} />
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
              {t("complementos.figcaption.number")}
            </Typography>
          </figure>
        </CardFooter>
      </Card>
      <Card>
        <CardHeader>
          <Typography variant="h3" gutterBottom>{t("complementos.section_date")}</Typography>
        </CardHeader>
        <CardBody>
          <DateInput value={st.dateValue} onChange={(e) => st.setDateValue(e.target.value)} label={t("complementos.date_label")} />
          <Box display="flex" gap="0.5rem" flexWrap="wrap">
            <DateInput value="" onChange={() => {}} size="sm" />
            <DateInput value="" onChange={() => {}} size="md" />
            <DateInput value="" onChange={() => {}} size="lg" />
          </Box>
        </CardBody>
        <CardFooter>
          <figure className={bs.figure}>
            <Typography variant="caption" component="figcaption" className={bs.figcaption}>
              {t("complementos.figcaption.date")}
            </Typography>
          </figure>
        </CardFooter>
      </Card>
      <Card>
        <CardHeader>
          <Typography variant="h3" gutterBottom>{t("complementos.section_color")}</Typography>
        </CardHeader>
        <CardBody>
          <ColorInput value={st.colorValue} onChange={(e) => st.setColorValue(e.target.value)} label={t("complementos.color_label")} />
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
              {t("complementos.figcaption.color")}
            </Typography>
          </figure>
        </CardFooter>
      </Card>
      <Card>
        <CardHeader>
          <Typography variant="h3" gutterBottom>{t("complementos.section_range")}</Typography>
        </CardHeader>
        <CardBody>
          <RangeInput value={st.rangeValue} onChange={(e) => st.setRangeValue(Number(e.target.value))} label={t("complementos.range_label_volumen")} showValue min={0} max={100} />
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
              {t("complementos.figcaption.range")}
            </Typography>
          </figure>
        </CardFooter>
      </Card>
      <Card>
        <CardHeader>
          <Typography variant="h3" gutterBottom>{t("complementos.section_file")}</Typography>
        </CardHeader>
        <CardBody>
          <FileInput label={t("complementos.file_label")} accept=".pdf,.jpg,.png" onChange={(files) => console.log("Archivos:", files)} />
          <Box display="flex" gap="0.5rem" flexWrap="wrap" justifyContent="center">
            <Box style={{ flex: 1 }}>
              <FileInput label="Múltiples archivos" multiple onChange={() => {}}>
                <Typography variant="body2" component="span">
                  <span dangerouslySetInnerHTML={{ __html: t("complementos.file_multiple_hint") }} />
                </Typography>
              </FileInput>
            </Box>
          </Box>
        </CardBody>
        <CardFooter>
          <figure className={bs.figure}>
            <Typography variant="caption" component="figcaption" className={bs.figcaption}>
              {t("complementos.figcaption.file")}
            </Typography>
          </figure>
        </CardFooter>
      </Card>
      <Card>
        <CardHeader>
          <Typography variant="h3" gutterBottom>{t("complementos.section_form")}</Typography>
        </CardHeader>
        <CardBody>
          <FormGroup legend={t("complementos.form_legend")}>
            <FormField label={t("complementos.form_label_name")} htmlFor="ff-name" helperText={t("complementos.form_helper_name")}>
              <Input id="ff-name" placeholder={t("complementos.form_placeholder_name")} />
            </FormField>
            <FormField label={t("complementos.form_label_email")} htmlFor="ff-email" error={t("complementos.form_error_email")}>
              <Input id="ff-email" value="mal-formato" onChange={() => {}} error={t("complementos.form_error_email")} hideErrorText />
            </FormField>
            <FormField label={t("complementos.form_label_country")} htmlFor="ff-country" required>
              <Input id="ff-country" placeholder={t("complementos.form_placeholder_country")} />
            </FormField>
            <FormField label={t("complementos.form_label_comments")} helperText={t("complementos.form_helper_comments")}>
              <Textarea placeholder={t("complementos.textarea_placeholder")} />
            </FormField>
          </FormGroup>
        </CardBody>
        <CardFooter>
          <figure className={bs.figure}>
            <Typography variant="caption" component="figcaption" className={bs.figcaption}>
              {t("complementos.figcaption.form")}
            </Typography>
          </figure>
        </CardFooter>
      </Card>
    </Box>
  );
}

/* ---------- Layout ---------- */
export function renderLayoutSection(t: T, s: Record<string, string>, bs: Record<string, string>) {
  return (
    <Box display="grid" gridTemplateColumns="1fr" gap="1.5rem" alignItems="start" width="100%" textAlign="left">
      <Card>
        <CardHeader>
          <Typography variant="h3" gutterBottom>{t("complementos.section_box")}</Typography>
        </CardHeader>
        <CardBody>
          <Box>{t("complementos.box_text")}</Box>
          <Box display="flex" justifyContent="center" p={12} mt="0.5rem">
            <Typography variant="body2" component="span"><span dangerouslySetInnerHTML={{ __html: t("complementos.box_extends") }} /></Typography>
          </Box>
        </CardBody>
        <CardFooter>
          <figure className={bs.figure}>
            <Typography variant="caption" component="figcaption" className={bs.figcaption}>
              {t("complementos.figcaption.box")}
            </Typography>
          </figure>
        </CardFooter>
      </Card>
      <Card>
        <CardHeader>
          <Typography variant="h3" gutterBottom>{t("complementos.section_card")}</Typography>
        </CardHeader>
        <CardBody>
          <Card>
            <Typography variant="body1">{t("complementos.card_body")}</Typography>
          </Card>
          <Card>
            <Typography variant="h4">{t("complementos.card_title")}</Typography>
            <Typography variant="body1">{t("complementos.card_content")}</Typography>
          </Card>
        </CardBody>
        <CardFooter>
          <figure className={bs.figure}>
            <Typography variant="caption" component="figcaption" className={bs.figcaption}>
              {t("complementos.figcaption.card")}
            </Typography>
          </figure>
        </CardFooter>
      </Card>
      <Card>
        <CardHeader>
          <Typography variant="h3" gutterBottom>{t("complementos.section_image")}</Typography>
        </CardHeader>
        <CardBody>
          <Image src={htmlCodeImage} alt={t("complementos.image_caption_example")}
            style={{ width: "100%", height: 192, objectFit: "cover", borderRadius: 12 }} />
          <Image src={cssCodeImage} alt={t("complementos.image_caption_example")}
            caption={t("complementos.image_caption_example")}
            style={{ width: "100%", height: 192, objectFit: "cover", borderRadius: 12 }} />
        </CardBody>
        <CardFooter>
          <figure className={bs.figure}>
            <Typography variant="caption" component="figcaption" className={bs.figcaption}>
              {t("complementos.figcaption.image")}
            </Typography>
          </figure>
        </CardFooter>
      </Card>
      <Card>
        <CardHeader>
          <Typography variant="h3" gutterBottom>{t("complementos.section_meter")}</Typography>
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
              {t("complementos.figcaption.meter")}
            </Typography>
          </figure>
        </CardFooter>
      </Card>
      <Card>
        <CardHeader>
          <Typography variant="h3" gutterBottom>{t("complementos.section_accordion")}</Typography>
        </CardHeader>
        <CardBody>
          <Accordion items={[
            { question: t("complementos.accordion_q1"), answer: t("complementos.accordion_a1") },
            { question: t("complementos.accordion_q2"), answer: t("complementos.accordion_a2") },
            { question: t("complementos.accordion_q3"), answer: t("complementos.accordion_a3") },
          ]} />
        </CardBody>
        <CardFooter>
          <figure className={bs.figure}>
            <Typography variant="caption" component="figcaption" className={bs.figcaption}>
              {t("complementos.figcaption.accordion")}
            </Typography>
          </figure>
        </CardFooter>
      </Card>
      <Card>
        <CardHeader>
          <Typography variant="h3" gutterBottom>{t("complementos.section_breadcrumbs")}</Typography>
        </CardHeader>
        <CardBody>
          <Breadcrumbs items={[
            { label: t("complementos.breadcrumb_home"), href: "#home" },
            { label: t("complementos.breadcrumb_components"), href: "#complementos" },
            { label: t("complementos.breadcrumb_layout") },
          ]} />
        </CardBody>
        <CardFooter>
          <figure className={bs.figure}>
            <Typography variant="caption" component="figcaption" className={bs.figcaption}>
              {t("complementos.figcaption.breadcrumbs")}
            </Typography>
          </figure>
        </CardFooter>
      </Card>
      <PaginationDemo t={t} />
      <Card>
        <CardHeader>
          <Typography variant="h3" gutterBottom>{t("complementos.section_divider")}</Typography>
        </CardHeader>
        <CardBody>
          <Box display="flex" flexDirection="column" gap="1rem">
            <Typography variant="body2">{t("complementos.divider_horizontal")}</Typography>
            <Divider />
            <Divider size="md" />
            <Divider size="lg" variant="info" />
            <Divider label={t("complementos.divider_label")} />
            <Divider label="Info" variant="info" size="md" />
            <Typography variant="body2">{t("complementos.divider_vertical")}</Typography>
            <Box display="flex" gap="1rem" style={{ height: 60 }} alignItems="center">
              <span>{t("complementos.divider_left")}</span>
              <Divider orientation="vertical" />
              <span>{t("complementos.divider_center")}</span>
              <Divider orientation="vertical" size="md" variant="danger" />
              <span>{t("complementos.divider_right")}</span>
            </Box>
          </Box>
        </CardBody>
        <CardFooter>
          <figure className={cardStyles.figure}>
            <Typography variant="caption" component="figcaption" className={cardStyles.figcaption}>
              {t("complementos.figcaption.divider")}
            </Typography>
          </figure>
        </CardFooter>
      </Card>
      <Card>
        <CardHeader>
          <Typography variant="h3" gutterBottom>{t("complementos.section_stepper")}</Typography>
        </CardHeader>
        <CardBody>
          <Box display="flex" flexDirection="column" gap="1.5rem">
            <Typography variant="body2">{t("complementos.stepper_horizontal")}</Typography>
            <Stepper steps={[t("complementos.stepper_cart"), t("complementos.stepper_payment"), t("complementos.stepper_shipping"), t("complementos.stepper_confirmation")]} activeStep={2} />
            <Typography variant="body2">{t("complementos.stepper_vertical")}</Typography>
            <Stepper steps={[t("complementos.stepper_register"), t("complementos.stepper_verification"), t("complementos.stepper_welcome")]} activeStep={1} orientation="vertical" />
            <Typography variant="body2">{t("complementos.stepper_alternative")}</Typography>
            <Stepper steps={[t("complementos.stepper_step1"), t("complementos.stepper_step2"), t("complementos.stepper_step3")]} activeStep={0} alternativeLabel />
          </Box>
        </CardBody>
        <CardFooter>
          <figure className={cardStyles.figure}>
            <Typography variant="caption" component="figcaption" className={cardStyles.figcaption}>
              {t("complementos.figcaption.stepper")}
            </Typography>
          </figure>
        </CardFooter>
      </Card>
      <Card>
        <CardHeader>
          <Typography variant="h3" gutterBottom>{t("complementos.section_table")}</Typography>
        </CardHeader>
        <CardBody>
          <Table
            columns={[
              { key: "name", label: t("complementos.table_name") },
              { key: "role", label: t("complementos.table_role") },
              { key: "status", label: t("complementos.table_status") },
            ]}
            data={[
              { name: t("complementos.table_juan"), role: t("complementos.table_dev"), status: t("complementos.table_active") },
              { name: t("complementos.table_maria"), role: t("complementos.table_designer"), status: t("complementos.table_active") },
              { name: t("complementos.table_carlos"), role: t("complementos.table_devops"), status: t("complementos.table_inactive") },
              { name: t("complementos.table_ana"), role: t("complementos.table_pm"), status: t("complementos.table_active") },
            ]}
            variant="default"
            size="md"
            striped
          />
          <Box display="flex" flexDirection="column" gap="0.5rem" mt="1rem">
            <Typography variant="body2">Variants informativas</Typography>
            <Table
              columns={[{ key: "col", label: t("complementos.table_column") }]}
              data={[{ col: "Info" }, { col: "Success" }, { col: "Warning" }, { col: "Danger" }]}
              variant="info" size="sm"
            />
          </Box>
        </CardBody>
        <CardFooter>
          <figure className={cardStyles.figure}>
            <Typography variant="caption" component="figcaption" className={cardStyles.figcaption}>
              {t("complementos.figcaption.table")}
            </Typography>
          </figure>
        </CardFooter>
      </Card>
      <Card>
        <CardHeader>
          <Typography variant="h3" gutterBottom>{t("complementos.section_aspectratio")}</Typography>
        </CardHeader>
        <CardBody>
          <Box display="flex" flexDirection="column" gap="1rem">
            <Typography variant="body2">16:9</Typography>
            <AspectRatio>
              <img src={htmlCodeImage} alt="16:9"
                style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: 8 }} />
            </AspectRatio>
            <Typography variant="body2">4:3</Typography>
            <AspectRatio ratio={4 / 3} maxWidth={400}>
              <img src={cssCodeImage} alt="4:3"
                style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: 8 }} />
            </AspectRatio>
            <Typography variant="body2">1:1 cuadrado</Typography>
            <AspectRatio ratio={1} maxWidth={200}>
              <img src={htmlCodeImage} alt="1:1"
                style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: 8 }} />
            </AspectRatio>
          </Box>
        </CardBody>
        <CardFooter>
          <figure className={cardStyles.figure}>
            <Typography variant="caption" component="figcaption" className={cardStyles.figcaption}>
              {t("complementos.figcaption.aspectratio")}
            </Typography>
          </figure>
        </CardFooter>
      </Card>
      <Card>
        <CardHeader>
          <Typography variant="h3" gutterBottom>{t("complementos.section_stack")}</Typography>
        </CardHeader>
        <CardBody>
          <VStack gap="0.75rem">
            <Typography variant="body2"><strong>VStack</strong> — {t("complementos.vstack_label")}</Typography>
            <VStack gap="0.5rem" style={{ padding: "0.75rem", border: "1px solid var(--border)", borderRadius: 8 }}>
              <Box style={{ padding: "0.5rem", background: "var(--accent-bg)", borderRadius: 4 }}>Item 1</Box>
              <Box style={{ padding: "0.5rem", background: "var(--accent-bg)", borderRadius: 4 }}>Item 2</Box>
              <Box style={{ padding: "0.5rem", background: "var(--accent-bg)", borderRadius: 4 }}>Item 3</Box>
            </VStack>
            <Typography variant="body2"><strong>HStack</strong> — {t("complementos.hstack_label")}</Typography>
            <HStack gap="0.5rem">
              <Box style={{ padding: "0.5rem 1rem", background: "var(--accent-bg)", borderRadius: 4 }}>A</Box>
              <Box style={{ padding: "0.5rem 1rem", background: "var(--accent-bg)", borderRadius: 4 }}>B</Box>
              <Box style={{ padding: "0.5rem 1rem", background: "var(--accent-bg)", borderRadius: 4 }}>C</Box>
            </HStack>
            <Typography variant="body2"><strong>Stack</strong> — {t("complementos.stack_label")}</Typography>
            <Stack direction="row" gap="0.75rem" alignItems="center">
              <span>⚡</span>
              <span>{t("complementos.stack_desc")}</span>
            </Stack>
          </VStack>
        </CardBody>
        <CardFooter>
          <figure className={cardStyles.figure}>
            <Typography variant="caption" component="figcaption" className={cardStyles.figcaption}>
              {t("complementos.figcaption.stack")}
            </Typography>
          </figure>
        </CardFooter>
      </Card>
      <Card>
        <CardHeader>
          <Typography variant="h3" gutterBottom>{t("complementos.section_datatable")}</Typography>
        </CardHeader>
        <CardBody>
          <DataTable
            columns={[
              { key: "name", label: t("complementos.table_name"), sortable: true, filterable: true },
              { key: "role", label: t("complementos.table_role"), sortable: true },
              { key: "status", label: t("complementos.table_status") },
            ] as DataColumn<{ name: string; role: string; status: string }>[]}
            data={[
              { name: t("complementos.datatable_name_ana"), role: t("complementos.datatable_role_admin"), status: t("complementos.table_active") },
              { name: t("complementos.datatable_name_bob"), role: t("complementos.datatable_role_editor"), status: t("complementos.table_active") },
              { name: t("complementos.datatable_name_carlos"), role: t("complementos.datatable_role_user"), status: t("complementos.table_inactive") },
              { name: t("complementos.datatable_name_diana"), role: t("complementos.datatable_role_admin"), status: t("complementos.table_active") },
              { name: t("complementos.datatable_name_elena"), role: t("complementos.datatable_role_editor"), status: t("complementos.table_active") },
              { name: t("complementos.datatable_name_frank"), role: t("complementos.datatable_role_user"), status: t("complementos.table_active") },
            ]}
            striped
            selectable
            pageSize={5}
          />
        </CardBody>
        <CardFooter>
          <figure className={cardStyles.figure}>
            <Typography variant="caption" component="figcaption" className={cardStyles.figcaption}>
              {t("complementos.figcaption.datatable")}
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

export function renderDisplaySection(t: T, st: DisplayState, bs: Record<string, string>) {
  return (
    <Box display="grid" gridTemplateColumns="1fr" gap="1.5rem" alignItems="start" width="100%" textAlign="left">
      <Card>
        <CardHeader>
          <Typography variant="h3" gutterBottom>{t("complementos.section_badge")}</Typography>
        </CardHeader>
        <CardBody>
          <Box display="flex" gap="0.5rem" flexWrap="wrap" justifyContent="center">
            <span style={{ position: "relative", display: "inline-block" }}>
              <Button>{t("complementos.badge_notifications")}</Button>
              <Badge variant="default" size="sm">3</Badge>
            </span>
            <span style={{ position: "relative", display: "inline-block" }}>
              <Button variant="info">{t("complementos.badge_messages")}</Button>
              <Badge variant="info" size="md">7</Badge>
            </span>
            <span style={{ position: "relative", display: "inline-block" }}>
              <Button variant="success">{t("complementos.badge_achievements")}</Button>
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
              {t("complementos.figcaption.badge")}
            </Typography>
          </figure>
        </CardFooter>
      </Card>
      <Card>
        <CardHeader>
          <Typography variant="h3" gutterBottom>{t("complementos.section_chip")}</Typography>
        </CardHeader>
        <CardBody>
          <Box display="flex" gap="0.5rem" flexWrap="wrap" justifyContent="center">
            {st.chips.map((chip) => (
              <Chip key={chip} label={chip} onRemove={() => st.setChips((prev) => prev.filter((c) => c !== chip))} />
            ))}
            {st.chips.length === 0 && (
              <Button variant="info" onClick={() => st.setChips(["React", "TypeScript", "Vite", "CSS"])}>
                {t("complementos.chip_restore")}
              </Button>
            )}
          </Box>
          <Box display="flex" gap="0.5rem" flexWrap="wrap" justifyContent="center">
            <Chip label="Info" variant="info" />
            <Chip label="Success" variant="success" />
            <Chip label="Warning" variant="warning" />
            <Chip label="Danger" variant="danger" />
            <Chip label={t("complementos.chip_disabled")} variant="default" disabled />
          </Box>
        </CardBody>
        <CardFooter>
          <figure className={bs.figure}>
            <Typography variant="caption" component="figcaption" className={bs.figcaption}>
              {t("complementos.figcaption.chip")}
            </Typography>
          </figure>
        </CardFooter>
      </Card>
      <Card>
        <CardHeader>
          <Typography variant="h3" gutterBottom>{t("complementos.section_switch")}</Typography>
        </CardHeader>
        <CardBody>
          <Box display="flex" flexDirection="column" alignItems="center" gap="1rem">
            <Switch checked={st.switchChecked} onChange={st.setSwitchChecked} label={t("complementos.switch_label")} />
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
            <Switch checked={false} onChange={() => {}} label={t("complementos.switch_disabled")} disabled />
          </Box>
        </CardBody>
        <CardFooter>
          <figure className={bs.figure}>
            <Typography variant="caption" component="figcaption" className={bs.figcaption}>
              {t("complementos.figcaption.switch")}
            </Typography>
          </figure>
        </CardFooter>
      </Card>
      <Card>
        <CardHeader>
          <Typography variant="h3" gutterBottom>{t("complementos.section_progress")}</Typography>
        </CardHeader>
        <CardBody>
          <Box display="flex" flexDirection="column" gap="0.5rem">
            <Progress value={st.progressValue} label={t("complementos.progress_label")} showValue variant="default" />
            <Progress value={30} label="Info" showValue variant="info" />
            <Progress value={60} label="Success" showValue variant="success" />
            <Progress value={45} showValue variant="warning" />
            <Progress value={80} showValue variant="danger" />
          </Box>
          <Box display="flex" gap="0.5rem" flexWrap="wrap" justifyContent="center">
            <Button variant="info" onClick={() => st.setProgressValue((p) => Math.min(100, p + 10))}>{t("complementos.progress_plus")}</Button>
            <Button variant="warning" onClick={() => st.setProgressValue((p) => Math.max(0, p - 10))}>{t("complementos.progress_minus")}</Button>
          </Box>
        </CardBody>
        <CardFooter>
          <figure className={bs.figure}>
            <Typography variant="caption" component="figcaption" className={bs.figcaption}>
              {t("complementos.figcaption.progress")}
            </Typography>
          </figure>
        </CardFooter>
      </Card>
      <Card>
        <CardHeader>
          <Typography variant="h3" gutterBottom>{t("complementos.section_skeleton")}</Typography>
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
              {t("complementos.figcaption.skeleton")}
            </Typography>
          </figure>
        </CardFooter>
      </Card>
      <Card>
        <CardHeader>
          <Typography variant="h3" gutterBottom>{t("complementos.section_tabs")}</Typography>
        </CardHeader>
        <CardBody>
          <Tabs tabs={[
            { label: t("complementos.tabs_html"), content: t("complementos.tabs_html_content") },
            { label: t("complementos.tabs_css"), content: t("complementos.tabs_css_content") },
            { label: t("complementos.tabs_js"), content: t("complementos.tabs_js_content") },
          ]} />
        </CardBody>
        <CardFooter>
          <figure className={bs.figure}>
            <Typography variant="caption" component="figcaption" className={bs.figcaption}>
              {t("complementos.figcaption.tabs")}
            </Typography>
          </figure>
        </CardFooter>
      </Card>
      <Card>
        <CardHeader>
          <Typography variant="h3" gutterBottom>{t("complementos.section_avatar")}</Typography>
        </CardHeader>
        <CardBody>
          <Box display="flex" gap="1rem" flexWrap="wrap" justifyContent="center" alignItems="center">
            <Avatar src={htmlCodeImage} alt="JP" />
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
              {t("complementos.figcaption.avatar")}
            </Typography>
          </figure>
        </CardFooter>
      </Card>
      <Card>
        <CardHeader>
          <Typography variant="h3" gutterBottom>{t("complementos.section_rating")}</Typography>
        </CardHeader>
        <CardBody>
          <Box display="flex" flexDirection="column" gap="1rem" alignItems="center">
            <Box display="flex" flexDirection="column" gap="0.5rem" alignItems="center">
              <Typography variant="body2">{t("complementos.rating_interactive")}</Typography>
              <RatingDemo />
            </Box>
            <Box display="flex" gap="1rem" flexWrap="wrap" justifyContent="center">
              <Box display="flex" flexDirection="column" alignItems="center" gap="0.25rem">
                <Typography variant="caption">{t("complementos.rating_readonly")}</Typography>
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
              {t("complementos.figcaption.rating")}
            </Typography>
          </figure>
        </CardFooter>
      </Card>
      <Card>
        <CardHeader>
          <Typography variant="h3" gutterBottom>{t("complementos.section_timeline")}</Typography>
        </CardHeader>
        <CardBody>
          <Timeline items={[
            { title: t("complementos.timeline_v1"), description: t("complementos.timeline_v1_desc"), time: t("complementos.timeline_v1_time"), color: "default" },
            { title: t("complementos.timeline_v2"), description: t("complementos.timeline_v2_desc"), time: t("complementos.timeline_v2_time"), color: "info" },
            { title: t("complementos.timeline_v3"), description: t("complementos.timeline_v3_desc"), time: t("complementos.timeline_v3_time"), color: "success" },
            { title: t("complementos.timeline_v4"), description: t("complementos.timeline_v4_desc"), time: t("complementos.timeline_v4_time"), color: "warning" },
          ]} />
        </CardBody>
        <CardFooter>
          <figure className={cardStyles.figure}>
            <Typography variant="caption" component="figcaption" className={cardStyles.figcaption}>
              {t("complementos.figcaption.timeline")}
            </Typography>
          </figure>
        </CardFooter>
      </Card>
      <Card>
        <CardHeader>
          <Typography variant="h3" gutterBottom>{t("complementos.section_emptystate")}</Typography>
        </CardHeader>
        <CardBody>
          <Box display="flex" flexDirection="column" gap="1rem">
            <EmptyState
              icon={<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M9 12h6M12 9v6"/></svg>}
              title={t("complementos.emptystate_noresults_title")}
              description={t("complementos.emptystate_noresults_desc")}
              action={<Button variant="info">{t("complementos.emptystate_noresults_action")}</Button>}
            />
            <Divider />
            <Box display="flex" gap="1rem" flexWrap="wrap">
              <EmptyState
                icon={<span>📦</span>}
                title={t("complementos.emptystate_cart_title")}
                description={t("complementos.emptystate_cart_desc")}
              />
              <EmptyState
                icon={<span>🔔</span>}
                title={t("complementos.emptystate_notifications_title")}
                description={t("complementos.emptystate_notifications_desc")}
              />
            </Box>
          </Box>
        </CardBody>
        <CardFooter>
          <figure className={cardStyles.figure}>
            <Typography variant="caption" component="figcaption" className={cardStyles.figcaption}>
              {t("complementos.figcaption.emptystate")}
            </Typography>
          </figure>
        </CardFooter>
      </Card>
      <Card>
        <CardHeader>
          <Typography variant="h3" gutterBottom>{t("complementos.section_typography")}</Typography>
        </CardHeader>
        <CardBody>
          <Box display="flex" flexDirection="column" gap="0.75rem">
            <Typography variant="h1">{t("complementos.typography_h1")}</Typography>
            <Typography variant="h2">{t("complementos.typography_h2")}</Typography>
            <Typography variant="h3">{t("complementos.typography_h3")}</Typography>
            <Typography variant="h4">{t("complementos.typography_h4")}</Typography>
            <Typography variant="h5">{t("complementos.typography_h5")}</Typography>
            <Typography variant="h6">{t("complementos.typography_h6")}</Typography>
            <Typography variant="body1">{t("complementos.typography_body1")}</Typography>
            <Typography variant="body2">{t("complementos.typography_body2")}</Typography>
            <Typography variant="caption">{t("complementos.typography_caption")}</Typography>
            <Typography variant="code">{t("complementos.typography_code")}</Typography>
          </Box>
          <Typography variant="h5" gutterBottom style={{ marginTop: "1rem" }}>{t("complementos.typography_props_title")}</Typography>
          <Box display="flex" flexDirection="column" gap="0.5rem">
            <Typography variant="body2"><code>variant</code> — h1 | h2 | h3 | h4 | h5 | h6 | body1 | body2 | caption | code</Typography>
            <Typography variant="body2"><code>component</code> — {t("complementos.typography_props_component")}</Typography>
            <Typography variant="body2"><code>gutterBottom</code> — {t("complementos.typography_props_gutter")}</Typography>
            <Typography variant="body2"><code>align</code> — left | center | right</Typography>
            <Typography variant="body2"><code>noWrap</code> — {t("complementos.typography_props_nowrap")}</Typography>
            <Typography variant="body2"><code>color</code> — {t("complementos.typography_props_color")}</Typography>
          </Box>
          <Typography variant="h6" gutterBottom style={{ marginTop: "1rem" }}>{t("complementos.typography_component_title")}</Typography>
          <Typography variant="h5" component="span" align="center" style={{ display: "block", color: "var(--accent)" }}>
            {t("complementos.typography_component_demo")}
          </Typography>
        </CardBody>
        <CardFooter>
          <figure className={bs.figure}>
            <Typography variant="caption" component="figcaption" className={bs.figcaption}>
              {t("complementos.figcaption.typography")}
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

export function renderThemeSection(t: T, s: Record<string, string>, bs: Record<string, string>) {
  return (
    <Box display="grid" gridTemplateColumns="1fr" gap="1.5rem" alignItems="start" width="100%" textAlign="left">
      <Card>
        <CardHeader>
          <Typography variant="h3" gutterBottom>{t("complementos.section_theme")}</Typography>
        </CardHeader>
        <CardBody>
          <ThemeToggle />
        </CardBody>
        <CardFooter>
          <figure className={bs.figure}>
            <Typography variant="caption" component="figcaption" className={bs.figcaption}>
              {t("complementos.figcaption.theme_toggle")}
            </Typography>
          </figure>
        </CardFooter>
      </Card>
      <Card>
        <CardHeader>
          <Typography variant="h3" gutterBottom>{t("complementos.section_logo")}</Typography>
        </CardHeader>
        <CardBody>
          <LogoWatermark size={48} />
        </CardBody>
        <CardFooter>
          <figure className={bs.figure}>
            <Typography variant="caption" component="figcaption" className={bs.figcaption}>
              {t("complementos.figcaption.logo")}
            </Typography>
          </figure>
        </CardFooter>
      </Card>
      <Card>
        <CardHeader>
          <Typography variant="h3" gutterBottom>{t("complementos.section_tokens_colors")}</Typography>
        </CardHeader>
        <CardBody>
          <Box display="flex" gap="0.75rem" flexWrap="wrap">
            {colorTokens.map((ct) => (
              <Box key={ct.v} display="flex" flexDirection="column" alignItems="center" gap="0.25rem">
                <Box className={s.swatchColor} style={{ background: `var(${ct.v})` }} />
                <span className={s.swatchLabel}>{ct.v}</span>
              </Box>
            ))}
          </Box>
        </CardBody>
        <CardFooter>
          <figure className={bs.figure}>
            <Typography variant="caption" component="figcaption" className={bs.figcaption}>
              {t("complementos.figcaption.tokens_colors")}
            </Typography>
          </figure>
        </CardFooter>
      </Card>
      <Card>
        <CardHeader>
          <Typography variant="h3" gutterBottom>{t("complementos.section_tokens_typography")}</Typography>
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
              {t("complementos.figcaption.tokens_typography")}
            </Typography>
          </figure>
        </CardFooter>
      </Card>
      <Card>
        <CardHeader>
          <Typography variant="h3" gutterBottom>{t("complementos.section_tokens_sizes")}</Typography>
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
              {t("complementos.figcaption.tokens_sizes")}
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

export function renderIconsSection(t: T, s: Record<string, string>, bs: Record<string, string>) {
  return (
    <Box display="grid" gridTemplateColumns="1fr" gap="1.5rem" alignItems="start" width="100%" textAlign="left">
      <Card>
        <CardHeader>
          <Typography variant="h3" gutterBottom>{t("complementos.icons_heading")}</Typography>
          <Typography variant="caption">
            {t("complementos.icons_import_text")}
          </Typography>
        </CardHeader>
        <CardBody>
          <Box display="grid" gridTemplateColumns="repeat(auto-fill, minmax(160px, 1fr))" gap="1rem">
            {iconList.map((item) => (
              <Box key={item.name} className={s.iconItem}>
                <item.Icon size={24} />
                <span className={s.iconName}>{item.name}</span>
                <span className={s.iconMeta}>{t("complementos.icons_meta_default", { size: item.size })}</span>
                <span className={s.iconMeta}>{t("complementos.icons_meta_usedin", { comp: item.usedIn })}</span>
                <code className={s.iconImport}>import {"{"}{item.name}{"}"} from "../icons"</code>
              </Box>
            ))}
          </Box>
        </CardBody>
        <CardFooter>
          <figure className={bs.figure}>
            <Typography variant="caption" component="figcaption" className={bs.figcaption}>
              {t("complementos.figcaption.icons")}
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

export function renderOverlaysSection(t: T, st: OverlaysState, bs: Record<string, string>) {
  return (
    <Box display="grid" gridTemplateColumns="1fr" gap="1.5rem" alignItems="start" width="100%" textAlign="left">
      <Card>
        <CardHeader>
          <Typography variant="h3" gutterBottom>{t("complementos.section_modal")}</Typography>
        </CardHeader>
        <CardBody>
          <Box display="flex" gap="0.5rem" flexWrap="wrap" justifyContent="center">
            <Button variant="info" onClick={() => st.setModalSmall(true)}>{t("complementos.modal_btn_sm")}</Button>
            <Button onClick={() => st.setModalMedium(true)}>{t("complementos.modal_btn_md")}</Button>
            <Button variant="warning" onClick={() => st.setModalLarge(true)}>{t("complementos.modal_btn_lg")}</Button>
            <Button variant="danger" onClick={() => st.setModalXl(true)}>{t("complementos.modal_btn_xl")}</Button>
          </Box>
        </CardBody>
        <CardFooter>
          <figure className={bs.figure}>
            <Typography variant="caption" component="figcaption" className={bs.figcaption}>
              {t("complementos.figcaption.modal")}
            </Typography>
          </figure>
        </CardFooter>
      </Card>
      <Card>
        <CardHeader>
          <Typography variant="h3" gutterBottom>{t("complementos.section_alert")}</Typography>
        </CardHeader>
        <CardBody>
          <Box display="flex" gap="0.5rem" flexWrap="wrap" justifyContent="center">
            <Button variant="info" onClick={() => st.showAlert("info", "top-right")}>{t("complementos.alert_btn_info")}</Button>
            <Button variant="success" onClick={() => st.showAlert("success", "top-right")}>{t("complementos.alert_btn_success")}</Button>
            <Button variant="warning" onClick={() => st.showAlert("warning", "top-right", 8000)}>{t("complementos.alert_btn_warning")}</Button>
            <Button variant="danger" onClick={() => st.showAlert("danger", "top-left")}>{t("complementos.alert_btn_danger")}</Button>
          </Box>
          <Box display="flex" gap="0.5rem" flexWrap="wrap" justifyContent="center" mt="0.5rem">
            <Button variant="default" onClick={() => st.showAlert("info", "bottom-right", 0)}>{t("complementos.alert_btn_noauto")}</Button>
            <Button variant="default" onClick={() => st.showAlert("success", "bottom-left", 3000)}>{t("complementos.alert_btn_position")}</Button>
          </Box>
        </CardBody>
        <CardFooter>
          <figure className={bs.figure}>
            <Typography variant="caption" component="figcaption" className={bs.figcaption}>
              {t("complementos.figcaption.alert")}
            </Typography>
          </figure>
        </CardFooter>
      </Card>
      <Card>
        <CardHeader>
          <Typography variant="h3" gutterBottom>{t("complementos.section_loader")}</Typography>
        </CardHeader>
        <CardBody>
          <Box display="flex" gap="1rem" alignItems="center" justifyContent="center" mb="1rem">
            <Loader size="sm" /> <Loader size="md" /> <Loader size="lg" />
          </Box>
          <Box display="flex" gap="1rem" alignItems="center" justifyContent="center" mb="1rem">
            <Loader variant="info" /> <Loader variant="success" /> <Loader variant="warning" /> <Loader variant="danger" />
          </Box>
          <Box display="flex" gap="1rem" alignItems="center" justifyContent="center" mb="1rem">
            <Loader size="sm" label={t("complementos.loader_label")} />
          </Box>
          <Typography variant="h3" gutterBottom>{t("complementos.section_loaderbar")}</Typography>
          <Box display="flex" flexDirection="column" gap="0.5rem">
            <LoaderBar /> <LoaderBar variant="info" /> <LoaderBar variant="success" />
            <LoaderBar variant="warning" /> <LoaderBar variant="danger" />
          </Box>
        </CardBody>
        <CardFooter>
          <figure className={bs.figure}>
            <Typography variant="caption" component="figcaption" className={bs.figcaption}>
              {t("complementos.figcaption.loader")}
            </Typography>
          </figure>
        </CardFooter>
      </Card>
      <Card>
        <CardHeader>
          <Typography variant="h3" gutterBottom>{t("complementos.section_loaderoverylay")}</Typography>
        </CardHeader>
        <CardBody>
          <Box display="flex" justifyContent="center">
            <Button onClick={() => st.setOverlayOpen(true)}>{t("complementos.overlay_btn_open")}</Button>
          </Box>
        </CardBody>
        <CardFooter>
          <figure className={bs.figure}>
            <Typography variant="caption" component="figcaption" className={bs.figcaption}>
              {t("complementos.figcaption.loader_overlay")}
            </Typography>
          </figure>
        </CardFooter>
      </Card>
      <Card>
        <CardHeader>
          <Typography variant="h3" gutterBottom>{t("complementos.section_popover")}</Typography>
        </CardHeader>
        <CardBody>
          <Box display="flex" gap="1rem" flexWrap="wrap" justifyContent="center">
            <Popover content={<span>{t("complementos.popover_content_actions")}</span>}>
              <Button variant="info">{t("complementos.popover_btn_click")}</Button>
            </Popover>
            <Popover content={<span>{t("complementos.popover_content_info")}</span>} position="right">
              <Button>{t("complementos.popover_btn_more")}</Button>
            </Popover>
          </Box>
        </CardBody>
        <CardFooter>
          <figure className={bs.figure}>
            <Typography variant="caption" component="figcaption" className={bs.figcaption}>
              {t("complementos.figcaption.popover")}
            </Typography>
          </figure>
        </CardFooter>
      </Card>
      <Card>
        <CardHeader>
          <Typography variant="h3" gutterBottom>{t("complementos.section_drawer")}</Typography>
        </CardHeader>
        <CardBody>
          <Box display="flex" gap="0.5rem" flexWrap="wrap" justifyContent="center">
            <Button onClick={() => { st.setDrawerPosition("right"); st.setDrawerOpen(true); }}>{t("complementos.drawer_btn_right")}</Button>
            <Button onClick={() => { st.setDrawerPosition("left"); st.setDrawerOpen(true); }}>{t("complementos.drawer_btn_left")}</Button>
          </Box>
        </CardBody>
        <CardFooter>
          <figure className={bs.figure}>
            <Typography variant="caption" component="figcaption" className={bs.figcaption}>
              {t("complementos.figcaption.drawer")}
            </Typography>
          </figure>
        </CardFooter>
      </Card>
    </Box>
  );
}

/* ---------- Business ---------- */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function renderBusinessSection(t: T, _st: unknown, _bs: Record<string, string>) {
  return (
    <Box display="grid" gridTemplateColumns="1fr" gap="1.5rem" alignItems="start" width="100%" textAlign="left">
      <Card>
        <CardHeader>
          <Typography variant="h3" gutterBottom>{t("complementos.section_treeview")}</Typography>
        </CardHeader>
        <CardBody>
          <TreeViewDemo t={t} />
        </CardBody>
        <CardFooter>
          <figure className={cardStyles.figure}>
            <Typography variant="caption" component="figcaption" className={cardStyles.figcaption}>
              {t("complementos.figcaption.treeview")}
            </Typography>
          </figure>
        </CardFooter>
      </Card>
      <Card>
        <CardHeader>
          <Typography variant="h3" gutterBottom>{t("complementos.section_virtualized")}</Typography>
        </CardHeader>
        <CardBody>
          <VirtualizedListDemo t={t} />
        </CardBody>
        <CardFooter>
          <figure className={cardStyles.figure}>
            <Typography variant="caption" component="figcaption" className={cardStyles.figcaption}>
              {t("complementos.figcaption.virtualized")}
            </Typography>
          </figure>
        </CardFooter>
      </Card>
      <Card>
        <CardHeader>
          <Typography variant="h3" gutterBottom>{t("complementos.section_toast")}</Typography>
        </CardHeader>
        <CardBody>
          <ToastProvider>
            <ToastDemo t={t} />
          </ToastProvider>
        </CardBody>
        <CardFooter>
          <figure className={cardStyles.figure}>
            <Typography variant="caption" component="figcaption" className={cardStyles.figcaption}>
              {t("complementos.figcaption.toast")}
            </Typography>
          </figure>
        </CardFooter>
      </Card>
      <Card>
        <CardHeader>
          <Typography variant="h3" gutterBottom>{t("complementos.section_treeselect")}</Typography>
        </CardHeader>
        <CardBody>
          <TreeSelectDemo t={t} />
        </CardBody>
        <CardFooter>
          <figure className={cardStyles.figure}>
            <Typography variant="caption" component="figcaption" className={cardStyles.figcaption}>
              {t("complementos.figcaption.treeselect")}
            </Typography>
          </figure>
        </CardFooter>
      </Card>
      <Card>
        <CardHeader>
          <Typography variant="h3" gutterBottom>{t("complementos.section_splitpane")}</Typography>
        </CardHeader>
        <CardBody>
          <SplitPaneDemo />
        </CardBody>
        <CardFooter>
          <figure className={cardStyles.figure}>
            <Typography variant="caption" component="figcaption" className={cardStyles.figcaption}>
              {t("complementos.figcaption.splitpane")}
            </Typography>
          </figure>
        </CardFooter>
      </Card>
      <Card>
        <CardHeader>
          <Typography variant="h3" gutterBottom>{t("complementos.section_commandpalette")}</Typography>
        </CardHeader>
        <CardBody>
          <CommandPaletteDemo t={t} />
        </CardBody>
        <CardFooter>
          <figure className={cardStyles.figure}>
            <Typography variant="caption" component="figcaption" className={cardStyles.figcaption}>
              {t("complementos.figcaption.commandpalette")}
            </Typography>
          </figure>
        </CardFooter>
      </Card>
      <Card>
        <CardHeader>
          <Typography variant="h3" gutterBottom>{t("complementos.section_sidebar")}</Typography>
        </CardHeader>
        <CardBody>
          <SidebarDemo />
        </CardBody>
        <CardFooter>
          <figure className={cardStyles.figure}>
            <Typography variant="caption" component="figcaption" className={cardStyles.figcaption}>
              {t("complementos.figcaption.sidebar")}
            </Typography>
          </figure>
        </CardFooter>
      </Card>
    </Box>
  );
}

function TreeSelectDemo({ t }: { t: T }) {
  const [value, setValue] = useState("");
  const treeOptions: TreeNode[] = [
    {
      id: "docs", label: t("complementos.tree_node_docs"),
      children: [
        { id: "report", label: t("complementos.tree_node_report") },
        { id: "notes", label: t("complementos.tree_node_notes") },
      ],
    },
    { id: "images", label: t("complementos.tree_node_images") },
  ];
  return (
    <Box display="grid" gridTemplateColumns="1fr 1fr" gap="1rem" alignItems="start">
      <TreeSelect options={treeOptions} value={value} onChange={setValue} placeholder={t("complementos.select_placeholder_framework")} />
      <Typography variant="body2">{t("complementos.treeview_selected")} <code>{value || t("complementos.treeview_none")}</code></Typography>
    </Box>
  );
}

function SplitPaneDemo() {
  return (
    <SplitPane
      primary={
        <Box style={{ padding: "1rem", height: "100%" }}>
          <Typography variant="h6">Panel A</Typography>
          <Typography variant="body2" style={{ marginTop: "0.5rem", color: "var(--text-muted)" }}>Contenido primario — redimensioná el divisor.</Typography>
        </Box>
      }
      secondary={
        <Box style={{ padding: "1rem", height: "100%" }}>
          <Typography variant="h6">Panel B</Typography>
          <Typography variant="body2" style={{ marginTop: "0.5rem", color: "var(--text-muted)" }}>Contenido secundario.</Typography>
        </Box>
      }
    />
  );
}

function CommandPaletteDemo({ t }: { t: T }) {
  const [isOpen, setIsOpen] = useState(false);
  const commands: { heading: string; items: Command[] }[] = [
    {
      heading: t("complementos.command_nav"),
      items: [
        { id: "home", label: t("complementos.command_go_home"), shortcut: "⌘1" },
        { id: "components", label: t("complementos.command_go_components"), shortcut: "⌘2" },
      ],
    },
    {
      heading: t("complementos.command_actions"),
      items: [
        { id: "theme", label: t("complementos.command_toggle_theme"), description: t("complementos.command_theme_desc") },
        { id: "lang", label: t("complementos.command_toggle_lang"), description: t("complementos.command_lang_desc") },
      ],
    },
  ];
  return (
    <>
      <Button onClick={() => setIsOpen(true)}>⌘ {t("complementos.command_open")}</Button>
      <CommandPalette isOpen={isOpen} onClose={() => setIsOpen(false)} groups={commands} />
    </>
  );
}

function SidebarDemo() {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <Box display="flex" style={{ height: "220px", overflow: "hidden", border: "1px solid var(--border)", borderRadius: "8px" }}>
      <Sidebar isOpen={isOpen} onToggle={() => setIsOpen((prev) => !prev)}>
        <Box style={{ padding: "1rem" }}>
          <Typography variant="h6">Sidebar</Typography>
          <Typography variant="body2" style={{ marginTop: "0.5rem", color: "var(--text-muted)" }}>Contenido del panel lateral.</Typography>
        </Box>
      </Sidebar>
      <Box style={{ flex: 1, padding: "1rem", background: "var(--bg)" }}>
        <Typography variant="h6">Contenido principal</Typography>
        <Typography variant="body2" style={{ marginTop: "0.5rem", color: "var(--text-muted)" }}>El área principal se adapta automáticamente.</Typography>
      </Box>
    </Box>
  );
}

function TreeViewDemo({ t }: { t: T }) {
  const [selectedId, setSelectedId] = useState("edukuk");
  const treeData: TreeNode[] = [
    {
      id: "docs", label: t("complementos.tree_node_docs"),
      children: [
        { id: "report", label: t("complementos.tree_node_report") },
        {
          id: "projects", label: t("complementos.tree_node_projects"),
          children: [
            { id: "edukuk", label: "edukuk" },
            { id: "other", label: t("complementos.tree_node_other") },
          ],
        },
      ],
    },
    {
      id: "images", label: t("complementos.tree_node_images"),
      children: [
        { id: "screenshot", label: t("complementos.tree_node_screenshot") },
        { id: "design", label: t("complementos.tree_node_mockup") },
      ],
    },
    { id: "readme", label: t("complementos.tree_node_readme") },
  ];
  return (
    <Box display="grid" gridTemplateColumns="1fr 1fr" gap="1rem" alignItems="start">
      <TreeView data={treeData} selectedId={selectedId} onSelect={setSelectedId} defaultExpandedIds={["docs"]} />
      <Typography variant="body2">{t("complementos.treeview_selected")} <code>{selectedId || t("complementos.treeview_none")}</code></Typography>
    </Box>
  );
}

function VirtualizedListDemo({ t }: { t: T }) {
  const items = Array.from({ length: 1000 }, (_, i) => `${t("complementos.virtualized_line")} ${i + 1}`);
  return (
    <VirtualizedList
      items={items}
      itemHeight={36}
      height={250}
      renderItem={(item, index) => (
        <div style={{ padding: "0 0.75rem", lineHeight: "36px", fontSize: "0.875rem", borderBottom: "1px solid var(--border)", color: "var(--text-h)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
          <span style={{ color: "var(--accent)", marginRight: "0.5rem", fontWeight: 600 }}>{index + 1}</span>
          {item}
        </div>
      )}
    />
  );
}

function ToastDemo({ t }: { t: T }) {
  const { addToast } = useToast();
  return (
    <Box display="flex" gap="0.5rem" flexWrap="wrap">
      <Button onClick={() => addToast({ message: t("complementos.toast_default_msg") })}>Default</Button>
      <Button variant="info" onClick={() => addToast({ message: t("complementos.toast_info_msg"), variant: "info" })}>Info</Button>
      <Button variant="success" onClick={() => addToast({ message: t("complementos.toast_success_msg"), variant: "success" })}>Success</Button>
      <Button variant="warning" onClick={() => addToast({ message: t("complementos.toast_warning_msg"), variant: "warning", duration: 10000 })}>Warning</Button>
      <Button variant="danger" onClick={() => addToast({ message: t("complementos.toast_danger_msg"), variant: "danger" })}>Danger</Button>
    </Box>
  );
}

function PaginationDemo({ t }: { t?: T }) {
  const [page, setPage] = useState(1);
  const caption = t ? t("complementos.figcaption.pagination") : "💡 Pagination — page navigation with automatic ellipsis and aria-current=\"page\".";
  return (
    <Card>
      <CardHeader>
        <Typography variant="h3" gutterBottom>{t ? t("complementos.section_pagination") : "Pagination 📄"}</Typography>
      </CardHeader>
      <CardBody>
        <Box display="flex" justifyContent="center">
          <Pagination current={page} total={10} onChange={setPage} />
        </Box>
      </CardBody>
      <CardFooter>
        <figure className={cardStyles.figure}>
          <Typography variant="caption" component="figcaption" className={cardStyles.figcaption}>
            {caption}
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
