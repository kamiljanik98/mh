"use client";

import { useState } from "react";
import useUser from "@/hooks/account/use-user";
import { updateProfile } from "@/actions/update-profile";

type UpdateProfileInput = {
  nickname: string;
  bio: string;
  avatarFile?: File;
};

export default function useUpdateProfile() {
  const [isLoading, setIsLoading] = useState(false);
  const user = useUser((state) => state.user);
  const setUser = useUser((state) => state.setUser);

  async function update(
    input: UpdateProfileInput,
  ): Promise<{ error: Error | null }> {
    setIsLoading(true);
    const { error, avatarUrl } = await updateProfile(input);
    setIsLoading(false);

    if (!error && user) {
      setUser({
        ...user,
        nickname: input.nickname.toLowerCase(),
        bio: input.bio || null,
        ...(avatarUrl ? { avatar_url: avatarUrl } : {}),
      });
    }

    return { error };
  }

  return { update, isLoading };
}
