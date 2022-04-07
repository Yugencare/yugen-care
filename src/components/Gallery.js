import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function Gallery({ gallery }) {
  const About_Gallery = {
    dots: true,
    arrows: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    centerPadding: "160px",
    centerMode: true,
    swipeToSlide: true,
    autoplay: true,
    autoplaySpeed: 5000,
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
    ],
  };
  return (
    <div
      className="About_Gallery content-block1 position-relative"
      style={{ marginBottom: 100 }}
    >
      <Slider {...About_Gallery} className="custom_round_dots list-inline">
        {gallery?.gallery.map((slide, idx) => (
          <div key={"galleryimg" + idx} className="list-inline-item">
            <img
              className="img-fluid"
              src={slide.images ? slide.images[0]?.url : null}
              alt=""
            />
          </div>
        ))}
      </Slider>
    </div>
  );
}
export default Gallery;
