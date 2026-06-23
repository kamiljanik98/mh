import { toast } from "sonner";
import useSocialLogin from "./use-social-login";
import { useRouter } from "next/navigation";
import useAuthModal from "./use-auth-modal";
import { createClient } from "@/lib/supabase/client";

const useDiscordLogin = () => {
  const router = useRouter();
  const { close } = useAuthModal();
  const { socialLogin, isSocialLoading } = useSocialLogin();
  const supabase = createClient();

  const handleDiscordLogin = async () => {
    const { error } = await socialLogin("discord");
    if (error) {
      toast.error(error.message);
      return;
    }
    await supabase.auth.refreshSession();
    router.refresh();
    close();
  };

  return { handleDiscordLogin, isSocialLoading };
};

export default useDiscordLogin;
