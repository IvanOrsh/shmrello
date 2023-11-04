import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

import { Container, Stack, Typography } from "@mui/material";

import ImageEl from "../../../shared/ui/ImageEl/ImageEl";
import logoImg from "../../../shared/assets/shmrello-logo.svg";

type AuthForm = {
  email: string;
  password: string;
};

const initForm: AuthForm = {
  email: "",
  password: "",
};

const AuthPage = () => {
  const [isLogged, setIsLogged] = useState(false);
  const authText = isLogged
    ? "Don not have an account"
    : "Already have an account?";
  const [form, setForm] = useState(initForm);
  const onChangeHandler = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const values = Object.fromEntries(formData.entries());
    console.log(values);
  };

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

      {/* Login/Register - TODO: to be extracted! */}

      <Stack spacing={4}>
        <form autoComplete="off" onSubmit={handleSubmit}>
          <Stack spacing={2}>
            <TextField
              label="Email"
              name="email"
              value={form.email}
              onChange={onChangeHandler}
            />

            <TextField
              label="Password"
              name="password"
              value={form.password}
              onChange={onChangeHandler}
            />
            <Button
              disabled={!form.email.trim() || !form.password.trim()}
              type="submit"
              size="large"
              variant="outlined"
            >
              {isLogged ? "Login" : "Register"}
            </Button>
          </Stack>
        </form>

        <Button variant="text" onClick={() => setIsLogged((prev) => !prev)}>
          {authText}
        </Button>
      </Stack>
    </Container>
  );
};

export default AuthPage;
