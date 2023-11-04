import { AppBar, Toolbar, Button, Stack } from "@mui/material";

import ImageEl from "@shared/ui/ImageEl/ImageEl";
import logoImg from "@shared/assets/shmrello-logo-dark.svg";
import LogoutIcon from "@mui/icons-material/ExitToApp";

const TopBar = () => {
  return (
    <AppBar position="static">
      <Toolbar
        sx={{
          justifyContent: "space-between",
        }}
      >
        <ImageEl
          sx={{
            height: "2rem",
          }}
          src={logoImg}
        />

        <Stack direction="row" spacing={2}>
          <Button variant="contained">Create Board</Button>
          <Button startIcon={<LogoutIcon />} color="inherit">
            Logout
          </Button>
        </Stack>
      </Toolbar>
    </AppBar>
  );
};

export default TopBar;
