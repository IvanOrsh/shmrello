import { useEffect, useState } from "react";

import { CreateBoardModal } from "@features/createBoard";
import { TopBar } from "@widgets/TopBar";
import { NoBoards, Boards } from "@entities/Board";
import useFetchBoards from "@entities/Board/model/service/fetchBoards";
import useUserStore from "@app/store";
import AppLoader from "@shared/ui/AppLoader/AppLoader";

const BoardsPage = () => {
  const {
    userQuery: { areBoardsFetched, boards },
  } = useUserStore();

  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const fetchBoards = useFetchBoards();

  useEffect(() => {
    if (!areBoardsFetched) {
      fetchBoards(setLoading);
    } else {
      setLoading(false);
    }
  }, [areBoardsFetched, fetchBoards]);

  if (loading) return <AppLoader />;

  return (
    <>
      <TopBar openModal={() => setShowModal(true)} />

      <CreateBoardModal open={showModal} setOpen={setShowModal} />

      {boards.length === 0 || !areBoardsFetched ? (
        <NoBoards />
      ) : (
        <Boards
          boards={boards.map(({ id, name, color, createdAt }) => ({
            id,
            name,
            color,
            createdAt,
          }))}
        />
      )}
    </>
  );
};

export default BoardsPage;
