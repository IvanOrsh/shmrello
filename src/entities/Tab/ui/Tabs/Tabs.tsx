import { useState, useEffect } from "react";
import { Grid, Stack } from "@mui/material";

import Tab from "../Tab/Tab";
import { TabKeys, Tab as TabType } from "../../model/types/Tab";
import { AddTaskModal } from "@features/addTask";
import { BoardData } from "@entities/Board";
import { useUpdateBoardData } from "@entities/Board";

type TabsProps = {
  boardData: BoardData;
  boardId: string;
};

const Tabs = ({ boardData, boardId }: TabsProps) => {
  const { tabs: boardDataTabs } = boardData;

  const updateBoardData = useUpdateBoardData();

  const [taskStatus, setTaskStatus] = useState<TabKeys | "">("");
  const [tabs, setTabs] = useState<TabType>({
    todos: [...boardDataTabs.todos],
    inProgress: [...boardDataTabs.inProgress],
    completed: [...boardDataTabs.completed],
  });

  const handleAddTask = async (text: string) => {
    const dClone = structuredClone(tabs);
    if (!text || !taskStatus) {
      setTaskStatus("");
      return;
    }
    // update local state

    const newTask = {
      id: crypto.randomUUID(),
      text,
    };

    dClone[taskStatus].unshift(newTask);

    // and then update server state
    try {
      await updateBoardData(boardId, {
        id: boardId,
        tabs: dClone,
      });
      setTabs(dClone);
    } catch (err) {
      // TODO: toastr
      console.log(err);
    }

    setTaskStatus("");
  };

  return (
    <>
      <AddTaskModal
        handleAddTask={handleAddTask}
        taskStatus={taskStatus}
        setOpen={() => setTaskStatus("")}
      />

      <Stack px={3} mt={5}>
        <Grid container spacing={3}>
          {Object.keys(tabs).map((tab) => (
            <Tab
              key={tab}
              tabKey={tab}
              tasks={tabs[tab as TabKeys]}
              setTaskStatus={() => setTaskStatus(tab as TabKeys)}
            />
          ))}
        </Grid>
      </Stack>
    </>
  );
};

export default Tabs;
