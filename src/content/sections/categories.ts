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
export type T = (k: string, opts?: Record<string, unknown>) => string;
