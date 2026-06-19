// @vitest-environment jsdom
import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import AuthModal from "@/components/auth/auth-modal";

const mockClose = vi.fn();
const mockSetView = vi.fn();

let mockIsOpen = true;
let mockView: "login" | "register" = "login";

vi.mock("@/hooks/use-auth-modal", () => ({
  default: () => ({
    isOpen: mockIsOpen,
    view: mockView,
    close: mockClose,
    setView: mockSetView,
  }),
}));

vi.mock("@/components/auth/register-form", () => ({
  default: () => <div data-testid="register-form" />,
}));

describe("AuthModal", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockIsOpen = true;
    mockView = "login";
  });

  it("does not render dialog content when isOpen is false", () => {
    mockIsOpen = false;
    render(<AuthModal />);
    expect(screen.queryByTestId("login-form")).not.toBeInTheDocument;
    expect(screen.queryByTestId("register-form")).not.toBeInTheDocument;
  });

  it("renders LoginForm and correct title when view is login", () => {
    mockView = "login";
    render(<AuthModal />);
    expect(screen.queryByTestId("login")).toBeInTheDocument;
    expect(screen.queryByTestId("register-form")).not.toBeInTheDocument;
    expect(screen.getByText("Sign in to MusicHub")).toBeInTheDocument;
  });

  it("renders RegisterForm and correct title when view is login", () => {
    mockView = "register";
    render(<AuthModal />);
    expect(screen.getByTestId("register-form")).toBeInTheDocument;
    expect(screen.queryByTestId("login-form")).not.toBeInTheDocument;
    expect(screen.getByText("Create your account")).toBeInTheDocument;
  });

  it("calls setView with register when toggled from login view", async () => {
    mockView = "login";
    const user = userEvent.setup();
    render(<AuthModal />);
    await user.click(screen.getByText("Don't have an account? Register"));
    expect(mockSetView).toHaveBeenCalledWith("register");
  });

  it("calls close when dialog is dismissed (onOpenChange false)", async () => {
    const user = userEvent.setup();
    render(<AuthModal />);
    await user.keyboard("{Escape}");
    expect(mockClose).toHaveBeenCalled();
  });
});
