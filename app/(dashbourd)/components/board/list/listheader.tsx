"use client";

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
  const Trash = Icons["trash"];
  const AddIcon = Icons["add"];
  const EditIcon = Icons["edit"];

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
        <div className="grow">{data.title}</div>
        <div>
          <Popover>
            <PopoverTrigger>
              <Icon />
            </PopoverTrigger>
            <PopoverContent className="w-32">
              <ul className="flex flex-col gap-y-4">
                <li className="flex flex-wrap flex-row text-blue-900 gap-0.5">
                  <div>
                    <EditIcon className="text-md" />
                  </div>
                  <div>Edit list</div>
                </li>
                <li className="flex flex-wrap flex-row text-green-900 gap-0.5">
                  <div>
                    <AddIcon className="text-md" />
                  </div>
                  <div>add card</div>
                </li>
                <li
                  onClick={(e: any) => handleDeleteList(data.id)}
                  className="flex flex-wrap flex-row text-red-900 gap-2"
                >
                  <div>
                    <Trash className="text-md" />
                  </div>
                  <div>delete</div>
                </li>
              </ul>
            </PopoverContent>
          </Popover>
        </div>
      </div>
      <div className={"w-full  h-1 rounded-full " + data.color}>&nbsp;</div>
    </div>
  );
};
