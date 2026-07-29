"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import useAuthModal from "@/hooks/auth/use-auth-modal";
import RegisterForm from "./register-form";
import LoginForm from "./login-form";
import ForgotPasswordForm from "./forgot-password-form";

const titles = {
  login: "Sign in to MusicHub",
  register: "Create your account",
  "forgot-password": "Reset your password",
};

export default function AuthModal() {
  const { isOpen, view, close, setView } = useAuthModal();

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && close()}>
      <DialogContent className="bg-neutral-900 text-neutral-200 sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{titles[view]}</DialogTitle>
        </DialogHeader>

        {view === "login" && <LoginForm />}
        {view === "register" && <RegisterForm />}
        {view === "forgot-password" && <ForgotPasswordForm />}

        <button
          type="button"
          onClick={() => setView(view === "login" ? "register" : "login")}
          className="text-center text-sm underline"
        >
          {view === "forgot-password"
            ? "Back to sign in"
            : view === "login"
              ? "Don't have an account? Register"
              : "Already have an account? Sign in"}
        </button>
      </DialogContent>
    </Dialog>
  );
}
