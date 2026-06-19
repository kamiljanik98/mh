"use client";

import { toast } from "sonner";
import useRegister from "@/hooks/auth/use-register";
import useAuthModal from "@/hooks/auth/use-auth-modal";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { RegisterFormValues, registerSchema } from "@/lib/validations/auth";
import FormInput from "@/components/form/FormInput";
import SocialButton from "./social-button";
import useDiscordLogin from "@/hooks/auth/use-discord-login";

const RegisterForm = () => {
  const { register, isLoading } = useRegister();
  const { close } = useAuthModal();
  const { handleDiscordLogin, isSocialLoading } = useDiscordLogin();

  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: { email: "", nickname: "", password: "" },
    mode: "onBlur",
  });

  const onSubmit = async (values: RegisterFormValues) => {
    const { error } = await register(values);

    if (error) {
      toast.error(error.message);
      return;
    }

    toast.success("Check your inbox - we sent you a confirmation link.");
    close();
  };

  return (
    <>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-3 bg-neutral-900"
      >
        <FormInput
          name="nickname"
          control={form.control}
          label="Nickname"
          type="text"
          placeholder="yourname"
        />
        <FormInput
          name="email"
          control={form.control}
          label="Email"
          type="email"
          placeholder="user@mail.com"
        />
        <FormInput
          name="password"
          control={form.control}
          label="Password"
          type="password"
          placeholder="******"
        />
        <Button
          className="text-sm bg-neutral-800 h-12"
          type="submit"
          disabled={isLoading}
        >
          Register
        </Button>
        <SocialButton
          provider="discord"
          onClick={handleDiscordLogin}
          disabled={isSocialLoading}
        />
      </form>
    </>
  );
};

export default RegisterForm;
