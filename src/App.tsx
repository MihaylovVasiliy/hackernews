import { BrowserRouter, Route, Routes } from "react-router-dom";
import { createTheme, ThemeProvider } from "@material-ui/core/styles";
import { CssBaseline } from "@material-ui/core";
import { NewsList } from "./components/NewsList/NewsList";
import NewsDetailPage from "./components/NewsDetailPage/NewsDetailPage";
import NewsPage from "./components/NewsPage/NewsPage";

const theme = createTheme({
  palette: {
    primary: {
      main: "#7289DA",
    },
    secondary: {
      main: "#ffffff",
    },
    background: {
      default: "#ccc",
      paper: "#ccc",
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<NewsPage />} />
          <Route path="/:id" element={<NewsDetailPage />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
