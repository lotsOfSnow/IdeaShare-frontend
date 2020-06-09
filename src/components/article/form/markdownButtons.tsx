import { AppBar, Button, Toolbar } from "@material-ui/core";
import { FormatBold, FormatItalic } from "@material-ui/icons";
import React from "react";
import { useFormContext } from "react-hook-form";

const MarkdownButtons: React.FC = () => {
  const { getValues, setValue } = useFormContext();

  const onButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const body = getValues("body");

    setValue("body", `${body}**`);
  };

  return (
    <AppBar position="relative" color="secondary" elevation={0}>
      <Toolbar disableGutters>
        <Button>H1</Button>
        <Button id="makeBold" onClick={onButtonClick}>
          <FormatBold />
        </Button>
        <Button>
          <FormatItalic />
        </Button>
        <Button>Three</Button>
      </Toolbar>
    </AppBar>
  );
};

export default MarkdownButtons;
