import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: { background: "#cc677a", main: "#64d6c4" },
    secondary: { main: "#33445c" },
    text: {
      primary: "#33445c",
      secondary: "#ffffff",
      info: "#d3d3d3",
    },

    error: {
      main: "#cc677a",
    },
  },
});

const Theme = ({ children }) => {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

export default Theme;
