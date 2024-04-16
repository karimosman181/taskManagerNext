"use client";
import React, { useEffect, useRef, useState } from "react";
import { ListContainer } from "./board/listcontainer";

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
  // State
  const [error, setError] = useState("");
  const [lists, setLists] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    getList()
      .then((data) => {
        if (data) {
          setLists(data);
        }
      })
      .catch(() => {
        console.error("Something went wrong!");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <>
      <div className="p-4 h-full overflow-x-auto">
        <ListContainer data={lists} />
      </div>
    </>
  );
}
