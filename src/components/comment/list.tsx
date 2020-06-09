import { Grid } from "@material-ui/core";
import React from "react";
import { useSelector } from "react-redux";
import { Comment } from "../../features/comments/models";
import { RootState } from "../../store/index";
import { withLoading } from "../../utilities";
import CommentView from "./index";

const List: React.FC = () => {
  const selectComments = (state: RootState) => state.comments;
  const { list } = useSelector(selectComments);

  return (
    <Grid container item spacing={1} direction="column">
      {list.map((item: Comment) => {
        return <CommentView key={item.id as number} comment={item} />;
      })}
    </Grid>
  );
};

export default withLoading(List, () => {
  const { isLoaded } = useSelector((state: RootState) => state.comments);
  return isLoaded;
});
