import React from "react";
import {
  Grid,
  Typography,
  Paper,
  makeStyles,
  Theme,
  Divider,
  Link,
} from "@material-ui/core";
import { useLocation, useParams, Link as RouterLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ReactMarkdown from "react-markdown";
import moment from "moment";
import { CustomAvatar } from "../../shared/avatar";

import { RootState } from "../../../store";
import { Article } from "../../../features/articles/models";
import { User } from "../../../features/users/models";
import { withLoading } from "../../../utilities";
import Body from "./body";
import BasicTooltip from "../../shared/tooltip/basic";

interface StylesProps {
  imageUrl: string;
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1,
    wordBreak: "break-all",
  },
  title: {
    background: (props: StylesProps) =>
      `url(${props.imageUrl}) no-repeat center`,
    backgroudSize: "contain",
    width: "100%",
    height: "100%",
  },
}));

export interface ArticleContentProps {
  article: Article;
}

const Header: React.FC<ArticleContentProps> = ({
  article,
}: ArticleContentProps) => {
  const input = `${article.body}\n\nA tutaj dziala`;
  const classes = useStyles({ imageUrl: article.featuredImage as string });
  const date = moment
    .utc(article.creationDate)
    .local()
    .format("MMMM Do, YYYY");
  return (
    <Grid container item spacing={3}>
      <Grid
        container
        item
        justify="center"
        spacing={2}
        className={classes.root}
        alignItems="center"
        wrap="nowrap"
      >
        <Typography variant="h4">{article.title}</Typography>
      </Grid>
      {article.featuredImage && (
        <Grid item style={{ height: "15vh" }} className={classes.title} />
      )}

      <Grid container item justify="center" spacing={1}>
        <Grid item>
          <CustomAvatar
            size="large"
            alt={article.author?.userName as string}
            src={article.author?.profilePicture as string}
          />
        </Grid>
        <Grid item>
          <Grid item>
            <Link
              component={RouterLink}
              to={`/users/${article.author?.userName}`}
            >
              <Typography>{article.author?.userName}</Typography>
            </Link>
          </Grid>
          <Grid item>
            <BasicTooltip title={article.creationDate as string}>
              <Typography color="textSecondary">{date}</Typography>
            </BasicTooltip>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Header;
