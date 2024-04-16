"use client";

import { Plus } from "lucide-react";
import { ListWrapper } from "./listwrapper";

export const ListForm = () => {
  return (
    <ListWrapper>
      <button className="w-full rounded-md bg-white/80 hover:bg-white/50 hover:shadow-md transition p-3 flex items-center font-medium text-sm">
        <Plus className="h-4 w-4 mr-2" />
        Add a list
      </button>
      {/* <form className="w-full p-3 rounded-md bg-white space-y-4 shadow-md"></form> */}
    </ListWrapper>
  );
};
