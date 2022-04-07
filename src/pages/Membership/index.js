import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { getMembershipPage } from "../../app/membership";

import LoadingOverlay from "../../components/LoadingOverlay";
import Errorpage from "../../layout/Errorpage";
import PageHeader from "../../layout/PageHeader";
import Questions from "../Journey/Questions";
import MembershipIntro from "./MembershipIntro";
import Rewards from "./Rewards";
import WaysToEarn from "./WaysToEarn";
import BookCTA from "./Bookcta";
import { Helmet } from "react-helmet";

import Phone from "../../images/phone.png";
import WhatsApp from "../../images/whatsapp.png";

export default function Membership() {
  const dispatch = useDispatch();
  const { page } = useSelector((state) => state.membership);
  const { status } = useSelector((state) => state.membership);
  const mstatus = useSelector((state) => state.getmenu.status);
  const { lang } = useSelector((state) => state.lang);
  const location = useLocation();
  useEffect(() => {
    ////Passing page ID reference
    console.log(location.pathname.split("/")[1]);
    if (status !== "success") {
      dispatch(getMembershipPage({ id: location.pathname.split("/")[1] }));
    }
  }, [dispatch]);

  var header = "";
  var membership_intro = null;
  var grey_box = null;
  var steps = null;
  var faq = null;
  var bookcta;

  var helmet_meta = {};
  var schemaJSON = "";
  var properties = [];

  if (status === "success") {
    console.log(page);
    header = page.page_fields.header;
    membership_intro =
      lang === "en"
        ? page.page_fields.membership_intro
        : page.page_fields.ar_membership_intro;
    grey_box =
      lang === "en" ? page.page_fields.grey_box : page.page_fields.ar_grey_box;
    steps = {
      title:
        lang === "en"
          ? page.page_fields.steps.title
          : page.page_fields.ar_steps.title,
      ways_to_earn: [],
    };
    for (
      let index = 0;
      index < page.page_fields.steps.ways_to_earn.length;
      index++
    ) {
      if (lang === "en") {
        steps.ways_to_earn.push({
          class: page.page_fields.steps.ways_to_earn[index].class,
          title: page.page_fields.steps.ways_to_earn[index].title,
          url: page.page_fields.steps.ways_to_earn[index].url,
          images: page.page_fields.steps.ways_to_earn[index].images,
        });
      } else {
        steps.ways_to_earn.push({
          class: page.page_fields.ar_steps.ways_to_earn[index].class,
          title: page.page_fields.ar_steps.ways_to_earn[index].title,
          url: page.page_fields.ar_steps.ways_to_earn[index].url,
          images: page.page_fields.steps.ways_to_earn[index].images,
        });
      }
    }

    faq = lang === "en" ? page.page_fields.faq : page.page_fields.ar_faq;
    bookcta = {
      heading:
        lang === "en"
          ? page.page_fields.cta?.sign_up
          : page.page_fields.ar_cta?.sign_up,
      description:
        lang === "en"
          ? page.page_fields.cta?.description
          : page.page_fields.ar_cta?.description,
    };
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
    <div className="Membership">
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
          {/* {window.scrollTo(0, 0)}*/}
          <PageHeader
            pagename={
              lang === "en"
                ? header.heading
                : page.page_fields.ar_header.heading
            }
            header={header}
          />
          <MembershipIntro
            membership_intro={membership_intro}
            grey_box={grey_box}
          />
          <WaysToEarn steps={steps} />
          <BookCTA bookingCTA={bookcta} />
          <Rewards />
          <Questions faq={faq} />
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
