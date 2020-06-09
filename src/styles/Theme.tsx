import { createMuiTheme } from "@material-ui/core/styles";
import bgImgPath from "../assets/background.svg";

const ideaTeal = "#009688";
const ideaWhite = "#FFF";

const ideaBlue = "#63b0fa";

const primaryText = "#212121";
const secondaryText = "#757575";

const divider = "#BDBDBD";

const accent = "#E64A19";

const theme = createMuiTheme({
  palette: {
    common: {
      white: `${ideaWhite}`,
    },
    primary: {
      main: `${ideaTeal}`,
    },
    secondary: {
      main: `${accent}`,
    },
    linkBlue: {
      main: `${ideaBlue}`,
    },
    text: {
      primary: `${primaryText}`,
      secondary: `${secondaryText}`,
    },
    divider: `${divider}`,
  },
  typography: {
    fontFamily: '"Arimo", "Roboto", serif',
  },
  overrides: {
    MuiCssBaseline: {
      "@global": {
        body: {
          backgroundColor: "#fafafa",
          backgroundImage: `url(${bgImgPath})`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center center",
          backgroundSize: "cover",
          backgroundAttachment: "fixed",
          height: "100%",
        },
      },
    },
  },
});

theme.typography.subtitle1 = {
  fontSize: "1rem",
  fontWeight: 400,
  lineHeight: 1.75,
  letterSpacing: "0.00938em",

  [theme.breakpoints.down("sm")]: {
    fontSize: "0.5rem",
  },
};

export default theme;
