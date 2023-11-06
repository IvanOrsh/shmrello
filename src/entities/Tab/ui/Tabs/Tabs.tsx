import { useState, useCallback } from "react";
import { Grid, Stack } from "@mui/material";

import Tab from "../Tab/Tab";
import { TabKeys, Tab as TabType } from "../../model/types/Tab";
import { AddTaskModal } from "@features/addTask";
import { BoardData } from "@entities/Board";
import { useUpdateBoardData } from "@entities/Board";
import useUserStore from "@app/store";

type StatusMapType = {
  [KEY in TabKeys]: string;
};

const statusMap: StatusMapType = {
  todos: "Todos",
  inProgress: "In Progress",
  completed: "Completed",
};

type TabsProps = {
  boardData: BoardData;
  boardId: string;
  handleUpdateLastUpdated: () => void;
};

const Tabs = ({ boardData, boardId, handleUpdateLastUpdated }: TabsProps) => {
  const { tabs: boardDataTabs } = boardData;

  const { setToaster } = useUserStore();

  const updateBoardData = useUpdateBoardData();

  const [loading, setLoading] = useState(false);
  const [taskStatus, setTaskStatus] = useState<TabKeys | "">("");
  const [tabs, setTabs] = useState<TabType>({
    todos: [...boardDataTabs.todos],
    inProgress: [...boardDataTabs.inProgress],
    completed: [...boardDataTabs.completed],
  });

  const handleSetTaskStatus = useCallback((status: TabKeys | "") => {
    setTaskStatus(status);
  }, []);

  const handleAddTask = async (text: string) => {
    if (!text.trim() || !taskStatus) {
      setToaster("Task text cannot be empty");
      return;
    }

    const dClone = structuredClone(tabs);
    // update local state

    const newTask = {
      id: crypto.randomUUID(),
      text,
    };

    dClone[taskStatus].unshift(newTask);

    // and then update server state
    try {
      setLoading(true);
      await updateBoardData(boardId, {
        id: boardId,
        tabs: dClone,
      });
      setTabs(dClone);
    } catch (err) {
      // TODO: toastr
      console.log(err);
    } finally {
      setLoading(false);
    }

    setTaskStatus("");
    handleUpdateLastUpdated();
  };

  const handleRemoveTask = useCallback(
    async (tab: TabKeys, taskId: string) => {
      const dClone = structuredClone(tabs);

      const taskIdx = dClone[tab].findIndex((t) => t.id === taskId);

      dClone[tab].splice(taskIdx, 1);

      try {
        await updateBoardData(boardId, {
          id: boardId,
          tabs: dClone,
        });
        setTabs(dClone);
      } catch (err) {
        console.log(err);
      }

      handleUpdateLastUpdated();
    },
    [boardId, handleUpdateLastUpdated, tabs, updateBoardData]
  );

  return (
    <>
      {!!taskStatus && (
        <AddTaskModal
          handleAddTask={handleAddTask}
          taskStatus={taskStatus}
          setOpen={() => setTaskStatus("")}
          loading={loading}
        />
      )}

      <Stack px={3} mt={5}>
        <Grid container spacing={3}>
          {Object.keys(statusMap).map((tab) => (
            <Tab
              key={tab}
              tabKey={tab as TabKeys}
              tasks={tabs[tab as TabKeys]}
              setTaskStatus={handleSetTaskStatus}
              handleRemoveTask={handleRemoveTask}
            />
          ))}
        </Grid>
      </Stack>
    </>
  );
};

export default Tabs;
