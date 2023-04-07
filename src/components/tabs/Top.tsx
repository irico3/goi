import { useRecoilState } from "recoil";
import { tabPageState } from "../../atom/atom";
import { Button, Heading } from "@chakra-ui/react";

export const Top: React.FC = () => {
  const [_, setTabPage] = useRecoilState(tabPageState);
  const onClickStart = () => {
    setTabPage("PLAYER_A_DRAFT");
  };

  return (
    <>
      <Heading>GOI</Heading>
      <Button onClick={onClickStart} mt={10}>
        START
      </Button>
    </>
  );
};
