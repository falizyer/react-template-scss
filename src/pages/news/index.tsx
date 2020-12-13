import React from "react";
import {Redirect} from "react-router-dom";

import ErrorBoundaryRoute from "../../components/error-boundary.route";

import TopHeadlines from "./top-headlines";

const Routes = ({match}) => (
  <section className="rts__main__section">
    <ErrorBoundaryRoute path={`${match.url}/top-headlines`} component={TopHeadlines}/>
    <Redirect from={match.url} to={`${match.url}/top-headlines`} exact/>
  </section>
);

export default Routes;
