import UpdatePasswordForm from "@/components/auth/update-password-form";

export default function UpdatePasswordPage() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="w-full max-w-sm">
        <h1 className="mb-4 text-lg font-medium">Set a new password</h1>
        <UpdatePasswordForm />
      </div>
    </div>
  );
}
