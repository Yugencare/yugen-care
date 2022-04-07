import { decode } from "html-entities";
import React from "react";
import { useParams } from "react-router-dom";

decode("&lt; &gt; &quot; &apos; &amp; &#169; &#8710;");

function ServicesSlider(props) {
  return (
    <div className="ServicesSlider content-block1 position-relative">
      <div className="smile-text">
        <div className="container">
          <div className="row justify-content-center">
            <div
              style={{ textAlign: "center" }}
              data-aos="fade"
              data-aos-delay="0"
              data-aos-duration="2000"
              className="col-lg-8 mb-3 mb-md-5"
            >
              <h1 style={{ textAlign: "center" }}>{props.hdr.hdr1}</h1>
            </div>
          </div>
          <div
            data-aos="fade"
            data-aos-delay="0"
            data-aos-duration="2000"
            className="row"
          >
            <div className="col-lg-6 mb-3 mb-md-5">
              <p
                dangerouslySetInnerHTML={{
                  __html: `${decode(props.hdr.subh1)}`,
                }}
              ></p>
            </div>
            <div className="col-lg-6 mb-5">
              <p
                dangerouslySetInnerHTML={{
                  __html: `${decode(props.hdr.subh2)}`,
                }}
              ></p>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="row">
            <img
              data-aos="fade"
              data-aos-delay="0"
              data-aos-duration="1000"
              className="serviceslider-img"
              src={props.Advertisement.url}
              alt=""
            />
            {/* {props.services.map((service, idx) =>
              service.images ? (
                <div
                  data-aos="fade"
                  data-aos-delay={(idx * 150) % 450}
                  data-aos-duration="1500"
                  className="col-md-4 pl-0"
                  key={service.label + idx}
                >
                  <Link
                    key={service.label + idx}
                    to={
                      "/services/" +
                      params.slug +
                      "/" +
                      service.label
                        .toLocaleLowerCase()
                        .replace("&", "and")
                        .replace(" ", "-")
                        .replace(" ", "-")
                        .split("")
                        .join("")
                    }
                  >
                    <figure className="snip1295">
                      <div className="overflow-hidden">
                        <img src={service.images[0]?.url} alt={service.label} />
                      </div>
                      <div className="border one">
                        <div></div>
                      </div>
                      <div className="border two">
                        <div></div>
                      </div>
                      <div className="slider_servicebtn">
                        <p> {service.label} </p>
                      </div>
                    </figure>
                  </Link>
                </div>
              ) : null
            )} */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ServicesSlider;
