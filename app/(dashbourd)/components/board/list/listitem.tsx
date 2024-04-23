"use client";

import List from "@/models/List.model";
import { ListHeader } from "./listheader";
import { I_ListPublic } from "@/models/List.types";

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
      </li>
    </>
  );
};
