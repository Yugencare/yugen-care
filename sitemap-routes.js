import React from "react";
import { Route } from "react-router";

export default (
  // <Router basename={"/yugenclinic"}>
  <Route>
    <Route exact path="/" />
    <Route exact path="/promotion" />
    <Route exact path="/philosophy" />
    <Route exact path="/7-pillars" />
    <Route exact path="/journey" />
    <Route exact path="/professionals" />
    <Route exact path="/research" />
    <Route exact path="/wellness-land" />
    <Route exact path="/careers/" />
    <Route exact path="/login" />
    <Route exact path="/signup" />
    <Route exact path="/thank-you" />
    <Route exact path="/profile" />
    <Route exact path="/cart" />
    <Route exact path="/checkout" />
    <Route exact path="/order-completed" />
    <Route exact path="/yugen-membership" />
    <Route exact path="/book" />
    <Route exact path="/wellness-land/browse" />
    <Route exact path="/wellness-land/:slug" />
    <Route exact path="/7-pillars/:slug/" />
    <Route exact path="/contact-us/" />
    <Route exact path="/research/:id" />
    <Route exact path="/research/:slug/:id" />
    <Route exact path="/professionals/:slug/:id" />
  </Route>
  // </Router>
);
