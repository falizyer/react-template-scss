import React from "react";
import {BrowserRouter as Router} from "react-router-dom";

import {ErrorBoundary, NavBar, Footer, Header} from "./components";

import AppRoutes from "./App.routes";

import "./App.scss";

const baseHref = document.querySelector("base")?.getAttribute("href")?.replace(/\/$/, "");

function App() {
  return (
    <Router basename={baseHref}>
      <section className="rts__main">
        <ErrorBoundary>
          <Header/>
        </ErrorBoundary>

        <AppRoutes/>

        <ErrorBoundary>
          <Footer/>
        </ErrorBoundary>
      </section>
    </Router>
  );
}

export default App;
