import { Stack, Grid } from "@mui/material";
import BoardCard from "../BoardCard/BoardCard";
import { Board } from "../../model/Board";

type BoardsProps = {
  boards: Board[];
};

const Boards = ({ boards }: BoardsProps) => {
  return (
    <Stack px={3} mt={5}>
      <Grid container spacing={3}>
        {boards.map(({ id, color, name, createdAt }) => (
          <BoardCard key={id} name={name} color={color} createdAt={createdAt} />
        ))}
      </Grid>
    </Stack>
  );
};

export default Boards;
