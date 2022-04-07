import { Collapse, Fade, Paper, Slide } from "@material-ui/core";
import { AddCircle, RemoveCircle } from "@material-ui/icons";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function Questions({ faq }) {
  const [value, setValue] = useState(null);
  const { page } = useSelector((state) => state.homepage);
  const { lang } = useSelector((state) => state.lang);

  const handleCollapse = (num) => {
    if (num === value) {
      setValue(null);
    } else {
      setValue(num);
    }
  };

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
            <h2 className=" mb-4">{faq.title}</h2>
            {faq?.questions?.map((q, idx) => (
              <div key={q.id} className="mb-3 questionsholder">
                <div
                  className="d-flex align-items-center"
                  onClick={() => handleCollapse(idx)}
                >
                  {value === idx ? <RemoveCircle /> : <AddCircle />}
                  <h3 className="pl-3"> {q.heading_text}</h3>
                </div>
                <Collapse in={value === idx} timeout={1000}>
                  <div className="mt-4">
                    <Slide direction="right" in={value === idx} timeout={1000}>
                      <div>
                        <Fade in={value === idx} timeout={2000}>
                          <p>{q.description_text}</p>
                        </Fade>
                      </div>
                    </Slide>
                  </div>
                </Collapse>
              </div>
            ))}
          </div>
          <div className="col-sm-12 col-md-5">
            <Paper
              data-aos="fade"
              data-aos-delay="0"
              data-aos-duration="1500"
              elevation={0}
            >
              <h2 className="mb-4">{faq?.related_title}</h2>
              <p className="mb-4">{faq?.related_text}</p>
              <a href={page.page_fields?.faq?.cta_url} className="btn1">
                {faq?.cta}
              </a>
            </Paper>
          </div>
        </div>
      </div>
    </div>
  );
}
