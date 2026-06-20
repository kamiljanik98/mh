import { create } from "zustand";

type AuthModalView = "login" | "register" | "forgot-password";

type AuthModalStore = {
  isOpen: boolean;
  view: AuthModalView;
  open: (view?: AuthModalView) => void;
  close: () => void;
  setView: (view: AuthModalView) => void;
};

const useAuthModal = create<AuthModalStore>((set) => ({
  isOpen: false,
  view: "login",
  open: (view = "login") => set({ isOpen: true, view }),
  close: () => set({ isOpen: false }),
  setView: (view) => set({ view }),
}));

export default useAuthModal;
