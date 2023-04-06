import { RecoilState, useRecoilState } from "recoil";
import { DraftData, PlayerType } from "../../types";
import { draftListState, tabPageState } from "../../atom/atom";
import {
  DndContext,
  DragEndEvent,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  closestCenter,
  useDroppable,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { useEffect, useState } from "react";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import {
  SortableContext,
  arrayMove,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { SortableCard } from "../SortableCard";

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
      <h1>{playerType}さんの優先度</h1>
      <DndContext
        sensors={sensors}
        modifiers={[restrictToVerticalAxis]}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <span>高</span>
        <ul>
          <SortableContext
            items={draftOrder}
            strategy={verticalListSortingStrategy}
          >
            {draftOrder.map((draft, index) => {
              return <SortableCard key={draft.id} data={draft} />;
            })}
          </SortableContext>
        </ul>
        <span>低</span>
      </DndContext>
      <button onClick={handleClickFinish}>完了</button>
    </div>
  );
};
