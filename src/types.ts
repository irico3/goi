export type PlayerType = "A" | "B";

export type DraftData = {
  id: string;
  text: string;
};

export type tabStateType =
  | "TOP"
  | "PLAYER_A_DRAFT"
  | "PLAYER_B_DRAFT"
  | "PLAYER_A_ORDER"
  | "PLAYER_B_ORDER"
  | "RESULT";
