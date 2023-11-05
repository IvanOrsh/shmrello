import { useState } from "react";

import { CreateBoardModal } from "@features/createBoard";
import { TopBar } from "@widgets/TopBar";
import { NoBoards, Boards, Board, colors } from "@entities/Board";

const boards: Board[] = [
  {
    id: "1",
    name: "New Board",
    color: colors[0],
    createdAt: "5/25/25",
  },
  {
    id: "2",
    name: "New Board1",
    color: colors[1],
    createdAt: "5/27/25",
  },
  {
    id: "3",
    name: "New Board2",
    color: colors[2],
    createdAt: "5/25/25",
  },
];

const BoardsPage = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <TopBar openModal={() => setShowModal(true)} />

      <CreateBoardModal open={showModal} setOpen={setShowModal} />

      {/* <NoBoards /> */}
      <Boards boards={boards} />
    </>
  );
};

export default BoardsPage;
