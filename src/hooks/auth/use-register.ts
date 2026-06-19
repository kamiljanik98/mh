import { createClient } from "@/lib/supabase/client";
import { RegisterFormValues } from "@/lib/validations/auth";
import { useState } from "react";

const useRegister = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const supabase = createClient();

  const register = async ({
    email,
    password,
    nickname,
  }: RegisterFormValues) => {
    setIsLoading(true);
    nickname = nickname.toLowerCase();

    const { data: exisitng } = await supabase
      .from("profiles")
      .select("id")
      .eq("nickname", nickname)
      .maybeSingle();

    if (exisitng) {
      setIsLoading(false);
      return { error: new Error("Nickname already taken") };
    }

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { nickname } },
    });

    setIsLoading(false);
    return { error };
  };

  return { register, isLoading };
};

export default useRegister;
