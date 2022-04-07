import React from "react";
import { Slide } from "@material-ui/core";
import Loader from "../svgs/LoadingGif2.gif";
export default function LoadingOverlay() {
  return (
    <>
      <div className="OverlayDisplace" />
      <div className="LoadingOverlay">
        <div className="d-flex align-items-center justify-content-center h-100">
          <Slide direction="down" in={true} timeout={1000}>
            <div>
              <img src={Loader} alt="loading..." style={{ width: 100 }} />
              {/* <CircularProgress /> */}
              {/* <video width="100" height="100" autoPlay muted loop={true}>
                <source src={Loader} type="video/mov" />
              </video> */}
            </div>
          </Slide>
        </div>
      </div>
    </>
  );
}
