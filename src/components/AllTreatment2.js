import React, { useState } from "react";
import { ListItem } from "@material-ui/core";
import TabList from "./TabList";

function AllTreatment({ treatments, services }) {
  const [ListIndex, setListIndex] = useState(0);
  const [Active, setActive] = useState([
    true,
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

  const HandleChange = (idx) => {
    setListIndex(idx);
    setActive((prevState) =>
      prevState.map((item, index) =>
        index === idx ? !Active[index] : (Active[index] = false)
      )
    );
  };

  return (
    <div className="AllTreatment position-relative">
      <div className="container">
        <div className="row justify-content-between">
          <div className="col-xl-4 mt-4">
            <h1
              data-aos="fade-right"
              data-aos-delay="0"
              data-aos-duration="2000"
            >
              {treatments.heading}
            </h1>
            <p
              className="mt-4"
              data-aos="fade"
              data-aos-delay="500"
              data-aos-duration="1500"
            >
              {treatments.subtext}
            </p>
          </div>
          <div className="col-xl-7" style={{ padding: 0 }}>
            <div className="row justify-content-center rowMobileFix">
              <div className="col-4 mt-4">
                <div
                  data-aos="fade"
                  data-aos-delay="500"
                  data-aos-duration="1500"
                  className="tabitemlist"
                >
                  {console.log(services)}
                  {services.map((service, idx) => (
                    <ListItem
                      key={service.label + idx}
                      onClick={() => HandleChange(idx)}
                      button
                    >
                      <p>
                        <span style={Active[idx] ? { color: "#000" } : null}>
                          {service.label}
                        </span>
                      </p>
                    </ListItem>
                  ))}
                </div>
              </div>
              <div
                data-aos="fade"
                data-aos-delay="700"
                data-aos-duration="1700"
                className="col-8 mt-4"
                style={{ padding: 0 }}
              >
                <TabList
                  list={services[ListIndex]?.treatments}
                  index={ListIndex}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AllTreatment;
