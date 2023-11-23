import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { login, register } from "../api/api";

function Login() {
  let dragged = false;

  async function logHandler(apiFunction) {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    if (username === "" || password === "") {
      alert("Please enter a username and password.");
      return;
    }

    const user = await apiFunction(username, password);
    if (user === null) {
      alert("Username already exists or is invalid.");
      return;
    }

    sessionStorage.setItem("user", JSON.stringify(user));
    window.location.replace("/mainpage");
  }

  function dragElement(e) {
    // #region Moveable Card
    var elmnt = document.getElementById("card");
    var pos1 = 0,
      pos2 = 0,
      pos3 = 0,
      pos4 = 0;
    elmnt.style.position = "absolute";

    if (dragged === false) {
      elmnt.style.top = elmnt.getBoundingClientRect().y / 1.63 + "px";
      elmnt.style.left = elmnt.getBoundingClientRect().x / 1.23 + "px";
      dragged = true;
    }

    if (document.getElementById(elmnt.id + "header")) {
      // if present, the header is where you move the DIV from:
      document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
    } else {
      // otherwise, move the DIV from anywhere inside the DIV:
      elmnt.onmousedown = dragMouseDown;
    }

    function dragMouseDown(e) {
      e = e || window.event;
      e.preventDefault();
      // get the mouse cursor position at startup:
      pos3 = e.clientX;
      pos4 = e.clientY;
      document.onmouseup = closeDragElement;
      // call a function whenever the cursor moves:
      document.onmousemove = elementDrag;
    }

    function elementDrag(e) {
      e = e || window.event;
      e.preventDefault();
      // calculate the new cursor position:
      pos1 = pos3 - e.clientX;
      pos2 = pos4 - e.clientY;
      pos3 = e.clientX;
      pos4 = e.clientY;
      // set the element's new position:
      elmnt.style.top = elmnt.offsetTop - pos2 + "px";
      elmnt.style.left = elmnt.offsetLeft - pos1 + "px";
    }

    function closeDragElement() {
      // stop moving when mouse button is released:
      document.onmouseup = null;
      document.onmousemove = null;
    }

    // #endregion

    // #region Resizable Card
    let isDragging = false;
    let initialX = 0;
    let initialY = 0;
    let initialWidth = 0;
    let initialHeight = 0;

    const draggableCard = document.getElementById("cardBody");

    draggableCard.addEventListener("mousedown", function (event) {
      isDragging = true;
      initialX = event.clientX;
      initialY = event.clientY;
      initialWidth = parseInt(
        window.getComputedStyle(draggableCard).getPropertyValue("width")
      );
      initialHeight = parseInt(
        window.getComputedStyle(draggableCard).getPropertyValue("height")
      );
    });

    document.addEventListener("mousemove", function (event) {
      if (!isDragging) return;
      if (event.target.tagName.toLowerCase() !== "div") return;
      const widthChange = event.clientX - initialX;
      const newWidth = initialWidth + widthChange;
      draggableCard.style.width = newWidth + "px";

      const heightChange = event.clientY - initialY;
      const newHeight = initialHeight + heightChange;
      draggableCard.style.height = newHeight + "px";
    });

    document.addEventListener("mouseup", function () {
      isDragging = false;
    });

    // #endregion
  }

  return (
    <div className="container">
      <div className="card shadow" id="card">
        <div
          id="cardheader"
          className="card-header"
          onClick={dragElement}
        ></div>
        <div id="cardBody" className="card-body mt-4">
          <h5 className="card-title">Welcome to untitled card game!</h5>
          <p className="card-text mb-5">
            If you already have an account, please login.
          </p>
          <div className="row">
            <div className="col-sm-12">
              <div className="input-group mb-3">
                <span className="input-group-text" id="basic-addon1">
                  @
                </span>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Username"
                  aria-label="Username"
                  aria-describedby="basic-addon1"
                  id="username"
                ></input>
              </div>
            </div>
          </div>
          <div className="row mb-3">
            <div className="col-sm-12">
              <div className="input-group mb-3">
                <span className="input-group-text" id="basic-addon1">
                  @
                </span>
                <input
                  type="password"
                  className="form-control"
                  placeholder="Password"
                  aria-label="Password"
                  aria-describedby="basic-addon1"
                  id="password"
                ></input>
              </div>
            </div>
          </div>
          <div className="row ms-2 me-2 mb-3">
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => logHandler(login)}
            >
              Login
            </button>
          </div>
          <div className="row ms-2 me-2 mt-2 mb-2">
            <button
              type="button"
              className="btn btn-outline-primary"
              onClick={() => logHandler(register)}
            >
              Register
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
