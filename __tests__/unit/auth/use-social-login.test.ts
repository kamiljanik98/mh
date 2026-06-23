// @vitest-environment jsdom
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import useSocialLogin from "@/hooks/auth/use-social-login";

const mockSignInWithOAuth = vi.fn();

vi.mock("@/lib/supabase/client", () => ({
  createClient: () => ({
    auth: { signInWithOAuth: mockSignInWithOAuth },
  }),
}));

describe("useSocialLogin", () => {
  let mockPopup: { closed: boolean };

  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
    mockPopup = { closed: false };
    vi.spyOn(window, "open").mockReturnValue(mockPopup as Window);
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("resolves { error: null } on popup success (mocked localStorage result)", async () => {
    mockSignInWithOAuth.mockResolvedValue({
      data: { url: "https://discord.com/oauth" },
      error: null,
    });

    const { result } = renderHook(() => useSocialLogin());

    let promise: Promise<{ error: Error | null }>;
    act(() => {
      promise = result.current.socialLogin("discord");
    });

    await act(async () => {
      await vi.waitFor(() => expect(window.open).toHaveBeenCalled());
    });

    localStorage.setItem(
      "discord-oauth-result",
      JSON.stringify({ success: true, ts: Date.now() }),
    );
    mockPopup.closed = true;

    await act(async () => {
      await vi.advanceTimersByTimeAsync(500);
    });

    await expect(promise!).resolves.toEqual({ error: null });
  });

  it("resolves { error } when popup closes without a result", async () => {
    mockSignInWithOAuth.mockResolvedValue({
      data: { url: "https://discord.com/oauth" },
      error: null,
    });

    const { result } = renderHook(() => useSocialLogin());

    let promise: Promise<{ error: Error | null }>;
    act(() => {
      promise = result.current.socialLogin("discord");
    });

    mockPopup.closed = true;

    await act(async () => {
      await vi.advanceTimersByTimeAsync(500);
    });

    const resolved = await promise!;
    expect(resolved.error).toBeInstanceOf(Error);
    expect(resolved.error?.message).toBe(
      "Popup closed before completing sign in",
    );
  });

  it("resolves { error } when signInWithOAuth itself returns an error", async () => {
    mockSignInWithOAuth.mockResolvedValue({
      data: { url: null },
      error: new Error("OAuth provider error"),
    });

    const { result } = renderHook(() => useSocialLogin());

    let resolved: { error: Error | null };
    await act(async () => {
      resolved = await result.current.socialLogin("discord");
    });

    expect(resolved!.error).toBeInstanceOf(Error);
    expect(window.open).not.toHaveBeenCalled();
  });
});
