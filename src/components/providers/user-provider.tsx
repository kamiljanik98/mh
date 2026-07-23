"use client";

import { useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import useUser from "@/hooks/account/use-user";
import type { UserProfile } from "@/types";

export const UserProvider = () => {
  const setUser = useUser((state) => state.setUser);
  const setIsLoading = useUser((state) => state.setIsLoading);

  useEffect(() => {
    const supabase = createClient();

    const loadProfile = async (userId: string) => {
      const { data } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", userId)
        .single();

      setUser(data as UserProfile | null);
      setIsLoading(false);
    };

    const init = async () => {
      const { data } = await supabase.auth.getUser();
      if (data.user) {
        await loadProfile(data.user.id);
      } else {
        setUser(null);
        setIsLoading(false);
      }
    };

    init();

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        if (session?.user) {
          loadProfile(session.user.id);
        } else {
          setUser(null);
          setIsLoading(false);
        }
      },
    );

    return () => listener.subscription.unsubscribe();
  }, [setUser, setIsLoading]);

  return null;
};
