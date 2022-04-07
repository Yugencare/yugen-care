import { Fade, IconButton } from "@material-ui/core";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import { decode } from "html-entities";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import SwipeableViews from "react-swipeable-views";
import { changeIndex } from "../app/Components/appBar";

const styles = {
  tabs: {
    background: "transparent",
    fontFamily: "Raleway",
    borderBottom: "1px solid #e8e8e8",
  },
  slide: {
    padding: 15,
    minHeight: 600,
  },
};

export default function TreatmentSlider(props) {
  const [EndPoint, setEndPoint] = useState("block");
  const [StartPoint, setStartPoint] = useState("none");
  const Index = useSelector((state) => state.appBar.value);
  const { lang } = useSelector((state) => state.lang);
  const dispatch = useDispatch();
  const ChangeIndex = (idx) => {
    dispatch(changeIndex(idx));
  };
  const location = useLocation();
  useEffect(() => {
    if (Index > props.treatment.length - 1) {
      ChangeIndex(0);
    } else {
      console.log(location);
      ChangeIndex(location.state?.params ? location.state.params : 0);
    }
  }, [dispatch]);

  const handleArrowDisplay = (index) => {
    var lastIndex = props.treatment.length - 1;
    if (index === lastIndex) {
      setEndPoint("none");
    }

    if (index > 0) {
      setStartPoint("block");
    }
    if (index !== lastIndex) {
      setEndPoint("block");
    }
    if (index === 0) {
      setStartPoint("none");
    }
  };

  const handleChange = (event, value) => {
    ChangeIndex(value);
    handleArrowDisplay(value);
  };

  const handleChangeIndex = (index) => {
    ChangeIndex(index);
    handleArrowDisplay(index);
  };
  const handleClickIndex = (event) => {
    var lastIndex = props.treatment.length - 1;
    // var Index = props.Index;
    if (event === "prev" && Index !== 0) {
      ChangeIndex(Index - 1);
      handleArrowDisplay(Index - 1);
    }
    if (event === "next" && Index !== lastIndex) {
      ChangeIndex(Index + 1);
      handleArrowDisplay(Index + 1);
    }
  };

  // render() {
  //   const { index, EndPoint, StartPoint } = this.state;
  //   const { treatment, Index } = this.props;
  const tret = props.treatment;
  const scrollableButtons = (props) => {
    if (tret.length === 1) {
      return null;
    }
    if (props.direction === "left") {
      return (
        <IconButton {...props}>
          <ArrowBackIcon />
        </IconButton>
      );
    } else if (props.direction === "right") {
      return (
        <IconButton {...props}>
          <ArrowForwardIcon />
        </IconButton>
      );
    } else {
      return null;
    }
  };
  return (
    <div dir="ltr" className="TreatmentSlider content-block1 position-relative">
      {props.treatment?.length === 0 ? null : (
        <div className="container position-relative">
          <ArrowBackIcon
            onClick={() => handleClickIndex("prev")}
            className="prev-ta d-block d-sm-none"
            style={{ display: `${StartPoint}` }}
          />
          <ArrowForwardIcon
            onClick={() => handleClickIndex("next")}
            className="next-ta d-block d-sm-none"
            style={{ display: `${EndPoint}` }}
          />
          <Tabs
            value={Index}
            onChange={handleChange}
            variant="scrollable"
            scrollButtons="auto"
            ScrollButtonComponent={(props) => scrollableButtons(props)}
            style={styles.tabs}
            swipe
            TabIndicatorProps={{
              style: { background: "#57bbad", height: 4 },
            }}
          >
            {props.treatment?.map((tab) => (
              <Tab
                key={tab.id}
                label={lang === "en" ? tab.label : tab.label_ar}
              />
            ))}
            {props.treatment?.map((tab) => console.log(tab))}
          </Tabs>
          <SwipeableViews
            index={Index}
            animateHeight={true}
            onChangeIndex={handleChangeIndex}
          >
            {props.treatment?.map((tab, idx) => (
              <Fade in={Index === idx} timeout={1300}>
                <div
                  key={tab.id}
                  className="row m-0"
                  style={Object.assign({}, styles.slide)}
                >
                  <div className="col-md-6 slider-treatment order-2 order-md-1">
                    <p
                      style={
                        lang === "en"
                          ? { whiteSpace: "pre-wrap" }
                          : { whiteSpace: "pre-wrap", direction: "rtl" }
                      }
                      dangerouslySetInnerHTML={{
                        __html: `${decode(
                          lang === "en" ? tab.description : tab.description_ar,
                        )}`,
                      }}
                    ></p>
                    <div
                      style={{ maxHeight: 225, overflow: "auto" }}
                      id="style-3"
                      key={tab.id + idx}
                      className="row"
                    >
                      {tab.treatments?.map((list) => (
                        <div className="col-sm-6 ">
                          <div className="childboxes">
                            <ul style={{ marginBottom: 0 }}>
                              <li key={list.id}>
                                <a>
                                  {lang === "en" ? list?.label : list?.label_ar}
                                </a>
                              </li>
                            </ul>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="col-md-6 sliderimg-treatment order-1 order-md-2">
                    {tab.images && (
                      <img className="" src={tab.images[0]?.url} alt="" />
                    )}
                  </div>
                </div>
              </Fade>
            ))}
          </SwipeableViews>
        </div>
      )}
    </div>
  );
  // }
}

// export default withRouter(TreatmentSlider);
