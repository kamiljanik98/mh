import { createClient } from "@/lib/supabase/client";
import { toast } from "sonner";

const useSignOut = () => {
  const supabase = createClient();
  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast.error(error.message);
      return;
    }
  };
  return { signOut };
};

export default useSignOut;
