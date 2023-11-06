import { useEffect, useMemo, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import useUserStore from "@app/store";
import { Tabs } from "@entities/Tab";
import { BoardTopBar } from "@widgets/BoardTopBar";
import { useFetchBoard } from "@entities/Board";
import type { BoardData } from "@entities/Board";
import AppLoader from "@shared/ui/AppLoader/AppLoader";

const BoardPage = () => {
  const navigate = useNavigate();
  const { boardId } = useParams();

  const fetchBoard = useFetchBoard();

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<BoardData | null>(null);

  const {
    userQuery: { boards, areBoardsFetched },
  } = useUserStore();

  const board = useMemo(
    () => boards.find((b) => b.id === boardId),
    [boardId, boards]
  );
  const boardData = useMemo(() => data, [data]);

  const handleFetchBoard = async () => {
    try {
      const boardData = await fetchBoard(boardId!);
      if (boardData) {
        setData({
          id: boardId!,
          tabs: boardData.tabs,
          lastUpdated: boardData.lastUpdated.toDate().toLocaleString("en-US"),
        });
      }
    } catch (err) {
      // TODO: !
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!areBoardsFetched || !board) {
      navigate(-1);
    } else {
      handleFetchBoard();
    }
  }, []);

  if (!board) return null;

  if (loading) return <AppLoader />;

  return (
    <>
      <BoardTopBar
        name={board?.name || "Default Board"}
        color={board?.color || "#fff"}
        lastUpdated={data?.lastUpdated || "just now"}
      />

      {/* TODO: more research needed */}
      <Tabs boardData={boardData!} />
    </>
  );
};

export default BoardPage;
