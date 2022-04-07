import { Divider } from "@material-ui/core";
import { decode } from "html-entities";
import React from "react";
import { useSelector } from "react-redux";

function Description({ doctor }) {
  const { lang } = useSelector((state) => state.lang);
  return (
    <div className="Description content-block1">
      <div className="container">
        <div className="row" style={{ marginBottom: 100 }}>
          <div className="col-md-12">
            <p
              data-aos="fade"
              data-aos-delay="0"
              data-aos-duration="1000"
              style={{ whiteSpace: "pre-wrap" }}
              dangerouslySetInnerHTML={{
                __html: `${decode(
                  lang === "en"
                    ? doctor.description_text2
                    : doctor.description_text2_ar
                )}`,
              }}
            ></p>
            <p></p>
          </div>
        </div>
        <Divider />
      </div>
    </div>
  );
}
export default Description;
