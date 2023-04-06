import { atom } from "recoil";
import { keys } from "./keys";
import { DraftData, tabStateType } from "../types";

export const tabPageState = atom<tabStateType>({
  key: keys.TAB,
  default: "TOP",
});

export const draftListState = atom<DraftData[]>({
  key: keys.DRAFT_LIST,
  default: [],
});

export const playerADraftOrderState = atom<DraftData[]>({
  key: keys.PLAYER_A_DRAFT_ORDER,
  default: [],
});
export const playerBDraftOrderState = atom<DraftData[]>({
  key: keys.PLAYER_B_DRAFT_ORDER,
  default: [],
});
