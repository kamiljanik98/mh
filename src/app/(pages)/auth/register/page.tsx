"use client";

import { Button } from "@/components/ui/button";
import useRegister from "@/hooks/use-register";
import { useRouter } from "next/navigation";
import { useState, type SubmitEvent } from "react";

export default function RegisterPage() {
  const { register, isLoading } = useRegister();
  const router = useRouter();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleSubmit = async (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { error } = await register({ email, password });

    if (error) {
      alert(error.message);
      return;
    }

    router.push("/auth/code-success");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        required
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        required
      />
      <Button type="submit" disabled={isLoading}>
        {isLoading ? "Registering" : "Register"}
      </Button>
    </form>
  );
}
