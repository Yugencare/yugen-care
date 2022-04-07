import React, { useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import { useDispatch, useSelector } from "react-redux";
import { getMenu } from "../app/getmenu";

import { setUser } from "../app/Account/loginUser";
import { Link } from "react-router-dom";
import { Skeleton } from "@material-ui/lab";
import { useLocation } from "react-router";

function Layout({ children }) {
  const dispatch = useDispatch();
  const { menu } = useSelector((state) => state.getmenu);
  const { cart } = useSelector((state) => state.cart);
  const { status } = useSelector((state) => state.getmenu);
  const { isLoggedIn } = useSelector((state) => state.loginUser);
  const statush = useSelector((state) => state.homepage.status);
  const { lang } = useSelector((state) => state.lang);
  useEffect(() => {
    if (status !== "success") {
      dispatch(getMenu());
    }
    console.log(JSON.parse(localStorage.getItem("user")));
    const StoredUser = JSON.parse(localStorage.getItem("user"));
    if (StoredUser) {
      if (StoredUser.status === 200) {
        dispatch(setUser(StoredUser));
      }
    }
  }, [dispatch]);

  var menu_list = [];
  if (status === "success") {
    menu_list = menu.pages;
    console.log(menu_list);
  }
  if (lang === "ar") {
    document.body.dir = "rtl";
  } else {
    document.body.dir = "ltr";
  }
  return (
    <div className={`${lang === "ar" ? "Local-arabic" : ""}`}>
      {status === "success" ? (
        <Header
          menu_list={menu_list}
          isLoggedIn={isLoggedIn}
          lang={lang}
          cart={cart}
        />
      ) : (
        // <HeaderSkeletion />
        <></>
      )}
      {children}
      <Footer />
    </div>
  );
}

export default Layout;

function HeaderSkeletion() {
  return (
    <div dir="ltr" className=" Header">
      <div className="container-xl">
        <nav className="navbar navbar-expand-md pt-4">
          <div className="no-gutters row d-flex d-md-none align-items-center justify-content-between w-100">
            <div className="col-7">
              <Link className="navbar-brand">
                <Skeleton
                  animation="wave"
                  variant="rect"
                  width="90px"
                  height="90px"
                />
              </Link>
            </div>
            <div className="form-inline header_icons">
              <Link to="#" className="mr-4">
                <Skeleton
                  animation="wave"
                  variant="rect"
                  width="15px"
                  height="15px"
                />
              </Link>
              <a>
                <Skeleton
                  animation="wave"
                  variant="rect"
                  width="15px"
                  height="15px"
                />
              </a>
            </div>
            <div className="col-1">
              <Skeleton
                animation="wave"
                variant="rect"
                width="30px"
                height="30px"
              />
            </div>
          </div>
          <div
            className="collapse navbar-collapse justify-content-between position-relative"
            id="navbarTogglerDemo01"
          >
            <Link className="navbar-brand" to="/discover">
              <Skeleton
                animation="wave"
                variant="rect"
                width="200px"
                height="65px"
              />
            </Link>
            <div className=" d-inline-block d-md-flex align-items-center">
              <ul className="doctorsOnDesktop navbar-nav mt-2 mt-lg-0 mr-md-3 align-items-center">
                <li className={"nav-item pr-3"}>
                  <Skeleton
                    animation="wave"
                    variant="rect"
                    width="60px"
                    height="15px"
                  />
                </li>
                <li className={"nav-item pr-3"}>
                  <Skeleton
                    animation="wave"
                    variant="rect"
                    width="60px"
                    height="15px"
                  />
                </li>
                <li className={"nav-item pr-3"}>
                  <Skeleton
                    animation="wave"
                    variant="rect"
                    width="60px"
                    height="15px"
                  />
                </li>
                <li className={"nav-item pr-3"}>
                  <Skeleton
                    animation="wave"
                    variant="rect"
                    width="60px"
                    height="15px"
                  />
                </li>
                <li className={"nav-item pr-3"}>
                  <Skeleton
                    animation="wave"
                    variant="circle"
                    width="70px"
                    height="25px"
                  />
                </li>
              </ul>
              <div className="doctorsOnDesktop form-inline mt-5 my-md-2 my-lg-0 header_icons">
                <div className="mr-2 mr-lg-3">
                  <Skeleton
                    animation="wave"
                    variant="rect"
                    width="20px"
                    height="20px"
                  />
                </div>
                <a className="mr-2 mr-lg-3">
                  <Skeleton
                    animation="wave"
                    variant="rect"
                    width="20px"
                    height="20px"
                  />
                </a>
                <a className="mr-2 mr-lg-3">
                  <Skeleton
                    animation="wave"
                    variant="rect"
                    width="20px"
                    height="20px"
                  />
                </a>
              </div>
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
}
