import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import SliderProduct from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import { getProducts } from "../../app/E-commerce/products";

function RelatedProducts(props) {
  const dispatch = useDispatch();
  const { products, product } = useSelector((state) => state.products);
  const { lang } = useSelector((state) => state.lang);
  const { status } = useSelector((state) => state.products);
  const [ProductArray, setProductArray] = useState([]);

  useEffect(() => {
    ////Passing page ID reference
    if (status !== "success") {
      dispatch(getProducts());
    }
    if (products && products.length !== 0 && product) {
      let array = [];

      for (let j = 0; j < product.categories.length; j++) {
        array.push(product.categories[j].value);
      }
      let related = [];
      for (let index = 0; index < products.length; index++) {
        let empty = [];
        empty = products[index].categories.filter((element) =>
          array.includes(element.value)
        );
        if (empty && empty.length !== 0) {
          related.push(products[index]);
        }
      }
      related = related.filter((item) => item.id !== product.id);
      setProductArray(related);
      console.log(array);
      console.log(related);
    }
  }, [dispatch, products]);

  const ProductSettings = {
    dots: true,
    infinite: true,
    speed: 1000,
    autoplay: true,
    autplaySpeed: 1500,
    slidesToShow: 3,
    slidesToScroll: 3,

    responsive: [
      {
        breakpoint: 1400,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 991,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 766,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 500,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      // You can unslick at a given breakpoint now by adding:
      // settings: "unslick"
      // instead of a settings object
    ],
  };

  return (
    product &&
    product.relatedproducts &&
    product.relatedproducts.length !== 0 && (
      <div className="RelatedProducts text-center content-block1 position-relative ">
        {/* <div className="parrallax-container ">
          <div className="parallax y-left"></div>
        </div> */}
        <div className="container">
          <div className="row justify-content-center mb-5">
            <h2>
              {lang === "en" ? product.relatedtitle : product.relatedtitle_ar}{" "}
            </h2>
          </div>
          {product.relatedproducts.length > 3 ? (
            <SliderProduct
              autoplay={true}
              aut
              {...ProductSettings}
              className=" custom_round_dots row"
            >
              {product.relatedproducts.map((prod) => (
                <Link to={`/wellness-land/${prod.slug}`}>
                  <div className="prod_related_box">
                    <div className="related_box">
                      <img
                        src={
                          prod.images &&
                          prod.images.length !== 0 &&
                          prod.images[0].url
                        }
                        alt={prod.label}
                      />
                    </div>
                    <p>{lang === "en" ? prod.label : prod.label_ar}</p>
                    <span>
                      {prod.price} {lang === "en" ? "AED" : "د.إ"}
                    </span>
                  </div>
                </Link>
              ))}
            </SliderProduct>
          ) : (
            <div className="row justify-content-center">
              {product.relatedproducts.map((prod) => (
                <div className="col-sm-4">
                  <Link to={`/wellness-land/${prod.slug}`}>
                    <div className="prod_related_box">
                      <div className="related_box">
                        <img
                          src={
                            prod.images &&
                            prod.images.length !== 0 &&
                            prod.images[0].url
                          }
                          alt={prod.label}
                        />
                      </div>
                      <p>{lang === "en" ? prod.label : prod.label_ar}</p>
                      <span>
                        {prod.price} {lang === "en" ? "AED" : "د.إ"}
                      </span>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    )
  );
}

export default RelatedProducts;
