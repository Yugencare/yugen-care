import AOS from "aos";
import "aos/dist/aos.css";
import "bootstrap/dist/css/bootstrap.css";
import React, { useEffect } from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import "./App.css";
import store from "./app/store";
import Layout from "./layout/Layout";
import Routes from "./routes";
import ScrollToTop from "./ScrollToTop";

function App() {
  AOS.init();

  useEffect(() => {
    // const body = document.getElementById("style-body");
    // console.log(body);
    //  Scrollbar.init(body, {
    //   damping: 0.07,
    //   /**
    //    * Minimal size for scrollbar thumbs.
    //    */
    //   thumbMinSize: 20,
    //   /**
    //    * Render every frame in integer pixel values
    //    * set to `true` to improve scrolling performance.
    //    */
    //   renderByPixels: true,
    //   /**
    //    * Keep scrollbar tracks visible
    //    */
    //   alwaysShowTracks: false,
    //   /**
    //    * Set to `true` to allow outer scrollbars continue scrolling
    //    * when current scrollbar reaches edge.
    //    */
    //   continuousScrolling: true,
    // });
    // [].forEach.call(document.querySelectorAll("[data-aos]"), (el) => {
    //   myScrollbar.addListener(() => {
    //     if (myScrollbar.isVisible(el)) {
    //       el.classList.add("aos-animate");
    //     }
    //   });
    // });
  }, []);

  return (
    <div className="App" id="style-body">
      <Router>
        <Provider store={store}>
          <ScrollToTop>
            <Layout>
              <Routes />
            </Layout>
          </ScrollToTop>
        </Provider>
      </Router>
    </div>
  );
}

export default App;
