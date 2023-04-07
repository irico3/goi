import {
  Button,
  Card,
  CardBody,
  Flex,
  Heading,
  Input,
  List,
  ListItem,
  Spacer,
  Text,
  CloseButton,
  Center,
} from "@chakra-ui/react";
import { useState } from "react";
import { useRecoilState } from "recoil";
import { v4 as uuidv4 } from "uuid";
import { draftListState, tabPageState } from "../../atom/atom";
import { DraftData, PlayerType } from "../../types";

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
      <Heading>{playerType}さんの案だしターンです</Heading>
      <Flex mt={5}>
        <Input
          type="text"
          value={draftText}
          onChange={(e) => {
            setDraftText(e.target.value);
          }}
        />
        <Button
          onClick={onClickDraftUp}
          isDisabled={draftList.length >= 10 || draftText === ""}
          ml={5}
        >
          OK
        </Button>
      </Flex>
      <Text mt={5} textAlign={"center"}>
        {draftList.length} / 10
      </Text>
      <List spacing={6}>
        {draftList.map((draft, index) => {
          return (
            <ListItem key={draft.id}>
              <Card>
                <CardBody>
                  <Flex>
                    <Text textAlign={"center"}>{draft.text}</Text>
                    <Spacer />
                    <CloseButton
                      onClick={() => onClickDeleteDraft(index)}
                      colorScheme="red"
                      aria-label="delete"
                    ></CloseButton>
                  </Flex>
                </CardBody>
              </Card>
            </ListItem>
          );
        })}
      </List>
      <Center>
        <Button onClick={onClickFinish} mt={5}>
          案だし完了
        </Button>
      </Center>
    </div>
  );
};
