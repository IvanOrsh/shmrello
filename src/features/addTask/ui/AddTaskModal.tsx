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
};

const AddTaskModal = ({ taskStatus, setOpen }: AddTaskModalProps) => {
  const handleClose = () => {
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
          <OutlinedInput placeholder="Task" />
        </Stack>
        <Button variant="contained">Add Task</Button>
      </Stack>
    </Dialog>
  );
};

export default AddTaskModal;
