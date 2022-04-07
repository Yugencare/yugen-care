import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router";
import { setStatus as AboutUsStatus } from "../../app/aboutpage";
import { getFrontpage } from "../../app/frontpage";
import { setStatus as JourneyStatus } from "../../app/journeypage";
import { setStatus as MembershipStatus } from "../../app/membership";
import { setStatus as ProfStatus } from "../../app/professionalpage";
import { setStatus as ServicesStatus } from "../../app/servicespage";
import { setStatus as ShopStatus } from "../../app/shoppage";
import { setStatus as ContactStatus } from "../../app/contactus";
import { setStatus as CareerStatus } from "../../app/careerpage";
import { setStatus as BlogStatus } from "../../app/Blogs/blogpage";
import LoadingOverlay from "../../components/LoadingOverlay";
import Errorpage from "../../layout/Errorpage";
import About from "../About";
import Journey from "../Journey";
import Membership from "../Membership";
import Professionals from "../Professionals";
import Services from "../Services";
import Shop from "../Shop";
import ContactUs from "../ContactUs";
import Careers from "../Careers";
import Blog from "../Blog";

export default function FrontPage() {
  const { page } = useSelector((state) => state.frontpage);
  const { status } = useSelector((state) => state.frontpage);
  const dispatch = useDispatch();
  const location = useLocation();
  useEffect(() => {
    //Passing page ID reference
    dispatch(getFrontpage({ id: location.pathname.split("/")[1] }));
  }, [dispatch, location.pathname]);

  if (status === "success") {
    if (page) {
      if (page.page_template?.label === "Yugen About Us") {
        dispatch(AboutUsStatus({ status: "success", page: page }));
        return <About />;
      } else if (page.page_template?.label === "Journey") {
        dispatch(JourneyStatus({ status: "success", page: page }));
        return <Journey />;
      } else if (page.page_template?.label === "Membership") {
        dispatch(MembershipStatus({ status: "success", page: page }));
        return <Membership />;
      } else if (page.page_template?.label === "Yugen Professionals") {
        dispatch(ProfStatus({ status: "success", page: page }));
        return <Professionals />;
      } else if (page.page_template?.label === "Yugen Service") {
        dispatch(ServicesStatus({ status: "success", page: page }));
        return <Services />;
      } else if (page.page_template?.label === "Yugen Shop") {
        dispatch(ShopStatus({ status: "success", page: page }));
        return <Shop />;
      } else if (page.page_template?.label === "Yugen Contact Us") {
        dispatch(ContactStatus({ status: "success", page: page }));
        return <ContactUs />;
      } else if (page.page_template?.label === "Yugen Career") {
        dispatch(CareerStatus({ status: "success", page: page }));
        return <Careers />;
      } else if (page.page_template?.label === "Yugen Blogs") {
        dispatch(BlogStatus({ status: "success", page: page }));
        return <Blog />;
      } else {
        return <Errorpage />;
      }
    }
  } else if (status === "failed") {
    return <Errorpage />;
  } else {
    return <LoadingOverlay />;
  }
}
