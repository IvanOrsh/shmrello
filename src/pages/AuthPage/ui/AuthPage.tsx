import {
  Container,
  Stack,
  OutlinedInput,
  Button,
  Typography,
} from "@mui/material";

import logoImg from "../../../shared/assets/shmrello-logo.svg";

const AuthPage = () => {
  return (
    <Container>
      <Stack>
        <div>
          <img src={logoImg} alt="logo" />
        </div>
        <Typography variant="h1" component="h2">
          AuthPage
        </Typography>
      </Stack>
    </Container>
  );
};

export default AuthPage;
