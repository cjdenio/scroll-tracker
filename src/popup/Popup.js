import React from "react";
import { Route, Redirect } from "wouter";

import Index from "./views/Index";
import All from "./views/All";

const Popup = () => (
  <div>
    <Route path="/" component={Index} />
    <Route path="/all" component={All} />

    <Redirect to="/" />
  </div>
);

export default Popup;
