import { useState } from "react";
import {
  Dialog,
  Stack,
  Typography,
  TextField,
  Box,
  Button,
} from "@mui/material";

import { colors } from "@entities/Board";
import ModalHeader from "@shared/ui/ModalHeader/ModalHeader";
import useCreateBoard from "../../model/service/createBoard";
import useUserStore from "@app/store";

type CreateBoardModalProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const CreateBoardModal = ({ open, setOpen }: CreateBoardModalProps) => {
  const createBoard = useCreateBoard();

  const { setToaster } = useUserStore();

  const [name, setName] = useState("");
  const [selectedColor, setSelectedColor] = useState(0);
  const [loading, setLoading] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleCreate = async () => {
    const tName = name.trim();

    if (!tName) {
      setToaster("Board name cannot be empty");
      return;
    }

    if (!/^[a-zA-Z0-9\s]{1,20}$/.test(name)) {
      setToaster(
        "Board name cannot contain special characters and should not be more than 20 chards"
      );
      return;
    }

    try {
      setLoading(true);
      await createBoard({ name: tName, color: colors[selectedColor] });
      handleClose();
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
      setName("");
      setSelectedColor(0);
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="xs">
      <Stack p={2}>
        <ModalHeader title="Create Board" onClose={handleClose} />
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
                  border: `${selectedColor === idx ? "3px solid #383838" : ""}`,
                  outline: `2px solid ${clr} `,
                }}
                onClick={() => setSelectedColor(idx)}
                key={clr}
                height={25}
                width={25}
                bgcolor={clr}
                borderRadius="50%"
              />
            ))}
          </Stack>
        </Stack>
        <Button disabled={loading} onClick={handleCreate} variant="contained">
          Create Board
        </Button>
      </Stack>
    </Dialog>
  );
};

export default CreateBoardModal;
