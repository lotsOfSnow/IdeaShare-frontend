import Cookies from "js-cookie";
import { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { loadUser } from "../features/activeUser/actions";

const CookieChecker = () => {
  const dispatch = useDispatch();
  const lastCookie = useRef(Cookies.get("token"));

  const compareCookie = () => {
    const currentCookie = Cookies.get("token");

    if (currentCookie !== lastCookie.current) {
      dispatch(loadUser());
      lastCookie.current = currentCookie;
    }
  };

  useEffect(() => {
    setInterval(compareCookie, 1000);
  }, []);

  return null;
};

export default CookieChecker;
