import React from "react";
import {Link, Switch} from "react-router-dom";

const Landing = () => {
  return (
    <section className="rts__main__section">
      <header className="container box">
        <h2>Welcome to template</h2>
      </header>
      <div className="container column box">
        <h3>Working with tables</h3>
        <p>
          Here you may find your best anime <Link className="link color-secondary" to="/news" >click to view</Link>
        </p>
      </div>
    </section>
  );
};

export default Landing;
