import React, { useRef, useState } from "react";
import Tab from "@material-ui/core/Tab";
import Collapse from "@material-ui/core/Collapse";
import SwipeableViews from "react-swipeable-views";
import Tabs from "@material-ui/core/Tabs";
import subservice1 from "../images/menu-service1.jpg";
import subservice2 from "../images/AA3.jpg";
import subservice3 from "../images/AA2.jpg";
import { withRouter, Link, useHistory, useLocation } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { changeIndex } from "../app/Components/appBar";
import { useDispatch } from "react-redux";
import { Fade } from "@material-ui/core";

const styles = {
  tabs: {
    background: "#f8f8f8",
    fontFamily: "Raleway",
    textTransform: "capitalize",
  },
  slide: {
    minHeight: 100,
    margin: 0,
  },
};
const settings = {
  arrow: true,
  infinite: true,
  speed: 2000,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplaySpeed: 5000,
};
export default function ServiceMenu(props) {
  const [index, setIndex] = useState(0);
  // const [emptytab, setEmptytab] = useState(false);
  const [slide, setSlide] = useState(0);
  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();
  const ChangeIndex = (idx) => {
    dispatch(changeIndex(idx));
  };

  const handleChange = (event, value) => {
    setIndex(value);
  };

  const handleChangeIndex = (value) => {
    setIndex(value);
    setSlide(0);
    // if (value > 2) {
    //   setEmptytab(true);
    // } else {
    //   setEmptytab(false);
    // }
  };

  const HandleService1Click = (pagename, service) => {
    props.handleToggle();
    history.push({
      pathname: "/services/" + pagename + "/" + service.slug,
    });
  };
  const HandleService2Click = (pagename, idx) => {
    props.handleToggle();
    const anchor = document.querySelector("#go-to-treatment");

    var sameLocation = location.pathname.split("/")[3] === pagename.slug;
    if (anchor && sameLocation) {
      anchor.scrollIntoView({ behavior: "smooth", block: "start" });
      ChangeIndex(idx);
    } else {
      history.push({
        pathname: "/services/all-treatments/" + pagename.slug,
        state: {
          // location state
          params: idx,
        },
      });
    }
  };
  const gotoNext = () => {
    setSlide((slide + 1) % 2);
  };
  const gotoPrev = () => {
    if (slide === 0) {
      setSlide(1);
    } else {
      setSlide((slide - 1) % 2);
    }
  };
  return (
    <>
      <div
        className="service-menuWrapper"
        style={
          props.open
            ? {
                backgroundColor: "#fff",
                boxShadow: "rgb(0 0 0 / 20%) -4px -1px 20px 13px",
              }
            : null
        }
      >
        <div className="container ">
          <div className="services-menu content-block1">
            <Collapse
              in={props.open}
              timeout={800}
              style={{ position: "relative" }}
            >
              <div
                onClick={gotoNext}
                style={
                  props.open
                    ? props.menu_list[index]?.sub_menu?.length < 6
                      ? { display: "none" }
                      : slide === 1
                      ? { display: "none" }
                      : null
                    : { display: "none" }
                }
                className="menu_arrow_right"
              />
              <div
                onClick={gotoPrev}
                style={
                  props.open
                    ? props.menu_list[index]?.sub_menu?.length < 6
                      ? { display: "none" }
                      : slide === 0
                      ? { display: "none" }
                      : null
                    : { display: "none" }
                }
                className="menu_arrow_left"
              />
              <Tabs
                value={index}
                centered
                onChange={handleChange}
                style={styles.tabs}
                TabIndicatorProps={{
                  style: { background: "#57bbad", height: 2 },
                }}
              >
                {props.menu_list?.map((service, idx) => (
                  <Link
                    key={service.id}
                    to={
                      idx < 2
                        ? "/services/treatments/" + service.slug
                        : "/services/all-treatments/" + service.slug
                    }
                  >
                    <Tab
                      key={service.label + idx}
                      onClick={() => handleChangeIndex(idx)}
                      label={service.label.toLowerCase()}
                    ></Tab>
                  </Link>
                ))}
              </Tabs>

              <div
                className="menulist-container"
                // style={emptytab ? { backgroundColor: "#ebebeb" } : null}
              >
                <SwipeableViews
                  index={index}
                  disableLazyLoading={true}
                  animateHeight={true}
                  // animateTransitions={false}
                  springConfig={{
                    duration: "1s",
                    easeFunction: "cubic-bezier(0.15, 0.3, 0.25, 1)",
                    delay: "0s",
                  }}
                  // onChangeIndex={this.handleChangeIndex}
                >
                  {props.menu_list?.slice(0, 2).map((service, idx) => (
                    <div
                      key={service.id}
                      style={Object.assign({}, styles.slide)}
                    >
                      {/* <Slider ref={slider} {...settings}> */}
                      <Fade in={slide === 0} timeout={600}>
                        <div style={slide !== 0 ? { display: "none" } : null}>
                          <div className="service-menuboxlist text-center">
                            {service.sub_menu?.slice(0, 6).map((foo, j) => (
                              <div
                                key={foo.id}
                                onClick={() =>
                                  HandleService1Click(service.slug, foo)
                                }
                                className="service-menubox position-relative"
                              >
                                <p>{foo.label}</p>
                                <div
                                  key={foo.id}
                                  className="menu-itemBG"
                                  style={
                                    foo.images
                                      ? {
                                          backgroundImage: `url('${foo.images[0]?.url}')`,
                                        }
                                      : null
                                  }
                                />
                              </div>
                            ))}
                          </div>
                        </div>
                      </Fade>
                      <Fade in={slide === 1} timeout={600}>
                        <div style={slide !== 1 ? { display: "none" } : null}>
                          <div
                            style={slide !== 1 ? { display: "none" } : null}
                            className="service-menuboxlist text-center"
                          >
                            {service.sub_menu
                              ?.slice(
                                service?.sub_menu.length <= 6 ? 0 : 6,
                                service?.sub_menu.length
                              )
                              .map((foo, j) => (
                                <div
                                  key={foo.id}
                                  onClick={() =>
                                    HandleService1Click(service.slug, foo)
                                  }
                                  className="service-menubox position-relative"
                                >
                                  <p>{foo.label}</p>
                                  <div
                                    key={foo.id}
                                    className="menu-itemBG"
                                    style={
                                      foo.images
                                        ? {
                                            backgroundImage: `url('${foo.images[0]?.url}')`,
                                          }
                                        : null
                                    }
                                  />
                                </div>
                              ))}
                          </div>
                        </div>
                      </Fade>

                      {/* </Slider> */}
                    </div>
                  ))}

                  {props.menu_list
                    ?.slice(2, props.menu_list.length)
                    .map((service, idx) => (
                      <div
                        key={service.id}
                        style={Object.assign({}, styles.slide)}
                      >
                        <Fade in={slide === 0} timeout={600}>
                          <div style={slide !== 0 ? { display: "none" } : null}>
                            <div className="service-menuboxlist text-center">
                              {service.sub_menu?.slice(0, 6).map((foo, j) => (
                                <a
                                  key={foo.label + j}
                                  onClick={() =>
                                    HandleService2Click(service, j)
                                  }
                                  className="service-menubox position-relative"
                                >
                                  <p>{foo.label}</p>
                                  <div
                                    className="menu-itemBG"
                                    key={foo.id}
                                    style={
                                      foo.images
                                        ? {
                                            backgroundImage: `url('${foo.images[0]?.url}')`,
                                          }
                                        : null
                                    }
                                  />
                                </a>
                              ))}
                            </div>
                          </div>
                        </Fade>
                        <Fade in={slide === 1} timeout={600}>
                          <div style={slide !== 1 ? { display: "none" } : null}>
                            <div className="service-menuboxlist text-center">
                              {service.sub_menu
                                ?.slice(
                                  service?.sub_menu.length <= 6 ? 0 : 6,
                                  service?.sub_menu.length
                                )
                                .map((foo, j) => (
                                  <a
                                    key={foo.label + j}
                                    onClick={() =>
                                      HandleService2Click(
                                        service,
                                        service?.sub_menu.length <= 6
                                          ? j
                                          : j + 6
                                      )
                                    }
                                    className="service-menubox position-relative"
                                  >
                                    <p>{foo.label}</p>
                                    <div
                                      className="menu-itemBG"
                                      key={foo.id}
                                      style={
                                        foo.images
                                          ? {
                                              backgroundImage: `url('${foo.images[0]?.url}')`,
                                            }
                                          : null
                                      }
                                    />
                                  </a>
                                ))}
                            </div>
                          </div>
                        </Fade>
                      </div>
                    ))}
                </SwipeableViews>
              </div>
            </Collapse>
          </div>
        </div>
      </div>
    </>
  );
  // }
}

// export default withRouter(ServiceMenu);
