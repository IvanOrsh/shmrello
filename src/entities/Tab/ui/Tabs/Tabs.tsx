import { Grid, Stack } from "@mui/material";

import Tab from "../Tab/Tab";
import { AddTaskModal } from "@features/addTask";
import { Tab as TabType } from "../../model/types/Tab";
import { useState } from "react";
import { BoardData } from "@entities/Board";

type TabsProps = {
  boardData: BoardData;
};

const Tabs = ({ boardData }: TabsProps) => {
  const [taskStatus, setTaskStatus] = useState("");

  const { tabs: boardDataTabs } = boardData;

  const tabs: TabType[] = [
    {
      id: "1",
      status: "todo",
      tasks: [...boardDataTabs.todos],
    },
    {
      id: "2",
      status: "in progress",
      tasks: [...boardDataTabs.inProgress],
    },
    {
      id: "3",
      status: "completed",
      tasks: [...boardDataTabs.completed],
    },
  ];

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
