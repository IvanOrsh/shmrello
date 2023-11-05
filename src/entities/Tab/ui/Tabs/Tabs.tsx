import { Grid, Stack } from "@mui/material";

import Tab from "../Tab/Tab";
import { Tab as TabType } from "../../model/types/Tab";

const tabs: TabType[] = [
  {
    id: "1",
    type: "todo",
  },
  {
    id: "2",
    type: "in progress",
  },
  {
    id: "3",
    type: "completed",
  },
];

const Tabs = () => {
  return (
    <Stack px={3} mt={5}>
      <Grid container spacing={3}>
        {tabs.map((tab) => (
          <Tab key={tab.id} tab={tab} />
        ))}
      </Grid>
    </Stack>
  );
};

export default Tabs;
