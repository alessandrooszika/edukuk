import { render, screen, fireEvent } from "@testing-library/react";
import { LanguageSwitcher } from "./LanguageSwitcher";

const mockChangeLanguage = vi.fn();

vi.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string) => key,
    i18n: { language: "es", changeLanguage: mockChangeLanguage },
  }),
}));

describe("LanguageSwitcher", () => {
  beforeEach(() => {
    mockChangeLanguage.mockClear();
  });

  it("renderiza boton mostrando EN cuando el idioma es espanol", () => {
    render(<LanguageSwitcher />);
    expect(screen.getByRole("button", { name: /language.switch_to_en/i })).toBeInTheDocument();
    expect(screen.getByText("EN")).toBeInTheDocument();
  });

  it("cambia a ingles al hacer clic y persiste en localStorage", () => {
    render(<LanguageSwitcher />);
    fireEvent.click(screen.getByRole("button"));
    expect(mockChangeLanguage).toHaveBeenCalledWith("en");
    expect(localStorage.getItem("lang")).toBe("en");
  });

  it("renderiza boton con aria-label", () => {
    render(<LanguageSwitcher />);
    expect(screen.getByRole("button")).toHaveAttribute("aria-label");
  });
});
