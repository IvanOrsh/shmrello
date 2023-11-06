import { Grid, Stack } from "@mui/material";

import Tab from "../Tab/Tab";
import { AddTaskModal } from "@features/addTask";
import { Tab as TabType } from "../../model/types/Tab";
import { useState } from "react";

const tabs: TabType[] = [
  {
    id: "1",
    status: "todo",
  },
  {
    id: "2",
    status: "in progress",
  },
  {
    id: "3",
    status: "completed",
  },
];

const Tabs = () => {
  const [taskStatus, setTaskStatus] = useState("");

  return (
    <>
      <AddTaskModal taskStatus={taskStatus} setOpen={() => setTaskStatus("")} />
      <Stack px={3} mt={5}>
        <Grid container spacing={3}>
          {tabs.map((tab) => (
            <Tab
              key={tab.id}
              tab={tab}
              setTaskStatus={() => setTaskStatus(tab.status)}
            />
          ))}
        </Grid>
      </Stack>
    </>
  );
};

export default Tabs;
