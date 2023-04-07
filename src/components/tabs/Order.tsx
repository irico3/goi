import {
  DndContext,
  DragEndEvent,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  closestCenter,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import {
  SortableContext,
  arrayMove,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useEffect } from "react";
import { RecoilState, useRecoilState } from "recoil";
import { draftListState, tabPageState } from "../../atom/atom";
import { DraftData, PlayerType } from "../../types";
import { SortableCard } from "../SortableCard";
import { Heading, List, Button, Text, Center } from "@chakra-ui/react";
import { color } from "framer-motion";

export const Order: React.FC<{
  playerType: PlayerType;
  orderState: RecoilState<DraftData[]>;
}> = ({ playerType, orderState }) => {
  const [draftList, _] = useRecoilState(draftListState);
  const [draftOrder, setDraftOrder] = useRecoilState(orderState);

  const [__, setTabPage] = useRecoilState(tabPageState);

  useEffect(() => {
    setDraftOrder(draftList);
  }, [draftList, setDraftOrder]);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (active.id !== over?.id) {
      setDraftOrder((drafts) => {
        const oldIndex = drafts.findIndex((draft) => draft.id === active.id);
        const newIndex = drafts.findIndex((draft) => draft.id === over?.id);

        return arrayMove(drafts, oldIndex, newIndex);
      });
    }
  };

  const handleClickFinish = () => {
    setTabPage(playerType === "A" ? "PLAYER_B_ORDER" : "RESULT");
  };

  // const onClickExclude = (index: number, isExclue: boolean) => {
  //   const newDraftList = [...draftList];
  //   newDraftList[index].exclude = isExclue;
  //   setDraftList(newDraftList);
  // };

  const sensors = useSensors(
    useSensor(MouseSensor, {}),
    useSensor(TouchSensor, {}),
    useSensor(KeyboardSensor, {})
  );

  return (
    <div>
      <Heading>{playerType}さんの優先度</Heading>
      <DndContext
        sensors={sensors}
        modifiers={[restrictToVerticalAxis]}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <Text textAlign={"center"} mt={10} color={"red"}>
          高
        </Text>
        <List spacing={6}>
          <SortableContext
            items={draftOrder}
            strategy={verticalListSortingStrategy}
          >
            {draftOrder.map((draft, index) => {
              return <SortableCard key={draft.id} data={draft} />;
            })}
          </SortableContext>
        </List>
        <Text textAlign={"center"} color={"royalblue"}>
          低
        </Text>
      </DndContext>
      <Center>
        <Button onClick={handleClickFinish} mt={5}>
          完了
        </Button>
      </Center>
    </div>
  );
};
