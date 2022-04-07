import $ from "jquery";
import React, { Component } from "react";
import "react-jquery-plugin";
import { Link } from "react-router-dom";
import chibi from "../../images/chibi-logo.png";

class HomeServices extends Component {
  componentDidMount() {
    $(".HomeServicesDesktop .yugen-face_box").click(() => {
      $(".child1").slideToggle();
      $(".child2, .child3, .child4").hide();
      $(".row1 .col-xl-3 .hs_box").removeClass("active");
      $(".yugen-face_box .hs_box").toggleClass("active");
    });
    $(".HomeServicesDesktop .yugen-body_box").click(() => {
      $(".child2").slideToggle();
      $(".child1, .child3, .child4").hide();
      $(".row1 .col-xl-3 .hs_box").removeClass("active");
      $(".yugen-body_box .hs_box").toggleClass("active");
    });
    $(".HomeServicesDesktop .yugen-health_box").click(() => {
      $(".child3").slideToggle();
      $(".child1, .child2, .child4").hide();
      $(".row1 .col-xl-3 .hs_box").removeClass("active");
      $(".yugen-health_box .hs_box").addClass("active");
    });
    $(".HomeServicesDesktop .yugen-wellbeing_box").click(() => {
      $(".child4").slideToggle();
      $(".child1, .child2, .child3").hide();
      $(".row1 .col-xl-3 .hs_box").removeClass("active");
      $(".yugen-wellbeing_box .hs_box").addClass("active");
    });
    $(".HomeServicesDesktop .yugen-anti-aging_box").click(() => {
      $(".child5").slideToggle();
      $(".child6, .child7, .child8").hide();
      $(".row2 .col-xl-3 .hs_box").removeClass("active");
      $(".yugen-anti-aging_box .hs_box").addClass("active");
    });
    $(".HomeServicesDesktop .yugen-man_box").click(() => {
      $(".child6").slideToggle();
      $(".child5, .child7, .child8").hide();
      $(".row2 .col-xl-3 .hs_box").removeClass("active");
      $(".yugen-man_box .hs_box").addClass("active");
    });
    $(".HomeServicesDesktop .yugen-sensual_box").click(() => {
      $(".child7").slideToggle();
      $(".child5, .child6, .child8").hide();
      $(".row2 .col-xl-3 .hs_box").removeClass("active");
      $(".yugen-sensual_box .hs_box").addClass("active");
    });
    $(".HomeServicesDesktop .yugen-dental_box").click(() => {
      $(".child8").slideToggle();
      $(".child5, .child6, .child7").hide();
      $(".row2 .col-xl-3 .hs_box").removeClass("active");
      $(".yugen-dental_box .hs_box").addClass("active");
    });
  }
  render() {
    const { services, lang, headline } = this.props;
    const _ = require("lodash");
    function toslug(label) {
      const slug =
        label.toLocaleLowerCase().replace(" ", "-").split("").join("") + "/";
      console.log(slug);
      return slug;
    }
    return (
      <div className="HomeServices HomeServicesDesktop content-block1 position-relative d-none d-sm-block">
        <div className="row1">
          <div className="container">
            <div className="row justify-content-center text-center">
              <div className="col-xl-8">
                <h2>{headline}</h2>
              </div>
            </div>
            <div className="row text-center justify-content-center">
              {services?.slice(0, 4).map((service, idx) => (
                <div className="col-xl-3 col-md-3 col-sm-3 yugen-face_box">
                  <div
                    data-aos="fade-up"
                    data-aos-delay={50 * idx}
                    data-aos-duration="1000"
                    className="hs_box"
                  >
                    <div style={{ overflow: "hidden" }}>
                      <Link to={"7-pillars/" + toslug(service.label)}>
                        <img
                          src={service.images ? service.images[0]?.url : null}
                          alt=""
                        />
                      </Link>
                    </div>
                    <Link
                      to={"/7-pillars/" + toslug(service?.label)}
                      className="d-flex align-items-center justify-content-center"
                    >
                      <img src={chibi} alt="mini-logo" className="chibi-logo" />
                      {lang === "en"
                        ? service?.label?.toLowerCase().replace("yugen", "")
                        : service?.label_ar}
                    </Link>
                  </div>
                </div>
              ))}
              {services?.slice(4, services.length).map((service, idx) => (
                <div className="col-xl-3 col-md-3 col-sm-3 yugen-face_box">
                  <div
                    data-aos="fade-up"
                    data-aos-delay={50 * idx}
                    data-aos-duration="1000"
                    className="hs_box"
                  >
                    <div style={{ overflow: "hidden" }}>
                      <Link to={"7-pillars/" + toslug(service.label)}>
                        <img
                          src={service.images ? service.images[0]?.url : null}
                          alt=""
                        />
                      </Link>
                    </div>
                    <Link
                      to={"/7-pillars/" + toslug(service?.label)}
                      className="d-flex align-items-center justify-content-center"
                    >
                      <img src={chibi} alt="mini-logo" className="chibi-logo" />

                      {lang === "en"
                        ? service?.label?.toLowerCase().replace("yugen", "")
                        : service?.label_ar}
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default HomeServices;
