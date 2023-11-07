import { useState } from "react";
import { Dialog, Typography, Stack, Chip, Button } from "@mui/material";

import { ShiftTask } from "../../model/types/ShiftTask";
import ModalHeader from "@shared/ui/ModalHeader/ModalHeader";
import { statusMap, TabKeys } from "@entities/Tab";

type ShiftTaskModalProps = {
  shiftTask: null | ShiftTask;
  setShiftTask: React.Dispatch<React.SetStateAction<ShiftTask | null>>;
  handleShiftTask: (shiftTask: ShiftTask, newStatus: TabKeys) => Promise<void>;
};

const ShiftTaskModal = (props: ShiftTaskModalProps) => {
  const { shiftTask, setShiftTask, handleShiftTask } = props;

  const [taskStatus, setTaskStatus] = useState(shiftTask!.status);

  const handleClose = () => {
    setShiftTask(null);
  };

  return (
    <Dialog open={!!shiftTask} onClose={handleClose} fullWidth maxWidth="xs">
      <Stack p={2}>
        <ModalHeader title="Shift task" onClose={handleClose} />

        {/* Task */}
        <Stack my={3} spacing={3}>
          <Stack spacing={1}>
            <Typography>Task:</Typography>
            <Typography p={1.5} bgcolor="#43474e">
              {shiftTask?.text}
            </Typography>
          </Stack>

          {/* Status */}
          <Stack spacing={1}>
            <Typography>Status</Typography>
            <Stack direction="row" spacing={1}>
              {Object.keys(statusMap).map((statusKey) => {
                const chipStatus =
                  statusMap[statusKey as keyof typeof statusMap];

                return (
                  <Chip
                    sx={(theme) => ({
                      outline:
                        taskStatus === statusKey
                          ? `2px solid ${theme.palette.primary.main}`
                          : "none",
                    })}
                    key={statusKey}
                    label={chipStatus}
                    onClick={() => setTaskStatus(statusKey as TabKeys)}
                  />
                );
              })}
            </Stack>
          </Stack>
        </Stack>

        <Button
          onClick={() => handleShiftTask(shiftTask!, taskStatus)}
          variant="contained"
        >
          Shift task
        </Button>
      </Stack>
    </Dialog>
  );
};

export default ShiftTaskModal;
