import { Divider, List, ListItem } from "@material-ui/core";
import Hidden from "@material-ui/core/Hidden";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { ArrowForwardIos } from "@material-ui/icons";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { userLogout } from "../../../app/Account/loginUser";
import { changeIndex, HandleMenu } from "../../../app/Account/menu";

var menuitems = [
  "Appointments",
  "Orders",
  "Rewards",
  "Notifications",
  "Settings",
];
var menuitems_ar = ["المواعيد", "طلبات", "المكافآت", "تنبيهات", "إعدادات"];
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
export default function ProfileMenu({ name }) {
  var nameInitials = `${name[0]}${name.split(" ")[1][0]}`;
  const history = useHistory();

  const theme = useTheme();
  const classes = useStyles();
  const openMenu = useSelector((state) => state.profileIndex.openMenu);
  const menuIndex = useSelector((state) => state.profileIndex.value);
  const { lang } = useSelector((state) => state.lang);

  const dispatch = useDispatch();
  const handleDrawerToggle = () => {
    dispatch(HandleMenu(!openMenu));
  };
  const handleCloseDrawer = () => {
    dispatch(HandleMenu(false));
  };
  const HandleChange = (idx) => {
    dispatch(changeIndex(idx));
  };
  const HandleLogout = () => {
    dispatch(userLogout());
  };

  const menuDOM = (
    <div className="ProfileMenu content-block1 position-relative">
      <div className="profile-block">
        <div className="profile-photo">
          <h1>{nameInitials}</h1>
        </div>
        <h2>{name}</h2>
        <button onClick={() => dispatch(changeIndex(5))}>
          <p>{lang === "en" ? "View Profile" : "الصفحة الشخصية"} </p>
        </button>
      </div>

      <List onClick={handleCloseDrawer}>
        <ListItem button onClick={() => history.push("/book")}>
          <p className="py-2">{lang === "en" ? "Book Now" : "احجز الآن!"}</p>
        </ListItem>
        <Divider />
        {(lang === "en" ? menuitems : menuitems_ar).map(
          (item, idx) =>
            idx !== 3 && (
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
            )
        )}
        <ListItem button onClick={HandleLogout}>
          <p className="py-2">{lang === "en" ? "Log out" : "خروج"}</p>
        </ListItem>
      </List>
    </div>
  );

  return (
    <Hidden smDown implementation="css">
      {menuDOM}
    </Hidden>
  );
}
