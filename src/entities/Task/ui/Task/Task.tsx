import { memo } from "react";
import { Stack, Typography, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { Draggable } from "@hello-pangea/dnd";

type TaskProps = {
  id: string;
  index: number;
  text: string;
  handleRemoveTask: () => Promise<void>;
};

const Task = memo((props: TaskProps) => {
  const { id, index, text, handleRemoveTask } = props;

  return (
    <Draggable draggableId={id} index={index}>
      {(provided) => (
        <Stack
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
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
          <IconButton onClick={handleRemoveTask}>
            <DeleteIcon />
          </IconButton>
        </Stack>
      )}
    </Draggable>
  );
});

export default Task;
