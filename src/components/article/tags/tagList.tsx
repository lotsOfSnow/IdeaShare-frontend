import { Grid, Typography } from "@material-ui/core";
import React from "react";
import { Nullable } from "../../../types/nullable";
import BasicTooltip from "../../shared/tooltip/basic";
import Tag from "./tag";

interface TagListProps {
  tags: Nullable<string[]>;
  amount?: number;
}

const TagList: React.FC<TagListProps> = ({ tags, amount }: TagListProps) => {
  return (
    <>
      {tags !== null && tags.length === 0 && (
        <Typography color="textSecondary">No tags :(</Typography>
      )}
      {tags?.map((tag, i) => {
        if (amount && i < amount) {
          return (
            <Grid item key={tag}>
              <Tag label={tag} />
            </Grid>
          );
        }

        return "";
      })}
      {amount && tags !== null && tags.length > amount && (
        <BasicTooltip
          title={tags.map((tag, i) => {
            return `${tag}${i < tags.length - 1 ? " " : ""}`;
          })}
          placement="top"
        >
          <Typography color="textSecondary">
            {`and
          ${tags.length - amount}
          more...`}
          </Typography>
        </BasicTooltip>
      )}
    </>
  );
};

export default TagList;
