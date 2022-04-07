import React, { useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useDispatch, useSelector } from "react-redux";
import { getTestimonials } from "../app/Testimonials/testimonials";

function QuoteSlider() {
  const dispatch = useDispatch();
  const { testimonials } = useSelector((state) => state.testimonials);
  const { status } = useSelector((state) => state.testimonials);
  const { lang } = useSelector((state) => state.lang);
  const quote_slider = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autplay: true,
    autoplaySpeed: 500,
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
  useEffect(() => {
    if (status !== "success") {
      dispatch(getTestimonials());
    }
    console.log(testimonials);
  }, [dispatch]);

  return testimonials?.length === 0 ? null : (
    <div className="QuoteSlider content-block1 position-relative">
      {/* <div className="parrallax-container ">
        <div className="parallax y-right"></div>
      </div> */}
      <div className="container-sm">
        <div
          data-aos="fade"
          data-aos-delay="0"
          data-aos-duration="2000"
          data-aos-once={false}
          className="slider-container row"
        >
          <div className="col-xl-10 col-md-10 col-sm-10 ">
            <Slider
              {...quote_slider}
              className="service_slider custom_round_dots text-center row"
            >
              {lang === "en"
                ? testimonials.map(
                    (person, idx) =>
                      person.testimony &&
                      person.author && (
                        <div
                          key={person.id}
                          className="product_slider_box col-xl-11"
                        >
                          <div className="person-quote">
                            <p> {person.testimony}</p>
                          </div>
                          <p> - {person.author} </p>
                        </div>
                      )
                  )
                : testimonials.map(
                    (person, idx) =>
                      person.testimony_ar &&
                      person.author_ar && (
                        <div
                          key={person.id}
                          className="product_slider_box col-xl-11"
                        >
                          <div className="person-quote">
                            <p> {person.testimony_ar}</p>
                          </div>
                          <p> - {person.author_ar} </p>
                        </div>
                      )
                  )}
            </Slider>
          </div>
        </div>
      </div>
    </div>
  );
}

export default QuoteSlider;
