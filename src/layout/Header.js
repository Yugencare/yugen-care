import React, { Component, useEffect } from "react";
import Logo from "../images/logo-header.png";
import Favicon2 from "../images/logo-small.png";
import CartIcon from "../svgs/Cart";
import UserIcon from "../svgs/User";
import CartDrawer from "../pages/Cart/CartDrawer";
import { Link } from "react-router-dom";
import "react-jquery-plugin";
import $ from "jquery";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import { withStyles } from "@material-ui/core/styles";
import Collapse from "@material-ui/core/Collapse";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import InstagramIcon from "@material-ui/icons/Instagram";
import FacebookIcon from "@material-ui/icons/Facebook";
import LinkedIn from "@material-ui/icons/LinkedIn";
import ServiceMenu from "./ServiceMenu";
import AccountMenu from "./AccountMenu";
import ProfileDrawer from "./ProfileDrawer";
import { useDispatch } from "react-redux";
import { PhoneOutlined } from "@material-ui/icons";
import { IconButton } from "@material-ui/core";
import SwitchLang from "./LangFilter";
import BookForm from "../components/BookForm";

const useStyles = (theme) => ({
  list: {
    paddingTop: 12,
    paddingBottom: 12,
  },
  iconRotate: {
    transform: "rotate(90deg)",
    color: "#a7a7a7",
  },
  iconBlue: {
    color: "#a7a7a7",
  },
  menu: {
    position: "absolute",
    transition: "1s",
  },
});

class Header extends Component {
  state = {
    toggle: false,
    navHide: "0px",
    open: false,
    Open: false,
    imageloaded: false,
    openDrawer: false,
    cont: false,
    servicesMenu: [
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
    ],
  };

  componentDidMount() {
    $(".navbar-toggler").click(() => {
      $(".navbar-toggler").toggleClass("navbar-open");
      $(".navbar-collapse").toggleClass("mobile-menu-opened");
      $(".Header").toggleClass("change_header");
      $(".navbar-collapse").slideToggle();
    });
    document.addEventListener("scroll", this.handleNavBackground);
  }

  componentWillUnmount() {
    document.removeEventListener("scroll", this.handleNavBackground); // to add on useEffect
  }

  last_scroll_top = 0;
  handleNavBackground = () => {
    const el_autohide = document.querySelector(".autohide");
    if (el_autohide) {
      let scroll_top = window.scrollY;
      if (scroll_top < this.last_scroll_top) {
        el_autohide.classList.remove("scrolled-down");
        el_autohide.classList.add("scrolled-up");
        if (scroll_top > 100) {
          el_autohide.classList.add("scrolled-mid");
        } else {
          el_autohide.classList.remove("scrolled-mid");
        }
      } else {
        el_autohide.classList.remove("scrolled-up");
        el_autohide.classList.add("scrolled-down");

        // if (this.state.servicesMenu.includes(true)) {
        //   this.HandleCloseMenu();
        // }
      }
      if (scroll_top < 35) {
        el_autohide.classList.remove("scrolled-down");
        el_autohide.classList.add("scrolled-up");
      }

      this.last_scroll_top = scroll_top;
    }
  };

  handleOpen = (idx) => {
    this.setState({ Open: true });
  };

  handleClose = () => {
    this.setState({ Open: false });
  };

  handleOpenDrawer = () => {
    this.setState({ openDrawer: true });
  };
  handleCloseDrawer = () => {
    this.setState({ openDrawer: false });
  };

  handleClick = (event) => {
    event === "off"
      ? this.setState({ open: false, cont: false })
      : this.setState({ open: !this.state.open });
    this.setState({ toggle: !this.state.toggle });
  };
  HandleMenuSelected = (index) => {
    this.setState((state) => {
      const servicesMenu = state.servicesMenu.map((flag, j) => {
        if (j == index) {
          if (this.props.menu_list[j]?.sub_menu?.length !== 0) {
            return true;
          } else {
            return false;
          }
        } else {
          return false;
        }
      });
      return {
        servicesMenu,
      };
    });
  };
  HandleCloseMenu = () => {
    this.setState((state) => {
      const servicesMenu = state.servicesMenu.map((flag) => {
        return false;
      });
      return {
        servicesMenu,
      };
    });
  };

  render() {
    const { classes, menu_list, isLoggedIn, lang, switchLan, cart } =
      this.props;

    if (!this.state.toggle) {
      document.body.style.overflowY = "scroll";
    } else {
      document.body.style.overflow = "hidden";
    }
    return (
      <>
        {/* <div
          className="nav-backdrop"
          onMouseEnter={this.HandleCloseMenu}
          style={
            this.state.servicesMenu.some((menu) => menu === true)
              ? { backgroundColor: "rgba(0, 0, 0, 0.5)" }
              : { zIndex: 0, display: "none" }
          }
        />
        <div className="d-flex justify-content-center">
          {menu_list?.map((menu, idx) =>
            menu.sub_menu?.length !== 0 ? (
              <>
                <ServiceMenu
                  key={menu.label + idx}
                  menu_list={menu.sub_menu}
                  open={this.state.servicesMenu[idx]}
                  handleToggle={this.HandleCloseMenu}
                />
              </>
            ) : null
          )}
        </div> */}

        <div
          className={`autohide Header`}
          dir="ltr"
          style={
            this.state.cont
              ? { top: 0 }
              : {
                  top: `${this.state.navHide}`,
                }
          }
        >
          <div className="container-xl">
            <nav className="navbar navbar-expand-md pt-4">
              <div className="no-gutters row d-flex d-md-none align-items-center justify-content-between w-100">
                <div className={`col-7`}>
                  <Link className="navbar-brand" to="/discover">
                    <img src={Favicon2} alt="" />
                  </Link>
                </div>
                <div className="form-inline header_icons">
                  <Link to="#" className={"mr-4"}>
                    <AccountMenu />
                  </Link>
                  <a onClick={this.handleOpenDrawer}>
                    <div className="cartNumber">
                      {cart && cart.length > 0 && (
                        <span class="count">{cart.length}</span>
                      )}
                      <CartIcon />
                    </div>
                  </a>
                </div>
                <div className="col-1">
                  <button
                    className="navbar-toggler"
                    type="button"
                    data-toggle="collapse"
                    data-target="#navbarTogglerDemo01"
                    aria-controls="navbarTogglerDemo01"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                    onClick={() => this.handleClick("off")}
                  >
                    <span className="navbar-toggler-icon"></span>
                  </button>
                </div>
              </div>
              <div
                className="collapse navbar-collapse justify-content-between position-relative"
                id="navbarTogglerDemo01"
              >
                <ul className="doctorsOnDesktop navbar-nav mt-2 mt-lg-0 mr-md-3">
                  <li className="nav-item clearlink">
                    <Link onClick={this.handleOpen} className="nav-link">
                      {lang === "en" ? "Appointment" : "حجز موعد"}
                    </Link>
                    <BookForm
                      open={this.state.Open}
                      handleOpen={this.handleOpen}
                      handleClose={this.handleClose}
                      Button={true}
                    />
                  </li>
                </ul>

                <div className=" row align-items-center w-100">
                  <div className="col-md-7 text-right pr-5">
                    <Link className="navbar-brand" to="/discover">
                      <img
                        src={Logo}
                        onLoad={() => this.setState({ imageloaded: true })}
                        alt=""
                      />
                    </Link>
                  </div>
                  <div className="col-md-5 ">
                    <div className="doctorsOnDesktop form-inline mt-5 my-md-2 my-lg-0 header_icons justify-content-end">
                      <div className={"mr-2 mr-lg-3"}>
                        <SwitchLang />
                      </div>
                      <div
                        className={"mr-2 mr-lg-3"}
                        onClick={this.HandleCloseMenu}
                      >
                        <AccountMenu />
                      </div>
                      <a onClick={this.handleOpenDrawer}>
                        <IconButton>
                          <div className="cartNumber">
                            {cart && cart.length > 0 && (
                              <span class="count">{cart.length}</span>
                            )}
                            <CartIcon />
                          </div>
                        </IconButton>
                      </a>
                      <a
                        className={"mt-1 ml-2 ml-lg-3"}
                        href="tel:+971 434 98000"
                      >
                        <IconButton>
                          <PhoneOutlined />
                        </IconButton>
                      </a>
                    </div>
                  </div>
                </div>
                <div
                  className={`doctorsOnMobile nav-muilist${
                    lang === "ar" ? " text-right" : ""
                  }`}
                >
                  {menu_list?.map((menu_item, idx) => (
                    <>
                      <Link
                        className="navbar-toggler"
                        type="button"
                        key={menu_item.id}
                        to={`/${menu_item?.slug}`}
                      >
                        <ListItem
                          onClick={
                            menu_item.sub_menu?.length !== 0
                              ? this.handleClick
                              : null
                          }
                        >
                          {lang === "en" ? menu_item?.label : menu_item.level}
                          {menu_item.sub_menu?.length !== 0 ? (
                            this.state.open ? (
                              <ExpandMore className={classes.iconBlue} />
                            ) : (
                              <ExpandLess className={classes.iconRotate} />
                            )
                          ) : null}
                        </ListItem>
                      </Link>
                      <Divider />
                    </>
                  ))}
                  <Link onClick={this.handleOpen} className="navbar-toggler">
                    <div className="nav-appointment">
                      {lang === "en" ? "Book Appointment" : "حجز موعد"}
                    </div>
                  </Link>
                  <div className={lang === "en" ? "ml-4 mb-4" : "mr-4 mb-4"}>
                    <SwitchLang />
                  </div>

                  <div className="d-flex nav-help justify-content-between">
                    <p>
                      {lang === "en"
                        ? "Have Questions or need help?"
                        : "هل لديك أسئلة أو بحاجة الى مساعدة؟"}
                    </p>
                    <div>
                      <FacebookIcon
                        style={{ color: "#bdbdbd", marginRight: 9 }}
                      />
                      <InstagramIcon
                        style={{ color: "#bdbdbd", marginRight: 9 }}
                      />
                      <LinkedIn style={{ color: "#bdbdbd", marginRight: 9 }} />
                    </div>
                  </div>
                  <Link
                    to="/contact-us"
                    className="nav-contact navbar-toggler"
                    // style={
                    //   this.state.cont ? { opacity: 1 } : { display: "none", opacity: 0 }
                    // }
                  >
                    <p>{lang === "en" ? "CONTACT US" : "اتصل بنا"}</p>
                    <div className="gradient-bar"></div>
                  </Link>
                </div>
              </div>
            </nav>
          </div>
          <div className="container-xl">
            <nav className="navbar navbar-expand-md navbar2">
              <div
                className="collapse navbar-collapse justify-content-center position-relative"
                id="navbarTogglerDemo01"
              >
                <div className=" d-inline-block d-md-flex align-items-center">
                  <ul className="doctorsOnDesktop navbar-nav mt-2 mt-lg-0 mr-md-3 navbar-nav-remove">
                    {this.state.imageloaded &&
                      menu_list?.map((menu_item, idx) => (
                        <li
                          key={menu_item.id}
                          className={"nav-item "}
                          data-aos="slide-down"
                          data-aos-delay={200}
                          data-aos-duration="600"
                          onMouseEnter={() => this.HandleMenuSelected(idx)}
                          onClick={() => this.HandleCloseMenu()}
                        >
                          <Link
                            className="nav-link"
                            key={menu_item.id}
                            to={`/${menu_item.slug}`}
                          >
                            {lang === "en" ? menu_item?.label : menu_item.level}
                          </Link>
                        </li>
                      ))}
                  </ul>
                </div>
              </div>
            </nav>
          </div>

          <CartDrawer
            drawer={this.state.openDrawer}
            handleCloseDrawer={this.handleCloseDrawer}
          />
        </div>
        <ProfileDrawer />
      </>
    );
  }
}
export default withStyles(useStyles)(Header);
