import { DraftData } from "../../types";
import { getDraftTotalling } from "../useDraftTotalling";

describe("getDraftTotalling", () => {
  const playerADraftOrderObj = {
    遊ぶ: 1,
    食べる: 2,
    寝る: 3,
  };
  const playerBDraftOrderObj = {
    遊ぶ: 3,
    食べる: 1,
    寝る: 2,
  };

  const draftList: DraftData[] = [
    { id: "1", text: "遊ぶ" },
    { id: "2", text: "食べる" },
    { id: "3", text: "寝る" },
  ];
  expect(
    getDraftTotalling(playerADraftOrderObj, playerBDraftOrderObj, draftList)
  ).toBe([
    { score: 3, text: "食べる" },
    { score: 4, text: "遊ぶ" },
    { score: 5, text: "寝る" },
  ]);
});
