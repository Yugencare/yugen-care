import { decode } from "html-entities";
import React from "react";
import { Helmet } from "react-helmet";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import BookAppointment from "../../../components/BookAppointment";
import LoadingOverlay from "../../../components/LoadingOverlay";
import QuoteSlider from "../../../components/QuoteSlider";
import RelatedBlogs from "../../../components/RelatedBlogs";
import ServiceAd from "../../../components/ServiceAd";
import ServiceIntro from "../../../components/ServiceIntro";
import ServicesSlider from "../../../components/ServicesSlider";
import TreatmentSlider from "../../../components/TreatmentSlider";
//images imports
import HeroBG from "../../../images/HeaderBG.png";
import Errorpage from "../../../layout/Errorpage";
import PageServicesHeader from "../../../layout/PageServicesHeader";

function Face() {
  const { page } = useSelector((state) => state.servicepage);
  const { status } = useSelector((state) => state.servicepage);
  const mstatus = useSelector((state) => state.getmenu.status);
  const { lang } = useSelector((state) => state.lang);
  const params = useParams();
  ////fetching data from the API
  var pageHeader = {};
  var description = {};
  var treatmentlist = [];
  var ad = {};
  var ad2;
  var bap;
  var testimonials = [];
  var relatedblogs;
  var helmet_meta = {};
  var schemaJSON = "";
  var properties = [];

  const arabicSliders = () => {
    let array = [];
    for (
      let index = 0;
      index < page.page_fields.header.headingslides.length;
      index++
    ) {
      if (page.page_fields.ar_header.headingslides[index]) {
        array.push({
          class: page.page_fields.ar_header.headingslides[index].class,
          title: page.page_fields.ar_header.headingslides[index].title,
          url: page.page_fields.ar_header.headingslides[index].url,
          images: page.page_fields.header.headingslides[index].images,
        });
      }
    }
    console.log(array);
    return array;
  };
  if (status === "success" && params.slug === page?.slug) {
    console.log(page);
    try {
      if (lang === "en") {
        pageHeader = page.page_fields.header;
      } else {
        pageHeader = {
          text: page.page_fields.ar_header.text,
          title1: page.page_fields.ar_header.title1,
          title2: page.page_fields.ar_header.title2,
          headingslides: arabicSliders(),
        };
      }
      console.log(pageHeader);
      description =
        lang === "en"
          ? page.page_fields.description
          : page.page_fields.ar_description;
      ad =
        page.page_fields.banner?.image &&
        page.page_fields.banner?.image.length !== 0
          ? page.page_fields.banner.image[0]
          : null;
      treatmentlist = page.page_fields.services?.services;
      // testimonials = page.page_fields.testimonials?.testimonials;
      relatedblogs = page.page_fields.relatedblogs?.blogs;
      ad2 =
        page.page_fields.services?.ad &&
        page.page_fields.services?.ad.length !== 0
          ? page.page_fields.services?.ad[0]
          : null;
      bap =
        lang === "en"
          ? page.page_fields.services
          : page.page_fields.ar_services;
    } catch (e) {
      console.log(e);
      return <Errorpage />;
    }
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
    <div className="Face position-relative">
      {status === "success" &&
      params.slug === page?.slug &&
      mstatus === "success" ? (
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
            {/* <>{decode(page.scripts)}</> */}
          </Helmet>
          <div className="serviceHeaderBG">
            <img className="sBG img-fluid" src={`${HeroBG}`} alt="" />
            <PageServicesHeader pageHeader={pageHeader} />
            <ServiceIntro />
            <div className="position-relative">
              {/* <div className="parrallax-container">
                <div className="parallax "></div>
              </div> */}
              <ServicesSlider hdr={description} Advertisement={ad} />
              <TreatmentSlider treatment={treatmentlist} />
            </div>
          </div>
          <BookAppointment bookyourappointment={bap} />
          <ServiceAd Advertisement={ad2} />
          <QuoteSlider testimonials={testimonials} />
          <RelatedBlogs relatedblogs={relatedblogs} />
        </>
      ) : status === "failed" ? (
        <Errorpage />
      ) : (
        <LoadingOverlay />
      )}
    </div>
  );
}

export default Face;
