import React, { useEffect, useState } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import Instagram from "@material-ui/icons/Instagram";
import Facebook from "@material-ui/icons/Facebook";
import Twitter from "@material-ui/icons/Twitter";
import { useDispatch, useSelector } from "react-redux";
import { getFooter } from "../app/footer";
import HomeVideo from "../components/Homevideo";
import BookCTA from "../components/Bookcta";
import { decode } from "html-entities";
import { LinkedIn, YouTube } from "@material-ui/icons";
import Snapchat from "../svgs/snapchat.svg";
import TT from "../svgs/TT.svg";
import RG from "../svgs/RG.svg";
import GS from "../svgs/GS.svg";
import PC from "../svgs/PC.svg";
import WA from "../svgs/WA.svg";
import axios from "axios";
import { Alert } from "@material-ui/lab";
import { CircularProgress } from "@material-ui/core";

function Footer() {
  const dispatch = useDispatch();
  const { menu } = useSelector((state) => state.footer);
  const { status } = useSelector((state) => state.footer);
  const { lang } = useSelector((state) => state.lang);
  const [Data, setData] = useState(null);
  const [subbed, setSubbed] = useState(false);
  const [Questions, setQuestions] = useState(null);
  const [Pillars, setPillars] = useState(null);

  const location = useLocation();

  useEffect(() => {
    if (status !== "success") {
      dispatch(getFooter());
    }
    // dispatch(InitScroll());
  }, [dispatch]);
  const getPillars = async () => {
    const response = await axios.get(
      `https://server.yugencare.com/api/v1/menus/a95c50c0-6937-11ec-b089-1d7d0e528c74/`
    );
    const data = await response.data.menus?.pages;
    console.log(data);
    setPillars(data);
  };
  const getFAQs = async () => {
    const response = await axios.get(
      `https://server.yugencare.com/api/v1/pages/faqs/`
    );
    const data = await response.data.FAQs;
    setData(data);
  };

  const SubscribeEmail = async (e) => {
    setSubbed("loading");
    e.preventDefault();
    const email = document.getElementById("email_subscriber")?.value;

    const post = {
      email: email,
      tags: ["newsletter"],
    };
    const response = await axios.post(
      "https://server.yugencare.com/api/v1/emails/subscribe",
      post
    );
    setSubbed("success");
  };

  useEffect(() => {
    getFAQs();
    getPillars();
  }, []);
  useEffect(() => {
    if (lang === "en") {
      setQuestions(Data?.faq);
    } else {
      setQuestions(Data?.ar_faq);
    }
  }, [lang, Data]);

  var description;
  var pages;
  var bookingCTA;
  var contactInfo;
  var video;
  var socials;
  var copyrights;
  if (status === "success") {
    description = lang === "en" ? menu.description : menu.description_ar;
    pages = menu.pages;
    if (lang === "en") {
      bookingCTA = {
        heading: menu.booking_heading_text ? menu.booking_heading_text : "",
        description: menu.booking_description_text
          ? menu.booking_description_text
          : "",
      };
      contactInfo = {
        heading: menu.contactus_heading_text ? menu.contactus_heading_text : "",
        description: menu.contactus_description_text
          ? menu.contactus_description_text
          : "",
      };
    } else {
      bookingCTA = {
        heading: menu.booking_heading_text_ar
          ? menu.booking_heading_text_ar
          : "",
        description: menu.booking_description_text_ar
          ? menu.booking_description_text_ar
          : "",
      };
      contactInfo = {
        heading: menu.contactus_heading_text_ar
          ? menu.contactus_heading_text_ar
          : "",
        description: menu.contactus_description_text_ar
          ? menu.contactus_description_text_ar
          : "",
      };
    }

    video = {
      video_image:
        menu.video &&
        menu.video.video_url &&
        menu.video.video_url.length !== 0 &&
        menu.video.video_url[0].url,
      video_url: menu.video_url ? menu.video_url : "",
    };
    socials = menu.social;
    copyrights = lang === "en" ? menu.copyrights : menu.copyrights;
  }

  const ScrollToFAQs = () => {
    const anchor = document.querySelector("#go-to-faq");
    if (anchor) {
      anchor.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };
  const processSocials = (link) => {
    if (link?.includes("https")) {
      return link;
    } else {
      return "https://" + link;
    }
  };
  function FAQs() {
    return (
      <>
        <div className="col-xl-5 col-md-5 col-sm-5 mt-4">
          <h3>{lang === "en" ? "HAVE ANY QUESTIONS?" : "لديك أي أسئلة؟"} </h3>

          <ul className={`list-inline ${lang === "en" ? "ml-3" : "mr-3"}`}>
            {Questions?.map((faq, i) => (
              <li key={faq.heading_text}>
                <Link
                  onClick={ScrollToFAQs}
                  to={{
                    pathname: "/yugen-pathway",
                    state: { state: "tofaq", value: i },
                  }}
                >
                  {faq.heading_text}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="footer-fix col-xl-5 col-md-5 col-sm-5 mt-4">
          <h3>{lang === "en" ? "Start Your Journey" : "التخصصات"} </h3>
          <ul className={`list-inline ${lang === "en" ? "ml-3" : "mr-3"}`}>
            {Pillars?.map((page, idx) => (
              <li key={page.id}>
                <Link key={page.id} to={`/7-pillars/${page.slug}`}>
                  {lang === "en"
                    ? page.label
                        ?.toLowerCase()
                        .replace("yugen", "")
                        .toUpperCase()
                    : page.level}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </>
    );
  }

  return (
    location.pathname !== "/login" &&
    location.pathname !== "/book" &&
    location.pathname !== "/profile" && (
      <>
        {location.pathname !== "/wellness-land" &&
          location.pathname !== "/careers" &&
          location.pathname !== "/order-completed" &&
          location.pathname !== "/thank-you" && (
            <BookCTA bookingCTA={bookingCTA} pathname={location.pathname} />
          )}
        {location.pathname === "/careers" && <div className="my-5"></div>}
        <HomeVideo video={video} />
        <div className="Footer content-block1 position-relative">
          {status === "success" ? (
            <div className="container">
              <div className="row justify-content-between">
                <div className="col-xl-8 col-lg-8 col-sm-12">
                  <div className="row">
                    {location.pathname !== "/philosophy" &&
                    location.pathname !== "/research" ? (
                      <>
                        <div className="col-xl-4 col-md-4 col-sm-4 mt-4">
                          <h3>{lang === "en" ? "About Us" : "من نحن"} </h3>
                          <p>{description}</p>
                        </div>
                        <div className="footer-fix col-xl-4 col-md-4 col-sm-4 mt-4">
                          <h3>
                            {lang === "en" ? "Quick Links" : "روابط سريعة"}{" "}
                          </h3>
                          <ul className="list-inline">
                            {pages?.slice(0, 4).map((page, idx) => (
                              <li key={page.id}>
                                <Link key={page.id} to={`/${page.slug}`}>
                                  {lang === "en" ? page.label : page.level}
                                </Link>
                              </li>
                            ))}
                            <li>
                              <Link
                                onClick={ScrollToFAQs}
                                to={{
                                  pathname: "/yugen-pathway",
                                  state: "tofaq",
                                }}
                              >
                                {lang === "en" ? "FAQ's" : "الأسئلة المتكررة"}
                              </Link>
                            </li>
                            {/* <li>
                                        <Link to={`/shop/browse`}>Gift Cards</Link>
                                      </li> */}
                            {pages?.slice(4).map((page, idx) => (
                              <li key={page.id}>
                                <Link key={page.id} to={`/${page.slug}`}>
                                  {lang === "en" ? page.label : page.level}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div className=" col-xl-4 col-md-4 col-sm-4 mt-4">
                          <h3>{contactInfo && contactInfo.heading}</h3>
                          <p
                            style={{ whiteSpace: "pre-wrap" }}
                            dangerouslySetInnerHTML={{
                              __html: `${decode(contactInfo.description)}`,
                            }}
                          ></p>
                        </div>{" "}
                      </>
                    ) : (
                      FAQs()
                    )}
                  </div>
                </div>
                <div className="col-xl-4 col-lg-4 col-md-8 col-sm-12 mt-4 mt-lg-0 mt-4">
                  <div className="newsletterbox mt-4">
                    <p>
                      {lang === "en"
                        ? "Subscribe to our newsletter and be the first to get the latest insights straight to your inbox!"
                        : "اشترك في النشرة الإخبارية لدينا لتبقى على اطلاع دائم مع آخر الأخبار والخدمات والمهنيين."}
                    </p>
                    <form onSubmit={SubscribeEmail}>
                      <input
                        required
                        type="email"
                        id="email_subscriber"
                        placeholder={
                          lang === "en"
                            ? "Email Address"
                            : "عنوان البريد الإلكتروني"
                        }
                      ></input>
                      {subbed === "loading" ? (
                        <CircularProgress />
                      ) : (
                        <input type="submit" value=""></input>
                      )}
                    </form>
                  </div>
                  {subbed === "success" && (
                    <Alert className="mt-3" severity="success">
                      {lang === "en" ? (
                        <p>
                          Thank you, your subscription has been confirmed!
                          You've been added to our list and will hear from us
                          soon.
                        </p>
                      ) : (
                        <p>شكرا لك ، تم تأكيد اشتراكك!</p>
                      )}
                    </Alert>
                  )}
                  <span className="copyright">{copyrights}</span>
                </div>
              </div>
              <div className="row mt-2">
                <div className="col-xl-5 col-lg-5  mt-4">
                  {socials && socials.facebook && (
                    <a href={processSocials(socials.facebook)} className="mr-3">
                      <Facebook style={{ color: "#bdbdbd", marginRight: 5 }} />
                    </a>
                  )}
                  {socials && socials.instagram && (
                    <a
                      href={processSocials(socials.instagram)}
                      className="mr-3"
                    >
                      <Instagram style={{ color: "#bdbdbd", marginRight: 5 }} />
                    </a>
                  )}
                  {socials && socials.twitter && (
                    <a href={processSocials(socials.twitter)} className="mr-3">
                      <Twitter style={{ color: "#bdbdbd", marginRight: 5 }} />
                    </a>
                  )}
                  {socials && socials.lnkedin && (
                    <a href={processSocials(socials.lnkedin)} className="mr-3">
                      <LinkedIn style={{ color: "#bdbdbd", marginRight: 5 }} />
                    </a>
                  )}
                  {socials && socials.youtube && (
                    <a href={processSocials(socials.youtube)} className="mr-3">
                      <YouTube style={{ color: "#bdbdbd", marginRight: 5 }} />
                    </a>
                  )}
                  {socials && socials.snapchat && (
                    <a href={processSocials(socials.snapchat)} className="mr-3">
                      <img
                        className="snapchat"
                        src={Snapchat}
                        alt={socials.snapchat}
                        style={{ marginRight: 5 }}
                      />
                    </a>
                  )}
                  {socials && socials.wa && (
                    <a href={processSocials(socials.wa)} className="mr-3">
                      <img
                        className="snapchat"
                        src={WA}
                        alt={socials.wa}
                        style={{ marginRight: 5 }}
                      />
                    </a>
                  )}
                  {socials && socials.tt && (
                    <a href={processSocials(socials.tt)} className="mr-3">
                      <img
                        className="snapchat"
                        src={TT}
                        alt={socials.tt}
                        style={{ marginRight: 5 }}
                      />
                    </a>
                  )}
                  {socials && socials.gs && (
                    <a href={processSocials(socials.gs)} className="mr-3">
                      <img
                        className="snapchat"
                        src={GS}
                        alt={socials.gs}
                        style={{ marginRight: 5 }}
                      />
                    </a>
                  )}
                  {socials && socials.rc && (
                    <a href={processSocials(socials.rc)} className="mr-3">
                      <img
                        className="snapchat"
                        src={RG}
                        alt={socials.rc}
                        style={{ marginRight: 5 }}
                      />
                    </a>
                  )}
                  {socials && socials.pc && (
                    <a href={processSocials(socials.pc)} className="mr-3">
                      <img
                        className="snapchat"
                        src={PC}
                        alt={socials.pc}
                        style={{ marginRight: 5 }}
                      />
                    </a>
                  )}
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </>
    )
  );
}
export default Footer;
