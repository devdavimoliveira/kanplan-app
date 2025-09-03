import { api } from "@/lib/axios";
import type { BoardWithColumnsAndTasks } from "@/types/Board";

export async function getBoardWithDetailsById({
  boardId,
}: {
  boardId: string;
}) {
  const { data } = await api.get<BoardWithColumnsAndTasks>(
    `/boards/${boardId}/details`
  );

  return data;
}
