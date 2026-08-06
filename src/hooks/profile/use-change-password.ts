import { useState } from "react";
import { changePassword } from "@/actions/auth/change-password";

const useChangePassword = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const change = async (currentPassword: string, password: string) => {
    setIsLoading(true);
    const { error } = await changePassword({ currentPassword, password });
    setIsLoading(false);
    return { error };
  };

  return { change, isLoading };
};

export default useChangePassword;
