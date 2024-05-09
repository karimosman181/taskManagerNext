"use client";

import List from "@/models/List.model";
import { ListHeader } from "./listheader";
import { I_ListPublic } from "@/models/List.types";
import { CardItem } from "../card/carditem";

import { Draggable, Droppable } from "@hello-pangea/dnd";

interface ListItemProps {
  data: I_ListPublic;
  index: number;
}

export const ListItem = ({ data, index }: ListItemProps) => {
  return (
    <>
      <Draggable draggableId={data.id} index={index}>
        {(provided) => (
          <li
            {...provided.draggableProps}
            ref={provided.innerRef}
            className="shrink-0 h-full w-[272px] select-none">
            <div
              {...provided.dragHandleProps}
              className="w-full ">
              <ListHeader data={data} />
            </div>
            <Droppable droppableId={data.id} type="card">
              {(provided) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className="h-full flex flex-col gap-y-4 overflow-x-auto overflow-y-auto">
                  {data.ListCards
                    ? data.ListCards.map((card, index) => {
                      return <CardItem key={card.id} data={card} index={index} />;
                    })
                    : ""}
                  {provided.placeholder}
                </div>)}
            </Droppable>
          </li>)}
      </Draggable>
    </>
  );
};
