import { type MutationOptions, mutationOptions } from "@tanstack/react-query";
import { type CreateBoardBody, createBoard } from "@/api/boards/create-board";
import type { Board } from "@/types/Board";

export const createBoardMutationOptions = (
  options?: Omit<MutationOptions<Board, Error, CreateBoardBody>, "mutationFn">
) =>
  mutationOptions({
    mutationFn: (body: CreateBoardBody) => createBoard(body),
    ...options,
  });
