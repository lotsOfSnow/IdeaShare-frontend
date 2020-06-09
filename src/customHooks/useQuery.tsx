/* eslint-disable import/prefer-default-export */
import { useLocation } from "react-router";

export const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};
