import $ from "jquery";
import React, { Component } from "react";
import "react-jquery-plugin";
import { Link } from "react-router-dom";
import chibi from "../../images/chibi-logo.png";

class HomeServicesMobile extends Component {
  componentDidMount() {
    $(".HomeServicesMobile .yugen-face_box").click(() => {
      $(".HomeServicesMobile .child1").slideToggle();
      $(".HomeServicesMobile .child2").hide();
      $(".HomeServicesMobile .child3").hide();
      $(".HomeServicesMobile .child4").hide();
      $(".HomeServicesMobile .row1 .col-6 .hs_box").removeClass("active");
      $(".HomeServicesMobile .yugen-face_box .hs_box").addClass("active");
      $(".HomeServicesMobile .yugen-face_box .servcies-list").toggleClass(
        "d-block"
      );
    });
    $(".HomeServicesMobile .yugen-body_box").click(() => {
      $(".HomeServicesMobile .child2").slideToggle();
      $(".HomeServicesMobile .child1").hide();
      $(".HomeServicesMobile .child3").hide();
      $(".HomeServicesMobile .child4").hide();
      $(".HomeServicesMobile .row1 .col-6 .hs_box").removeClass("active");
      $(".HomeServicesMobile .yugen-body_box .hs_box").addClass("active");
      $(".HomeServicesMobile .yugen-body_box .servcies-list").toggleClass(
        "d-block"
      );
    });
    $(".HomeServicesMobile .yugen-health_box").click(() => {
      $(".HomeServicesMobile .child3").slideToggle();
      $(".HomeServicesMobile .child1").hide();
      $(".HomeServicesMobile .child2").hide();
      $(".HomeServicesMobile .child4").hide();
      $(".HomeServicesMobile .row1 .col-6 .hs_box").removeClass("active");
      $(".HomeServicesMobile .yugen-health_box .hs_box").addClass("active");
      $(".HomeServicesMobile .yugen-health_box .servcies-list").toggleClass(
        "d-block"
      );
    });
    $(".HomeServicesMobile .yugen-wellbeing_box").click(() => {
      $(".HomeServicesMobile .child4").slideToggle();
      $(".HomeServicesMobile .child1").hide();
      $(".HomeServicesMobile .child2").hide();
      $(".HomeServicesMobile .child3").hide();
      $(".HomeServicesMobile .row1 .col-6 .hs_box").removeClass("active");
      $(".HomeServicesMobile .yugen-wellbeing_box .hs_box").addClass("active");
      $(".HomeServicesMobile .yugen-wellbeing_box .servcies-list").toggleClass(
        "d-block"
      );
    });
    $(".HomeServicesMobile .yugen-anti-aging_box").click(() => {
      $(".HomeServicesMobile .child5").slideToggle();
      $(".HomeServicesMobile .child6").hide();
      $(".HomeServicesMobile .child7").hide();
      $(".HomeServicesMobile .child8").hide();
      $(".HomeServicesMobile .row2 .col-6 .hs_box").removeClass("active");
      $(".HomeServicesMobile .yugen-anti-aging_box .hs_box").addClass("active");
      $(".HomeServicesMobile .yugen-anti-aging_box .servcies-list").toggleClass(
        "d-block"
      );
    });
    $(".HomeServicesMobile .yugen-man_box").click(() => {
      $(".HomeServicesMobile .child6").slideToggle();
      $(".HomeServicesMobile .child5").hide();
      $(".HomeServicesMobile .child7").hide();
      $(".HomeServicesMobile .child8").hide();
      $(".HomeServicesMobile .row2 .col-6 .hs_box").removeClass("active");
      $(".HomeServicesMobile .yugen-man_box .hs_box").addClass("active");
      $(".HomeServicesMobile .yugen-man_box .servcies-list").toggleClass(
        "d-block"
      );
    });
    $(".HomeServicesMobile .yugen-sensual_box").click(() => {
      $(".HomeServicesMobile .child7").slideToggle();
      $(".HomeServicesMobile .child5").hide();
      $(".HomeServicesMobile .child6").hide();
      $(".HomeServicesMobile .child8").hide();
      $(".HomeServicesMobile .row2 .col-6 .hs_box").removeClass("active");
      $(".HomeServicesMobile .yugen-sensual_box .hs_box").addClass("active");
      $(".HomeServicesMobile .yugen-sensual_box .servcies-list").toggleClass(
        "d-block"
      );
    });
    $(".HomeServicesMobile .yugen-dental_box").click(() => {
      $(".HomeServicesMobile .child8").slideToggle();
      $(".HomeServicesMobile .child5").hide();
      $(".HomeServicesMobile .child6").hide();
      $(".HomeServicesMobile .child7").hide();
      $(".HomeServicesMobile .row2 .col-6 .hs_box").removeClass("active");
      $(".HomeServicesMobile .yugen-dental_box .hs_box").addClass("active");
      $(".HomeServicesMobile .yugen-dental_box .servcies-list").toggleClass(
        "d-block"
      );
    });
  }
  render() {
    const { services, lang, headline } = this.props;
    const _ = require("lodash");
    function toslug(label) {
      const slug =
        label.toLocaleLowerCase().replace(" ", "-").split("").join("") + "/";
      return slug;
    }
    return (
      <div className="HomeServices HomeServicesMobile content-block1 position-relative d-block d-sm-none">
        <div className="row1">
          <div className="container">
            <div className="row justify-content-center text-center">
              <div className="col-xl-8">
                <h2>{headline}</h2>
              </div>
            </div>
            <div className="row text-center justify-content-center">
              {services?.map((service, idx) => (
                <div key={service.id} className="col-6 yugen-face_box">
                  <div className="hs_box">
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
export default HomeServicesMobile;
