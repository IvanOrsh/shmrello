import { useState } from "react";
import {
  Dialog,
  Stack,
  Typography,
  TextField,
  Box,
  Button,
} from "@mui/material";

import { colors } from "./colorsForTasks";
import ModalHeader from "@shared/ui/ModalHeader/ModalHeader";

const CreateBoardModal = () => {
  const [open, setOpen] = useState(true);
  const [name, setName] = useState("");
  const [color, setColor] = useState(0);

  return (
    <Dialog open={open} fullWidth maxWidth="xs">
      <Stack p={2}>
        <ModalHeader
          title="Create Board"
          onClose={() => setOpen((prev) => !prev)}
        />
        <Stack my={5} spacing={3}>
          <TextField
            label="Board name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Stack direction="row" spacing={1.5}>
            <Typography>Color: </Typography>
            {colors.map((clr, idx) => (
              <Box
                sx={{
                  cursor: "pointer",
                  border: `${color === idx ? "3px solid #383838" : ""}`,
                  outline: `2px solid ${clr} `,
                }}
                onClick={() => setColor(idx)}
                key={clr}
                height={25}
                width={25}
                bgcolor={clr}
                borderRadius="50%"
              />
            ))}
          </Stack>
        </Stack>
        <Button variant="contained">Create</Button>
      </Stack>
    </Dialog>
  );
};

export default CreateBoardModal;
