import React from "react";
import {Switch} from "react-router-dom";
import Loadable from "react-loadable";

import ErrorBoundaryRoute from "./components/error-boundary.route";
import PageNotFound from "./components/page-not-found";
import Loading from "./components/loading";

const Landing = Loadable({
  loader: () => import(/* webpackChunkName: "landing-page" */ "./pages/landing"),
  loading: () => (<section className="rts-main__section flex-size"><div className="container box all-center"><Loading/></div></section>),
});

const News = Loadable({
  loader: () => import(/* webpackChunkName: "news-page" */ "./pages/news"),
  loading: () => <section className="rts-main__section flex-size"><div className="container box all-center"><Loading/></div></section>,
});

const AppRoutes = () => (
  <Switch>
    <ErrorBoundaryRoute path="/" exact component={Landing}/>
    <ErrorBoundaryRoute path="/news" component={News}/>
    <ErrorBoundaryRoute component={PageNotFound}/>
  </Switch>
);

export default AppRoutes;
