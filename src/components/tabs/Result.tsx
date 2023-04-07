import { Heading, ListItem, OrderedList, Text } from "@chakra-ui/react";
import { useDraftTotalling } from "../../hooks/useDraftTotalling";

export const Result = () => {
  const [draftTotalling] = useDraftTotalling();
  return (
    <>
      <Heading>結果</Heading>
      <Text mt={10}>上位3件は以下になりました！</Text>
      <OrderedList mt={5}>
        {draftTotalling.map((draft) => {
          return (
            <ListItem>
              <Text fontWeight={"bold"}>
                {draft.text} / order: {draft.score}
              </Text>
            </ListItem>
          );
        })}
      </OrderedList>
    </>
  );
};
