import { memo } from "react";
import { AppBar, Toolbar, Stack, Typography, IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";

import BackIcon from "@mui/icons-material/ArrowBack";
import DeleteIcon from "@mui/icons-material/Delete";

type BoardTopBarProps = {
  name: string;
  color: string;
  lastUpdated: string;
  handleDeleteBoard: () => Promise<void>;
};

const BoardTopBar = memo((props: BoardTopBarProps) => {
  const navigate = useNavigate();

  const { name, color, lastUpdated: createdAt, handleDeleteBoard } = props;

  return (
    <AppBar
      position="static"
      sx={{
        borderBottom: "5px solid",
        borderColor: color,
      }}
    >
      <Toolbar
        sx={{
          justifyContent: "space-between",
        }}
      >
        <Stack direction="row" alignItems="center" spacing={1}>
          <IconButton onClick={() => navigate(-1)}>
            <BackIcon />
          </IconButton>
          <Typography
            width="220px"
            variant="h6"
            whiteSpace="nowrap"
            overflow="hidden"
            textOverflow="ellipsis"
            fontWeight={400}
          >
            {name}
          </Typography>
        </Stack>

        <Stack direction="row" alignItems="center" spacing={2}>
          <Typography
            display={{
              xs: "none",
              sm: "block",
            }}
            variant="body2"
          >
            Last updated: {createdAt}
          </Typography>
          <IconButton onClick={handleDeleteBoard}>
            <DeleteIcon />
          </IconButton>
        </Stack>
      </Toolbar>
    </AppBar>
  );
});

export default BoardTopBar;
