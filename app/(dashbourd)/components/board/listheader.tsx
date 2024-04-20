"use client";

import List from "@/models/List.model";
import { Icons } from "@/components/icons";

interface ListHeaderProps {
  data: List;
}

export const ListHeader = ({ data }: ListHeaderProps) => {
  const Icon = Icons["ellipsisHorizontal"];
  return (
    <div className="py-2 px-2 text-sm font-semibold flex flex-col gap-y-2">
      <div className="w-full flex flex-row my-2">
        <div className="grow">{data.title}</div>{" "}
        <div>
          <Icon />
        </div>
      </div>
      <div className={"w-full  h-1 rounded-full " + data.color}>&nbsp;</div>
    </div>
  );
};
