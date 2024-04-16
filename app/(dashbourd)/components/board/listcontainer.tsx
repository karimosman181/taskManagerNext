"use client";

import List from "@/models/List.model";
import { ListForm } from "./listform";

interface ListContainerProps {
  data: List[];
}

export const ListContainer = ({ data }: ListContainerProps) => {
  return (
    <ol>
      <ListForm />
      <div className="flex-shrink-0 w-1" />
    </ol>
  );
};
