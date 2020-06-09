import { MenuItem } from "@material-ui/core";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setOrderedBy } from "../../../features/articles/actions";
import { OrderedBy } from "../../../features/articles/models";
import { RootState } from "../../../store/index";
import Selector from "./selector";

const values = ["Title", "Date"];

const OrderByKeySelector: React.FC = () => {
  const dispatch = useDispatch();
  const selectConfig = (state: RootState) => state.articles.config;
  const { orderedBy } = useSelector(selectConfig);

  const handleChange = (event: any) => {
    dispatch(setOrderedBy(event.target.value as OrderedBy));
  };

  return (
    <>
      <Selector
        label="Order By:"
        onChange={handleChange}
        value={orderedBy}
        id="order-by"
        name="order by"
      >
        {values.map(val => {
          return (
            <MenuItem key={val} value={val}>
              {val}
            </MenuItem>
          );
        })}
        <MenuItem value={orderedBy} style={{ display: "none" }}>
          {orderedBy}
        </MenuItem>
      </Selector>
    </>
  );
};

export default OrderByKeySelector;
