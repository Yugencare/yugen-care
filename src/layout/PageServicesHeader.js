import React, { useState } from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import GradientBar from "../pages/Home/GradientBar";
import { useSelector } from "react-redux";
import BookForm from "../components/BookForm";

function PageServicesHeader(props) {
  const [isLoaded, setisLoaded] = useState([false, false, false]);
  const [Open, setOpen] = useState(false);
  const { lang } = useSelector((state) => state.lang);
  const HandleLoaded = (index) => {
    setisLoaded(!isLoaded[index]);
  };
  const handleOpen = (idx) => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  // const { lang } = useSelector((state) => state.lang);
  const product_slider = {
    arrow: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,

    responsive: [
      {
        breakpoint: 1400,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 991,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      // You can unslick at a given breakpoint now by adding:
      // settings: "unslick"
      // instead of a settings object
    ],
  };
  const isEmpty = Object.values(props.pageHeader).length === 0;
  return isEmpty ? null : (
    <>
      <div className="pageservices-header">
        <div className="container h-100 ">
          <div className="row align-items-center justify-content-center">
            <div className="col-xl-6 col-md-6 col-sm-12">
              <div className="serviceshero_text">
                <h1
                  data-aos="fade-down"
                  data-aos-delay="0"
                  data-aos-duration="800"
                  className="mb-4"
                >
                  {props.isTreatmentPage ? "" : props.pageHeader?.title1}
                  <span> {props.pageHeader?.title2}</span>
                </h1>
                <p
                  data-aos="fade"
                  data-aos-delay="600"
                  data-aos-duration="800"
                  className="mb-4"
                >
                  {props.pageHeader?.text}
                </p>
                <p
                  data-aos="fade"
                  data-aos-delay="500"
                  data-aos-duration="1000"
                  className="mb-4"
                >
                  {props.pagename !== "Shop" ? (
                    <>
                      <a onClick={handleOpen} className="btn1">
                        {lang === "en" ? "Book Now" : "احجز الآن"}
                      </a>
                      <BookForm
                        open={Open}
                        handleOpen={handleOpen}
                        handleClose={handleClose}
                        Button={true}
                      />
                    </>
                  ) : null}
                </p>
              </div>
            </div>
            {props.pagename === "Shop" ? (
              <div className="col-xl-6 col-md-6 col-sm-12">
                <img
                  data-aos="fade"
                  data-aos-delay="500"
                  data-aos-duration="1000"
                  className="img-fluid"
                  src={
                    props.pageHeader?.hero
                      ? props.pageHeader?.hero[0].url
                      : null
                  }
                  alt=""
                />
              </div>
            ) : isLoaded ? (
              <div
                data-aos="fade-up"
                data-aos-delay="500"
                data-aos-duration="1000"
                className="col-xl-6 col-md-6 col-sm-12 services_arrow p-0"
                style={{ zIndex: 6 }}
              >
                {/* <Slider
                  {...product_slider}
                  className="service_slider text-center row"
                > */}
                {/* {props.pageHeader.headingslides.map((slide, idx) => ( */}
                <div
                  // key={"slideimg" + idx}
                  className=" col-xl-12 col-sm-12 p-0"
                >
                  <Link to="#">
                    <img
                      onLoad={() => HandleLoaded(0)}
                      src={
                        props.pageHeader.headingslides[0].images
                          ? props.pageHeader.headingslides[0].images[0]?.url
                          : null
                      }
                      alt=""
                    />
                  </Link>
                </div>
                {/* ))} */}
                {/* </Slider> */}
              </div>
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
      <GradientBar />
    </>
  );
}

export default PageServicesHeader;
