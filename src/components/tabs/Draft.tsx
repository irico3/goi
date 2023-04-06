import { useState } from "react";
import { DraftData, PlayerType } from "../../types";
import { v4 as uuidv4 } from "uuid";
import { useRecoilState } from "recoil";
import { draftListState, tabPageState } from "../../atom/atom";

export const Draft: React.FC<{ playerType: PlayerType }> = ({ playerType }) => {
  const [draftList, setDraftList] = useState<DraftData[]>([]);
  const [draftText, setDraftText] = useState("");

  const [_, setTabPage] = useRecoilState(tabPageState);
  const [draftListAll, setDraftListAll] = useRecoilState(draftListState);

  const onClickDraftUp = () => {
    setDraftList([...draftList, { id: uuidv4(), text: draftText }]);
    setDraftText("");
  };

  const onClickDeleteDraft = (index: number) => {
    const newDraftList = [...draftList];
    newDraftList.splice(index, 1);
    setDraftList(newDraftList);
  };

  const onClickFinish = () => {
    setDraftListAll([...draftListAll, ...draftList]);
    setDraftList([]);
    setDraftText("");
    setTabPage(playerType === "A" ? "PLAYER_B_DRAFT" : "PLAYER_A_ORDER");
  };
  return (
    <div>
      <h1>{playerType}さんの案だしターンです</h1>
      <input
        type="text"
        value={draftText}
        onChange={(e) => {
          setDraftText(e.target.value);
        }}
      />
      <button onClick={onClickDraftUp}>OK</button>
      <ul>
        {draftList.map((draft, index) => {
          return (
            <li key={draft.id}>
              <button onClick={() => onClickDeleteDraft(index)}>delete</button>
              <div>{draft.text}</div>
            </li>
          );
        })}
      </ul>
      <button onClick={onClickFinish}>案だし完了</button>
    </div>
  );
};
