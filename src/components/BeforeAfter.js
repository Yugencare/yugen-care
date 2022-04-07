import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ImageSlider from "react-image-comparison-slider";
import CustomHandle from "../images/sliderHandle.png";

function BeforeAfter({ casestudies }) {
  const BeforeAfterSettings = {
    dots: false,
    arrows: false,
    infinite: true,
    speed: 1000,
    slidesToShow: 3,
    slidesToScroll: 3,
    autoplaySpeed: 7000,
    responsive: [
      {
        breakpoint: 1400,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 991,
        settings: {
          slidesToShow: 2,
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

  const reArragnge = () => {
    var BA_List = [];

    casestudies?.list &&
      casestudies?.list.length !== 0 &&
      casestudies?.list.map((fil) => {
        if (BA_List.length < 1) {
          BA_List.push({
            class: fil.class,
            data: [fil],
          });
        } else {
          var flag = false;
          BA_List.map((element) => {
            if (element["class"] === fil.class) {
              element["data"] = [...element["data"], fil];
              flag = true;
            }
          });
          if (!flag) {
            BA_List.push({
              class: fil.class,
              data: [fil],
            });
            flag = false;
          }
        }
      });
    console.log(BA_List);
    return BA_List;
  };
  const Before = (slide) => {
    return slide.data.find((slide) => slide.title === "before")?.images[0]?.url;
  };
  const After = (slide) => {
    return slide.data.find((slide) => slide.title === "after")?.images[0]?.url;
  };

  const rea = reArragnge().filter((item) => item.class.length !== 0);
  const isEmpty = rea.length === 0;
  return isEmpty ? null : (
    <div
      dir="ltr"
      className="DentalBeforeAfter content-block1 position-relative"
      data-aos="fade-up"
      data-aos-delay="0"
      data-aos-duration="1000"
    >
      <div className="text-center">
        <h2>{casestudies.case_studies}</h2>
      </div>

      <Slider {...BeforeAfterSettings} className="custom_round_dots w-100 ">
        {rea &&
          rea.length > 3 &&
          rea.map((slide) => (
            <div key={slide.id} className="comparison_box px-4 ">
              <ImageSlider
                image2={Before(slide)}
                image1={After(slide)}
                sliderWidth={1}
                sliderColor="#4e4e4e"
                handleColor="#4e4e4e"
                handleBackgroundColor=""
                customHandle={<img alt="" src={CustomHandle} />}
              />
            </div>
          ))}
        {/* {rea?.map((slide) => (
          <div key={slide.id} className="comparison_box px-4">
            <ImageSlider
              image2={Before(slide)}
              image1={After(slide)}
              sliderWidth={1}
              sliderColor="#4e4e4e"
              handleColor="#4e4e4e"
              handleBackgroundColor=""
              customHandle={<img alt="" src={CustomHandle} />}
            />
          </div>
        ))} */}
      </Slider>
      {rea && rea.length <= 3 && (
        <div
          data-aos="fade"
          data-aos-delay="0"
          data-aos-duration="2000"
          className="container"
        >
          <div className="row justify-content-center">
            {rea?.map((slide) => (
              <div className="col-md-6 col-lg-4 mb-4 d-flex justify-content-center">
                <div key={slide.id} className="comparison_box">
                  <ImageSlider
                    image2={Before(slide)}
                    image1={After(slide)}
                    sliderWidth={1}
                    sliderColor="#4e4e4e"
                    handleColor="#4e4e4e"
                    handleBackgroundColor=""
                    customHandle={<img alt="" src={CustomHandle} />}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default BeforeAfter;
