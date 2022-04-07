import { CircularProgress } from "@material-ui/core";
import React from "react";

export default function LoadingCircle({ step }) {
  return (
    <div
      className="w-100 d-flex align-items-center justify-content-center my-5 py-5"
      style={{ flexDirection: "column" }}
    >
      <h2 style={{ fontSize: 24, marginBottom: "1.4rem" }}>{step}</h2>
      <CircularProgress />
    </div>
  );
}
