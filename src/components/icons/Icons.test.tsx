import { render } from "@testing-library/react";
import {
  MenuIcon, SearchIcon, ClearIcon, EyeIcon, EyeOffIcon,
  SunIcon, MoonIcon, ChevronUpIcon, ChevronDownIcon,
  CalendarIcon, UploadIcon, FileIcon, CheckIcon,
  InfoIcon, SuccessIcon, WarningIcon, ErrorIcon,
  CloseIcon,
} from "./Icons";

describe("Icons", () => {
  const icons = [
    ["MenuIcon", MenuIcon],
    ["SearchIcon", SearchIcon],
    ["ClearIcon", ClearIcon],
    ["EyeIcon", EyeIcon],
    ["EyeOffIcon", EyeOffIcon],
    ["SunIcon", SunIcon],
    ["MoonIcon", MoonIcon],
    ["ChevronUpIcon", ChevronUpIcon],
    ["ChevronDownIcon", ChevronDownIcon],
    ["CalendarIcon", CalendarIcon],
    ["UploadIcon", UploadIcon],
    ["FileIcon", FileIcon],
    ["CheckIcon", CheckIcon],
    ["InfoIcon", InfoIcon],
    ["SuccessIcon", SuccessIcon],
    ["WarningIcon", WarningIcon],
    ["ErrorIcon", ErrorIcon],
    ["CloseIcon", CloseIcon],
  ] as const;

  it.each(icons)("%s renderiza svg con aria-hidden", (_, Icon) => {
    const { container } = render(<Icon />);
    const svg = container.querySelector("svg");
    expect(svg).toBeInTheDocument();
    expect(svg).toHaveAttribute("aria-hidden", "true");
  });

  it("aplica size personalizado", () => {
    const { container } = render(<MenuIcon size={32} />);
    const svg = container.querySelector("svg");
    expect(svg).toHaveAttribute("width", "32");
    expect(svg).toHaveAttribute("height", "32");
  });
});
