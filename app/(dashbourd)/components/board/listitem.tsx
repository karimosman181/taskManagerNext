"use client";

import List from "@/models/List.model";
import { ListHeader } from "./listheader";

interface ListItemProps {
  data: List;
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
