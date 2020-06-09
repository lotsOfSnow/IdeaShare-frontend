import { ListItemText, Menu, MenuItem } from "@material-ui/core";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import routes from "../../../constants/routes.json";
import { LOGOUT_SUCCESS } from "../../../features/auth/constants";
import { RootState } from "../../../store";

interface DropdownMenuProps {
  anchorEl: HTMLElement | null;
  handleClose: () => void;
}

const Dropdown: React.FC<DropdownMenuProps> = ({
  anchorEl,
  handleClose,
}: DropdownMenuProps) => {
  const dispatch = useDispatch();
  const { userName } = useSelector((state: RootState) => state.activeUser.user);

  return (
    <Menu
      anchorEl={anchorEl}
      open={Boolean(anchorEl)}
      keepMounted
      id="user-dropdown-menu"
      onClose={handleClose}
      getContentAnchorEl={null}
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      transformOrigin={{ vertical: "top", horizontal: "center" }}
    >
      <MenuItem
        component={Link}
        to={`${routes.users.route}/${userName}`}
        onClick={handleClose}
      >
        <ListItemText>{routes.userProfile.display}</ListItemText>
      </MenuItem>
      <MenuItem
        component={Link}
        to={routes.userDashboard.base.route}
        onClick={handleClose}
      >
        <ListItemText>{routes.userDashboard.base.display}</ListItemText>
      </MenuItem>

      <MenuItem
        component={Link}
        to={`${routes.accountSettings.default.route}`}
        onClick={handleClose}
      >
        <ListItemText>{routes.accountSettings.default.display}</ListItemText>
      </MenuItem>
      <MenuItem
        onClick={() => {
          handleClose();
          dispatch({ type: LOGOUT_SUCCESS });
        }}
      >
        <ListItemText>Log out</ListItemText>
      </MenuItem>
    </Menu>
  );
};

export default Dropdown;
