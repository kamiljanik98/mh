"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import type { UserProfile } from "@/types";

const useUser = () => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const supabase = createClient();

  useEffect(() => {
    const loadProfile = async (userId: string) => {
      const { data } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", userId)
        .single();

      setUser(data as UserProfile | null);
    };

    const init = async () => {
      const { data } = await supabase.auth.getUser();
      if (data.user) {
        loadProfile(data.user.id);
      } else {
        setUser(null);
      }
    };

    init();

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        if (session?.user) {
          loadProfile(session.user.id);
        } else {
          setUser(null);
        }
      },
    );

    return () => listener.subscription.unsubscribe();
  }, []);

  return { user };
};

export default useUser;
