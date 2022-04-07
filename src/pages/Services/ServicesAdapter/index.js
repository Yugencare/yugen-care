import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getServicepage } from "../../../app/servicepage";
import LoadingOverlay from "../../../components/LoadingOverlay";
import Errorpage from "../../../layout/Errorpage";
import TemplateOne from "../TemplateOne";
import TemplateTwo from "../TemplateTwo";

export default function ServicesAdapter() {
  const params = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    ////Passing page ID reference
    console.log(params.slug);
    if (params.slug !== page?.slug) {
      dispatch(getServicepage({ id: params.slug }));
    }
  }, [dispatch, params]);
  const { page } = useSelector((state) => state.servicepage);
  const { status } = useSelector((state) => state.servicepage);

  const RenderTemplate = () => {
    if (page?.page_template?.label === "Yugen Service Page Template 1") {
      return <TemplateOne />;
    } else if (page?.page_template?.label === "Yugen Service Page Template 3") {
      return <TemplateTwo />;
    } else return Errorpage;
  };
  return status === "success" ? (
    RenderTemplate()
  ) : status === "failed" ? (
    <Errorpage />
  ) : (
    <LoadingOverlay />
  );
}
