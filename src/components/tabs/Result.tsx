import { useRecoilState } from "recoil";
import {
  draftListState,
  playerADraftOrderState,
  playerBDraftOrderState,
} from "../../atom/atom";

export const Result = () => {
  const [playerADraftOrder] = useRecoilState(playerADraftOrderState);
  const [playerBDraftOrder] = useRecoilState(playerBDraftOrderState);
  const [draftList] = useRecoilState(draftListState);
  // indexの合計値が低いほど優先度が高い
  // 配列を {text: index}に加工する
  const playerADraftOrderObj: Record<string, number> = {};
  playerADraftOrder.forEach((element, index) => {
    playerADraftOrderObj[element.text] = index;
  });
  const playerBDraftOrderObj: Record<string, number> = {};
  playerBDraftOrder.forEach((element, index) => {
    playerBDraftOrderObj[element.text] = index;
  });

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

  return (
    <>
      <h1>結果</h1>
      <p>上位3件は以下になりました！</p>
      {draftTotalling.map((draft) => {
        return <div>{draft.text}</div>;
      })}
    </>
  );
};
