import { Stack, Typography, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

type TaskProps = {
  id: string;
  text: string;
};

const Task = ({ id, text }: TaskProps) => {
  return (
    <Stack
      direction="row"
      alignItems="center"
      spacing={1}
      justifyContent="space-between"
    >
      <Typography
        p={1}
        width="100%"
        border="1px solid"
        borderColor="#777980"
        bgcolor="#45474e"
      >
        {text}
      </Typography>
      <IconButton>
        <DeleteIcon />
      </IconButton>
    </Stack>
  );
};

export default Task;
