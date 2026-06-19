// @vitest-environment jsdom
import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Navbar from "@/components/common/navbar";

const mockOpen = vi.fn();

vi.mock("@/hooks/use-auth-modal", () => ({
  default: () => ({
    open: mockOpen,
  }),
}));

vi.mock("next/image", () => ({
  default: (props: React.ComponentProps<"img">) => <img {...props} />,
}));

describe("Navbar", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders the logo and app name", () => {
    render(<Navbar />);

    expect(screen.getByAltText("App logo")).toBeInTheDocument();
    expect(screen.getByText("MusicHub")).toBeInTheDocument();
  });

  it("calls open('login') when Login button is clicked", async () => {
    const user = userEvent.setup();
    render(<Navbar />);

    await user.click(screen.getByRole("button", { name: "Login" }));

    expect(mockOpen).toHaveBeenCalledWith("login");
  });

  it("calls open('register') when Register button is clicked", async () => {
    const user = userEvent.setup();
    render(<Navbar />);

    await user.click(screen.getByRole("button", { name: "Register" }));

    expect(mockOpen).toHaveBeenCalledWith("register");
  });
});
