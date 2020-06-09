import { makeStyles, Theme } from "@material-ui/core";
import { convertToRaw, Editor, EditorState, RichUtils } from "draft-js";
import { stateToMarkdown } from "draft-js-export-markdown";
import React, { useRef } from "react";
import { useFormContext } from "react-hook-form";
import BlockStyleControls from "./blockStyleControls";

const useStyles = makeStyles((theme: Theme) => ({
  root: {},
  container: {
    margin: theme.spacing(1, 0, 0, 0),
    position: "relative",
    fontFamily: theme.typography.body1.fontFamily,
    fontSize: theme.typography.body1.fontSize,
    "& figure": {
      margin: 0,
    },
  },
  inheritFontSize: {
    fontSize: "inherit",
  },
  editor: {},
  editorContainer: {
    margin: theme.spacing(1, 0, 0, 0),
    cursor: "text",
    width: "100%",
    padding: theme.spacing(0, 0, 1, 0),
  },
  editorReadOnly: {
    borderBottom: "none",
  },
  error: {
    borderBottom: "2px solid red",
  },
  hidePlaceholder: {
    display: "none",
  },
  placeHolder: {
    color: theme.palette.grey[600],
    position: "absolute",
  },
  linkPopover: {
    padding: theme.spacing(2, 2, 2, 2),
  },
  linkTextField: {
    width: "100%",
  },
  anchorLink: {
    textDecoration: "underline",
    color: theme.palette.secondary.main,
  },
  toolbar: {},
  inlineToolbar: {
    maxWidth: "180px",
    position: "absolute",
    padding: "5px",
    zIndex: 10,
  },
}));

interface BodyProps {
  editorState: any;
  setEditorState: any;
}

const Body: React.FC<BodyProps> = ({
  editorState,
  setEditorState,
}: BodyProps) => {
  const { register, getValues, setValue, errors } = useFormContext();
  const classes = useStyles();
  const editor = useRef<Editor>(null);

  const onChange = (newEditorState: EditorState) => {
    setEditorState(newEditorState);
    const markdown = stateToMarkdown(editorState.getCurrentContent());
    setValue("body", markdown.replace(/(?:\r\n|\r|\n)/g, "\\"));
  };

  const focus = () => {
    if (editor !== null && editor.current !== null) {
      editor.current.focus();
    }
  };

  const toggleBlockType = (style: string, type: string) => {
    if (type === "inline") {
      onChange(RichUtils.toggleInlineStyle(editorState, style));
    } else {
      onChange(RichUtils.toggleBlockType(editorState, style));
    }
  };

  return (
    <div className={classes.editorContainer}>
      <BlockStyleControls
        editorState={editorState}
        onToggle={toggleBlockType}
      />
      <input name="body" ref={register} hidden />
      <div onClick={focus}>
        <Editor
          ref={editor}
          editorState={editorState}
          onChange={onChange}
          placeholder="Tell a story..."
        />
      </div>
    </div>
  );
};

export default Body;
