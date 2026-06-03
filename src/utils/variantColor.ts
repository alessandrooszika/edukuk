import type { Variant } from "../types";

export function getAccentColor(variant: Variant): string {
  return variant === "default" ? "var(--accent)" : `var(--${variant})`;
}
