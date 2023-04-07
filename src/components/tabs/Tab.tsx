import * as React from "react";
import {
  playerADraftOrderState,
  playerBDraftOrderState,
  tabPageState,
} from "../../atom/atom";
import { useRecoilState } from "recoil";

import { Top } from "./Top";
import { Draft } from "./Draft";
import { Order } from "./Order";
import { Result } from "./Result";

export const Tab: React.FC = () => {
  const [tabPage] = useRecoilState(tabPageState);
  switch (tabPage) {
    case "TOP":
      return <Top />;
    case "PLAYER_A_DRAFT":
      return <Draft playerType="A" />;
    case "PLAYER_B_DRAFT":
      return <Draft playerType="B" />;
    case "PLAYER_A_ORDER":
      return <Order playerType="A" orderState={playerADraftOrderState} />;
    case "PLAYER_B_ORDER":
      return <Order playerType="B" orderState={playerBDraftOrderState} />;
    case "RESULT":
      return <Result />;
    default:
      throw new Error("タブの切り替えが不正です");
  }
};
