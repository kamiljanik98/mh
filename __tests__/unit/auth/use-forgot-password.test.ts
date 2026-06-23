// @vitest-environment jsdom
import { renderHook, act } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import useForgotPassword from "@/hooks/auth/use-forgot-password";

const mockResetPasswordForEmail = vi.fn();

vi.mock("@/lib/supabase/client", () => ({
  createClient: () => ({
    auth: { resetPasswordForEmail: mockResetPasswordForEmail },
  }),
}));

describe("useForgotPassword", () => {
  beforeEach(() => vi.clearAllMocks());

  it("calls resetPasswordForEmail with correct email and redirectTo", async () => {
    mockResetPasswordForEmail.mockResolvedValue({ error: null });
    const { result } = renderHook(() => useForgotPassword());
    await act(() => result.current.resetPassword("user@mail.com"));
    expect(mockResetPasswordForEmail).toHaveBeenCalledWith("user@mail.com", {
      redirectTo: "http://localhost:3000/auth/update-password",
    });
  });

  it("returns { error: null} and sets success: true on success", async () => {
    mockResetPasswordForEmail.mockResolvedValue({ error: null });
    const { result } = renderHook(() => useForgotPassword());
    let returnValue: { error: Error | null } | undefined;
    await act(async () => {
      returnValue = await result.current.resetPassword("user@mail.com");
    });
    expect(returnValue?.error).toBeNull();
    expect(result.current.success).toBe(true);
  });

  it("returns { error } and keeps success: false on failure", async () => {
    const err = new Error("Rate limit exceeded");
    mockResetPasswordForEmail.mockResolvedValue({ error: err });
    const { result } = renderHook(() => useForgotPassword());
    let returnValue: { error: Error | null } | undefined;
    await act(async () => {
      returnValue = await result.current.resetPassword("user@mail.com ");
    });
    expect(returnValue?.error).toBeInstanceOf(Error);
    expect(result.current.success).toBe(false);
  });
});
