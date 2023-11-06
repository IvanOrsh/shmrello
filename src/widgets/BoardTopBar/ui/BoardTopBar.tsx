import { AppBar, Toolbar, Stack, Typography, IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";

import BackIcon from "@mui/icons-material/ArrowBack";
import DeleteIcon from "@mui/icons-material/Delete";

type BoardTopBarProps = {
  name: string;
  color: string;
  lastUpdated: string;
};

const BoardTopBar = (props: BoardTopBarProps) => {
  const navigate = useNavigate();

  const { name, color, lastUpdated: createdAt } = props;

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
          <Typography variant="h6">{name}</Typography>
        </Stack>

        <Stack direction="row" alignItems="center" spacing={2}>
          <Typography variant="body2">Last updated: {createdAt}</Typography>
          <IconButton>
            <DeleteIcon />
          </IconButton>
        </Stack>
      </Toolbar>
    </AppBar>
  );
};

export default BoardTopBar;
