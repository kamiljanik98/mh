import { createClient } from "@/lib/supabase/client";
import { useState } from "react";
import useUser from "./use-user";

const useChangePassword = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const user = useUser((state) => state.user);

  const change = async (
    oldPassword: string,
    newPassword: string,
  ): Promise<{ error: Error | null }> => {
    if (!user?.email) {
      return { error: new Error("Not authenticated") };
    }

    setIsLoading(true);
    const supabase = createClient();
    const { error: reauthError } = await supabase.auth.signInWithPassword({
      email: user.email,
      password: oldPassword,
    });

    if (reauthError) {
      setIsLoading(false);
      return { error: new Error("Current password is incorrect") };
    }

    const { error } = await supabase.auth.updateUser({
      password: newPassword,
    });
    setIsLoading(false);

    return { error };
  };

  return { change, isLoading };
};

export default useChangePassword;
