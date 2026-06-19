// @vitest-environment jsdom
import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import LoginForm from "@/components/auth/login-form";

const mockLogin = vi.fn();
const mockClose = vi.fn();

vi.mock("@/hooks/use-login", () => ({
  default: () => ({
    login: mockLogin,
    isLoading: false,
  }),
}));

vi.mock("@/hooks/use-auth-modal", () => ({
  default: () => ({
    close: mockClose,
  }),
}));

vi.mock("sonner", () => ({
  toast: { error: vi.fn(), success: vi.fn() },
}));

describe("LoginForm", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("shows inline error for invalid email without submitting", async () => {
    const user = userEvent.setup();
    render(<LoginForm />);

    const emailInput = screen.getByLabelText(/email/i);
    await user.type(emailInput, "not-an-email");
    await user.tab();

    await waitFor(() => {
      expect(screen.getByText(/invalid email/i)).toBeDefined();
      expect(emailInput).toHaveAttribute("aria-invalid", "true");
    });

    expect(mockLogin).not.toHaveBeenCalled();
  });

  it("shows inline error for empty password without submitting", async () => {
    const user = userEvent.setup();
    render(<LoginForm />);

    const passwordInput = screen.getByLabelText(/password/i);
    await user.click(passwordInput);
    await user.tab();

    await waitFor(() => {
      expect(screen.getByText(/password is required/i)).toBeDefined();
      expect(passwordInput).toHaveAttribute("aria-invalid", "true");
    });

    expect(mockLogin).not.toHaveBeenCalled();
  });

  it("does not show field errors for valid input", async () => {
    const user = userEvent.setup();
    render(<LoginForm />);

    await user.type(screen.getByLabelText(/email/i), "valid@mail.com");
    await user.tab();
    await user.type(screen.getByLabelText(/password/i), "anypassword");
    await user.tab();

    await waitFor(() => {
      expect(screen.getByLabelText(/email/i)).toHaveAttribute(
        "aria-invalid",
        "false",
      );
      expect(screen.getByLabelText(/password/i)).toHaveAttribute(
        "aria-invalid",
        "false",
      );
    });
    expect(mockLogin).not.toHaveBeenCalled();
  });

  it("closes the auth modal on successful login, with no toast", async () => {
    mockLogin.mockResolvedValue({ error: null });
    const { toast } = await import("sonner");
    const user = userEvent.setup();
    render(<LoginForm />);

    await user.type(screen.getByLabelText(/email/i), "valid@mail.com");
    await user.type(screen.getByLabelText(/password/i), "anypassword");
    await user.click(screen.getByRole("button", { name: /sign in/i }));

    await waitFor(() => expect(mockClose).toHaveBeenCalled());
    expect(toast.success).not.toHaveBeenCalled();
  });

  it("shows error toast and keeps modal open on failed login", async () => {
    mockLogin.mockResolvedValue({
      error: new Error("Invalid login credentials"),
    });
    const { toast } = await import("sonner");
    const user = userEvent.setup();
    render(<LoginForm />);

    await user.type(screen.getByLabelText(/email/i), "valid@mail.com");
    await user.type(screen.getByLabelText(/password/i), "wrongpassword");
    await user.click(screen.getByRole("button", { name: /sign in/i }));

    await waitFor(() =>
      expect(toast.error).toHaveBeenCalledWith("Invalid login credentials"),
    );
    expect(mockClose).not.toHaveBeenCalled();
  });
});
