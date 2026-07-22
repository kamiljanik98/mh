import { createClient } from "@/lib/supabase/client";
import { useState } from "react";
import type { Provider } from "@supabase/supabase-js";

const useSocialLogin = () => {
  const [isSocialLoading, setIsLoading] = useState<boolean>(false);
  const supabase = createClient();

  const socialLogin = async (provider: Provider) => {
    setIsLoading(true);

    const { data, error } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
        skipBrowserRedirect: true,
      },
    });
    if (error) {
      setIsLoading(false);
      return { error };
    }
    if (!data.url) {
      setIsLoading(false);
      return { error: new Error("No OAuth URL returned") };
    }

    localStorage.removeItem("discord-oauth-result");
    const popup = window.open(
      data.url,
      "discord-oauth",
      "width=500,height=700",
    );

    return new Promise<{ error: Error | null }>((resolve) => {
      const checkClosed = setInterval(() => {
        if (popup?.closed) {
          clearInterval(checkClosed);
          setIsLoading(false);

          const raw = localStorage.getItem("discord-oauth-result");
          localStorage.removeItem("discord-oauth-result");

          if (!raw) {
            resolve({
              error: new Error("Popup closed before completing sign in"),
            });
            return;
          }

          const result = JSON.parse(raw);
          resolve({
            error: result.success ? null : new Error("Discord sign in failed"),
          });
        }
      }, 500);
    });
  };
  return { socialLogin, isSocialLoading };
};

export default useSocialLogin;
