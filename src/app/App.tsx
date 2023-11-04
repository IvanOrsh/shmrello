import { CssBaseline, ThemeProvider } from "@mui/material";
import theme from "./styles/themes/theme";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
    </ThemeProvider>
  );
}

export default App;
