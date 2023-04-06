import { useRecoilState } from "recoil";
import {
  playerADraftOrderState,
  playerBDraftOrderState,
} from "../../atom/atom";

export const Result = () => {
  const [playerADraftOrder] = useRecoilState(playerADraftOrderState);
  const [playerBDraftOrder] = useRecoilState(playerBDraftOrderState);
  // indexの合計値が低いほど優先度が高い
  // 配列を {text: index}に加工する
  return (
    <>
      <h1>結果</h1>
      <p>上位3件は以下になりました！</p>
    </>
  );
};
