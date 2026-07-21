// @vitest-environment jsdom
import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import UpdatePasswordForm from "@/components/auth/update-password-form";

const { mockUpdatePassword, mockPush, mockToastSuccess, mockToastError } =
  vi.hoisted(() => ({
    mockUpdatePassword: vi.fn(),
    mockPush: vi.fn(),
    mockToastSuccess: vi.fn(),
    mockToastError: vi.fn(),
  }));

vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: mockPush }),
}));

vi.mock("@/hooks/auth/use-update-password", () => ({
  default: () => ({ updatePassword: mockUpdatePassword, isLoading: false }),
}));

vi.mock("sonner", () => ({
  toast: { success: mockToastSuccess, error: mockToastError },
}));

describe("UpdatePasswordForm", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("shows an inline error when the password is under 6 characters", async () => {
    const user = userEvent.setup();
    render(<UpdatePasswordForm />);

    const input = screen.getByLabelText(/new password/i);
    await user.type(input, "Ab1");
    await user.tab();

    await waitFor(() => {
      expect(screen.getByText(/at least 6 characters/i)).toBeDefined();
      expect(input).toHaveAttribute("aria-invalid", "true");
    });
  });

  it("shows an inline error when the password has no uppercase letter", async () => {
    const user = userEvent.setup();
    render(<UpdatePasswordForm />);

    const input = screen.getByLabelText(/new password/i);
    await user.type(input, "abcdef1");
    await user.tab();

    await waitFor(() => {
      expect(screen.getByText(/uppercase/i)).toBeDefined();
    });
  });

  it("shows an inline error when the password has no number", async () => {
    const user = userEvent.setup();
    render(<UpdatePasswordForm />);

    const input = screen.getByLabelText(/new password/i);
    await user.type(input, "Abcdefg");
    await user.tab();

    await waitFor(() => {
      expect(screen.getByText(/number/i)).toBeDefined();
    });
  });

  it("calls updatePassword with the form value on valid submit", async () => {
    mockUpdatePassword.mockResolvedValue({ error: null });
    const user = userEvent.setup();
    render(<UpdatePasswordForm />);

    await user.type(screen.getByLabelText(/new password/i), "Abcdef1");
    await user.click(screen.getByRole("button", { name: /update password/i }));

    await waitFor(() => {
      expect(mockUpdatePassword).toHaveBeenCalledWith("Abcdef1");
    });
  });

  it("shows a success toast and redirects to / on success", async () => {
    mockUpdatePassword.mockResolvedValue({ error: null });
    const user = userEvent.setup();
    render(<UpdatePasswordForm />);

    await user.type(screen.getByLabelText(/new password/i), "Abcdef1");
    await user.click(screen.getByRole("button", { name: /update password/i }));

    await waitFor(() => {
      expect(mockToastSuccess).toHaveBeenCalledWith("Password updated.");
      expect(mockPush).toHaveBeenCalledWith("/");
    });
  });

  it("shows an error toast and does not redirect on failure", async () => {
    mockUpdatePassword.mockResolvedValue({
      error: new Error("Session expired"),
    });
    const user = userEvent.setup();
    render(<UpdatePasswordForm />);

    await user.type(screen.getByLabelText(/new password/i), "Abcdef1");
    await user.click(screen.getByRole("button", { name: /update password/i }));

    await waitFor(() => {
      expect(mockToastError).toHaveBeenCalledWith("Session expired");
    });
    expect(mockPush).not.toHaveBeenCalled();
  });
});
