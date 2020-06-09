import { InputBaseComponentProps, InputLabel, Select } from "@material-ui/core";
import React from "react";

const values = [1, 5, 10, 20, 30];

const ITEM_HEIGHT = 25;
const ITEM_PADDING_TOP = 8;

type SelectorProps = InputBaseComponentProps & {
  label?: string;
  value: string | number;
  onChange: (event: any) => void;
  children: React.ReactNode;
};

const Selector: React.FC<InputBaseComponentProps & SelectorProps> = ({
  label,
  value,
  id,
  name,
  onChange,
  children,
}: SelectorProps) => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        marginRight: "10px",
      }}
    >
      {label && <InputLabel htmlFor="per-page">{label}</InputLabel>}
      <Select
        style={{ textAlign: "center", minWidth: "80px" }}
        value={value}
        onChange={onChange}
        inputProps={{
          name: `${name}`,
          id,
        }}
        MenuProps={{
          anchorOrigin: {
            vertical: "bottom",
            horizontal: "left",
          },
          transformOrigin: {
            vertical: "top",
            horizontal: "left",
          },
          getContentAnchorEl: null,
          PaperProps: {
            style: {
              maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
              width: 250,
            },
          },
        }}
      >
        {children}
      </Select>
    </div>
  );
};

export default Selector;
