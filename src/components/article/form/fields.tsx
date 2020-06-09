import { Grid, Typography } from "@material-ui/core";
import { EditorState } from "draft-js";
import { stateFromMarkdown } from "draft-js-import-markdown";
import React, { useEffect, useRef, useState } from "react";
import { useFormContext } from "react-hook-form";
import BaseInput from "../../shared/input/baseInput";
import Body from "./editor";
import TagsField from "./tagsField";
import ThumbnailField from "./thumbnailField";

interface FieldsProps {
  tags: string[];
  setTags: (newTags: string[]) => void;
}

const Fields: React.FC<FieldsProps> = ({ tags, setTags }: FieldsProps) => {
  const { register, getValues, errors } = useFormContext();

  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  useEffect(() => {
    const body: string = getValues("body");
    // The content is saved with unescaped backslashes that act as newlines, replace it with proper newlines
    const contentState = stateFromMarkdown(body.replace(/\\/g, "\n"));

    setEditorState(EditorState.createWithContent(contentState));
  }, []);

  return (
    <Grid container justify="center">
      <Grid item container>
        <Grid container direction="column" item>
          <BaseInput label="Title" name="title" inputRef={register} />
          <Typography color="error" align="center">
            {errors.title && errors.title.message}
          </Typography>
          <BaseInput
            multiline
            rows={3}
            label="Description"
            name="description"
            inputRef={register}
          />
          <Typography color="error" align="center">
            {errors.description && errors.description.message}
          </Typography>
          <ThumbnailField />
        </Grid>
      </Grid>
      <Body editorState={editorState} setEditorState={setEditorState} />
      <Typography color="error" align="center">
        {errors.body && errors.body.message}
      </Typography>
      <TagsField tags={tags} setTags={setTags} />
      <Typography color="error" align="center" />
    </Grid>
  );
};

export default Fields;
