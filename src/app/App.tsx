import { CssBaseline, ThemeProvider } from "@mui/material";
import theme from "./styles/themes/theme";
import { AppRouter } from "./providers/router";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppRouter />
    </ThemeProvider>
  );
}

export default App;
