import { createClient } from "@/lib/supabase/client";
import { useState } from "react";

const useUpdatePassword = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const supabase = createClient();

  const updatePassword = async (password: string) => {
    setIsLoading(true);
    const { error } = await supabase.auth.updateUser({ password });

    setIsLoading(false);
    return { error };
  };

  return { updatePassword, isLoading };
};

export default useUpdatePassword;
