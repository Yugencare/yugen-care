import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import Errorpage from "../layout/Errorpage";
import About from "../pages/About";
import LoginAndSignup from "../pages/Account/LoginAndSignup";
import Profile from "../pages/Account/Profile";
import Blog from "../pages/Blog";
import BlogInner from "../pages/BlogInner";
import Booking from "../pages/Booking";
import Careers from "../pages/Careers";
import Cart from "../pages/Cart";
import Checkout from "../pages/Checkout";
import OrderCompleted from "../pages/Checkout/OrderCompleted";
import ContactUs from "../pages/ContactUs";
import Doctor from "../pages/Doctor";
import FrontPage from "../pages/FrontPage";
import Home from "../pages/Home";
import Homepage from "../pages/Homepage";
import InnerService from "../pages/InnerService";
import InnerSubService from "../pages/InnerSubService";
import Journey from "../pages/Journey";
import Membership from "../pages/Membership";
import ProductPage from "../pages/ProductPage";
import Professionals from "../pages/Professionals";
import Services from "../pages/Services";
import ServicesAdapter from "../pages/Services/ServicesAdapter";
import Shop from "../pages/Shop";
import ShopAll from "../pages/ShopAll";
import Thankyou from "../pages/ThankYou";

const Routes = () => {
  return (
    // <Router basename={"/yugenclinic"}>
    <Switch>
      <Route exact path="/discover" component={Home} />
      <Route exact path="/appointment" component={Home} />
      <Route exact path="/promotion" component={Homepage} />
      <Route exact path="/philosophy" component={About} />
      <Route exact path="/7-pillars" component={Services} />
      <Route exact path="/yugen-pathway" component={Journey} />
      <Route exact path="/professionals" component={Professionals} />
      <Route exact path="/research" component={Blog} />
      <Route exact path="/wellness-land" component={Shop} />
      <Route exact path="/careers/" component={Careers} />
      <Route exact path="/login" component={LoginAndSignup} />
      <Route exact path="/signup" component={LoginAndSignup} />
      <Route exact path="/thank-you" component={Thankyou} />
      <Route exact path="/signup/:id" component={LoginAndSignup} />
      <Route exact path="/profile" component={Profile} />
      <Route exact path="/cart" component={Cart} />
      <Route exact path="/checkout" component={Checkout} />
      <Route exact path="/order-completed" component={OrderCompleted} />
      <Route exact path="/yugen-membership" component={Membership} />
      <Route exact path="/book" component={Booking} />
      <Route exact path="/wellness-land/browse" component={ShopAll} />
      <Route exact path="/wellness-land/browse/:tag" component={ShopAll} />
      <Route exact path="/wellness-land/:product" component={ProductPage} />
      <Route exact path="/7-pillars/:slug/" component={ServicesAdapter} />
      <Route exact path="/contact-us/" component={ContactUs} />
      <Route exact path="/research/:id" component={BlogInner} />
      <Route exact path="/research/:title/:option" component={BlogInner} />
      <Route exact path="/professionals/:slug/:id" component={Doctor} />
      <Route exact path="/services/:pagename/:slug/" component={InnerService} />
      <Route exact path="/treatment/:slug" component={InnerSubService} />
      <Redirect exact path="/ar" to="/discover" />
      <Redirect exact path="/ar/:p" to="/discover" />
      <Route exact path="/:pages" component={FrontPage} />
      <Redirect exact path="/" to="/discover" />
      <Route component={Errorpage} />
    </Switch>
    // </Router>
  );
};

export default Routes;
