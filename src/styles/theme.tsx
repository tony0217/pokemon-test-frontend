import { ThemeOptions, createTheme } from "@mui/material"

const components = {
  MuiCssBaseline: {
    styleOverrides: {
      body: {
        backgroundImage: `linear-gradient(180deg, #3B8AFF 0%, #0048B3 100%)`,
      },
    },
  },
}

const componentsDark = {
  MuiCssBaseline: {
    styleOverrides: {
      body: {
        background: "#2D2C31",
      },
    },
  },
}

const typography = {
  fontFamily: [
    "-apple-system",
    "Gotham",
    '"Segoe UI"',
    '"Helvetica Neue"',
    "Arial",
    "sans-serif",
    '"Apple Color Emoji"',
    '"Segoe UI Emoji"',
    '"Segoe UI Symbol"',
    '"Source Sans Pro"',
  ].join(","),
}

export const ThemePrimary: ThemeOptions = {
  palette: {
    mode: "light",
  },
  components: components,
  typography: typography,
}

export const ThemeBackgroundDark: ThemeOptions = {
  components: componentsDark,
  typography: typography,
}

export const theme = createTheme({
  palette: {
    primary: {
      main: '#0000FF',
    },
    secondary: {
      main: '#800080',
    },
  },
});

export const headerTextStyle = {
  fontSize: '2.5rem',
  fontWeight: 'bold',
  color: '#ffcb03',
  textShadow: '2px 2px 4px rgba(58, 93, 168, 1)',
  textAlign: 'center',
};

export const backgroundGradient = {
  width: 400,
  height: 400,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};
