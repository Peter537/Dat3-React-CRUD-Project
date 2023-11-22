import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

function Login() {
  return (
    <div className="container">
      <div className="card">
        <div className="card-header">Login</div>
        <div className="card-body">
          <h5 className="card-title">Welcome to untitled card game!</h5>
          <p className="card-text">
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
                ></input>
              </div>
            </div>
          </div>
          <div className="row">
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
                ></input>
              </div>
            </div>
          </div>
          <div className="row ms-2 me-2">
            <button type="button" className="btn btn-primary">
              Login
            </button>
          </div>
          <div className="row ms-2 me-2 mt-2">
            <button type="button" className="btn btn-outline-primary">
              Register
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
