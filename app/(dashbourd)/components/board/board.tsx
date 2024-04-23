"use client";
import React, { useEffect, useRef, useState } from "react";
import { ListContainer } from "./list/listcontainer";
import { useBoard } from "@/contexts/BoardContext";

async function getList() {
  const response = await fetch("/api/account/organizations/lists", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();

  return JSON.parse(JSON.stringify(data));
}

export default function Board() {
  const { isLoading, listsData, listsDataLoaded } = useBoard();
  // State
  // const [error, setError] = useState("");
  // const [lists, setLists] = useState([]);
  // const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {}, []);
  // useEffect(() => {
  //   setIsLoading(true);

  //   getList()
  //     .then((data) => {
  //       if (data) {
  //         setLists(data.lists);
  //       }
  //     })
  //     .catch(() => {
  //       console.error("Something went wrong!");
  //     })
  //     .finally(() => {
  //       setIsLoading(false);
  //     });
  // }, []);

  return (
    <>
      <div className="p-4 h-full overflow-x-auto">
        <ListContainer data={listsData} />
      </div>
    </>
  );
}
