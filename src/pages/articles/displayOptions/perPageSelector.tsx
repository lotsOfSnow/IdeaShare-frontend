import { MenuItem } from "@material-ui/core";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { setArticlesPerPage } from "../../../features/articles/actions";
import { RootState } from "../../../store/index";
import Selector from "./selector";

const values = [1, 5, 10, 20, 30];

const PerPageSelector: React.FC = () => {
  const dispatch = useDispatch();
  const { perPage } = useSelector((state: RootState) => state.articles.config);

  const history = useHistory();

  const handleChange = (event: any) => {
    dispatch(setArticlesPerPage(event.target.value as number, history));
  };

  return (
    <Selector
      label="Display:"
      onChange={handleChange}
      value={perPage}
      id="per-page"
      name="per page"
    >
      {values.map(val => {
        return (
          <MenuItem key={val} value={val}>
            {val}
          </MenuItem>
        );
      })}
    </Selector>
  );
};

export default PerPageSelector;
