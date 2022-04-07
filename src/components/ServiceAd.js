import React from "react";

function ServiceAd(props) {
  return props.Advertisement && props.Advertisement.url ? (
    <div
      className="ServiceAd position-relative"
      style={{
        backgroundImage: "#fff",
        backgroundSize: `cover`,
        backgroundRepeat: `no-repeat`,
      }}
    >
      <img className="img-fluid" src={props.Advertisement.url} alt="" />
    </div>
  ) : null;
}
export default ServiceAd;
