import { Container, Stack, TextField, Button, Typography } from "@mui/material";

import ImageEl from "../../../shared/ui/ImageEl/ImageEl";

import logoImg from "../../../shared/assets/shmrello-logo.svg";

const AuthPage = () => {
  return (
    <Container
      maxWidth="xs"
      sx={{
        mt: 10 /* x8px */,
      }}
    >
      <Stack mb={6} spacing={4} alignItems="center" textAlign="center">
        <div>
          <ImageEl src={logoImg} alt="logo" />
        </div>
        <Stack>
          <Typography
            // color="rgba(255, 255, 255, .6)"
            sx={(theme) => ({
              color: `${theme.palette.primary.main}`,
            })}
            variant="body2"
            component="p"
          >
            Increase your productivity by organizing your workflow in a simple
            way.
          </Typography>
          <Typography
            sx={(theme) => ({
              color: `${theme.palette.secondary.main}`,
            })}
            variant="body2"
            component="p"
          >
            Keep track of your tasks.
          </Typography>
        </Stack>
      </Stack>

      <Stack spacing={2}>
        <TextField label="Email" />
        <TextField label="Password" />
        <Button variant="outlined">Login</Button>
        <Typography textAlign="center">Do not have an account?</Typography>
      </Stack>
    </Container>
  );
};

export default AuthPage;
