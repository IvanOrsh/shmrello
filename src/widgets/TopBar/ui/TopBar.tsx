import {
  AppBar,
  Toolbar,
  Button,
  IconButton,
  Stack,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { signOut } from "firebase/auth";

import ImageEl from "@shared/ui/ImageEl/ImageEl";
import logoImg from "@shared/assets/shmrello-logo-dark.svg";
import LogoutIcon from "@mui/icons-material/ExitToApp";
import CreateBoardIcon from "@mui/icons-material/AddCircle";
import { auth } from "@app/firebase";

type TopBarProps = {
  openModal: () => void;
};

const TopBar = ({ openModal }: TopBarProps) => {
  const theme = useTheme();
  const isXs = useMediaQuery(theme.breakpoints.only("xs"));

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
          {isXs ? (
            <>
              <IconButton color="secondary" onClick={openModal}>
                <CreateBoardIcon />
              </IconButton>
              <IconButton onClick={logoutHandler}>
                <LogoutIcon />
              </IconButton>
            </>
          ) : (
            <>
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
            </>
          )}
        </Stack>
      </Toolbar>
    </AppBar>
  );
};

export default TopBar;
