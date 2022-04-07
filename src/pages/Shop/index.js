import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
import { getShoppage } from "../../app/shoppage";
import LoadingOverlay from "../../components/LoadingOverlay";
import QuoteSlider from "../../components/QuoteSlider";
import ServiceIntro from "../../components/ServiceIntro";
import Errorpage from "../../layout/Errorpage";
import PageServicesHeader from "../../layout/PageServicesHeader";
import BrandSlider from "./BrandSlider";
import ShopSlider from "./ShopSlider";
import ViewProducts from "./ViewProducts";
import Phone from "../../images/phone.png";
import WhatsApp from "../../images/whatsapp.png";

function Shop() {
  const dispatch = useDispatch();
  const { page } = useSelector((state) => state.shop);
  const { status } = useSelector((state) => state.shop);
  const { lang } = useSelector((state) => state.lang);
  const mstatus = useSelector((state) => state.getmenu.status);

  const params = useParams();
  const location = useLocation();
  var helmet_meta = {};
  var schemaJSON = "";
  useEffect(() => {
    ////Passing page ID reference
    if (status !== "success") {
      dispatch(getShoppage({ id: location.pathname.split("/")[1] }));
    }
  }, [dispatch]);

  var heading = {};
  var intro = {};
  var products = [];
  var productList = [];
  var brands = [];
  var testimonials = [];
  var properties = [];
  if (status === "success") {
    console.log(page);
    heading = {
      text:
        lang === "en"
          ? page.page_fields.header?.text
          : page.page_fields.ar_header?.text,
      title1:
        lang === "en"
          ? page.page_fields.header?.title1
          : page.page_fields.ar_header?.title1,
      title2:
        lang === "en"
          ? page.page_fields.header?.title2
          : page.page_fields.ar_header?.title2,
      hero: page.page_fields.header?.hero,
    };

    products = [];
    for (
      let index = 0;
      index < page.page_fields.productslider?.products.length;
      index++
    ) {
      if (lang === "en") {
        products.push({
          class: page.page_fields.productslider?.products[index].class,
          title: page.page_fields.productslider?.products[index].title,
          url: page.page_fields.productslider?.products[index].url,
          images: page.page_fields.productslider?.products[index].images,
        });
      } else {
        products.push({
          class: page.page_fields.ar_productslider?.products[index].class,
          title: page.page_fields.ar_productslider?.products[index].title,
          url: page.page_fields.ar_productslider?.products[index].url,
          images: page.page_fields.productslider?.products[index].images,
        });
      }
    }
    brands = page.page_fields.brands.brands;
    // testimonials = page.page_fields.testimonials?.testimonials;

    //HELMET
    helmet_meta = page.meta;
    console.log(helmet_meta);
    properties = page.properties;
    try {
      schemaJSON = page.schema?.map((object) => {
        return JSON.stringify(object);
      });
    } catch (e) {
      console.log("Could Not Parse JSON");
    }
  }
  return (
    <div className="Shop">
      {status === "success" && mstatus === "success" ? (
        <>
          {/* {window.scrollTo(0, 0)}*/}
          <Helmet>
            <meta charSet="utf-8" />
            <title>{helmet_meta?.title}</title>
            <meta name="description" content={helmet_meta?.description} />
            {properties?.length !== 0 && properties !== null
              ? properties.map((prpty, idx) => (
                  <meta
                    key={prpty.property}
                    property={prpty.property}
                    content={prpty.content}
                  />
                ))
              : null}
            {schemaJSON &&
              schemaJSON.length !== 0 &&
              schemaJSON.map((s) => (
                <script type="application/ld+json">{s}</script>
              ))}
          </Helmet>
          <PageServicesHeader pagename="Shop" pageHeader={heading} />
          <ServiceIntro intros={intro} />
          <div className="position-relative">
            {/* <div className="parrallax-container ">
              <div className="parallax "></div>
            </div> */}
            <ShopSlider Services={products} />
            <ViewProducts />
          </div>
          <BrandSlider brands={brands} />
          <QuoteSlider testimonials={testimonials} />
          <div className="intro-icons">
            <a href="tel:+971 434 98000">
              <img className="mb-2 hero-img" src={WhatsApp} alt="" />
            </a>
            <a href="https://api.whatsapp.com/send?phone=+97143498000">
              <img className="mt-2 hero-img" src={Phone} alt="" />
            </a>
          </div>
        </>
      ) : status === "failed" ? (
        <Errorpage />
      ) : (
        <LoadingOverlay />
      )}
    </div>
  );
}
export default Shop;
