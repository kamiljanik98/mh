import { createClient } from "@/lib/supabase/client";
import { LoginFormValues } from "@/lib/validations/auth";
import { useState } from "react";

const useLogin = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const supabase = createClient();

  const login = async ({ email, password }: LoginFormValues) => {
    setIsLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setIsLoading(false);
    return { error };
  };

  return { login, isLoading };
};

export default useLogin;
