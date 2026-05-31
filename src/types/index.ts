export type Variant = "default" | "info" | "success" | "warning" | "danger";
export type Size = "sm" | "md" | "lg";
export type ModalSize = "sm" | "md" | "lg" | "xl";
export type AlertVariant = "info" | "success" | "warning" | "danger";
export type AlertPosition = "top-right" | "top-left" | "bottom-right" | "bottom-left";
export type InputDesign = "outlined" | "filled" | "standard";
export type TypographyVariant = "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "body1" | "body2" | "caption" | "code";

export interface Skill {
  name: string;
  value: number;
}

export interface AccordionItem {
  question: string;
  answer: string;
}
