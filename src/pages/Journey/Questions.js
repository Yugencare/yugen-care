import { AddCircle, LinkedIn, RemoveCircle, YouTube } from "@material-ui/icons";
import { Collapse, Fade, Paper, Slide } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import Facebook from "@material-ui/icons/Facebook";
import Instagram from "@material-ui/icons/Instagram";
import Twitter from "@material-ui/icons/Twitter";
import Snapchat from "../../svgs/snapchat1.svg";
import { useSelector } from "react-redux";
import { useLocation } from "react-router";

export default function Questions({ faq, socials }) {
  const [value, setValue] = useState(null);
  const location = useLocation();
  useEffect(() => {
    if (location.state?.state === "tofaq") {
      setValue(location.state.value);
    }
  }, []);

  const handleCollapse = (num) => {
    if (num === value) {
      setValue(null);
    } else {
      setValue(num);
    }
  };
  const processSocials = (link) => {
    if (link?.includes("https")) {
      return link;
    } else {
      return "https://" + link;
    }
  };
  const { lang } = useSelector((state) => state.lang);
  return (
    <div className="Questions content-block1 position-relative" id="go-to-faq">
      <div className="container">
        <div className="row justify-content-between">
          <div
            data-aos="fade"
            data-aos-delay="0"
            data-aos-duration="1500"
            className="col-md-6 questions-container"
            id="style-3"
          >
            <h2 className=" mb-4">{faq.got_a_question}</h2>
            {faq?.questions?.map(
              (q, idx) =>
                q.heading_text.length !== 0 && (
                  <div key={q.heading_text} className="mb-3 questionsholder">
                    <div
                      className="d-flex align-items-center"
                      onClick={() => handleCollapse(idx)}
                    >
                      {value === idx ? <RemoveCircle /> : <AddCircle />}
                      <h3 className="pl-3"> {q.heading_text}</h3>
                    </div>
                    <Collapse in={value === idx} timeout={1000}>
                      <div className="mt-4">
                        <Slide
                          direction={lang === "en" ? "right" : "left"}
                          in={value === idx}
                          timeout={1000}
                        >
                          <div>
                            <Fade in={value === idx} timeout={2000}>
                              <p>{q.description_text}</p>
                            </Fade>
                          </div>
                        </Slide>
                      </div>
                    </Collapse>
                  </div>
                )
            )}
          </div>
          <div className="col-sm-12 col-md-5">
            <Paper
              data-aos="fade"
              data-aos-delay="0"
              data-aos-duration="1500"
              elevation={0}
            >
              <h2 className="mb-4">{faq?.get_in_touch}</h2>
              <p className="mb-4">{faq?.info}</p>
              <div className="faq-info">
                <p>{faq?.email}</p>
                <p>{faq?.tele}</p>
              </div>
              <div className="d-flex mt-3">
                {socials && socials.facebook && (
                  <a href={processSocials(socials.facebook)} className="mr-3">
                    <Facebook />
                  </a>
                )}
                {socials && socials.instagram && (
                  <a href={processSocials(socials.instagram)} className="mr-3">
                    <Instagram />
                  </a>
                )}
                {socials && socials.twitter && (
                  <a href={processSocials(socials.twitter)} className="mr-3">
                    <Twitter />
                  </a>
                )}
                {socials && socials.linkedin && (
                  <a href={processSocials(socials.linkedin)} className="mr-3">
                    <LinkedIn />
                  </a>
                )}
                {socials && socials.youtube && (
                  <a href={processSocials(socials.youtube)} className="mr-3">
                    <YouTube />
                  </a>
                )}
                {socials && socials.snapchat && (
                  <a href={processSocials(socials.snapchat)} className="mr-3">
                    <img
                      classname="snapchat"
                      src={Snapchat}
                      alt={socials.snapchat}
                    />
                  </a>
                )}
              </div>
            </Paper>
          </div>
        </div>
      </div>
    </div>
  );
}
