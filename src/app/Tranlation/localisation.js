import { createSlice } from "@reduxjs/toolkit";

const InitialLanguage = () => {
  const lang = localStorage.getItem("language");

  if (window.location.href.indexOf("ar.") != -1) {
    return "ar";
  } else {
    return "en";
  }
  // if (lang) {
  //   return lang;
  // } else return "en";
};

const LangSlice = createSlice({
  name: "language",
  initialState: {
    lang: InitialLanguage(),
  },
  reducers: {
    SwitchLanguage(state, { payload }) {
      state.lang = state.lang === "en" ? "ar" : "en";
      localStorage.setItem("language", state.lang);
    },
  },
});
export const { SwitchLanguage } = LangSlice.actions;
export default LangSlice.reducer;
