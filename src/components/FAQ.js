import { Collapse } from "@material-ui/core";
import React, { useState } from "react";
import { Divider } from "@material-ui/core";

export default function FAQ({ faq }) {
  const [isOpen, setisOpen] = useState([
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
  ]);
  const handleFaq = (index) => {
    setisOpen((prevOpen) =>
      prevOpen.map((item, idx) =>
        idx === index ? !isOpen[idx] : (isOpen[idx] = false)
      )
    );
  };
  const htmlDecode = (content) => {
    let e = document.createElement("div");
    e.innerHTML = content;
    return e.childNodes.length === 0 ? "" : e.childNodes[0].nodeValue;
  };
  return faq?.questions?.length !== 0 &&
    faq?.questions?.length !== undefined ? (
    <div className="FAQ content-block2  position-relative">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-11">
            <h2>Frequently Asked Questions</h2>
            {faq?.questions?.map((faq, idx) => (
              <>
                <p onClick={() => handleFaq(idx)}>{faq.heading_text}</p>
                <Collapse in={isOpen[idx]} timeout="auto">
                  <span>
                    <p
                      style={{ whiteSpace: "pre-wrap" }}
                      dangerouslySetInnerHTML={{
                        __html: htmlDecode(faq.description_text),
                      }}
                    ></p>
                  </span>
                </Collapse>
                <Divider style={{ backgroundColor: "#b7b7b7" }} />
              </>
            ))}
          </div>
        </div>
      </div>
    </div>
  ) : null;
}
