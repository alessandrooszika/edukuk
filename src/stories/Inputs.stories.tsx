import { useState } from "react";
import { Input } from "../components/input";
import { Textarea } from "../components/textarea";
import { Select } from "../components/select";
import { Autocomplete } from "../components/autocomplete";
import { PasswordInput } from "../components/password-input";
import { SearchInput } from "../components/search-input";
import { NumberInput } from "../components/number-input";
import { DateInput } from "../components/date-input";
import { ColorInput } from "../components/color-input";
import { RangeInput } from "../components/range-input";
import { FileInput } from "../components/file-input";
import { FormField } from "../components/form-field";
import { FormGroup } from "../components/form-group";

export default { title: "Inputs" };

export const InputDefault = () => <Input placeholder="Type something..." />;
export const InputWithLabel = () => (
  <FormField label="Username" htmlFor="input-label">
    <Input id="input-label" placeholder="Enter username" />
  </FormField>
);
export const InputWithError = () => (
  <FormField label="Email" htmlFor="input-error" error="Invalid email">
    <Input id="input-error" value="bad" onChange={() => {}} />
  </FormField>
);
export const InputVariants = () => (
  <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
    <FormField label="Outlined" htmlFor="input-outlined">
      <Input id="input-outlined" placeholder="Outlined" design="outlined" />
    </FormField>
    <FormField label="Filled" htmlFor="input-filled">
      <Input id="input-filled" placeholder="Filled" design="filled" />
    </FormField>
    <FormField label="Standard" htmlFor="input-standard">
      <Input id="input-standard" placeholder="Standard" design="standard" />
    </FormField>
  </div>
);

export const TextareaDefault = () => <Textarea placeholder="Write something..." />;
export const TextareaWithLabel = () => <Textarea label="Description" placeholder="Enter description" />;

const selectOptions = ["React", "Vue", "Angular", "Svelte"];
export const SelectDefault = () => {
  const [v, setV] = useState("");
  return <Select options={selectOptions} value={v} onChange={setV} placeholder="Pick a framework" />;
};
export const SelectWithLabel = () => {
  const [v, setV] = useState("");
  return <Select options={selectOptions} value={v} onChange={setV} label="Framework" placeholder="Pick..." />;
};

const autocompleteOptions = ["JavaScript", "TypeScript", "Python", "Rust", "Go"];
export const AutocompleteDefault = () => {
  const [v, setV] = useState("");
  return <Autocomplete options={autocompleteOptions} value={v} onChange={setV} />;
};
export const AutocompleteWithLabel = () => {
  const [v, setV] = useState("");
  return <Autocomplete options={autocompleteOptions} value={v} onChange={setV} label="Language" />;
};

export const PasswordInputDefault = () => <PasswordInput />;
export const PasswordInputWithLabel = () => <PasswordInput label="Password" />;

export const SearchInputDefault = () => <SearchInput />;
export const SearchInputWithValue = () => {
  const [v, setV] = useState("react");
  return <SearchInput value={v} onChange={(e) => setV(e.target.value)} />;
};

export const NumberInputDefault = () => <NumberInput />;
export const NumberInputSteppers = () => <NumberInput label="Quantity" min={0} max={10} />;

export const DateInputDefault = () => <DateInput />;
export const DateInputWithLabel = () => <DateInput label="Birth date" />;

export const ColorInputDefault = () => <ColorInput />;
export const ColorInputWithLabel = () => <ColorInput label="Accent color" />;

export const RangeInputDefault = () => <RangeInput />;
export const RangeInputWithValue = () => <RangeInput label="Volume" min={0} max={100} showValue />;

export const FileInputDefault = () => <FileInput />;
export const FileInputWithAccept = () => <FileInput accept="image/*" label="Upload image" />;

export const FormFieldDefault = () => (
  <FormField label="Username" htmlFor="user" error="Required">
    <Input id="user" placeholder="Enter username" />
  </FormField>
);

export const FormGroupDefault = () => (
  <FormGroup legend="Personal info">
    <FormField label="Name" htmlFor="name">
      <Input id="name" placeholder="Your name" />
    </FormField>
    <FormField label="Email" htmlFor="email">
      <Input id="email" type="email" placeholder="your@email.com" />
    </FormField>
  </FormGroup>
);
