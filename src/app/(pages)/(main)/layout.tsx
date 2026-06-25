import AuthModal from "@/components/auth/auth-modal";
import Navbar from "@/components/common/navbar";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <AuthModal />
      <main className="flex flex-1 flex-col">{children}</main>
    </>
  );
}
