"use client";

import List from "@/models/List.model";
import { Icons } from "@/components/icons";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { I_ListPublic } from "@/models/List.types";

interface ListHeaderProps {
  data: I_ListPublic;
}

export const ListHeader = ({ data }: ListHeaderProps) => {
  const Icon = Icons["ellipsisHorizontal"];
  return (
    <div className="py-2 px-2 text-sm font-semibold flex flex-col gap-y-2">
      <div className="w-full flex flex-row my-2">
        <div className="grow">{data.title}</div>{" "}
        <div>
          <Popover>
            <PopoverTrigger>
              <Icon />
            </PopoverTrigger>
            <PopoverContent className="w-26">
              <ul>
                <li>add card</li>
                <li>delete</li>
              </ul>
            </PopoverContent>
          </Popover>
        </div>
      </div>
      <div className={"w-full  h-1 rounded-full " + data.color}>&nbsp;</div>
    </div>
  );
};
