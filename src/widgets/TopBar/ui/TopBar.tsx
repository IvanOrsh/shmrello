import { AppBar, Toolbar, Button, Stack } from "@mui/material";
import { signOut } from "firebase/auth";

import ImageEl from "@shared/ui/ImageEl/ImageEl";
import logoImg from "@shared/assets/shmrello-logo-dark.svg";
import LogoutIcon from "@mui/icons-material/ExitToApp";
import { auth } from "@app/firebase";

type TopBarProps = {
  openModal: () => void;
};

const TopBar = ({ openModal }: TopBarProps) => {
  const logoutHandler = () => {
    signOut(auth);
  };

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
          <Button onClick={openModal} variant="contained">
            Create Board
          </Button>
          <Button
            onClick={logoutHandler}
            startIcon={<LogoutIcon />}
            color="inherit"
          >
            Logout
          </Button>
        </Stack>
      </Toolbar>
    </AppBar>
  );
};

export default TopBar;
