/* eslint-disable react/jsx-wrap-multilines */
/* eslint-disable react/jsx-curly-newline */
/* eslint-disable react/jsx-props-no-spreading */
import { TextField } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import React, { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";

interface TagData {
  key: number;
  label: string;
}

interface TagsFieldProps {
  tags: string[];
  setTags: (newTags: string[]) => void;
}

const TagsField: React.FC<TagsFieldProps> = ({
  tags,
  setTags,
}: TagsFieldProps) => {
  const methods = useFormContext();
  const [tagData, setTagData] = useState<TagData[]>([]);
  const [newInput, setNewInput] = useState<string>("");

  const trimAndRemoveWhitespace = (val: string): string => {
    return val.replace(/\s+/g, "").trim();
  };

  const mapTagsToStrings = (): string[] => {
    return tagData.map(item => item.label);
  };

  const getTagsFromStrings = () => {
    return tags.map(item => ({ key: 1, label: trimAndRemoveWhitespace(item) }));
  };

  const tagAlreadyExists = (newLabel: string): boolean => {
    return tagData.some(item => item.label === newLabel);
  };

  const addLastInputToTags = (lastInput?: string) => {
    const newLabel = lastInput || newInput;

    if (
      newLabel.trim().length === 0 ||
      tagAlreadyExists(trimAndRemoveWhitespace(newLabel))
    ) {
      return;
    }
    const newTag = { key: 1, label: trimAndRemoveWhitespace(newLabel) };
    setTagData([...tagData, newTag]);
  };

  useEffect(() => {
    const mapped = tagData.map(item => item.label);
    setTags(mapped);
  }, [tagData]);

  useEffect(() => {
    // If tags are not empty (when editing), create tag chips
    if (tags !== undefined) {
      setTagData(getTagsFromStrings());
    }
  }, []);

  const onInput = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const val = e.target.value;

    // Spacebar pressed
    if (val.includes(" ") && val.trim().length > 0) {
      setNewInput("");
      addLastInputToTags(val.trim());
    } else {
      setNewInput(val);
    }
  };

  return (
    <>
      <Autocomplete
        multiple
        fullWidth
        style={{ overflowY: "scroll", overflowX: "hidden" }}
        id="tags-standard"
        onChange={(event: any, value: any, reason: any) => {
          setTagData(value);
        }}
        options={tagData}
        getOptionLabel={option => option.label}
        filterSelectedOptions
        freeSolo
        onBlur={() => addLastInputToTags()}
        value={tagData}
        renderInput={params => (
          <TextField
            {...params}
            variant="standard"
            label="Tags"
            onChange={onInput}
          />
        )}
      />
    </>
  );
};

export default TagsField;
