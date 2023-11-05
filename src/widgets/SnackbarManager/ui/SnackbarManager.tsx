import { Snackbar } from "@mui/material";

import useUserStore from "@app/store";

const SnackbarManager = () => {
  const {
    setToaster,
    userQuery: { toasterMsg },
  } = useUserStore();

  return (
    <Snackbar
      message={toasterMsg}
      open={!!toasterMsg}
      autoHideDuration={5000}
      onClose={() => setToaster("")}
    />
  );
};

export default SnackbarManager;
