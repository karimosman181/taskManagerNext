"use client";

import List from "@/models/List.model";
import { ListHeader } from "./listheader";
import { I_ListPublic } from "@/models/List.types";
import { CardItem } from "../card/carditem";

interface ListItemProps {
  data: I_ListPublic;
  index: number;
}

export const ListItem = ({ data, index }: ListItemProps) => {
  return (
    <>
      <li className="shrink-0 h-full w-[272px] select-none">
        <div className="w-full ">
          <ListHeader data={data} />
        </div>
        <div className="h-full flex flex-col gap-y-4 overflow-x-auto overflow-y-auto">
          {data.ListCards
            ? data.ListCards.map((card, index) => {
                return <CardItem key={card.id} data={card} index={index} />;
              })
            : ""}
        </div>
      </li>
    </>
  );
};
