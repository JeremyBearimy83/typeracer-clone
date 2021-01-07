import React, { ReactElement } from "react";
import { Link, NavLink } from "react-router-dom";

import logo from "../../assets/logo.png";

interface Props {}

export default function Header(): ReactElement {
  return (
    <React.Fragment>
      <div className="header">
        <div className="left">
          <img src={logo} />
          <span>TypeRacer</span>
        </div>
        <div className="right">
          <div className="player">
            <i className="fas fa-user"></i>
            <span>AKhForty7</span>
            #1337
          </div>
          <Link to="/auth">
            <button>
              <i className="fas fa-sign-in-alt"></i>
              Sign In
            </button>
          </Link>
        </div>
      </div>
      <nav className="nav">
        <NavLink exact to="/" activeClassName="link-active">
          <i className="fas fa-home"></i>
          Home
        </NavLink>
        <NavLink to="/play" activeClassName="link-active">
          <i className="fas fa-keyboard"></i>
          Play
        </NavLink>
        <NavLink to="/dummyroom" activeClassName="link-active">
          <i className="fas fa-keyboard"></i>
          Test
        </NavLink>
      </nav>
    </React.Fragment>
  );
}
