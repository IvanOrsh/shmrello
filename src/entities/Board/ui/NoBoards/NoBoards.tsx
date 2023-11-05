import { Stack, Typography } from "@mui/material";

const NoBoards = () => {
  return (
    <Stack mt={15} spacing={1} alignItems="center">
      <Typography
        sx={(theme) => ({
          color: theme.palette.secondary.main,
        })}
        variant="h5"
      >
        No boards created.
      </Typography>
      <Typography>Create your first board today!</Typography>
    </Stack>
  );
};

export default NoBoards;
