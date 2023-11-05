import { AppBar, Toolbar, Stack, Typography, IconButton } from "@mui/material";
import BackIcon from "@mui/icons-material/ArrowBack";
import DeleteIcon from "@mui/icons-material/Delete";

const BoardTopBar = () => {
  return (
    <AppBar
      sx={(theme) => ({
        borderBottom: "5px solid",
        borderColor: theme.palette.secondary.main,
      })}
    >
      <Toolbar
        sx={{
          justifyContent: "space-between",
        }}
      >
        <Stack direction="row" alignItems="center" spacing={1}>
          <IconButton>
            <BackIcon />
          </IconButton>
          <Typography variant="h6">Board name</Typography>
        </Stack>

        <Stack direction="row" alignItems="center" spacing={2}>
          <Typography variant="body2">
            Last updated: 5/5/55, 1:01:01 AM
          </Typography>
          <IconButton>
            <DeleteIcon />
          </IconButton>
        </Stack>
      </Toolbar>
    </AppBar>
  );
};

export default BoardTopBar;
