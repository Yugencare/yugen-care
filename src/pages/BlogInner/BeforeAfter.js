import React from "react";
import after1 from "../../images/after1.jpg";
import after2 from "../../images/after2.jpg";
import before1 from "../../images/before1.jpg";
import before2 from "../../images/before2.jpg";

function BeforeAfter() {
  return (
    <div className="row ">
      <div className="before-after1 col-md-6 d-flex">
        <div className="before-aftertext mr-1">
          <img className="img-fluid" src={before1} alt="" />
          <p>Before</p>
        </div>
        <div className="before-aftertext">
          <img className="img-fluid" src={after1} alt="" />
          <p>After</p>
        </div>
      </div>
      <div className="before-after2 col-md-6 d-flex">
        <div className="before-aftertext  mr-1">
          <img className="img-fluid" src={before2} alt="" />
          <p>Before</p>
        </div>
        <div className="before-aftertext">
          <img className="img-fluid" src={after2} alt="" />
          <p>After</p>
        </div>
      </div>
    </div>
  );
}
export default BeforeAfter;
