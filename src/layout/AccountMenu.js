import React from "react";

import UserIcon from "../svgs/User";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Grow from "@material-ui/core/Grow";
import Paper from "@material-ui/core/Paper";
import Popper from "@material-ui/core/Popper";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import { makeStyles } from "@material-ui/core/styles";
import { IconButton } from "@material-ui/core";
import { Link } from "react-router-dom";
import { HandleMenu } from "../app/Account/menu";
import { useDispatch, useSelector } from "react-redux";
import { OfflineMenuIndex } from "../app/Account/menu";
import { SwitchLanguage } from "../app/Tranlation/localisation";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  paper: {
    marginRight: theme.spacing(2),
  },
}));

export default function AccountMenu() {
  // const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);

  const { isLoggedIn } = useSelector((state) => state.loginUser);
  const { lang } = useSelector((state) => state.lang);
  const dispatch = useDispatch();
  const handleToggle = () => {
    if (isLoggedIn) {
      handleDrawerToggle();
    } else {
      setOpen((prevOpen) => !prevOpen);
    }
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  };

  function handleListKeyDown(event) {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpen(false);
    }
  }
  const openMenu = useSelector((state) => state.profileIndex.openMenu);

  const handleDrawerToggle = () => {
    dispatch(HandleMenu(!openMenu));
  };
  // const handleCloseDrawer = () => {
  //   dispatch(HandleMenu(false));
  // };

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);
  return (
    <div className="AccountMenu">
      <IconButton
        ref={anchorRef}
        aria-controls={open ? "menu-list-grow" : undefined}
        aria-haspopup="true"
        onClick={handleToggle}
      >
        <UserIcon />
      </IconButton>
      {isLoggedIn ? null : (
        <Popper
          open={open}
          anchorEl={anchorRef.current}
          role={undefined}
          transition
          disablePortal
        >
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{
                transformOrigin:
                  placement === "bottom" ? "center top" : "center bottom",
              }}
            >
              <Paper>
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList
                    autoFocusItem={open}
                    id="menu-list-grow"
                    onKeyDown={handleListKeyDown}
                  >
                    <Link to="/login">
                      <MenuItem
                        onClick={(e) => {
                          handleClose(e);
                          dispatch(OfflineMenuIndex(0));
                        }}
                      >
                        {lang === "en" ? "Login" : "تسجيل الدخول"}
                      </MenuItem>
                    </Link>
                    <Link to="/login">
                      <MenuItem
                        onClick={(e) => {
                          handleClose(e);
                          dispatch(OfflineMenuIndex(2));
                        }}
                      >
                        {lang === "en" ? "Sign up" : "اشتراك"}
                      </MenuItem>
                    </Link>
                    <Link to="/contact-us">
                      <MenuItem onClick={handleClose}>
                        {lang === "en" ? "Contact Us" : "اتصل بنا"}
                      </MenuItem>
                    </Link>
                    <MenuItem
                      onClick={() => {
                        dispatch(SwitchLanguage());
                        setOpen(false);
                      }}
                    >
                      {lang === "en" ? "العربية" : "English"}
                    </MenuItem>
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      )}
    </div>
  );
}
