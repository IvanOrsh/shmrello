import { Grid, Stack, Typography, IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/AddCircleOutline";

import { Task, TaskType } from "@entities/Task";

type TabProps = {
  tabKey: string;
  setTaskStatus: () => void;
  tasks: TaskType[];
};

const Tab = ({ tabKey, setTaskStatus, tasks }: TabProps) => {
  return (
    <Grid item xs={4}>
      {/* header */}
      <Stack p={2} bgcolor="background.paper">
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Typography fontWeight={400} variant="h6" textTransform="capitalize">
            {tabKey}
          </Typography>
          <IconButton onClick={setTaskStatus}>
            <AddIcon />
          </IconButton>
        </Stack>

        {/* items */}
        <Stack spacing={2} mt={3}>
          {tasks.map(({ id, text }) => (
            <Task key={id} id={id} text={text} />
          ))}
        </Stack>
      </Stack>
    </Grid>
  );
};

export default Tab;
