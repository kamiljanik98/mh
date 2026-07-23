import { UserProfile } from "@/types";
import { create } from "zustand";

type UserStore = {
  user: UserProfile | null;
  isLoading: boolean;
  setUser: (user: UserProfile | null) => void;
  setIsLoading: (isLoading: boolean) => void;
};

const useUser = create<UserStore>((set) => ({
  user: null,
  isLoading: true,
  setUser: (user) => set({ user }),
  setIsLoading: (isLoading) => set({ isLoading }),
}));

export default useUser;
