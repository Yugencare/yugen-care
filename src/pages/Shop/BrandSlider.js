import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import BrandsBG from "../../images/brandsBG.jpg";

function BrandSlider({ brands }) {
  const brand_slider = {
    arrow: true,
    infinite: true,
    speed: 500,
    slidesToScroll: brands.length - 1,
    slidesToShow: brands.length - 1,
    autoplay: true,
    autoplaySpeed: 3500,

    responsive: [
      {
        breakpoint: 1400,
        settings: {
          slidesToScroll: brands.length - 1,
          slidesToShow: brands.length - 1,
        },
      },
      {
        breakpoint: 991,
        settings: {
          slidesToScroll: brands.length - 2,
          slidesToShow: brands.length - 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToScroll: brands.length - 3,
          slidesToShow: brands.length - 3,
        },
      },
      // You can unslick at a given breakpoint now by adding:
      // settings: "unslick"
      // instead of a settings object
    ],
  };

  return (
    <div
      className="BrandSlider content-block1 position-relative"
      style={{
        backgroundImage: `url(${BrandsBG})`,
        backgroundSize: `cover`,
        backgroundRepeat: `no-repeat`,
      }}
    >
      <div className="container">
        {brands?.length > 3 ? (
          <Slider {...brand_slider} className=" service_slider text-center row">
            {brands?.map((brand) => (
              <div key={brand.id} className="brand_slider_box">
                <img src={brand.images ? brand.images[0]?.url : null} alt="" />
              </div>
            ))}
          </Slider>
        ) : (
          <div className="text-center row justify-content-center">
            {brands?.map((brand) => (
              <div key={brand.id} className="col-sm-4 brand_slider_box">
                <img src={brand.images ? brand.images[0]?.url : null} alt="" />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default BrandSlider;
