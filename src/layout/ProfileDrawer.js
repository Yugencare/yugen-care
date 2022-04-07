import { Collapse, Divider, List, ListItem } from "@material-ui/core";
import { ArrowForwardIos } from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import { changeIndex, HandleMenu, OfflineMenuIndex } from "../app/Account/menu";
import { userLogout } from "../app/Account/loginUser";
import { useDispatch, useSelector } from "react-redux";
import EditProfile from "../pages/Account/Profile//ProfileComponents/EditProfile";

var menuitems = [
  "Appointments",
  "Orders",
  "Rewards",
  "Notifications",
  "Settings",
];
const selected = {
  color: "#a78854",
  fontWeight: 600,
};
const drawerWidth = 300;
const useStyles = makeStyles((theme) => ({
  menuButton: {
    marginRight: theme.spacing(2),

    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
  drawerPaper: {
    width: drawerWidth,
  },
}));
export default function ProfileMenu() {
  const history = useHistory();
  const [Active, setActive] = useState([true, false, false, false, false]);

  const classes = useStyles();
  const openMenu = useSelector((state) => state.profileIndex.openMenu);
  const menuIndex = useSelector((state) => state.profileIndex.value);
  const { isLoggedIn, profile } = useSelector((state) => state.loginUser);

  var name = isLoggedIn
    ? `${profile.first_name} ${profile.last_name}`
    : "John Doe";

  var nameInitials = `${name[0]}${name.split(" ")[1][0]}`;
  const dispatch = useDispatch();
  const handleCloseDrawer = () => {
    dispatch(HandleMenu(false));
  };
  const location = useLocation().pathname;
  const HandleChange = (idx) => {
    dispatch(changeIndex(idx));
    if (location !== "/profile") {
      history.push("/profile");
    }
    setActive((prevState) =>
      prevState.map((item, index) =>
        index === idx ? (Active[index] = true) : (Active[index] = false)
      )
    );
  };
  const HandleLogout = () => {
    dispatch(userLogout());
    dispatch(changeIndex(0));
    dispatch(OfflineMenuIndex(0));
  };

  const menuDOM = (
    <div className="ProfileMenu m-0 content-block1 position-relative">
      <div className="profile-block">
        <div className="profile-photo">
          <h1>{nameInitials}</h1>
        </div>
        <h2>{name}</h2>

        <button
          onClick={() => {
            HandleChange(5);
            handleCloseDrawer();
          }}
        >
          <p> View Profile</p>
        </button>
      </div>
      <List onClick={handleCloseDrawer}>
        <ListItem button onClick={() => history.push("/book")}>
          <p className="py-2">Book now</p>
        </ListItem>
        <Divider />
        {menuitems.map((item, idx) => (
          <div
            key={item.id}
            style={menuIndex === idx ? { background: "#f1ede8" } : null}
            onClick={() => HandleChange(idx)}
          >
            <ListItem button>
              {menuIndex === idx ? (
                <div className="d-flex justify-content-between w-100 py-2">
                  <p style={selected}>{item}</p>
                  <ArrowForwardIos />
                </div>
              ) : (
                <div className="py-2">
                  <p>{item}</p>
                </div>
              )}
            </ListItem>
            <Divider />
          </div>
        ))}
        <ListItem button onClick={HandleLogout}>
          <p className="py-2">Log out</p>
        </ListItem>
      </List>
    </div>
  );

  return (
    <Drawer
      variant="temporary"
      transitionDuration={600}
      anchor={"right"}
      open={openMenu}
      onClose={handleCloseDrawer}
      classes={{
        paper: classes.drawerPaper,
      }}
      PaperProps={{ id: "style-3" }}
      ModalProps={{
        keepMounted: true, // Better open performance on mobile.
      }}
    >
      {menuDOM}
    </Drawer>
  );
}
