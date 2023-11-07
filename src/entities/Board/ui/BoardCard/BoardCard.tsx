import { memo } from "react";
import { useNavigate } from "react-router-dom";
import { Grid, Stack, Typography, IconButton, Box } from "@mui/material";
import OpenIcon from "@mui/icons-material/Launch";

type BoardCardProps = {
  id: string;
  boardsDataId: string;
  name: string;
  color: string;
  createdAt: string;
};

const BoardCard = memo(
  ({ id, boardsDataId, color, name, createdAt }: BoardCardProps) => {
    const navigate = useNavigate();

    return (
      <Grid item xs={12} md={4} lg={3} xl={2}>
        <Stack
          p={2}
          bgcolor="background.paper"
          borderLeft="5px solid"
          borderColor={color}
        >
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Box width="60%">
              <Typography
                whiteSpace="nowrap"
                overflow="hidden"
                textOverflow="ellipsis"
                fontWeight={400}
                variant="h6"
              >
                {name}
              </Typography>
            </Box>

            <IconButton onClick={() => navigate(`/boards/${boardsDataId}`)}>
              <OpenIcon />
            </IconButton>
          </Stack>
          <Typography variant="caption">Created at {createdAt}</Typography>
        </Stack>
      </Grid>
    );
  }
);

export default BoardCard;
