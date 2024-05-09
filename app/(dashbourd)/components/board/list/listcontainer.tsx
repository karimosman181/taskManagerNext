"use client";

import List from "@/models/List.model";
import { ListForm } from "./listform";
import { useEffect, useState } from "react";
import { ListItem } from "./listitem";
import { I_ListPublic } from "@/models/List.types";

import { DragDropContext, Droppable } from "@hello-pangea/dnd"

interface ListContainerProps {
  data: I_ListPublic[] | null;
}

export const ListContainer = ({ data }: ListContainerProps) => {
  const [orderedData, setOrderedData] = useState(data);

  useEffect(() => {
    setOrderedData(data);
  }, [data]);

  return (
    <>
      {!orderedData ? (
        ""
      ) : (
        <>
          <DragDropContext onDragEnd={() => { }}>
            <Droppable droppableId="lists" type="list" direction="horizontal">
              {(provided) => (
                <ol
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className="flex gap-x-6 h-full">
                  {orderedData.map((list, index) => {
                    return <ListItem key={list.id} data={list} index={index} />;
                  })}
                  {provided.placeholder}
                  <ListForm />
                  <div className="flex-shrink-0 w-1" />
                </ol>
              )}
            </Droppable>
          </DragDropContext>
        </>
      )}
    </>
  );
};
