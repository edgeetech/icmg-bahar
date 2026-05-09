export type ChildId =
  | "yusufEymen"
  | "alican"
  | "tahaGul"
  | "yahyaGeden"
  | "mehmetEfe"
  | "omerGul"
  | "ahmetBashan"
  | "idris"
  | "mehmetAkif"
  | "mustafaBashan"
  | "aliTasdemir"
  | "muhammetCetin"
  | "mustafaCetin";

export type Medal = "none" | "bronze" | "silver" | "gold";
export type CharacterMood = "neutral" | "happy" | "proud" | "excited";
export type AchievementStatus = "earned" | "locked" | "missed";

export type CharacterAssetSet = {
  neutral: string;
  happy: string;
  proud: string;
  excited: string;
};

export type Child = {
  id: ChildId;
  name: string;
  avatarAlt: string;
  gender: "boy" | "girl";
  assets: CharacterAssetSet;
  badgeColor: string;
  badgeTextColor: string;
};

export type Achievement = {
  id: string;
  title: string;
  icon: string;
  date: string;
  results: Record<ChildId, AchievementStatus>;
};

export type CharacterState = {
  score: number;
  completedCount: number;
  totalAvailableCount: number;
  medal: Medal;
  mood: CharacterMood;
  hasNewAchievement: boolean;
};
