import { Theme } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    marginRight: 0,
    marginLeft: "auto",
    width: "auto",
  },
  button: {
    marginLeft: "25px",
  },
  avatarSmall: {
    width: theme.spacing(3),
    height: theme.spacing(3),
  },
  tab: {
    fontWeight: 700,
  },
  hidden: {
    display: "none",
  },
  bigIndicator: {
    height: 5,
  },
}));

export default useStyles;
