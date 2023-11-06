import type { BoardData } from "@entities/Board";

export type AddBoardData = Omit<BoardData, "lastUpdated">;
