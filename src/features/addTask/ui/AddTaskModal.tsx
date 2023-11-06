import { useState } from "react";
import {
  Dialog,
  Stack,
  Typography,
  Chip,
  OutlinedInput,
  Button,
} from "@mui/material";

import ModalHeader from "@shared/ui/ModalHeader/ModalHeader";

type AddTaskModalProps = {
  taskStatus: string;
  setOpen: React.Dispatch<React.SetStateAction<string>>;
  handleAddTask: (text: string) => void;
};

const AddTaskModal = (props: AddTaskModalProps) => {
  const { taskStatus, setOpen, handleAddTask } = props;
  const [text, setText] = useState("");

  const handleOnChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setText(e.target.value);
  };

  const handleClose = () => {
    setText("");
    setOpen("");
  };

  return (
    <Dialog open={!!taskStatus} onClose={handleClose} fullWidth maxWidth="xs">
      <Stack p={2}>
        <ModalHeader title="Add Task" onClose={handleClose} />
        <Stack my={3} spacing={2}>
          <Stack direction="row" alignItems="center" spacing={2}>
            <Typography>Status: </Typography>
            <Chip label={taskStatus} size="small" />
          </Stack>
          <OutlinedInput
            value={text}
            onChange={handleOnChange}
            placeholder="Task"
          />
        </Stack>
        <Button
          onClick={() => {
            setText("");
            handleAddTask(text);
          }}
          variant="contained"
        >
          Add Task
        </Button>
      </Stack>
    </Dialog>
  );
};

export default AddTaskModal;
