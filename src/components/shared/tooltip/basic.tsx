import { Theme, Tooltip, withStyles } from "@material-ui/core";

const BasicTooltip = withStyles((theme: Theme) => ({
  tooltip: {
    fontSize: theme.typography.body1.fontSize,
  },
}))(Tooltip);

export default BasicTooltip;
