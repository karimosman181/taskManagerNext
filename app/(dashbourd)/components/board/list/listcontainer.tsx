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

function reorder<T>(list: T[], startIndex: number, endIndex: number) {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
}

export const ListContainer = ({ data }: ListContainerProps) => {
  const [orderedData, setOrderedData] = useState(data);

  useEffect(() => {
    setOrderedData(data);
  }, [data]);

  const onDragEnd = async (result: any) => {
    const { destination, source, type } = result;

    if (!destination) {
      return;
    }

    //position not changed
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return
    }

    //if list moved
    if (type === 'list') {
      const items = reorder(
        orderedData!,
        source.index,
        destination.index
      ).map((item, index) => ({ ...item, order: index }));

      setOrderedData(items);


      const itemsOrders = items.map((item) => ({ id: item.id, order: item.order }));

      const response = await fetch("/api/account/organizations/lists", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ data: itemsOrders }),
      });
    }

    // if card moved
    if (type === 'card') {
      let newOrderedData = [...orderedData!];

      const sourceList = newOrderedData.find(list => list.id === source.droppableId);

      const destList = newOrderedData.find(list => list.id === destination.droppableId);

      if (!sourceList || !destList) {
        return;
      }

      if (!sourceList.ListCards) {
        sourceList.ListCards = [];
      }

      if (!destList.ListCards) {
        destList.ListCards = [];
      }

      if (source.droppableId === destination.droppableId) {
        const reorderCards = reorder(
          sourceList.ListCards,
          source.index,
          destination.index
        ).map((item, index) => ({ ...item, order: index }));

        reorderCards.forEach((card, index) => {
          card.order = index;
        })

        sourceList.ListCards = reorderCards;

        setOrderedData(newOrderedData);

        const cardsOrder = reorderCards.map((item) => ({ id: item.id, order: item.order, listId: item.listId }));

        const response = await fetch("/api/account/organizations/cards", {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ data: cardsOrder }),
        });

      } else {
        const [movedCard] = sourceList.ListCards.splice(source.index, 1);

        movedCard.listId = destination.droppableId;

        destList.ListCards.splice(destination.index, 0, movedCard);

        sourceList.ListCards.forEach((card, index) => {
          card.order = index;
        });

        destList.ListCards.forEach((card, index) => {
          card.order = index;
        });

        setOrderedData(newOrderedData);
        //TODO: Trigger server action 

        const cardsOrder = [...sourceList.ListCards.map((item) => ({ id: item.id, order: item.order, listId: sourceList.id })), ...destList.ListCards.map((item) => ({ id: item.id, order: item.order, listId: destList.id }))];

        const response = await fetch("/api/account/organizations/cards", {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ data: cardsOrder }),
        });

      }
    }
  }

  return (
    <>
      {!orderedData ? (
        ""
      ) : (
        <>
          <DragDropContext onDragEnd={onDragEnd}>
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
