// components/auth/register-form.tsx
"use client";

import { useState } from "react";
import { toast } from "sonner";
import useRegister from "@/hooks/use-register";
import useAuthModal from "@/hooks/use-auth-modal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const RegisterForm = () => {
  const { register, isLoading } = useRegister();
  const { close } = useAuthModal();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const { error } = await register({ email, password });

    if (error) {
      toast.error(error.message);
      return;
    }

    toast.success("Check your inbox — we sent you a confirmation link.");
    close();
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <Input
        type="email"
        placeholder="you@example.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <Input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />{" "}
      <Button type="submit" disabled={isLoading}>
        {isLoading ? "Creating account..." : "Register"}
      </Button>
    </form>
  );
};

export default RegisterForm;
