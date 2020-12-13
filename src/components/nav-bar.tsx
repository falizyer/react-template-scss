import React from "react";
import {Link} from "react-router-dom";

import "./nav-bar.scss";

interface INavBarProps {
  readonly children: JSX.Element | JSX.Element[];
  className?: string;
}

const NavBar = (props: INavBarProps) => {
  return (
    <nav className={`navbar ${props.className}`}>
      <h1><Link to={"/"}>logo</Link></h1>

      <ul className="navbar__menu">
        {props.children}
      </ul>

      <ul className="navbar__actions">
        <li/>
      </ul>
    </nav>
  );
}

export default NavBar;
