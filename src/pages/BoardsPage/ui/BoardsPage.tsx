import { CreateBoardModal } from "@features/createBoard";
import { TopBar } from "@widgets/TopBar";

const BoardsPage = () => {
  return (
    <>
      <TopBar />

      <CreateBoardModal />

      <div>Boards Page</div>
    </>
  );
};

export default BoardsPage;
