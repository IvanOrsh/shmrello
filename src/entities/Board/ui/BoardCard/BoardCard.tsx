import { Grid, Stack, Typography, IconButton } from "@mui/material";
import OpenIcon from "@mui/icons-material/Launch";

type BoardCardProps = {
  name: string;
  color: string;
  createdAt: string;
};

const BoardCard = ({ color, name, createdAt }: BoardCardProps) => {
  return (
    <Grid item xs={3}>
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
          <Typography fontWeight={400} variant="h6">
            {name}
          </Typography>
          <IconButton>
            <OpenIcon />
          </IconButton>
        </Stack>
        <Typography variant="caption">Created at {createdAt}</Typography>
      </Stack>
    </Grid>
  );
};

export default BoardCard;
