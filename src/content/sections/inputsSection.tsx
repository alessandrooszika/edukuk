/* eslint-disable react-refresh/only-export-components */

import { useState } from "react";
import { Box } from "../../components/box";
import { Typography } from "../../components/typography";
import { Card, CardHeader, CardBody, CardFooter } from "../../components/card";
import { Input } from "../../components/input";
import { Autocomplete } from "../../components/autocomplete";
import { Select } from "../../components/select";
import { Textarea } from "../../components/textarea";
import { PasswordInput } from "../../components/password-input";
import { SearchInput } from "../../components/search-input";
import { NumberInput } from "../../components/number-input";
import { DateInput } from "../../components/date-input";
import { ColorInput } from "../../components/color-input";
import { RangeInput } from "../../components/range-input";
import { FileInput } from "../../components/file-input";
import { FormField } from "../../components/form-field";
import { FormGroup } from "../../components/form-group";
import { RevealCard } from "../../components/reveal-card";
import type { T } from "./categories";
import type { InputsState } from "./types";

export function renderInputsSection(t: T, st: InputsState, bs: Record<string, string>) {
  return (
    <Box display="grid" gridTemplateColumns="1fr" gap="1.5rem" alignItems="start" width="100%" textAlign="left">
      <RevealCard><Card>
        <CardHeader>
          <Typography variant="h3" gutterBottom>{t("complementos.section_input")}</Typography>
        </CardHeader>
        <CardBody>
          <FormField label={t("complementos.input_label_base")} htmlFor="input-base">
            <Input id="input-base" value={st.inputValue} onChange={(e) => st.setInputValue(e.target.value)} placeholder={t("complementos.input_placeholder")} />
          </FormField>
          <InputSizes />
          <InputVariants />
          <InputErrorDemo t={t} />
          <InputDesigns t={t} />
        </CardBody>
        <CardFooter>
          <figure className={bs.figure}>
            <Typography variant="caption" component="figcaption" className={bs.figcaption}>
              {t("complementos.figcaption.input")}
            </Typography>
          </figure>
        </CardFooter>
      </Card></RevealCard>
      <RevealCard><Card>
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
      </Card></RevealCard>
      <RevealCard><Card>
        <CardHeader>
          <Typography variant="h3" gutterBottom>{t("complementos.section_select")}</Typography>
        </CardHeader>
        <CardBody>
          <Box display="flex" gap="0.5rem" flexWrap="wrap" justifyContent="center">
            <Select options={["React", "Vue", "Svelte", "Angular", "Solid"]} value={st.selectFramework} onChange={st.setSelectFramework} placeholder={t("complementos.select_placeholder_framework")} label={t("complementos.select_label_framework")} />
          </Box>
          <SelectVariantsDemo />
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
      </Card></RevealCard>
      <RevealCard><Card>
        <CardHeader>
          <Typography variant="h3" gutterBottom>{t("complementos.section_textarea")}</Typography>
        </CardHeader>
        <CardBody>
          <Textarea value={st.textareaValue} onChange={(e) => st.setTextareaValue(e.target.value)} placeholder={t("complementos.textarea_placeholder")} label={t("complementos.textarea_label")} />
          <TextareaSizes />
          <TextareaVariants />
          <TextareaErrorDemo t={t} />
        </CardBody>
        <CardFooter>
          <figure className={bs.figure}>
            <Typography variant="caption" component="figcaption" className={bs.figcaption}>
              {t("complementos.figcaption.textarea")}
            </Typography>
          </figure>
        </CardFooter>
      </Card></RevealCard>
      <RevealCard><Card>
        <CardHeader>
          <Typography variant="h3" gutterBottom>{t("complementos.section_password")}</Typography>
        </CardHeader>
        <CardBody>
          <PasswordInput value={st.passwordValue} onChange={(e) => st.setPasswordValue(e.target.value)} placeholder={t("complementos.password_placeholder")} label={t("complementos.password_label")} />
          <PasswordSizes />
          <PasswordErrorDemo t={t} />
        </CardBody>
        <CardFooter>
          <figure className={bs.figure}>
            <Typography variant="caption" component="figcaption" className={bs.figcaption}>
              {t("complementos.figcaption.password")}
            </Typography>
          </figure>
        </CardFooter>
      </Card></RevealCard>
      <RevealCard><Card>
        <CardHeader>
          <Typography variant="h3" gutterBottom>{t("complementos.section_search")}</Typography>
        </CardHeader>
        <CardBody>
          <SearchInput value={st.searchValue} onChange={(e) => st.setSearchValue(e.target.value)} onClear={() => st.setSearchValue("")} placeholder={t("complementos.search_placeholder")} label={t("complementos.search_label")} />
          <SearchSizes />
          <SearchWithValue />
        </CardBody>
        <CardFooter>
          <figure className={bs.figure}>
            <Typography variant="caption" component="figcaption" className={bs.figcaption}>
              {t("complementos.figcaption.search")}
            </Typography>
          </figure>
        </CardFooter>
      </Card></RevealCard>
      <RevealCard><Card>
        <CardHeader>
          <Typography variant="h3" gutterBottom>{t("complementos.section_number")}</Typography>
        </CardHeader>
        <CardBody>
          <NumberInput value={st.numberValue} onChange={(e) => st.setNumberValue(Number(e.target.value))} label={t("complementos.number_label")} min={0} max={100} />
          <NumberSizes />
          <NumberVariants />
        </CardBody>
        <CardFooter>
          <figure className={bs.figure}>
            <Typography variant="caption" component="figcaption" className={bs.figcaption}>
              {t("complementos.figcaption.number")}
            </Typography>
          </figure>
        </CardFooter>
      </Card></RevealCard>
      <RevealCard><Card>
        <CardHeader>
          <Typography variant="h3" gutterBottom>{t("complementos.section_date")}</Typography>
        </CardHeader>
        <CardBody>
          <DateInput value={st.dateValue} onChange={(e) => st.setDateValue(e.target.value)} label={t("complementos.date_label")} />
          <DateSizes />
        </CardBody>
        <CardFooter>
          <figure className={bs.figure}>
            <Typography variant="caption" component="figcaption" className={bs.figcaption}>
              {t("complementos.figcaption.date")}
            </Typography>
          </figure>
        </CardFooter>
      </Card></RevealCard>
      <RevealCard><Card>
        <CardHeader>
          <Typography variant="h3" gutterBottom>{t("complementos.section_color")}</Typography>
        </CardHeader>
        <CardBody>
          <ColorInput value={st.colorValue} onChange={(e) => st.setColorValue(e.target.value)} label={t("complementos.color_label")} />
          <ColorSizes />
          <ColorVariants />
        </CardBody>
        <CardFooter>
          <figure className={bs.figure}>
            <Typography variant="caption" component="figcaption" className={bs.figcaption}>
              {t("complementos.figcaption.color")}
            </Typography>
          </figure>
        </CardFooter>
      </Card></RevealCard>
      <RevealCard><Card>
        <CardHeader>
          <Typography variant="h3" gutterBottom>{t("complementos.section_range")}</Typography>
        </CardHeader>
        <CardBody>
          <RangeInput value={st.rangeValue} onChange={(e) => st.setRangeValue(Number(e.target.value))} label={t("complementos.range_label_volumen")} showValue min={0} max={100} />
          <RangeSizes />
          <RangeVariants />
        </CardBody>
        <CardFooter>
          <figure className={bs.figure}>
            <Typography variant="caption" component="figcaption" className={bs.figcaption}>
              {t("complementos.figcaption.range")}
            </Typography>
          </figure>
        </CardFooter>
      </Card></RevealCard>
      <RevealCard><Card>
        <CardHeader>
          <Typography variant="h3" gutterBottom>{t("complementos.section_file")}</Typography>
        </CardHeader>
        <CardBody>
          <FileInput label={t("complementos.file_label")} accept=".pdf,.jpg,.png" onChange={(files) => console.log("Archivos:", files)} />
          <FileMultipleDemo t={t} />
        </CardBody>
        <CardFooter>
          <figure className={bs.figure}>
            <Typography variant="caption" component="figcaption" className={bs.figcaption}>
              {t("complementos.figcaption.file")}
            </Typography>
          </figure>
        </CardFooter>
      </Card></RevealCard>
      <RevealCard><Card>
        <CardHeader>
          <Typography variant="h3" gutterBottom>{t("complementos.section_form")}</Typography>
        </CardHeader>
        <CardBody>
          <FormDemo t={t} />
        </CardBody>
        <CardFooter>
          <figure className={bs.figure}>
            <Typography variant="caption" component="figcaption" className={bs.figcaption}>
              {t("complementos.figcaption.form")}
            </Typography>
          </figure>
        </CardFooter>
      </Card></RevealCard>
    </Box>
  );
}

/* ---------- mini-demos ---------- */

function InputSizes() {
  const [sm, setSm] = useState("");
  const [md, setMd] = useState("");
  const [lg, setLg] = useState("");
  return (
    <Box display="flex" gap="0.5rem" flexWrap="wrap">
      <Input value={sm} onChange={(e) => setSm(e.target.value)} placeholder="sm" size="sm" />
      <Input value={md} onChange={(e) => setMd(e.target.value)} placeholder="md" size="md" />
      <Input value={lg} onChange={(e) => setLg(e.target.value)} placeholder="lg" size="lg" />
    </Box>
  );
}

function InputVariants() {
  const [info, setInfo] = useState("");
  const [success, setSuccess] = useState("");
  const [warning, setWarning] = useState("");
  const [danger, setDanger] = useState("");
  return (
    <Box display="flex" gap="0.5rem" flexWrap="wrap">
      <Input value={info} onChange={(e) => setInfo(e.target.value)} placeholder="Info" variant="info" />
      <Input value={success} onChange={(e) => setSuccess(e.target.value)} placeholder="Success" variant="success" />
      <Input value={warning} onChange={(e) => setWarning(e.target.value)} placeholder="Warning" variant="warning" />
      <Input value={danger} onChange={(e) => setDanger(e.target.value)} placeholder="Danger" variant="danger" />
    </Box>
  );
}

function InputErrorDemo({ t }: { t: T }) {
  const [value, setValue] = useState("");
  return (
    <Input value={value} onChange={(e) => setValue(e.target.value)}
      placeholder={t("complementos.input_error")}
      error={t("complementos.input_error")} />
  );
}

function InputDesigns({ t }: { t: T }) {
  const [outlined, setOutlined] = useState("");
  const [filled, setFilled] = useState("");
  const [standard, setStandard] = useState("");
  return (
    <Box display="flex" gap="0.5rem" flexWrap="wrap">
      <FormField label="Outlined" htmlFor="input-outlined">
        <Input id="input-outlined" value={outlined} onChange={(e) => setOutlined(e.target.value)} placeholder={t("complementos.input_placeholder_outlined")} />
      </FormField>
      <FormField label="Filled" htmlFor="input-filled">
        <Input id="input-filled" value={filled} onChange={(e) => setFilled(e.target.value)} design="filled" placeholder={t("complementos.input_placeholder_filled")} />
      </FormField>
      <FormField label="Standard" htmlFor="input-standard">
        <Input id="input-standard" value={standard} onChange={(e) => setStandard(e.target.value)} design="standard" placeholder={t("complementos.input_placeholder_standard")} />
      </FormField>
    </Box>
  );
}

function SelectVariantsDemo() {
  const [normal, setNormal] = useState("");
  const [info, setInfo] = useState("");
  return (
    <Box display="flex" gap="1rem" alignItems="center" justifyContent="center" mb="1rem">
      <Select options={["Opción A", "Opción B", "Opción C"]} value={normal} onChange={setNormal} placeholder="Normal" />
      <Select options={["Info", "Success", "Warning", "Danger"]} value={info} onChange={setInfo} variant="info" placeholder="Info" />
    </Box>
  );
}

function TextareaSizes() {
  const [sm, setSm] = useState("");
  const [md, setMd] = useState("");
  const [lg, setLg] = useState("");
  return (
    <Box display="flex" gap="0.5rem" flexWrap="wrap">
      <Textarea value={sm} onChange={(e) => setSm(e.target.value)} placeholder="sm" size="sm" />
      <Textarea value={md} onChange={(e) => setMd(e.target.value)} placeholder="md" size="md" />
      <Textarea value={lg} onChange={(e) => setLg(e.target.value)} placeholder="lg" size="lg" />
    </Box>
  );
}

function TextareaVariants() {
  const [info, setInfo] = useState("");
  const [success, setSuccess] = useState("");
  return (
    <Box display="flex" gap="0.5rem" flexWrap="wrap">
      <Textarea value={info} onChange={(e) => setInfo(e.target.value)} placeholder="Info" variant="info" />
      <Textarea value={success} onChange={(e) => setSuccess(e.target.value)} placeholder="Success" variant="success" />
    </Box>
  );
}

function TextareaErrorDemo({ t }: { t: T }) {
  const [value, setValue] = useState("");
  return (
    <Textarea value={value} onChange={(e) => setValue(e.target.value)}
      placeholder={t("complementos.textarea_error")}
      error={t("complementos.textarea_error")} />
  );
}

function PasswordSizes() {
  const [sm, setSm] = useState("");
  const [md, setMd] = useState("");
  const [lg, setLg] = useState("");
  return (
    <Box display="flex" gap="0.5rem" flexWrap="wrap">
      <PasswordInput value={sm} onChange={(e) => setSm(e.target.value)} placeholder="sm" size="sm" />
      <PasswordInput value={md} onChange={(e) => setMd(e.target.value)} placeholder="md" size="md" />
      <PasswordInput value={lg} onChange={(e) => setLg(e.target.value)} placeholder="lg" size="lg" />
    </Box>
  );
}

function PasswordErrorDemo({ t }: { t: T }) {
  const [value, setValue] = useState("");
  return (
    <PasswordInput value={value} onChange={(e) => setValue(e.target.value)}
      placeholder={t("complementos.password_error")}
      error={t("complementos.password_error")} />
  );
}

function SearchSizes() {
  const [sm, setSm] = useState("");
  const [md, setMd] = useState("");
  const [lg, setLg] = useState("");
  return (
    <Box display="flex" gap="0.5rem" flexWrap="wrap">
      <SearchInput value={sm} onChange={(e) => setSm(e.target.value)} placeholder="sm" size="sm" />
      <SearchInput value={md} onChange={(e) => setMd(e.target.value)} placeholder="md" size="md" />
      <SearchInput value={lg} onChange={(e) => setLg(e.target.value)} placeholder="lg" size="lg" />
    </Box>
  );
}

function SearchWithValue() {
  const [value, setValue] = useState("Con valor");
  return (
    <Box display="flex" gap="0.5rem" flexWrap="wrap">
      <SearchInput value={value} onChange={(e) => setValue(e.target.value)} onClear={() => setValue("")} placeholder="..." />
    </Box>
  );
}

function NumberSizes() {
  const [sm, setSm] = useState(0);
  const [md, setMd] = useState(0);
  const [lg, setLg] = useState(0);
  return (
    <Box display="flex" gap="0.5rem" flexWrap="wrap">
      <NumberInput value={sm} onChange={(e) => setSm(Number(e.target.value))} placeholder="sm" size="sm" min={0} />
      <NumberInput value={md} onChange={(e) => setMd(Number(e.target.value))} placeholder="md" size="md" min={0} />
      <NumberInput value={lg} onChange={(e) => setLg(Number(e.target.value))} placeholder="lg" size="lg" min={0} />
    </Box>
  );
}

function NumberVariants() {
  const [info, setInfo] = useState(0);
  const [success, setSuccess] = useState(0);
  const [danger, setDanger] = useState(0);
  return (
    <Box display="flex" gap="0.5rem" flexWrap="wrap">
      <NumberInput value={info} onChange={(e) => setInfo(Number(e.target.value))} min={0} variant="info" />
      <NumberInput value={success} onChange={(e) => setSuccess(Number(e.target.value))} min={0} variant="success" />
      <NumberInput value={danger} onChange={(e) => setDanger(Number(e.target.value))} min={0} variant="danger" />
    </Box>
  );
}

function DateSizes() {
  const [sm, setSm] = useState("");
  const [md, setMd] = useState("");
  const [lg, setLg] = useState("");
  return (
    <Box display="flex" gap="0.5rem" flexWrap="wrap">
      <DateInput value={sm} onChange={(e) => setSm(e.target.value)} size="sm" />
      <DateInput value={md} onChange={(e) => setMd(e.target.value)} size="md" />
      <DateInput value={lg} onChange={(e) => setLg(e.target.value)} size="lg" />
    </Box>
  );
}

function ColorSizes() {
  const [sm, setSm] = useState("#ef4444");
  const [md, setMd] = useState("#22c55e");
  const [lg, setLg] = useState("#3b82f6");
  return (
    <Box display="flex" gap="0.5rem" flexWrap="wrap">
      <ColorInput value={sm} onChange={(e) => setSm(e.target.value)} size="sm" />
      <ColorInput value={md} onChange={(e) => setMd(e.target.value)} size="md" />
      <ColorInput value={lg} onChange={(e) => setLg(e.target.value)} size="lg" />
    </Box>
  );
}

function ColorVariants() {
  const [info, setInfo] = useState("#f472b6");
  const [success, setSuccess] = useState("#eab308");
  const [danger, setDanger] = useState("#a855f7");
  return (
    <Box display="flex" gap="0.5rem" flexWrap="wrap">
      <ColorInput value={info} onChange={(e) => setInfo(e.target.value)} variant="info" />
      <ColorInput value={success} onChange={(e) => setSuccess(e.target.value)} variant="success" />
      <ColorInput value={danger} onChange={(e) => setDanger(e.target.value)} variant="danger" />
    </Box>
  );
}

function RangeSizes() {
  const [sm, setSm] = useState(30);
  const [md, setMd] = useState(60);
  const [lg, setLg] = useState(85);
  return (
    <Box display="flex" flexDirection="column" gap="0.5rem">
      <RangeInput value={sm} onChange={(e) => setSm(Number(e.target.value))} size="sm" label="sm" />
      <RangeInput value={md} onChange={(e) => setMd(Number(e.target.value))} size="md" label="md" />
      <RangeInput value={lg} onChange={(e) => setLg(Number(e.target.value))} size="lg" label="lg" />
    </Box>
  );
}

function RangeVariants() {
  const [info, setInfo] = useState(40);
  const [success, setSuccess] = useState(70);
  const [warning, setWarning] = useState(20);
  const [danger, setDanger] = useState(90);
  return (
    <Box display="flex" flexDirection="column" gap="0.5rem">
      <RangeInput value={info} onChange={(e) => setInfo(Number(e.target.value))} variant="info" />
      <RangeInput value={success} onChange={(e) => setSuccess(Number(e.target.value))} variant="success" />
      <RangeInput value={warning} onChange={(e) => setWarning(Number(e.target.value))} variant="warning" />
      <RangeInput value={danger} onChange={(e) => setDanger(Number(e.target.value))} variant="danger" />
    </Box>
  );
}

function FileMultipleDemo({ t }: { t: T }) {
  const [files, setFiles] = useState<File[]>([]);
  return (
    <Box display="flex" gap="0.5rem" flexWrap="wrap" justifyContent="center">
      <Box style={{ flex: 1 }}>
        <FileInput label="Múltiples archivos" multiple onChange={(selected) => setFiles(Array.from(selected))}>
          <Typography variant="body2" component="span">
            {files.length > 0
              ? `${files.length} archivo(s) seleccionado(s)`
              : <span dangerouslySetInnerHTML={{ __html: t("complementos.file_multiple_hint") }} />
            }
          </Typography>
        </FileInput>
      </Box>
    </Box>
  );
}

function FormDemo({ t }: { t: T }) {
  const [nameValue, setNameValue] = useState("");
  const [emailValue, setEmailValue] = useState("mal-formato");
  const [countryValue, setCountryValue] = useState("");
  const [commentsValue, setCommentsValue] = useState("");
  return (
    <FormGroup legend={t("complementos.form_legend")}>
      <FormField label={t("complementos.form_label_name")} htmlFor="ff-name" helperText={t("complementos.form_helper_name")}>
        <Input id="ff-name" value={nameValue} onChange={(e) => setNameValue(e.target.value)} placeholder={t("complementos.form_placeholder_name")} />
      </FormField>
      <FormField label={t("complementos.form_label_email")} htmlFor="ff-email" error={t("complementos.form_error_email")}>
        <Input id="ff-email" value={emailValue} onChange={(e) => setEmailValue(e.target.value)} error={t("complementos.form_error_email")} />
      </FormField>
      <FormField label={t("complementos.form_label_country")} htmlFor="ff-country" required>
        <Input id="ff-country" value={countryValue} onChange={(e) => setCountryValue(e.target.value)} placeholder={t("complementos.form_placeholder_country")} />
      </FormField>
      <FormField label={t("complementos.form_label_comments")} helperText={t("complementos.form_helper_comments")}>
        <Textarea value={commentsValue} onChange={(e) => setCommentsValue(e.target.value)} placeholder={t("complementos.textarea_placeholder")} />
      </FormField>
    </FormGroup>
  );
}
