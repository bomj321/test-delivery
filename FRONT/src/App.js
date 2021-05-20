import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import axiosconf from "./axios";

import Product from "./elements/Product";
import error404 from "./elements/error404";

/**********Hooks******** */

import "./index.scss";

export const App = () => {
  axiosconf();

  return (
    <BrowserRouter basename={"/"}>
      <Switch>
        <Route exact path={`${process.env.PUBLIC_URL}/`} component={Product} />
        <Route path={`${process.env.PUBLIC_URL}/404`} component={error404} />
        <Route component={error404} />
      </Switch>
    </BrowserRouter>
  );
};
