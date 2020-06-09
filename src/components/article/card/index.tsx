/* eslint-disable react/jsx-wrap-multilines */
import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Grid,
  Theme,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import React from "react";
import { Link } from "react-router-dom";
import routes from "../../../constants/routes.json";
import { ArticlePreview } from "../../../features/articles/models";
import TagList from "../tags/tagList";
import defaultAvatar from "../../../assets/default_avatar.png";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: "flex",
    flexDirection: "row-reverse",
  },
  details: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
  },
  content: {
    flex: "1 0 auto",
  },
  wrapper: {
    display: "inline",
  },
  thumbnail: {
    display: "flex",
    width: 180,
    minHeight: 50,
  },
  controls: {
    display: "flex",
    alignItems: "center",
    paddingLeft: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
  buttonTitle: {
    textTransform: "none",
  },
  buttonReadMore: {
    marginLeft: "auto",
  },
  header: {
    padding: "0 16px",
  },
  cardAction: {
    display: "block",
    textAlign: "initial",
  },
}));

interface ArticleCardProps {
  article: ArticlePreview;
  minimal?: boolean;
}

const ArticleCard: React.FC<ArticleCardProps> = ({
  article,
  minimal,
}: ArticleCardProps) => {
  const classes = useStyles();

  const getDescription = () => {
    if (!minimal) {
      return (
        <CardContent className={classes.wrapper}>
          <Typography
            variant="subtitle1"
            color="textSecondary"
            className={classes.content}
            noWrap
          >
            {article.description}
          </Typography>
        </CardContent>
      );
    }
    return null;
  };

  const getActions = () => {
    if (!minimal) {
      return (
        <CardActions>
          <Grid
            container
            alignContent="flex-end"
            alignItems="flex-end"
            spacing={1}
          >
            <TagList tags={article.tags} amount={10} />
            <Button
              size="medium"
              color="primary"
              className={classes.buttonReadMore}
              component={Link}
              to={`${routes.articles.route}/${article.id}`}
            >
              Read more...
            </Button>
          </Grid>
        </CardActions>
      );
    }
    return null;
  };

  const getSubheader = () => {
    if (!minimal) {
      return (
        <Typography variant="body1">
          by
          <Button
            size="small"
            component={Link}
            to={`${routes.users.route}/${article.author}`}
          >
            {article.author}
          </Button>
        </Typography>
      );
    }

    return null;
  };

  const getTitle = () => {
    if (!minimal) {
      return (
        <Button
          component={Link}
          to={`${routes.articles.route}/${article.id}`}
          className={classes.buttonTitle}
        >
          <Typography variant="h5">{`${article.title}`}</Typography>
        </Button>
      );
    }

    return <Typography variant="h5">{article.title}</Typography>;
  };

  const getContent = () => {
    return (
      <div className={classes.details}>
        <CardHeader
          title={getTitle()}
          subheader={getSubheader()}
          className={classes.header}
        />
        {getDescription()}
        {getActions()}
      </div>
    );
  };

  const makeClickableIfMinimal = () => {
    if (!minimal) {
      return getContent();
    }

    return <CardActionArea>{getContent()}</CardActionArea>;
  };

  const getImage = () => {
    return article.featuredImage !== null
      ? article.featuredImage
      : defaultAvatar;
  };

  return (
    <Card className={classes.root}>
      {makeClickableIfMinimal()}
      <CardMedia
        className={classes.thumbnail}
        image={getImage()}
        title={article.title as string}
      />
    </Card>
  );
};

export default ArticleCard;
