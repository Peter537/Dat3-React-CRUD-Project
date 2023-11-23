import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import ThemeIcon from "../Theme changer/ThemeIcon";
import NavItem from "./NavItem";

function Header() {
  var user = sessionStorage.getItem("user");
  return (
    <>
      <nav
        className={`navbar navbar-expand-lg navbar-${sessionStorage.getItem(
          "theme"
        )} bg-${sessionStorage.getItem("theme")}`}
        style={{ display: "block", position: "absolute", top: 1, left: 1 }}
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
            <NavItem link={"/mainpage"}>Main page</NavItem>
            <NavItem link="/maker">Card Maker</NavItem>
            <NavItem
              link={"/"}
              onClick={() => {
                if (user) {
                  sessionStorage.removeItem("user");
                }
              }}
            >
              {user ? "Logout" : "Login"}
            </NavItem>
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
