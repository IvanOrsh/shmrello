import { memo } from "react";
import { Grid, Stack, Typography, IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/AddCircleOutline";
import { Droppable } from "@hello-pangea/dnd";

import { Task, TaskType } from "@entities/Task";
import { TabKeys } from "@entities/Tab/model/types/Tab";

type TabProps = {
  tabKey: TabKeys;
  setTaskStatus: (status: "" | TabKeys) => void;
  tasks: TaskType[];
  handleRemoveTask: (tab: TabKeys, taskId: string) => Promise<void>;
};

const Tab = memo((props: TabProps) => {
  const { tabKey, setTaskStatus, tasks, handleRemoveTask } = props;
  return (
    <Droppable droppableId={tabKey}>
      {(provided) => (
        <Grid
          {...provided.droppableProps}
          ref={provided.innerRef}
          item
          sm={4}
          xs={12}
        >
          {/* header */}
          <Stack p={2} bgcolor="background.paper">
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
            >
              <Typography
                fontWeight={400}
                variant="h6"
                textTransform="capitalize"
              >
                {tabKey}
              </Typography>
              <IconButton onClick={() => setTaskStatus(tabKey)}>
                <AddIcon />
              </IconButton>
            </Stack>

            {/* items */}
            <Stack spacing={2} mt={3}>
              {tasks.map(({ id, text }, idx) => (
                <Task
                  key={id}
                  id={id}
                  index={idx}
                  text={text}
                  handleRemoveTask={() => handleRemoveTask(tabKey, id)}
                />
              ))}
            </Stack>
            {provided.placeholder}
          </Stack>
        </Grid>
      )}
    </Droppable>
  );
});

export default Tab;
