import { Grid, Stack, Typography, IconButton, Box } from "@mui/material";
import OpenIcon from "@mui/icons-material/Launch";

type BoardCardProps = {
  name: string;
  color: string;
  createdAt: string;
};

const BoardCard = ({ color, name, createdAt }: BoardCardProps) => {
  return (
    <Grid item xs={6} md={4} lg={3} xl={2}>
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
          <Box width="50%">
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
