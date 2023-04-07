import { FC } from "react";
import { CSS } from "@dnd-kit/utilities";
import { DraftData } from "../types";
import { useSortable } from "@dnd-kit/sortable";
import { Card, CardBody, ListItem, Text } from "@chakra-ui/react";

export const SortableCard: FC<{ data: DraftData }> = ({ data }) => {
  const { attributes, listeners, setNodeRef, transform } = useSortable({
    id: data.id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
  };

  return (
    <ListItem ref={setNodeRef} {...attributes} {...listeners} style={style}>
      <Card id={data.id}>
        <CardBody>
          <Text>{data.text}</Text>
        </CardBody>
      </Card>
    </ListItem>
  );
};
