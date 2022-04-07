import React from "react";

function GradientBar({ h }) {
   return (
      <div className="GradientBar position-relative">
         <div
            style={h ? { minHeight: `${h}px` } : { minHeight: "9px" }}
            className="animated-gradient"
         ></div>
      </div>
   );
}

export default GradientBar;
