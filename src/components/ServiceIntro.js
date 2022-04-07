import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getServiceIntro } from "../app/ServiceIntro/serviceintro";
import { decode } from "html-entities";

function ServiceIntro(props) {
  const dispatch = useDispatch();
  const { serviceIntro } = useSelector((state) => state.serviceIntro);
  const { status } = useSelector((state) => state.serviceIntro);
  useEffect(() => {
    if (status !== "success") {
      dispatch(getServiceIntro());
    }
    console.log(serviceIntro);
  }, [dispatch]);

  return serviceIntro.length === 0 ? null : (
    <div className="ServiceIntro content-block1 position-relative">
      <div className="container">
        <div className="row justify-content-between ">
          {serviceIntro?.map((introtext, idx) => (
            <div
              key={introtext.id}
              data-aos="fade"
              data-aos-delay={(idx * 150) % 450}
              data-aos-duration="800"
              className="divider-intro col-lg-3 mb-4 mb-md-0"
              style={{ paddingLeft: "50px", paddingRight: "50px" }}
            >
              <div className="introInner">
                <span>{introtext.name}</span>
                <p
                  style={{ whiteSpace: "pre-wrap" }}
                  dangerouslySetInnerHTML={{
                    __html: `${decode(introtext.description)}`,
                  }}
                ></p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ServiceIntro;
