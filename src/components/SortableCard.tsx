import { FC } from "react";
import { CSS } from "@dnd-kit/utilities";
import { DraftData } from "../types";
import { useSortable } from "@dnd-kit/sortable";

export const SortableCard: FC<{ data: DraftData }> = ({ data }) => {
  const { attributes, listeners, setNodeRef, transform } = useSortable({
    id: data.id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
  };

  return (
    <li ref={setNodeRef} {...attributes} {...listeners} style={style}>
      <div id={data.id}>
        <p>{data.text}</p>
      </div>
    </li>
  );
};
