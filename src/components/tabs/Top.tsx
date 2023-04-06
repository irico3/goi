import { useRecoilState } from "recoil";
import { tabPageState } from "../../atom/atom";

export const Top: React.FC = () => {
  const [_, setTabPage] = useRecoilState(tabPageState);
  const onClickStart = () => {
    setTabPage("PLAYER_A_DRAFT");
  };

  return <button onClick={onClickStart}>START</button>;
};
