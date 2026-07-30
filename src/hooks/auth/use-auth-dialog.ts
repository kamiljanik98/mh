import { create } from "zustand";

type AuthDialogView = "login" | "register" | "forgot-password";

type AuthDialogStore = {
  isOpen: boolean;
  view: AuthDialogView;
  open: (view?: AuthDialogView) => void;
  close: () => void;
  setView: (view: AuthDialogView) => void;
};

const useAuthDialog = create<AuthDialogStore>((set) => ({
  isOpen: false,
  view: "login",
  open: (view = "login") => set({ isOpen: true, view }),
  close: () => set({ isOpen: false }),
  setView: (view) => set({ view }),
}));

export default useAuthDialog;
