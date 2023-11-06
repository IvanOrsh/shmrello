import { Grid, Stack, Typography, IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/AddCircleOutline";

import { Tab as TabType } from "../../model/types/Tab";

type TabProps = {
  tab: TabType;
  setTaskStatus: () => void;
};

const Tab = ({ tab, setTaskStatus }: TabProps) => {
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
            {tab.status}
          </Typography>
          <IconButton>
            <AddIcon onClick={setTaskStatus} />
          </IconButton>
        </Stack>

        {/* items */}
        <Stack></Stack>
      </Stack>
    </Grid>
  );
};

export default Tab;
