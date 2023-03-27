import { createTheme, MuiThemeProvider } from "@material-ui/core";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import NewsDetailPage from "./components/NewsDetailPage/NewsDetailPage";
import NewsPage from "./components/NewsPage/NewsPage";

const theme = createTheme({
  typography: {
    fontFamily: "Nunito, sans-serif",
    h1: {
      fontFamily: "Nunito, sans-serif",
      fontWeight: "bold",
      fontSize: "2.5rem",
    },
    h2: {
      fontFamily: "Nunito, sans-serif",
      fontWeight: "bold",
      fontSize: "2rem",
    },
    h3: {
      fontFamily: "Nunito, sans-serif",
      fontWeight: "bold",
      fontSize: "1.75rem",
    },
    h4: {
      fontFamily: "Nunito, sans-serif",
      fontWeight: "bold",
      fontSize: "1.5rem",
    },
    h5: {
      fontFamily: "Nunito, sans-serif",
      fontWeight: "bold",
      fontSize: "1.25rem",
    },
    h6: {
      fontFamily: "Nunito, sans-serif",
      fontWeight: "bold",
      fontSize: "1rem",
    },
    body1: {
      fontFamily: "Nunito, sans-serif",
      fontSize: "1rem",
    },
    body2: {
      fontFamily: "Nunito, sans-serif",
      fontSize: "0.875rem",
    },
    subtitle1: {
      fontFamily: "Nunito, sans-serif",
      fontSize: "1rem",
    },
    subtitle2: {
      fontFamily: "Nunito, sans-serif",
      fontSize: "0.875rem",
    },
  },
  overrides: {
    MuiButton: {
      label: {
        color: "#677bc4",
        fontWeight: "bold",
      },
    },
  },
});

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<NewsPage />} />
          <Route path="/:id" element={<NewsDetailPage />} />
        </Routes>
      </BrowserRouter>
    </MuiThemeProvider>
  );
}

export default App;
