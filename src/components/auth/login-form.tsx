// components/auth/login-form.tsx
"use client";

import { useState } from "react";
import { toast } from "sonner";
import useLogin from "@/hooks/use-login";
import useAuthModal from "@/hooks/use-auth-modal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function LoginForm() {
  const { login, isLoading } = useLogin();
  const { close } = useAuthModal();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const { error } = await login({ email, password });

    if (error) {
      toast.error(error.message);
      return;
    }

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
      />
      <Button type="submit" disabled={isLoading}>
        {isLoading ? "Signing in..." : "Sign in"}
      </Button>
    </form>
  );
}
