// 優先順位付けの集計hooks

import { useRecoilState } from "recoil";
import {
  draftListState,
  playerADraftOrderState,
  playerBDraftOrderState,
} from "../atom/atom";
import { DraftData } from "../types";

// 配列を {text: index}に加工する
const getDraftOrderObj = (draftOrder: DraftData[]) => {
  const draftOrderObj: Record<string, number> = {};
  draftOrder.forEach((element, index) => {
    draftOrderObj[element.text] = index;
  });
  return draftOrderObj;
};

export const useDraftTotalling = () => {
  const [playerADraftOrder] = useRecoilState(playerADraftOrderState);
  const [playerBDraftOrder] = useRecoilState(playerBDraftOrderState);
  const [draftList] = useRecoilState(draftListState);
  // indexの合計値が低いほど優先度が高い

  const playerADraftOrderObj = getDraftOrderObj(playerADraftOrder);
  const playerBDraftOrderObj = getDraftOrderObj(playerBDraftOrder);

  // 集計
  // {index: text}
  const draftTotalling = draftList.map((draft) => {
    return {
      text: draft.text,
      score:
        playerADraftOrderObj[draft.text] + playerBDraftOrderObj[draft.text],
    };
  });

  draftTotalling.sort((a, b) => a.score - b.score);

  draftTotalling.splice(3);

  return [draftTotalling];
};
