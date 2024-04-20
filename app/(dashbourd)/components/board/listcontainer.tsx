"use client";

import List from "@/models/List.model";
import { ListForm } from "./listform";
import { useEffect, useState } from "react";
import { ListItem } from "./listitem";

interface ListContainerProps {
  data: List[];
}

export const ListContainer = ({ data }: ListContainerProps) => {
  const [orderedData, setOrderedData] = useState(data);

  useEffect(() => {
    setOrderedData(data);
  }, [data]);

  return (
    <ol className="flex gap-x-6 h-full">
      {orderedData.map((list, index) => {
        return <ListItem key={list.id} data={list} index={index} />;
      })}
      <ListForm />
      <div className="flex-shrink-0 w-1" />
    </ol>
  );
};
