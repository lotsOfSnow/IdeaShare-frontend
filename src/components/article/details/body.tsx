import React from "react";
import { Grid, Typography, Paper, makeStyles, Theme } from "@material-ui/core";
import { useLocation, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ReactMarkdown from "react-markdown";
import { stateToHTML } from "draft-js-export-html";
import { stateFromMarkdown } from "draft-js-import-markdown";
import ReactHtmlParser from "react-html-parser";
import { RootState } from "../../../store";
import { Article } from "../../../features/articles/models";
import { User } from "../../../features/users/models";

const useStyles = makeStyles((theme: Theme) => ({
  whitespace: {
    whiteSpace: "pre",
  },
}));

export interface ArticleContentProps {
  article: Article;
}

const Body: React.FC<ArticleContentProps> = ({
  article,
}: ArticleContentProps) => {
  if (article.body === null || article.body === undefined) {
    throw new Error("asd");
  }
  const input = article.body.replace(/\\/g, "\n");

  const getText = () => {
    const contentState = stateFromMarkdown(article.body as string);
    const html = stateToHTML(contentState).replace(/\\/g, "<br>");
    return html;
  };

  const classes = useStyles();

  return (
    <Grid container item>
      {ReactHtmlParser(getText())}
    </Grid>
  );
};

export default Body;
