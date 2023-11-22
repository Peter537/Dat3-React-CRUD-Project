import React, { useState } from "react";
import CardGrid from "../components/Card/CardGrid";
import img from "../components/Card/placeholder.svg";
import { AttackIcon, HealthIcon, ManaIcon } from "../components/Card/CardIcons";

function CardMaker() {
  const [image, setImage] = useState(img);
  const [mana, setMana] = useState(0);

  function createHandler() {}

  return (
    <div className="container">
      <h1>Card Maker</h1>
      <hr></hr>
      <div className="row mt-4 mb-4">
        <div className="col-sm-4"></div>
        <div className="col-sm-4 ms-5">
          {" "}
          <div className="card" style={{ width: "18rem" }}>
            <img src={image || img} className="card-img" alt="..."></img>
            <div
              className="card-img-overlay"
              style={{ height: "5%", marginTop: "-4%" }}
            >
              {[...Array(mana)].map(() => {
                return (
                  <ManaIcon
                    key={crypto.getRandomValues(new Uint32Array(1))[0]}
                  />
                );
              })}
              <input
                type="text"
                className="form-control text-center"
                placeholder="Image URL"
                onChange={(e) => setImage(e.target.value)}
              ></input>
            </div>
            <div className="row mt-2">
              <div className="col-sm-1"></div>
              <div className="col-sm-5">
                <input
                  type="submit"
                  className="btn btn-primary"
                  value={"+ Mana "}
                  style={{ width: "100%" }}
                  onClick={() => setMana(mana + 1)}
                ></input>
              </div>
              <div className="col-sm-5">
                <input
                  type="submit"
                  className="btn btn-primary"
                  value={"- Mana"}
                  style={{ width: "100%" }}
                  onClick={() => {
                    if (mana != 0) setMana(mana - 1);
                  }}
                ></input>
              </div>
            </div>
            <div className="form-group mt-2">
              <HealthIcon />
              <input
                type="number"
                className="form-control form-control-sm text-center"
                style={{ width: "20%", display: "inline" }}
              ></input>

              <AttackIcon />
              <input
                type="number"
                className="form-control form-control-sm text-center"
                style={{ width: "20%", display: "inline" }}
              ></input>
            </div>
            <div className="card-body">
              <input
                type="text"
                className="form-control form-control-md text-center"
                placeholder="Title"
                id="title"
              ></input>
              <p className="card-text mt-1">
                <textarea
                  className="form-control text-center"
                  rows={4}
                  defaultValue={
                    "Some quick example text to build on the card title and make up the bulk of the card's content."
                  }
                ></textarea>
              </p>
              <button className="btn btn-primary" onClick={createHandler}>
                Create
              </button>
            </div>
          </div>
        </div>
        <div className="col-sm-4"></div>
      </div>
      <h2>Existing cards</h2>
      <hr></hr>
      <CardGrid cards={[1, 2, 3, 4]} />
    </div>
  );
}

export default CardMaker;
