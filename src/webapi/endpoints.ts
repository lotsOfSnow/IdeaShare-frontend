import { getApiUrl } from "./config";
import { RouteMethod } from "./models";

export const createSession = (): RouteMethod => {
  return { route: `${getApiUrl()}/session`, method: "POST" };
};

export const destroySession = (): RouteMethod => {
  return { route: `${getApiUrl()}/session`, method: "DELETE" };
};

export const register = (): RouteMethod => {
  return { route: `${getApiUrl()}/users`, method: "POST" };
};

export const getUser = (username: string): RouteMethod => {
  return { route: `${getApiUrl()}/users/${username}`, method: "GET" };
};

export const updateUser = (username: string): RouteMethod => {
  return { route: `${getApiUrl()}/users/${username}`, method: "POST" };
};

export const getArticlesByUser = (username: string): RouteMethod => {
  return { route: `${getApiUrl()}/users/${username}/articles`, method: "GET" };
};

export const getAuthenticatedUserInfo = (): RouteMethod => {
  return { route: `${getApiUrl()}/user`, method: "GET" };
};

export const getCommentsForUser = (): RouteMethod => {
  return { route: `${getApiUrl()}/user/articles/comments`, method: "GET" };
};

export const getArticlesLikedByUser = (username: string): RouteMethod => {
  return { route: `${getApiUrl()}/users/${username}/liked`, method: "GET" };
};

export const checkIfAuthenticatedUserLikedArticle = (): RouteMethod => {
  return { route: `${getApiUrl()}/user`, method: "GET" };
};

export const getArticles = (
  type: string,
  page?: number,
  perPage?: number,
  sort?: string,
  titleFilter?: string,
  withTag?: string
): RouteMethod => {
  let baseRoute = `${getApiUrl()}/articles?type=${type}`;

  if (page && perPage) {
    baseRoute = baseRoute.concat(`&page=${page}&perPage=${perPage}`);
  }
  if (sort) {
    baseRoute = baseRoute.concat(`&sort=${sort}`);
  }
  if (titleFilter) {
    baseRoute = baseRoute.concat(`&title=${titleFilter}`);
  }
  if (withTag) {
    baseRoute = baseRoute.concat(`&tag=${withTag}`);
  }

  return { route: baseRoute, method: "GET" };
};

export const getArticle = (articleId: number): RouteMethod => {
  return { route: `${getApiUrl()}/articles/${articleId}`, method: "GET" };
};

export const createArticle = (): RouteMethod => {
  return { route: `${getApiUrl()}/articles/`, method: "POST" };
};

export const updateArticle = (articleId: number): RouteMethod => {
  return { route: `${getApiUrl()}/articles/${articleId}`, method: "POST" };
};

export const deleteArticle = (articleId: number): RouteMethod => {
  return { route: `${getApiUrl()}/articles/${articleId}`, method: "DELETE" };
};

export const getArticleComments = (articleId: number): RouteMethod => {
  return {
    route: `${getApiUrl()}/articles/${articleId}/comments`,
    method: "GET",
  };
};

export const createArticleComment = (articleId: number): RouteMethod => {
  return {
    route: `${getApiUrl()}/articles/${articleId}/comments`,
    method: "POST",
  };
};

export const deleteComment = (
  articleId: number,
  commentId: number
): RouteMethod => {
  return {
    route: `${getApiUrl()}/articles/${articleId}/comments/${commentId}`,
    method: "DELETE",
  };
};

export const likeArticle = (articleId: number): RouteMethod => {
  return {
    route: `${getApiUrl()}/articles/${articleId}/likes`,
    method: "POST",
  };
};

export const unlikeArticle = (articleId: number): RouteMethod => {
  return {
    route: `${getApiUrl()}/articles/${articleId}/likes`,
    method: "DELETE",
  };
};
