import { IconButton } from "@material-ui/core";
import { Favorite as FavoriteIcon } from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useRequest from "../../../customHooks/useRequest";
import { loadLikedArticlesIds } from "../../../features/activeUser/actions";
import { RootState } from "../../../store";
import { withLoading } from "../../../utilities";
import * as webapi from "../../../webapi";

interface LikeButtonProps {
  articleId: number;
}

const LikeButton: React.FC<LikeButtonProps> = ({
  articleId,
}: LikeButtonProps) => {
  const dispatch = useDispatch();
  const { ids } = useSelector(
    (state: RootState) => state.activeUser.likedArticles
  );

  const [articleLiked, setArticleLiked] = useState<boolean>(false);

  useEffect(() => {
    setArticleLiked(ids?.some(id => id === articleId) as boolean);
  }, [ids]);

  useEffect(() => {
    setArticleLiked(ids?.some(id => id === articleId) as boolean);
  }, []);

  const likeEndpoint = webapi.likeArticle(articleId);
  const unlikeEndpoint = webapi.unlikeArticle(articleId);

  const { makeRequest, success, loading, setHttpMethod } = useRequest(
    likeEndpoint.method,
    likeEndpoint.route,
    true
  );

  useEffect(() => {
    if (success) {
      dispatch(loadLikedArticlesIds());
    }
  }, [success]);

  useEffect(() => {
    setHttpMethod(articleLiked ? unlikeEndpoint.method : likeEndpoint.method);
  }, [articleLiked]);

  const handleClick = () => {
    makeRequest();
  };

  return (
    <IconButton disabled={loading} onClick={handleClick}>
      <FavoriteIcon
        fontSize="large"
        color={articleLiked ? "secondary" : "disabled"}
      />
    </IconButton>
  );
};

export default withLoading(LikeButton, () => {
  const { isLoaded } = useSelector(
    (state: RootState) => state.activeUser.likedArticles
  );

  return isLoaded;
});
