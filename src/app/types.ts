export type Stem = {
  id: string;
  song_id: string;
  name: string;
  path: string;
  created_at: string;
};

export type Song = {
  id: string;
  title: string;
  uploaded_by: string;
  path: string;
  image_path: string;
  bpm?: number;
  scale?: string;
  genre?: string;
  tags: string[];
  stems?: Stem[];
  profiles?: {
    nickname?: string;
  };
};

export type UserProfile = {
  id: string;
  nickname: string;
  avatar_url?: string | null;
  role: "guest" | "user" | "admin";
  email: string;
  created_at: string;
  uploaded_at: string;
};
