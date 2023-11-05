import { useState } from "react";

import { CreateBoardModal } from "@features/createBoard";
import { TopBar } from "@widgets/TopBar";
import { NoBoards } from "@entities/Board";

const BoardsPage = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <TopBar openModal={() => setShowModal(true)} />

      <CreateBoardModal open={showModal} setOpen={setShowModal} />

      {/* <NoBoards /> */}
    </>
  );
};

export default BoardsPage;
