import { useState } from "react";
import { Stack, Grid, Typography, IconButton, Box } from "@mui/material";
import OpenIcon from "@mui/icons-material/Launch";

import { CreateBoardModal } from "@features/createBoard";
import { TopBar } from "@widgets/TopBar";
import { NoBoards } from "@entities/Board";
import { colors } from "@features/createBoard/ui/CreateBoardModal/colorsForTasks";

const BoardsPage = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <TopBar openModal={() => setShowModal(true)} />

      <CreateBoardModal open={showModal} setOpen={setShowModal} />

      {/* <NoBoards /> */}

      <Stack p={3} mt={5}>
        <Grid container>
          <Grid item xs={3}>
            <Stack
              p={2}
              bgcolor="background.paper"
              borderLeft="5px solid"
              borderColor={colors[0]}
            >
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
              >
                <Typography fontWeight={400} variant="h6">
                  Board name
                </Typography>
                <IconButton>
                  <OpenIcon />
                </IconButton>
              </Stack>
              <Typography variant="caption">
                Created at {new Date().toISOString()}
              </Typography>
            </Stack>
          </Grid>
        </Grid>
      </Stack>
    </>
  );
};

export default BoardsPage;
