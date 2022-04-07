import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { getJourney } from "../../app/journeypage";
import LoadingOverlay from "../../components/LoadingOverlay";
import Errorpage from "../../layout/Errorpage";
import PageHeader from "../../layout/PageHeader";
import Journeyheading from "./Journeyheading";
import HowItWorks from "./HowItWorks";
import Questions from "./Questions";
import { Helmet } from "react-helmet";
import Phone from "../../images/phone.png";
import WhatsApp from "../../images/whatsapp.png";

export default function Journey() {
  const dispatch = useDispatch();
  const { page } = useSelector((state) => state.journey);
  const { status } = useSelector((state) => state.journey);
  const { lang } = useSelector((state) => state.lang);
  const mstatus = useSelector((state) => state.getmenu.status);
  const location = useLocation();

  useEffect(() => {
    ////Passing page ID reference
    console.log(location.pathname.split("/")[1]);
    if (status !== "success") {
      dispatch(getJourney({ id: location.pathname.split("/")[1] }));
    }
    if (status === "success" && location.state === "tofaq") {
      ScrollToFAQs();
    }
    if (status === "success" && location.state?.state === "tofaq") {
      ScrollToFAQs();
    }
  }, [dispatch, status]);

  var header = "";
  var experience = null;
  var faq = null;
  var socials;
  var helmet_meta = {};
  var schemaJSON = "";
  var properties = [];

  if (status === "success") {
    console.log(page);
    header = page.page_fields.header;
    experience =
      lang === "en"
        ? page.page_fields.experience
        : page.page_fields.ar_experience;
    faq = lang === "en" ? page.page_fields.faq : page.page_fields.ar_faq;
    socials = page.page_fields.socials;
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
  console.log(location);
  const ScrollToFAQs = () => {
    console.log("tofaq");
    const anchor = document.querySelector("#go-to-faq");
    if (anchor) {
      anchor.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };
  return (
    <div className="Journey content-block1 position-relative">
      {status === "success" && mstatus === "success" ? (
        <>
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
          <PageHeader
            pagename={
              lang === "en"
                ? header.heading
                : page.page_fields.ar_header.heading
            }
            header={header}
          />
          <div className="position-relative">
            {/* <div className="parrallax-container ">
              <div className="parallax"></div>
            </div> */}
            <Journeyheading heading={experience?.title} />
            <HowItWorks experience={experience} />
          </div>
          <Questions faq={faq} socials={socials} />
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
        <>
          <LoadingOverlay />
        </>
      )}
    </div>
  );
}
