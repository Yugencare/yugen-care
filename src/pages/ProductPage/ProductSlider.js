import React from "react";
import SliderProduct from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";

function ProductSlider(props) {
  const ProductSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    width: 100,
  };
  return (
    <div className="ProductSlider position-relative ">
      <div className="">
        <SliderProduct {...ProductSettings} className=" custom_round_dots ">
          {props.product.images &&
            props.product.images.length !== 0 &&
            props.product.images.map((prod) => <img src={prod.url} alt="" />)}
        </SliderProduct>
      </div>
    </div>
  );
}

export default ProductSlider;
