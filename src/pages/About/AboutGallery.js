import React, { useRef } from "react";
import { useSelector } from "react-redux";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";

function AboutGallery({ gallery }) {
  const About_Gallery = {
    dots: true,
    arrows: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    centerPadding: "160px",
    centerMode: true,
    variableWidth: true,
    swipeToSlide: true,
    autoplay: true,
    autoplaySpeed: 3500,
    responsive: [
      {
        breakpoint: 1600,
        settings: {
          slidesToShow: 2.5,
        },
      },
      {
        breakpoint: 1400,
        settings: {
          slidesToShow: 3,
          centerPadding: "0",
        },
      },
      {
        breakpoint: 991,
        settings: {
          slidesToShow: 1.8,
          centerMode: false,
        },
      },
      {
        breakpoint: 680,
        settings: {
          slidesToShow: 1,
          centerMode: false,
        },
      },
      // You can unslick at a given breakpoint now by adding:
      // settings: "unslick"
      // instead of a settings object
    ],
  };
  const galleryRef = useRef();
  console.log(galleryRef);
  const { lang } = useSelector((state) => state.lang);
  return (
    <div
      dir="ltr"
      data-aos-once={false}
      className="About_Gallery content-block1 position-relative"
      onMouseEnter={() => galleryRef?.current.slickNext()}
    >
      <div className="container text-center mb-5">
        <h2>{lang === "en" ? "Our Clinic" : "عيادتنا"}</h2>
      </div>
      <div className="container-fluid ">
        <Slider
          adaptiveHeight
          ref={(slider) => (galleryRef.current = slider)}
          {...About_Gallery}
          className="custom_round_dots list-inline"
        >
          {gallery.map((slide, idx) => (
            <div
              key={"gallery1" + idx}
              data-aos="fade"
              data-aos-delay={`${idx * 100}`}
              data-aos-duration="1000"
              className="list-inline-item grabbable"
            >
              <img
                // className={`gallery-image${idx % 3}`}
                className={`gallery-image2`}
                src={slide.images ? slide.images[0]?.url : null}
                alt=""
              />
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
}
export default AboutGallery;
