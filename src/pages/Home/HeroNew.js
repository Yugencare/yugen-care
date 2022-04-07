import AOS from "aos";
import React, { Suspense, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import HeroBG from "../../images/hero3.jpg";
import Phone from "../../images/phone.png";
import WhatsApp from "../../images/whatsapp.png";
import chibi from "../../images/chibi-logo.png";

function Hero(props) {
  // const [resetAOS, setresetAOS] = useState([]);

  useEffect(() => {
    // AOS TRIGGER FIX
    // var init = [];
    // var x = setInterval(function () {
    //   init.push(AOS.init());
    //   if (init.length >= 2) {
    //     clearInterval(x);
    //     // setresetAOS([]);
    //   }
    // }, 1000);
  }, []);

  const { services, lang, headline } = props;
  const _ = require("lodash");
  function toslug(label) {
    const slug = label
      ?.toString() // Cast to string
      .toLowerCase() // Convert the string to lowercase letters
      .normalize("NFD") // The normalize() method returns the Unicode Normalization Form of a given string.
      .trim() // Remove whitespace from both sides of a string
      .replace(/\s+/g, "-") // Replace spaces with -
      .replace("&", "and")
      .replace(/[^\w\-]+/g, "") // Remove all non-word chars
      .replace(/\-\-+/g, "-"); // Replace multiple - with single -
    return slug + "/";
  }
  return (
    <>
      <div
        className="HeroNew position-relative"
        style={{
          backgroundImage: `url(${HeroBG})`,
          backgroundSize: `cover`,
          backgroundRepeat: `no-repeat`,
        }}
      >
        <div className="HomeServices HomeServicesDesktop content-block1 position-relative d-none d-sm-block">
          {services ? (
            <>
              <div className="row1">
                <div className="container">
                  <div className="row justify-content-center text-center">
                    <div className="col-xl-8">
                      <h2 data-aos="fade" data-aos-duration="700">
                        {headline}
                      </h2>
                    </div>
                  </div>
                  <div className="row text-center justify-content-center">
                    {services &&
                      services.length !== 0 &&
                      services?.map((service, idx) => (
                        <div className="col-xl-3 col-md-3 col-sm-3 yugen-face_box">
                          <div
                            data-aos="fade-down"
                            data-aos-delay={150 * idx}
                            data-aos-duration="700"
                            className="hs_box"
                          >
                            <div style={{ overflow: "hidden" }}>
                              <Link to={"/7-pillars/" + toslug(service?.label)}>
                                <img
                                  src={
                                    service?.images
                                      ? service.images[0].url
                                      : null
                                  }
                                  alt=""
                                />
                              </Link>
                            </div>
                            <Link
                              to={"/7-pillars/" + toslug(service?.label)}
                              className="d-flex align-items-center justify-content-center"
                            >
                              <img
                                src={chibi}
                                alt="mini-logo"
                                className="chibi-logo"
                              />

                              {lang === "en"
                                ? service?.label
                                    ?.toLowerCase()
                                    .replace("yugen", "")
                                : service?.label_ar}
                            </Link>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            </>
          ) : null}
        </div>
        <div className="HomeServices HomeServicesMobile content-block1 position-relative d-block d-sm-none pb-5">
          <div className="row1">
            <div className="container">
              <div className="row justify-content-center text-center">
                <div className="col-xl-8">
                  <h2> {headline}</h2>
                </div>
              </div>
              <div className="row text-center justify-content-center">
                {/* <div className="parrallax-container2">
                <div className="parallax"></div>
              </div> */}
                {services &&
                  services.length !== 0 &&
                  services?.map((service, idx) => (
                    <div className="col-6 yugen-face_box">
                      <div className="hs_box">
                        <div style={{ overflow: "hidden" }}>
                          <Link
                            data-aos="fade-up"
                            data-aos-delay={(150 * idx) % 300}
                            data-aos-duration="1000"
                            to={"/7-pillars/" + toslug(service?.label)}
                          >
                            <img
                              src={
                                service?.images ? service?.images[0]?.url : null
                              }
                              alt=""
                            />
                          </Link>
                        </div>
                        <Link
                          data-aos="fade-up"
                          data-aos-delay={(150 * idx) % 300}
                          data-aos-duration="1000"
                          className="d-flex align-items-center justify-content-center"
                          to={"/7-pillars/" + toslug(service?.label)}
                        >
                          <img
                            src={chibi}
                            alt="mini-logo"
                            className="chibi-logo"
                          />

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
      </div>
      <div className="intro-icons">
        <a href="tel:+971 434 98000">
          <img className="mb-2 hero-img" src={WhatsApp} alt="" />
        </a>
        <a href="https://api.whatsapp.com/send?phone=+97143498000">
          <img className="mt-2 hero-img" src={Phone} alt="" />
        </a>
      </div>
    </>
  );
}
export default Hero;
