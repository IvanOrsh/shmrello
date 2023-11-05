import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Container, Stack, Typography } from "@mui/material";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { FirebaseError } from "firebase/app";

import ImageEl from "@shared/ui/ImageEl/ImageEl";
import logoDark from "@shared/assets/shmrello-logo-dark.svg";
import { auth } from "@app/firebase";
import useUserStore from "@app/store";

type AuthForm = {
  email: string;
  password: string;
};

const initForm: AuthForm = {
  email: "",
  password: "",
};

const AuthPage = () => {
  const [isLoading, setLoading] = useState(false);
  const [isLogged, setIsLogged] = useState(false);
  const authText = isLogged
    ? "Don not have an account"
    : "Already have an account?";
  const [form, setForm] = useState(initForm);
  const { setToaster } = useUserStore();

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
    const values = Object.fromEntries(formData.entries()) as AuthForm;

    try {
      setLoading(true);

      if (isLogged) {
        await signInWithEmailAndPassword(auth, values.email, values.password);
      } else {
        await createUserWithEmailAndPassword(
          auth,
          values.email,
          values.password
        );
      }
    } catch (err: unknown) {
      if (err instanceof FirebaseError) {
        const [_, error] = err.code.split("/");
        if (error) {
          const message = error.split("-").join(" ");
          setToaster(message);
        }
      }
      setLoading(false);
    } finally {
      // setLoading here?
    }
  };

  return (
    <Container
      maxWidth="xs"
      sx={{
        mt: 10 /* x8px */,
      }}
    >
      <Stack mb={6} spacing={4} alignItems="center" textAlign="center">
        <ImageEl src={logoDark} alt="logo" />
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
              disabled={
                isLoading || !form.email.trim() || !form.password.trim()
              }
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
