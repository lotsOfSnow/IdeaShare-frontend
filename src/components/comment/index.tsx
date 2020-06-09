import {
  Button,
  Grid,
  Link,
  makeStyles,
  Theme,
  Typography,
} from "@material-ui/core";
import moment from "moment";
import React from "react";
import { useSelector } from "react-redux";
import { Link as RouterLink } from "react-router-dom";
import { Comment } from "../../features/comments/models";
import { RootState } from "../../store";
import { CustomAvatar } from "../shared/avatar";
import { PaddedPaper } from "../shared/paper";
import BasicTooltip from "../shared/tooltip/basic";
import DropdownMenu from "./dropdown";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1,
    overflow: "hidden",
  },
}));

interface CommentViewProps {
  comment: Comment;
}

const CommentView: React.FC<CommentViewProps> = ({ comment }) => {
  const { userName } = useSelector((state: RootState) => state.activeUser.user);
  const classes = useStyles();
  return (
    <Grid item wrap="nowrap">
      <PaddedPaper>
        <Grid container item spacing={1}>
          <Grid item>
            <CustomAvatar
              src={comment.author.profilePicture as string}
              alt={comment.author.userName as string}
            />
          </Grid>
          <Grid item>
            <Link
              component={RouterLink}
              to={`/users/${comment.author.userName}`}
            >
              <Typography variant="subtitle1">
                {comment.author.userName}
              </Typography>
            </Link>
          </Grid>
          <Grid item>
            <BasicTooltip title={comment.timeSent} placement="top">
              <Typography variant="subtitle1" color="textSecondary">
                {moment
                  .utc(comment.timeSent)
                  .local()
                  .fromNow()}
              </Typography>
            </BasicTooltip>
          </Grid>
        </Grid>
        <Grid container item>
          <Grid item>
            <Typography>{comment.body}</Typography>
          </Grid>
          <Grid container item alignItems="center" justify="space-between">
            <Grid item />
            {userName === comment.article.author && (
              <Grid item>
                <DropdownMenu
                  commentId={comment.id}
                  articleId={comment.article.id}
                />
              </Grid>
            )}
          </Grid>
        </Grid>
      </PaddedPaper>
    </Grid>
  );
};

export default CommentView;
