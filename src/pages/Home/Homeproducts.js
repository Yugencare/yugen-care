import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import Pro1 from "../../images/pro1.jpg";

function HomeProducts() {
  const [Data, setData] = useState([]);
  const getProds = async () => {
    const response = await axios.get(
      `https://server.yugencare.com/api/v1/products/products/featured`
    );

    const data = await response.data.products;
    console.log(data);
    setData(data);
  };

  useEffect(() => {
    getProds();
  }, []);

  const product_slider = {
    arrow: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    autplay: true,
    autoplaySpeed: 500,
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
  const { lang } = useSelector((state) => state.lang);
  return Data && Data.length !== 0 ? (
    <div className="HomeProducts" dir="ltr">
      <div className="gray_bg">
        <div className="container h-100 position-relative">
          <div className="row h-100" style={{ margin: 0 }}>
            <div className="col-12 col-xl-6 col-lg-7 col-md-5 col-sm-5 h-100 align-self-center custom_arrow">
              <Slider
                {...product_slider}
                className="product_slider text-center row"
                style={{ margin: 0 }}
              >
                {Data.map((pro) => (
                  <div key={pro.id} className="product_slider_box col-xl-11">
                    <Link to={`/wellness-land/${pro.slug}`}>
                      <img
                        src={
                          pro.images && pro.images.length !== 0
                            ? pro.images[0].url
                            : Pro1
                        }
                        alt=""
                      />
                    </Link>
                    <Link
                      to={`/wellness-land/${pro.slug}`}
                      className="pro_title"
                    >
                      {lang === "en" ? pro.name : pro.name_ar}
                    </Link>
                    <span>
                      <small>{pro.price}</small> {lang === "en" ? "AED" : "د.إ"}
                    </span>
                  </div>
                ))}
              </Slider>
            </div>
            <div className="col-xl-4 col-md-5 col-sm-6 h-100">
              <div className="content-block3 mb-5 mb-md-0">
                <h2
                  data-aos="fade"
                  data-aos-delay="0"
                  data-aos-duration="2000"
                  style={{ fontWeight: 300 }}
                >
                  {lang === "en" ? (
                    <>
                      <span>Shop</span> the best <br />
                      selling products
                    </>
                  ) : (
                    <>
                      <span>تسوق</span> المنتجات الأكثر <br />
                      مبيعا
                    </>
                  )}
                </h2>
                <Link to="/wellness-land" className="btn2">
                  {lang === "en" ? "Shop Now" : "تسوق الآن"}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : (
    ""
  );
}
export default HomeProducts;
