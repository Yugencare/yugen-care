import React, { useEffect } from "react";
import Helmet from "react-helmet";
import { useDispatch, useSelector } from "react-redux";
import { getHome, getHomepage } from "../../app/homepage";
import BeforeAfter from "../../components/BeforeAfter";
import HomeVideo from "../../components/Homevideo";
import LoadingOverlay from "../../components/LoadingOverlay";
import GradientBar from "../Home/GradientBar";
import HomeInstagram from "../Home/Homeinstagram";
import Hero from "./Hero";
import HomeProduct from "./HomeProducts";
import OurDoctors from "./OurDoctors";
import Questions from "./Questions";
import RelatedBlogs from "./Relatedblogs";
import SectionOne from "./SectionOne";
import SectionTwo from "./SectionTwo";
import Steps from "./Steps";

export default function Homepage() {
  const dispatch = useDispatch();
  const page = useSelector((state) => state.homepage.promo);
  const status = useSelector((state) => state.homepage.promoStatus);
  const mstatus = useSelector((state) => state.getmenu.status);
  const { lang } = useSelector((state) => state.lang);
  useEffect(() => {
    ////Passing page ID reference
    if (status !== "success") {
      dispatch(getHome());
    }
  }, [dispatch]);
  var heading = {};
  var section_one = {};
  var beforeAfter = {};
  var team_section = {};
  var section_three = {};
  var faq = {};
  var latestblogs = {};
  var video = {};
  var section_two = {};

  var helmet_meta = {};
  var schemaJSON = "";
  var properties = [];
  if (status === "success") {
    console.log(page);
    heading =
      lang === "en" ? page.page_fields.heading : page.page_fields.ar_heading;
    section_one =
      lang === "en"
        ? page.page_fields.section_one
        : page.page_fields.ar_section_one;
    beforeAfter = page.page_fields.before_and_after;
    team_section = page.page_fields.team_section;
    section_three = page.page_fields.section_three;

    faq = lang === "en" ? page.page_fields.faq : page.page_fields.ar_faq;
    latestblogs = page.page_fields.latestblogs;

    video = {
      video_image:
        page.page_fields.home_video &&
        page.page_fields.home_video.background &&
        page.page_fields.home_video.background.length !== 0 &&
        page.page_fields.home_video.background[0].url,
      video_url: page.page_fields.home_video.link
        ? page.page_fields.home_video.link
        : "",
    };
    section_two =
      lang === "en"
        ? page.page_fields.section_two
        : page.page_fields.ar_section_two;

    //HELMET
    //   helmet_meta = page.meta;
    //   console.log(helmet_meta);
    //   properties = page.properties;
    try {
      schemaJSON = page.schema?.map((object) => {
        return JSON.stringify(object);
      });
    } catch (e) {
      console.log("Could Not Parse JSON");
    }
  }
  if (status === "success" && mstatus === "success") {
    document.body.style.overflowY = "scroll";
  } else {
    document.body.style.overflow = "hidden";
  }
  if (status === "success" && mstatus === "success") {
    return (
      <div className="Home promo-page">
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
        <Hero heading={heading} />
        <GradientBar />
        <SectionOne section_one={section_one} />
        <HomeVideo video={video} />
        <SectionTwo section_two={section_two} />
        <BeforeAfter casestudies={beforeAfter} />
        <OurDoctors team_section={team_section} />
        <HomeProduct />
        <Steps section_three={section_three} />
        <Questions faq={faq} />
        <RelatedBlogs latestBlogs={latestblogs} />
        <HomeInstagram />
      </div>
    );
  } else {
    return <LoadingOverlay />;
  }
}
