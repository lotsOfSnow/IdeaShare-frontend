import { MenuItem } from "@material-ui/core";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setOrder } from "../../../features/articles/actions";
import { Order } from "../../../features/articles/models";
import { RootState } from "../../../store/index";
import Selector from "./selector";

const values = ["Ascending", "Descending"];

const OrderBySelector: React.FC = () => {
  const dispatch = useDispatch();
  const { order } = useSelector((state: RootState) => state.articles.config);

  const handleChange = (event: any) => {
    dispatch(setOrder(event.target.value as Order));
  };

  return (
    <>
      <Selector onChange={handleChange} value={order} id="order" name="order">
        {values.map(val => {
          return (
            <MenuItem key={val} value={val}>
              {val}
            </MenuItem>
          );
        })}
      </Selector>
    </>
  );
};

export default OrderBySelector;
