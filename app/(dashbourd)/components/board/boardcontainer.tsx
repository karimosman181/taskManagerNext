"use client";

import { BoardProvider } from "@/contexts/BoardContext";
import React from "react";
import Board from "./board";

export default function BoardContainer() {
  return (
    <BoardProvider>
      <div className="px-4 h-full py-4">
        <Board></Board>
      </div>
    </BoardProvider>
  );
}
