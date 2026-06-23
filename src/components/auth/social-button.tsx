import { Button } from "../ui/button";
import Image from "next/image";
import { Provider } from "@supabase/supabase-js";

interface SocialButtonProps {
  provider: Provider;
  onClick: () => void;
  disabled?: boolean;
}

const SocialButton = ({ provider, onClick, disabled }: SocialButtonProps) => {
  return (
    <Button type="button" variant="ghost" onClick={onClick} disabled={disabled}>
      <Image
        src={`/${provider}.svg`}
        alt={`${provider} logo`}
        width={16}
        height={16}
      />
    </Button>
  );
};

export default SocialButton;
