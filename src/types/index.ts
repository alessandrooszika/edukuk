export type Variant = "default" | "info" | "success" | "warning" | "danger";
export type Size = "sm" | "md" | "lg";
export type ModalSize = "sm" | "md" | "lg" | "xl";
export type AlertVariant = "info" | "success" | "warning" | "danger";
export type AlertPosition = "top-right" | "top-left" | "bottom-right" | "bottom-left";
export type InputDesign = "outlined" | "filled" | "standard";

export interface Skill {
  name: string;
  value: number;
}

export interface AccordionItem {
  question: string;
  answer: string;
}
