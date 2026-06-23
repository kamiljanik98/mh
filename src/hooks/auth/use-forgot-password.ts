import { createClient } from "@/lib/supabase/client";
import { useState } from "react";

const useForgotPassword = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const supabase = createClient();

  const resetPassword = async (email: string) => {
    setIsLoading(true);

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/auth/update-password`,
    });

    setIsLoading(false);

    if (!error) {
      setSuccess(true);
    }

    return { error };
  };

  return { resetPassword, isLoading, success };
};

export default useForgotPassword;
