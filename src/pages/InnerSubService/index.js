import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getTreatmentpage } from "../../app/treatmentpage";
import BeforeAfter from "../../components/BeforeAfter";
import LoadingOverlay from "../../components/LoadingOverlay";
import QuoteSlider from "../../components/QuoteSlider";
import ServiceIntro from "../../components/ServiceIntro";
//images imports
import HeroBG from "../../images/HeaderBG.png";
import Errorpage from "../../layout/Errorpage";
import PageServicesHeader from "../../layout/PageServicesHeader";
import About from "./About";
import QuickFacts from "./QuickFacts";

function InnerSubService() {
  const dispatch = useDispatch();
  const { page } = useSelector((state) => state.treatment);
  const { status } = useSelector((state) => state.treatment);
  const mstatus = useSelector((state) => state.getmenu.status);
  const params = useParams();
  useEffect(() => {
    console.log(params);
    ////Passing page ID reference
    dispatch(getTreatmentpage({ id: params.slug }));
  }, [dispatch]);

  var pageHeader = {};
  var intro = {};
  var about = {};
  var quickFacts = [];
  var testimonials = [];
  var casestudies = {};

  var helmet_meta = {};
  var schemaJSON = "";
  var properties = [];
  if (status === "success") {
    console.log(page);
    pageHeader = page.page_fields.heading;
    intro = page.page_fields.intro?.intros;
    about = page.page_fields.description;
    quickFacts = page.page_fields.quickfacts;
    casestudies = page.page_fields.beforeafter;
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
    <div className="InnerSubService position-relative">
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
          <div className="serviceHeaderBG">
            <img className="sBG img-fluid" src={`${HeroBG}`} alt="" />
            <PageServicesHeader
              pageHeader={pageHeader}
              isTreatmentPage={true}
            />
            <ServiceIntro intros={intro} />
            <About pagename={about} />
          </div>
          <QuickFacts quickFacts={quickFacts} />
          <BeforeAfter casestudies={casestudies} />
          <div style={{ marginTop: 150 }}>
            <QuoteSlider testimonials={testimonials} />
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

export default InnerSubService;
