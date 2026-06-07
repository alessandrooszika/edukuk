import { useState } from "react";
import { Select } from "../select";
import { Switch } from "../switch";
import { Input } from "../input/Input";
import { ColorInput } from "../color-input";
import styles from "./Playground.module.css";

export interface ControlDef {
  name: string;
  type: "select" | "boolean" | "number" | "text" | "color";
  label: string;
  options?: string[];
  min?: number;
  max?: number;
  step?: number;
}

interface PlaygroundProps {
  children: (props: Record<string, unknown>) => React.ReactNode;
  controls: ControlDef[];
  defaultValues?: Record<string, unknown>;
}

function ControlInput({
  def,
  value,
  onChange,
}: {
  def: ControlDef;
  value: unknown;
  onChange: (name: string, value: unknown) => void;
}) {
  if (def.type === "select") {
    return (
      <Select
        options={def.options ?? []}
        value={String(value ?? "")}
        onChange={(v) => onChange(def.name, v)}
        size="sm"
        className={styles.controlSelect}
      />
    );
  }

  if (def.type === "boolean") {
    return (
      <Switch
        checked={Boolean(value)}
        onChange={(v) => onChange(def.name, v)}
        size="sm"
      />
    );
  }

  if (def.type === "number") {
    return (
      <Input
        type="number"
        value={value != null ? String(value) : "0"}
        onChange={(e) => onChange(def.name, Number(e.target.value))}
        min={def.min}
        max={def.max}
        step={def.step}
        size="sm"
        className={styles.controlInput}
      />
    );
  }

  if (def.type === "color") {
    return (
      <ColorInput
        value={String(value ?? "#000000")}
        onChange={(e) => onChange(def.name, e.target.value)}
        size="sm"
        className={styles.controlColor}
      />
    );
  }

  return (
    <Input
      type="text"
      value={String(value ?? "")}
      onChange={(e) => onChange(def.name, e.target.value)}
      size="sm"
      className={styles.controlInput}
    />
  );
}

export const Playground = ({ children, controls, defaultValues = {} }: PlaygroundProps) => {
  const initial = {} as Record<string, unknown>;
  for (const c of controls) {
    initial[c.name] = c.name in defaultValues ? defaultValues[c.name] : undefined;
  }
  const [props, setProps] = useState<Record<string, unknown>>(initial);

  const update = (name: string, value: unknown) => {
    setProps((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className={styles.playground}>
      <div className={styles.header}>
        <span className={styles.headerDot} />
        <span className={styles.headerLabel}>Playground</span>
      </div>
      <div className={styles.preview}>
        {children(props)}
      </div>
      <div className={styles.controls}>
        {controls.map((def) => (
          <div key={def.name} className={styles.control}>
            <span className={styles.controlLabel}>{def.label}</span>
            <ControlInput def={def} value={props[def.name]} onChange={update} />
          </div>
        ))}
      </div>
    </div>
  );
};
