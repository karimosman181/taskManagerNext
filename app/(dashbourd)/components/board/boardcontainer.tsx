"use client";

import { BoardProvider } from "@/contexts/BoardContext";
import React from "react";
import Board from "./board";

export default function BoardContainer() {
  return (
    <BoardProvider>
      <Board></Board>
    </BoardProvider>
  );
}
