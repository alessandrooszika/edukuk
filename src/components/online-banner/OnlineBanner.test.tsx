import { render, screen } from "@testing-library/react";
import { OnlineBanner } from "./OnlineBanner";

const mockOnlineStatus = vi.fn();

vi.mock("../../hooks/useOnlineStatus", () => ({
  useOnlineStatus: () => mockOnlineStatus(),
}));

describe("OnlineBanner", () => {
  afterEach(() => {
    mockOnlineStatus.mockReset();
  });

  it("no renderiza nada cuando está online", () => {
    mockOnlineStatus.mockReturnValue(true);
    const { container } = render(<OnlineBanner />);
    expect(container.firstChild).toBeNull();
  });

  it("renderiza banner cuando está offline", () => {
    mockOnlineStatus.mockReturnValue(false);
    render(<OnlineBanner />);
    expect(screen.getByRole("alert")).toBeInTheDocument();
  });

  it("muestra el mensaje de traducción", () => {
    mockOnlineStatus.mockReturnValue(false);
    render(<OnlineBanner />);
    expect(screen.getByText("online_banner.message")).toBeInTheDocument();
  });
});
