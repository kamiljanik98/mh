import { createClient } from "@/lib/supabase/client";
import { EmailPasswordCredentials } from "@/types";
import { useState } from "react";

const useRegister = () => {
  const [isLoading, setIsLoading] = useState(false);
  const supabase = createClient();

  const register = async ({ email, password }: EmailPasswordCredentials) => {
    setIsLoading(true);

    const { error } = await supabase.auth.signUp({
      email,
      password,
    });

    setIsLoading(false);

    return { error };
  };
  return { register, isLoading };
};

export default useRegister;
