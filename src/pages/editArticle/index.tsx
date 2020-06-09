/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router";
import { fetchArticle } from "../../features/articles/actions";
import View from "./view";

interface RouteParams {
  id: number;
}

const Container: React.FC<RouteParams> = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchArticle(id));
  }, []);

  return <View />;
};

export default Container;
