import { Skeleton } from "@material-ui/lab";
import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { discernPage } from "../../app/discernpage";
import { getHomepage } from "../../app/homepage";
import HeroBGH from "../../images/hero3.jpg";
import Errorpage from "../../layout/Errorpage";
import GradientBar from "./GradientBar";
import Hero from "./Hero";
import HeroNew from "./HeroNew";
import HomeInstagram from "./Homeinstagram";
import HomeProducts from "./Homeproducts";
import HomeServices from "./Homeservices";
import HomeServicesMobile from "./HomeservicesMobile";
import Introtext from "./Introtext";
import HomeBlogs from "./Homeblogs";
import { getAboutpage } from "../../app/aboutpage";
import { getJourney } from "../../app/journeypage";
import { getMembershipPage } from "../../app/membership";
import { getProfessionalpage } from "../../app/professionalpage";
import { getServicesPage } from "../../app/servicespage";
import { getShoppage } from "../../app/shoppage";
import { getContactpage } from "../../app/contactus";
import { getCareerpage } from "../../app/careerpage";
import { getBlogpage } from "../../app/Blogs/blogpage";
import LoadingOverlay from "../../components/LoadingOverlay";

const _ = require("lodash");

function Home() {
  const dispatch = useDispatch();
  const { page } = useSelector((state) => state.homepage);
  const { status } = useSelector((state) => state.homepage);
  const mstatus = useSelector((state) => state.getmenu.status);
  const { lang } = useSelector((state) => state.lang);
  useEffect(() => {
    ////Passing page ID reference
    if (status !== "success") {
      dispatch(getHomepage({ id: discernPage("home") }));
      console.log(page);
    }
  }, [dispatch]);

  const astatus = useSelector((state) => state.aboutpage.status);
  const jstatus = useSelector((state) => state.journey.status);
  const memstatus = useSelector((state) => state.membership.status);
  const pstatus = useSelector((state) => state.professional.status);
  const sstatus = useSelector((state) => state.servicespage.status);
  const shopstatus = useSelector((state) => state.shop.status);
  const cstatus = useSelector((state) => state.contact.status);
  const careerstatus = useSelector((state) => state.career.status);
  const bstatus = useSelector((state) => state.blogpage.status);

  useEffect(() => {
    //Fetching other pages
    if (status === "success") {
      if (astatus !== "success") {
        dispatch(getAboutpage({ id: "philosophy" }));
      }
      if (jstatus !== "success") {
        dispatch(getJourney({ id: "yugen-pathway" }));
      }
      if (memstatus !== "success") {
        dispatch(getMembershipPage({ id: "yugen-membership" }));
      }
      if (pstatus !== "success") {
        dispatch(getProfessionalpage({ id: "professionals" }));
      }
      if (sstatus !== "success") {
        dispatch(getServicesPage({ id: "7-pillars" }));
      }
      if (shopstatus !== "success") {
        dispatch(getShoppage({ id: "wellness-land" }));
      }
      if (cstatus !== "success") {
        dispatch(getContactpage({ id: "contact-us" }));
      }
      if (careerstatus !== "success") {
        dispatch(getCareerpage({ id: "careers" }));
      }
      if (bstatus !== "success") {
        dispatch(getBlogpage({ id: "research" }));
      }
    }
  }, [dispatch, status]);

  var heading = {};
  var intro = {};
  var services = [];
  var latestBlogs = {};
  var featuredProducts = [];
  var accesstoken = [];

  var helmet_meta = {};
  var schemaJSON = "";
  var properties = [];
  var headline1;
  var headline2;
  if (status === "success") {
    console.log(page);
    heading = page.page_fields.heading;
    intro = page.page_fields.intro;
    services = page.page_fields.services?.services;
    latestBlogs = page.page_fields.latestblogs?.blogs;
    headline1 =
      lang === "en"
        ? page.page_fields.services?.headline
        : page.page_fields.ar_services?.headline;
    headline2 =
      lang === "en"
        ? page.page_fields.latestblogs?.headline
        : page.page_fields.ar_latestblogs?.headline;
    // featuredProducts = page.page_fields.featuredProducts;
    accesstoken = page.page_fields.accesstoken;

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
  if (status === "success" && mstatus === "success") {
    document.body.style.overflowY = "scroll";
  } else {
    document.body.style.overflow = "hidden";
  }

  return (
    <div className="Home">
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
            {/* <!-- Google Tag Manager --> */}
            <script>{`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-WWFHGPR');`}</script>
            {/* <!-- End Google Tag Manager --> */}
          </Helmet>

          {/* <Hero heading={heading} /> */}
          <HeroNew lang={lang} services={services} headline={headline1} />
          <GradientBar />
          <div className="position-relative">
            {/* <div className="parrallax-container">
              <div className="parallax"></div>
            </div> */}
            <Introtext intro={intro} />
            {/* <HomeServices
              lang={lang}
              services={services}
              headline={headline1}
            /> */}
            {/* <HomeServicesMobile
              lang={lang}
              services={services}
              headline={headline2}
            /> */}
            <HomeBlogs latestBlogs={latestBlogs} headline={headline2} />
            <HomeProducts />
            <HomeInstagram accesstoken={accesstoken} />
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

export default Home;

function HeroSkeletion() {
  return (
    <div
      className="hero position-relative"
      style={{
        backgroundImage: `url(${HeroBGH})`,
        backgroundSize: `cover`,
        backgroundRepeat: `no-repeat`,
      }}
    >
      <div className="container-fluid h-100">
        <div className="row align-items-center h-100">
          <div className="col-xl-6 col-md-6 col-sm-8 hero-content">
            <div className="hero_text hero_texttt">
              <h1>
                <Skeleton animation="wave" />
              </h1>
              <p className="mb-0">
                <span className="byname">
                  <i>
                    <Skeleton animation="wave" />
                  </i>
                  <Skeleton animation="wave" />
                </span>
              </p>
              <p className="mb-0">
                <Link>
                  <Skeleton animation="wave" />
                </Link>
              </p>
            </div>
          </div>
          <div className="col-xl-6 col-md-6 hero-person"></div>
        </div>
      </div>
    </div>
  );
}
