import React from "react";
import { Route, Redirect } from "wouter";

import Index from "./views/Index";
import All from "./views/All";
import Date from "./views/Date";

const Popup = () => (
  <div>
    <Route path="/" component={Index} />
    <Route path="/all" component={All} />
    <Route path="/date/:date" component={Date} />

    <Redirect to="/" />
  </div>
);

export default Popup;
