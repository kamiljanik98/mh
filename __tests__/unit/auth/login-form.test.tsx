// @vitest-environment jsdom
import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import LoginForm from "@/components/auth/login-form";

const { mockLogin, mockClose, mockSetView, mockDiscordLogin, mockToastError } =
  vi.hoisted(() => ({
    mockLogin: vi.fn(),
    mockClose: vi.fn(),
    mockSetView: vi.fn(),
    mockDiscordLogin: vi.fn(),
    mockToastError: vi.fn(),
  }));

vi.mock("@/hooks/auth/use-login", () => ({
  default: () => ({ login: mockLogin, isLoading: false }),
}));

vi.mock("@/hooks/auth/use-auth-modal", () => ({
  default: () => ({ close: mockClose, setView: mockSetView }),
}));

vi.mock("@/hooks/auth/use-discord-login", () => ({
  default: () => ({ discordLogin: mockDiscordLogin, isSocialLoading: false }),
}));

vi.mock("sonner", () => ({
  toast: { success: vi.fn(), error: mockToastError },
}));

describe("LoginForm", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("calls login with form values on valid submit", async () => {
    mockLogin.mockResolvedValue({ error: null });
    const user = userEvent.setup();
    render(<LoginForm />);

    await user.type(screen.getByLabelText(/email/i), "user@example.com");
    await user.type(screen.getByLabelText(/password/i), "secret123");
    await user.click(screen.getByRole("button", { name: /sign in/i }));

    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalledWith({
        email: "user@example.com",
        password: "secret123",
      });
    });
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

  it("shows no error on valid input", async () => {
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
    const user = userEvent.setup();
    render(<LoginForm />);

    await user.type(screen.getByLabelText(/email/i), "valid@mail.com");
    await user.type(screen.getByLabelText(/password/i), "anypassword");
    await user.click(screen.getByRole("button", { name: /sign in/i }));

    await waitFor(() => expect(mockClose).toHaveBeenCalled());
    expect(mockToastError).not.toHaveBeenCalled();
  });

  it("shows error toast and keeps modal open on failed login", async () => {
    mockLogin.mockResolvedValue({
      error: new Error("Invalid login credentials"),
    });
    const user = userEvent.setup();
    render(<LoginForm />);

    await user.type(screen.getByLabelText(/email/i), "valid@mail.com");
    await user.type(screen.getByLabelText(/password/i), "wrongpassword");
    await user.click(screen.getByRole("button", { name: /sign in/i }));

    await waitFor(() =>
      expect(mockToastError).toHaveBeenCalledWith("Invalid login credentials"),
    );
    expect(mockSetView).not.toHaveBeenCalled();
  });
});
