import React from "react";
import { EditorState } from "draft-js";

import { AppBar, Toolbar } from "@material-ui/core";
import {
  FormatBold,
  FormatItalic,
  FormatUnderlined,
  FormatStrikethrough,
} from "@material-ui/icons";
import StyleButton from "./styleButton";

type BlockStyleType = {
  name: string;
  label: string;
  style: string;
  icon: JSX.Element;
  type: string;
};

const BLOCK_TYPES: BlockStyleType[] = [
  {
    label: "Bold",
    name: "bold",
    style: "BOLD",
    icon: <FormatBold />,
    type: "inline",
  },
  {
    label: "Italic",
    name: "italic",
    style: "ITALIC",
    icon: <FormatItalic />,
    type: "inline",
  },
  {
    label: "Underline",
    name: "underline",
    style: "UNDERLINE",
    icon: <FormatUnderlined />,
    type: "inline",
  },
  {
    label: "Strikethrough",
    name: "strikethrough",
    style: "STRIKETHROUGH",
    icon: <FormatStrikethrough />,
    type: "inline",
  },
];

interface BlockStyleControlsProps {
  editorState: EditorState;
  onToggle: any;
}

const BlockStyleControls: React.FC<BlockStyleControlsProps> = ({
  editorState,
  onToggle,
}: BlockStyleControlsProps) => {
  const selection = editorState.getSelection();
  const blockType = editorState
    .getCurrentContent()
    .getBlockForKey(selection.getStartKey())
    .getType();

  return (
    <AppBar position="relative" color="default" elevation={0}>
      <Toolbar disableGutters>
        {BLOCK_TYPES.map(type => {
          let active = false;

          if (type.type === "inline") {
            active = editorState.getCurrentInlineStyle().has(type.style);
          } else if (type.type === "block") {
            const block = editorState
              .getCurrentContent()
              .getBlockForKey(selection.getStartKey());
            if (block) {
              active = type.style === block.getType();
            }
          }

          return (
            <StyleButton
              active={active}
              label={type.label}
              handleToggle={onToggle}
              style={type.style}
              icon={type.icon}
              type={type.type}
            />
          );
        })}
      </Toolbar>
    </AppBar>
  );
};

export default BlockStyleControls;
