import { IconButton, Menu, MenuItem } from "@material-ui/core";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import useRequest from "../../customHooks/useRequest";
import { fetchArticleComments } from "../../features/comments/actions";
import { deleteComment } from "../../webapi/endpoints";
import SnackbarContext from "../shared/snackbar/snackbarContext";

interface Props {
  commentId: number;
  articleId: number;
}

const DropdownMenu: React.FC<Props> = ({ commentId, articleId }: Props) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const { onOpen, setText } = React.useContext(SnackbarContext);
  const { route, method } = deleteComment(articleId, commentId);
  const { makeRequest, success, error } = useRequest(method, route, true);
  const dispatch = useDispatch();

  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const onClick = () => {
    makeRequest();
  };

  useEffect(() => {
    if (success) {
      setText("Comment was deleted.");
      onOpen();
      dispatch(fetchArticleComments(articleId));
    } else if (error) {
      setText("Something went wrong.");
      onOpen();
    }
  }, [success, error]);

  return (
    <>
      <IconButton
        aria-label="more"
        aria-controls="long-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={onClick}>Delete</MenuItem>
      </Menu>
    </>
  );
};

export default DropdownMenu;
