import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import Book from "./Book";

function Booking() {
  const history = useHistory();
  const { isLoggedIn } = useSelector((state) => state.loginUser);
  useEffect(() => {
    if (!isLoggedIn) {
      const StoredUser = JSON.parse(localStorage.getItem("user"));
      // if (!StoredUser) {
      //   history.push("/login");
      // }
    }
  }, [isLoggedIn]);
  return (
    <div dir="ltr" className="Booking">
      <Helmet>
        <meta charSet="utf-8" />
        <title>Booking | Yugen Care</title>
        <meta
          name="description"
          content="Yugen Care, Jumeirah Beach Road, Jumeirah 3, UAE"
        />
        {/* <script type="application/ld+json">{schemaJSON}</script> */}
      </Helmet>
      <Book />
    </div>
  );
}
export default Booking;
