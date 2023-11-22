import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import ThemeIcon from "./Theme changer/ThemeIcon";

function Header() {
  return (
    <>
      <nav
        className={`navbar navbar-expand-lg navbar-${sessionStorage.getItem(
          "theme"
        )} bg-${sessionStorage.getItem("theme")}`}
        style={{ display: "block", position: "absolute", top: 1 }}
      >
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
              <a className="nav-link" href="/">
                Login
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/maker">
                Card Maker
              </a>
            </li>
            <li>
              <ThemeIcon />
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
}

export default Header;
