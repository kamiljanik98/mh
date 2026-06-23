// @vitest-environment jsdom
import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import useDiscordLogin from "@/hooks/auth/use-discord-login";

const mockSocialLogin = vi.fn();
const mockClose = vi.fn();
const mockPush = vi.fn();
const mockRefresh = vi.fn();
const mockRefreshSession = vi.fn();

vi.mock("@/hooks/auth/use-social-login", () => ({
  default: () => ({
    socialLogin: mockSocialLogin,
    isSocialLoading: false,
  }),
}));

vi.mock("@/hooks/auth/use-auth-modal", () => ({
  default: () => ({
    close: mockClose,
  }),
}));

vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: mockPush,
    refresh: mockRefresh,
  }),
}));

vi.mock("@/lib/supabase/client", () => ({
  createClient: () => ({
    auth: { refreshSession: mockRefreshSession },
  }),
}));

vi.mock("sonner", () => ({
  toast: { error: vi.fn(), success: vi.fn() },
}));

describe("useDiscordLogin", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("calls socialLogin('discord')", async () => {
    mockSocialLogin.mockResolvedValue({ error: null });
    const { result } = renderHook(() => useDiscordLogin());

    await act(async () => {
      await result.current.discordLogin();
    });

    expect(mockSocialLogin).toHaveBeenCalledWith("discord");
  });

  it("shows error toast on failure", async () => {
    mockSocialLogin.mockResolvedValue({
      error: new Error("Discord sign in failed"),
    });
    const { toast } = await import("sonner");
    const { result } = renderHook(() => useDiscordLogin());

    await act(async () => {
      await result.current.discordLogin();
    });

    expect(toast.error).toHaveBeenCalledWith("Discord sign in failed");
    expect(mockRefreshSession).not.toHaveBeenCalled();
    expect(mockRefresh).not.toHaveBeenCalled();
    expect(mockClose).not.toHaveBeenCalled();
  });

  it("calls refreshSession, router.refresh and close on success", async () => {
    mockSocialLogin.mockResolvedValue({ error: null });
    const { result } = renderHook(() => useDiscordLogin());

    await act(async () => {
      await result.current.discordLogin();
    });

    expect(mockRefreshSession).toHaveBeenCalled();
    expect(mockRefresh).toHaveBeenCalled();
    expect(mockClose).toHaveBeenCalled();
  });
});
