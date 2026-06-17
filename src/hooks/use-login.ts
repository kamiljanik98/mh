import { createClient } from "@/lib/supabase/client";
import { EmailPasswordCredentials } from "@/types";
import { useState } from "react";

const useLogin = () => {
  const [isLoading, setIsLoading] = useState(false);
  const supabase = createClient();

  const login = async ({ email, password }: EmailPasswordCredentials) => {
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
