import { IconButton } from "@material-ui/core";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SwitchLanguage } from "../app/Tranlation/localisation";
import LANG from "../svgs/language.svg";

function LangFilter() {
  const dispatch = useDispatch();
  const { lang } = useSelector((state) => state.lang);
  return (
    <IconButton onClick={() => dispatch(SwitchLanguage())}>
      <img className="mr-1" width="22px" src={LANG} alt="la" />
      {lang === "en" ? "العربية" : "En"}
    </IconButton>
  );
}

export default LangFilter;
