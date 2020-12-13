import React from "react";
import {Redirect} from "react-router-dom";

import ErrorBoundaryRoute from "../../components/error-boundary.route";

import TopHeadlines from "./top-headlines";
import Article from "./article";
import NewsDataContext from "./news-data-context";

const Routes = ({match}) => {
  return (
    <NewsDataContext>
      <section className="rts__main__section">
        <ErrorBoundaryRoute path={`${match.url}/top-headlines`} component={TopHeadlines} exact/>
        <ErrorBoundaryRoute path={`${match.url}/top-headlines/:id`} component={Article} exact/>
        <Redirect from="/news" to={`${match.url}/top-headlines`} exact/>
      </section>
    </NewsDataContext>
  );
};

export default Routes;
