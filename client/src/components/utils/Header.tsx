import React, { ReactElement } from "react";
import { Link, NavLink } from "react-router-dom";

import logo from "../../assets/logo.png";

import { useAuth } from "../../context/AuthContext";
import { IUser, Nullable } from "../../utils/types";

interface Props {}

export default function Header(): ReactElement {
  //USER IS THE USER FROM THE AUTHCONTEXT
  const currentUser = useAuth()?.currentUser;
  const logOut = useAuth()?.logout;

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
            <span>{currentUser ? `${currentUser.username}` : `Guest`}</span>
            {/* #1337 */}
          </div>
          <Link to="/auth">
            {/* IF USER PRESENT DON'T SHOW SIGN IN BUTTON */}
            {!currentUser && (
              <button>
                <i className="fas fa-sign-in-alt"></i>
                Sign In
              </button>
            )}
          </Link>
          {/* ONLY IF USER PRESENT SHOW SIGN OUT BUTTON */}
          {currentUser && (
            <button onClick={logOut}>
              <i className="fas fa-sign-out-alt"></i>
              Sign out
            </button>
          )}
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
      </nav>
    </React.Fragment>
  );
}
