import { useState, useCallback } from "react";
import { Grid, Stack } from "@mui/material";
import { DragDropContext, DropResult } from "@hello-pangea/dnd";

import Tab from "../Tab/Tab";
import { TabKeys, Tab as TabType, statusMap } from "../../model/types/Tab";
import { AddTaskModal } from "@features/addTask";
import { BoardData } from "@entities/Board";
import { useUpdateBoardData } from "@entities/Board";
import useUserStore from "@app/store";
import AppLoader from "@shared/ui/AppLoader/AppLoader";
import { ShiftTaskModal } from "@features/shiftTask";
import { TaskType } from "@entities/Task";
import { ShiftTask } from "@features/shiftTask";

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
  const [shiftTask, setShiftTask] = useState<ShiftTask | null>(null);
  const [tabs, setTabs] = useState<TabType>({
    todos: [...boardDataTabs.todos],
    inProgress: [...boardDataTabs.inProgress],
    completed: [...boardDataTabs.completed],
  });

  const handleSetTaskStatus = useCallback((status: TabKeys | "") => {
    setTaskStatus(status);
  }, []);

  const handleOpenShiftTaskModal = useCallback(
    (task: TaskType, index: number, status: TabKeys) => {
      setShiftTask({
        id: task.id,
        text: task.text,
        index,
        status,
      });
    },
    []
  );

  const handleUpdateBoardData = async (dClone: TabType) => {
    setLoading(true);
    await updateBoardData(boardId, {
      id: boardId,
      tabs: dClone,
    });
    setTabs(dClone);
    handleUpdateLastUpdated();
    setToaster("Board updated");
  };

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
      await handleUpdateBoardData(dClone);
    } catch (err) {
      // TODO: toastr
      console.log(err);
    } finally {
      setLoading(false);
    }

    setTaskStatus("");
  };

  const handleRemoveTask = useCallback(
    async (tab: TabKeys, taskId: string) => {
      const dClone = structuredClone(tabs);

      const taskIdx = dClone[tab].findIndex((t) => t.id === taskId);

      dClone[tab].splice(taskIdx, 1);

      try {
        await handleUpdateBoardData(dClone);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    },
    [/*boardId, handleUpdateLastUpdated,*/ tabs /*updateBoardData*/]
  );

  const handleDnd = async (obj: DropResult) => {
    const { destination, source } = obj;

    // user dropped an item outside of the droppable zone
    if (!destination) return;

    // user dropped an item in the same zone with NO rearrangement
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    )
      return;

    // ===========
    // VALID DND

    const dClone = structuredClone(tabs);
    // remove the element from the source
    const [draggedTask] = dClone[source.droppableId as TabKeys].splice(
      source.index,
      1
    );

    // add this element to the destination
    dClone[destination.droppableId as TabKeys].splice(
      destination.index,
      0,
      draggedTask
    );

    // update server state
    try {
      await handleUpdateBoardData(dClone);
    } catch (err) {
      // TODO: toastr
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const handleShiftTask = async (shiftTask: ShiftTask, newStatus: TabKeys) => {
    if (newStatus === shiftTask.status) {
      return setShiftTask(null);
    }

    const dClone = structuredClone(tabs);
    const oldStatus = shiftTask.status;

    // remove the el from arr1
    const [task] = dClone[oldStatus].splice(shiftTask.index, 1);

    // add to the arr2
    dClone[newStatus].unshift(task);

    try {
      await handleUpdateBoardData(dClone);
    } catch (err) {
      // TODO: toastr
      console.log(err);
    } finally {
      setLoading(false);
      setShiftTask(null);
    }
  };

  if (loading) return <AppLoader />;

  return (
    <>
      {!!shiftTask && (
        <ShiftTaskModal
          shiftTask={shiftTask}
          setShiftTask={setShiftTask}
          handleShiftTask={handleShiftTask}
        />
      )}
      {!!taskStatus && (
        <AddTaskModal
          handleAddTask={handleAddTask}
          taskStatus={taskStatus}
          setOpen={() => setTaskStatus("")}
        />
      )}

      <DragDropContext onDragEnd={handleDnd}>
        <Stack px={3} mt={5}>
          <Grid container spacing={3}>
            {Object.keys(statusMap).map((tab) => (
              <Tab
                key={tab}
                tabKey={tab as TabKeys}
                tasks={tabs[tab as TabKeys]}
                setTaskStatus={handleSetTaskStatus}
                handleRemoveTask={handleRemoveTask}
                handleOpenShiftTaskModal={handleOpenShiftTaskModal}
              />
            ))}
          </Grid>
        </Stack>
      </DragDropContext>
    </>
  );
};

export default Tabs;
