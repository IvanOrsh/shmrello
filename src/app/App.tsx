import { useEffect } from "react";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { onAuthStateChanged } from "firebase/auth";

import AppLoader from "../shared/ui/AppLoader/AppLoader";
import { auth } from "../firebase";
import { AppRouter } from "./providers/router";
import useUserStore from "./store";
import theme from "./styles/themes/theme";

function App() {
  const { userQuery, setLoginStatus } = useUserStore();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      setLoginStatus(!!user);
    });

    console.log(userQuery.isLoggedIn, userQuery.loader);

    return () => unsub();
  }, [setLoginStatus, userQuery.isLoggedIn, userQuery.loader]);

  if (userQuery.loader) {
    return <AppLoader />;
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppRouter />
    </ThemeProvider>
  );
}

export default App;
