import React, { useRef } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";

function ShopSlider(props) {
  const { lang } = useSelector((state) => state.lang);
  const service_slider = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3500,

    responsive: [
      {
        breakpoint: 1400,
        settings: {
          slidesToShow: 2,
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
  const ShopRef = useRef();
  const slugify = (string) => {
    const slug = string
      .toString() // Cast to string
      .toLowerCase() // Convert the string to lowercase letters
      .normalize("NFD") // The normalize() method returns the Unicode Normalization Form of a given string.
      .trim() // Remove whitespace from both sides of a string
      .replace("&", "and") // Replace spaces with -
      .replace(/\s+/g, "") // Replace spaces with
      .replace(/[^\w\-]+/g, "") // Remove all non-word chars
      .replace(/\-\-+/g, "-"); // Replace multiple - with single -
    return slug;
  };
  return (
    <div dir="ltr" className="ShopSlider content-block1 position-relative">
      {/* <img className="y-icon-top img-fluid" src={yiconbottom} alt=""/> */}
      <div className="smile-text">
        <div className="slider-container row">
          {props.Services?.length > 2 ? (
            <div
              onMouseEnter={() => ShopRef?.current.slickNext()}
              className="col-xl-10 col-md-10 col-sm-8 services_arrow"
            >
              <Slider
                ref={(slider) => (ShopRef.current = slider)}
                {...service_slider}
                className="service_slider custom_round_dots text-center row"
              >
                {props.Services?.map((prod, idx) => (
                  <div
                    key={prod.title + idx}
                    className="product_slider_box col-xl-12 grabbable"
                  >
                    <img src={prod.images ? prod.images[0]?.url : null} />
                    <div className="slider_servicebtn">
                      <p className="titlesmall"> {prod.title} </p>
                      <p className="titlebold"> {prod.class} </p>
                      <p className="mb-0">
                        <Link
                          to={`/wellness-land/browse/deals-${slugify(
                            prod.url
                          )}`}
                          className="btn3"
                        >
                          <span>
                            {lang === "en" ? " View Products" : "اظهار منتجات"}
                          </span>
                        </Link>
                      </p>
                    </div>
                  </div>
                ))}
              </Slider>
            </div>
          ) : (
            props.Services?.map((prod, idx) => (
              <div
                key={prod.title + idx}
                className="product_slider_box col-md-5 mt-5 mt-md-0"
              >
                <img src={prod.images ? prod.images[0]?.url : null} />
                <div className="slider_servicebtn">
                  <p className="titlesmall"> {prod.title} </p>
                  <p className="titlebold"> {prod.class} </p>
                  <p className="mb-0">
                    <Link
                      to={`/wellness-land/browse/deals-${slugify(prod.url)}`}
                      className="btn3"
                    >
                      <span>
                        {lang === "en" ? " View Products" : "اظهار منتجات"}
                      </span>
                    </Link>
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default ShopSlider;
