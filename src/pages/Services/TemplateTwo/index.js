import React from "react";
import { Helmet } from "react-helmet";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import About from "../../../components/About";
import AllTreatment from "../../../components/AllTreatment";
import BookAppointment from "../../../components/BookAppointment";
import LoadingOverlay from "../../../components/LoadingOverlay";
import QuoteSlider from "../../../components/QuoteSlider";
import RelatedBlogs from "../../../components/RelatedBlogs";
import ServiceAd from "../../../components/ServiceAd";
import ServiceIntro from "../../../components/ServiceIntro";
import TreatmentSlider from "../../../components/TreatmentSlider";
// Image imports
import HeroBG from "../../../images/HeaderBG.png";
import Errorpage from "../../../layout/Errorpage";
import PageServicesHeader from "../../../layout/PageServicesHeader";

function Dental() {
  const { page } = useSelector((state) => state.servicepage);
  const { status } = useSelector((state) => state.servicepage);
  const mstatus = useSelector((state) => state.getmenu.status);

  const params = useParams();
  ////fetching data from the API
  var pageHeader = {};

  var description = {};
  var treatmentlist = [];
  var book_your_appointment = {};
  var ad = {};
  var exploretreatment = {};
  var testimonials = [];
  var relatedblogs = {};
  var helmet_meta = {};
  var schemaJSON = "";
  var properties = [];
  if (status === "success" && params.slug === page?.slug) {
    console.log(page);
    try {
      pageHeader = page.page_fields.header;
      description = page.page_fields.description;
      treatmentlist = page.page_fields.treatmentlist.services;
      book_your_appointment = page.page_fields.book_your_appointment;
      ad = page.page_fields.ad.ad ? page.page_fields.ad.ad[0] : null;
      exploretreatment = page.page_fields.exploretreatment;
      // testimonials = page.page_fields.testimonials?.testimonials;
      relatedblogs = page.page_fields.relatedblogs.blogs;
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
    <div className="Dental position-relative">
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
          </Helmet>
          <div className="serviceHeaderBG">
            <img className="sBG img-fluid" src={`${HeroBG}`} alt="" />
            <PageServicesHeader pageHeader={pageHeader} />
            <div className="position-relative">
              {/* <div className="parrallax-container ">
                <div className="parallax "></div>
              </div> */}
              <ServiceIntro />
              <About about={description} />
              <div className="container my-5">
                <ServiceAd Advertisement={ad} />
              </div>
              <TreatmentSlider treatment={treatmentlist} />
            </div>
          </div>
          <BookAppointment bookyourappointment={book_your_appointment} />
          <AllTreatment bookTreatment={exploretreatment} />
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

export default Dental;
