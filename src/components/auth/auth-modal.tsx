// components/auth/auth-modal.tsx
"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import useAuthModal from "@/hooks/use-auth-modal";
import RegisterForm from "./register-form";
import LoginForm from "./login-form";

export default function AuthModal() {
  const { isOpen, view, close, setView } = useAuthModal();

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && close()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            {view === "login" ? "Sign in to MusicHub" : "Create your account"}
          </DialogTitle>
        </DialogHeader>

        {view === "login" ? <LoginForm /> : <RegisterForm />}

        <button
          type="button"
          onClick={() => setView(view === "login" ? "register" : "login")}
          className="text-center text-sm text-zinc-500 underline"
        >
          {view === "login"
            ? "Don't have an account? Register"
            : "Already have an account? Sign in"}
        </button>
      </DialogContent>
    </Dialog>
  );
}
