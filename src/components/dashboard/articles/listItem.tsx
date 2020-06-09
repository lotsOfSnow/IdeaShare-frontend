import {
  Avatar,
  IconButton,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
  makeStyles,
  Theme,
} from "@material-ui/core";
import {
  Delete as DeleteIcon,
  Edit as EditIcon,
  Folder as FolderIcon,
} from "@material-ui/icons";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AlertContext } from ".";
import { ArticlePreview } from "../../../features/articles/models";

const useStyles = makeStyles((theme: Theme) => ({
  avatar: {
    width: theme.spacing(14),
    height: theme.spacing(14),
  },
  demo: {
    backgroundColor: theme.palette.background.paper,
  },
}));

interface ArticleListItemProps {
  article: ArticlePreview;
}

const ArticleListItem: React.FC<ArticleListItemProps> = ({ article }) => {
  const classes = useStyles();

  const { isOpen, onOpen, onClose, selectArtcle } = useContext(AlertContext);

  const onClick = () => {
    selectArtcle(article.id as number);
    onOpen();
  };

  return (
    <ListItem>
      <ListItemAvatar>
        <Avatar>
          <FolderIcon />
        </Avatar>
      </ListItemAvatar>
      <ListItemText primary={article.title} secondary={article.description} />
      <ListItemSecondaryAction>
        <IconButton
          component={Link}
          to={`/articles/${article.id}/edit`}
          edge="end"
          aria-label="delete"
        >
          <EditIcon />
        </IconButton>
        <IconButton onClick={onClick} edge="end" aria-label="delete">
          <DeleteIcon />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );
};

export default ArticleListItem;
