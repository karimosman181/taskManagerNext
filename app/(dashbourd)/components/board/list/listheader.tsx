"use client";

import List from "@/models/List.model";
import { Icons } from "@/components/icons";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { I_ListPublic } from "@/models/List.types";
import { I_ApiListDeleteResponse } from "@/app/api/account/organizations/lists/route";
import { useBoard } from "@/contexts/BoardContext";
import { useState } from "react";

interface ListHeaderProps {
  data: I_ListPublic;
}

export const ListHeader = ({ data }: ListHeaderProps) => {
  const Icon = Icons["ellipsisHorizontal"];

  const { reLoad, setReLoad } = useBoard();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleDeleteList = async (id: string) => {
    if (isLoading) return;

    setIsLoading(true);
    setError("");
    try {
      const response = await fetch(
        "/api/account/organizations/lists?id=" + id,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data: I_ApiListDeleteResponse = await response.json();

      if (data.success) {
        setReLoad(!reLoad);
      }
    } catch (error) {
      let mess = "Something went wrong.";
      if (error instanceof Error) {
        mess = error.message;
      }
      setError(mess);
    }
  };

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
                <li onClick={(e: any) => handleDeleteList(data.id)}>delete</li>
              </ul>
            </PopoverContent>
          </Popover>
        </div>
      </div>
      <div className={"w-full  h-1 rounded-full " + data.color}>&nbsp;</div>
    </div>
  );
};
