// @vitest-environment jsdom
import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import RegisterForm from "@/components/auth/register-form";

vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: vi.fn(),
    refresh: vi.fn(),
  }),
}));

vi.mock("@/hooks/auth/use-register", () => ({
  default: () => ({ register: vi.fn(), isLoading: false }),
}));

vi.mock("@/hooks/auth/use-auth-modal", () => ({
  default: () => ({ close: vi.fn(), setView: vi.fn() }),
}));

vi.mock("sonner", () => ({
  toast: { success: vi.fn(), error: vi.fn() },
}));

describe("RegisterForm", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("shows an inline field error on invalid email without submitting", async () => {
    const user = userEvent.setup();
    render(<RegisterForm />);

    const emailInput = screen.getByLabelText(/email/i);
    await user.type(emailInput, "not-an-email");
    await user.tab();

    await waitFor(() => {
      expect(screen.getByText(/invalid email/i)).toBeDefined();
      expect(emailInput).toHaveAttribute("aria-invalid", "true");
    });
  });

  it("shows an inline field error on a too-short password without submitting", async () => {
    const user = userEvent.setup();
    render(<RegisterForm />);

    const passwordInput = screen.getByLabelText(/password/i);
    await user.type(passwordInput, "short");
    await user.tab();

    await waitFor(() => {
      expect(screen.getByText(/at least/i)).toBeDefined();
      expect(passwordInput).toHaveAttribute("aria-invalid", "true");
    });
  });

  it("shows an inline field error on invalid nickname characters without submitting", async () => {
    const user = userEvent.setup();
    render(<RegisterForm />);

    const nicknameInput = screen.getByLabelText(/nickname/i);
    await user.type(nicknameInput, "jan kowalski");
    await user.tab();

    await waitFor(() => {
      expect(screen.getByText(/only letters, numbers/i)).toBeDefined();
      expect(nicknameInput).toHaveAttribute("aria-invalid", "true");
    });
  });

  it("does not show field errors for valid input", async () => {
    const user = userEvent.setup();
    render(<RegisterForm />);

    await user.type(screen.getByLabelText(/email/i), "valid@example.com");
    await user.tab();

    await waitFor(() => {
      expect(screen.getByLabelText(/email/i)).toHaveAttribute(
        "aria-invalid",
        "false",
      );
    });
  });
});
