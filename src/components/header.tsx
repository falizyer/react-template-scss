import React from "react";
import {Link} from "react-router-dom";

import NavBar from "./nav-bar";

const Header = () => {
  return (
    <header className="rts__main__header bg-color-primary">
      <NavBar className="container box">
        <li><Link className="hover" to={"/news/top-headlines"}>News</Link></li>
      </NavBar>
    </header>
  );
};

export default Header;