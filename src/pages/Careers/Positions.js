import { Divider } from "@material-ui/core";
import React from "react";

function Positions({ positions, handleOpen }) {
  return (
    <div className="Positions position-relative">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-10">
            <div className="row">
              <div className="col-md-12">
                <h1 data-aos="fade" data-aos-delay="0" data-aos-duration="2000">
                  {positions.available_positions}
                </h1>
              </div>
              {positions.positions?.map((position, idx) => (
                <div
                  data-aos="fade"
                  data-aos-delay={(150 * idx) % 300}
                  data-aos-duration="2000"
                  className="col-md-6"
                >
                  <div className="d-flex justify-content-between">
                    <h2 onClick={() => handleOpen(idx)}>
                      {position.heading_text}
                    </h2>
                    <button onClick={() => handleOpen(idx)}>Apply</button>
                  </div>
                  <p>{position.description_text}</p>
                  <Divider style={{ marginBottom: "30px" }} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Positions;
