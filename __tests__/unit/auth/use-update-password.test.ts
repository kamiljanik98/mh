// @vitest-environment jsdom
import { renderHook, act } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";

const mockUpdateUser = vi.fn();

vi.mock("@/lib/supabase/client", () => ({
  createClient: () => ({
    auth: { updateUser: mockUpdateUser },
  }),
}));

import useUpdatePassword from "@/hooks/auth/use-update-password";

describe("useUpdatePassword", () => {
  beforeEach(() => vi.clearAllMocks());

  it("calls updateUser with correct password", async () => {
    mockUpdateUser.mockResolvedValue({ error: null });
    const { result } = renderHook(() => useUpdatePassword());
    await act(() => result.current.updatePassword("Newpassword123"));
    expect(mockUpdateUser).toHaveBeenCalledWith({
      password: "Newpassword123",
    });
  });

  it("returns { error: null } on success", async () => {
    mockUpdateUser.mockResolvedValue({ error: null });
    const { result } = renderHook(() => useUpdatePassword());
    let returnValue: { error: Error | null } | undefined;
    await act(async () => {
      returnValue = await result.current.updatePassword("Newpassword123");
    });
    expect(returnValue?.error).toBeNull();
  });

  it("returns { error } on failure", async () => {
    const err = new Error("Auth session missing");
    mockUpdateUser.mockResolvedValue({ error: err });
    const { result } = renderHook(() => useUpdatePassword());
    let returnValue: { error: Error | null } | undefined;
    await act(async () => {
      returnValue = await result.current.updatePassword("Newpassword123");
    });
    expect(returnValue?.error).toBeInstanceOf(Error);
    expect(returnValue?.error?.message).toBe("Auth session missing");
  });
});
