import { useState } from "react";
import { Stack, Typography } from "@mui/material";

import { CreateBoardModal } from "@features/createBoard";
import { TopBar } from "@widgets/TopBar";

const BoardsPage = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <TopBar openModal={() => setShowModal(true)} />

      <CreateBoardModal open={showModal} setOpen={setShowModal} />

      <Stack mt={15} spacing={1} alignItems="center">
        <Typography
          sx={(theme) => ({
            color: theme.palette.secondary.main,
          })}
          variant="h5"
        >
          No boards created.
        </Typography>
        <Typography>Create your first board today!</Typography>
      </Stack>
    </>
  );
};

export default BoardsPage;
