import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { login, register } from "../api/api";

function Login() {
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

  return (
    <div className="container">
      <div className="card">
        <div className="card-header"></div>
        <div className="card-body mt-4">
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
                  type="text"
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
