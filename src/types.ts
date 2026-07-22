import type { Tables } from "@/types/database.types";

export type Stem = Tables<"stems">;

export type Song = Tables<"songs"> & {
  stems?: Stem[];
  profiles?: {
    nickname: string | null;
  } | null;
};

export type UserProfile = Tables<"profiles">;

export type EmailPasswordCredentials = {
  email: string;
  password: string;
};
