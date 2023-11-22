import React, { useState } from "react";
import CardGrid from "../components/Card/CardGrid";
import img from "../components/Card/placeholder.svg";

function CardMaker() {
  const [image, setImage] = useState(img);

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
            <div className="card-img-overlay" style={{ height: "10%" }}>
              <input
                type="text"
                className="form-control text-center"
                placeholder="Image URL"
                onChange={(e) => setImage(e.target.value)}
              ></input>
            </div>
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="currentColor"
                className="bi bi-heart-fill"
                viewBox="0 0 16 16"
              >
                <path
                  fillRule="evenodd"
                  d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314"
                />
              </svg>
              <input
                type="number"
                className="form-control-sm text-center"
              ></input>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="currentColor"
                className="bi bi-scissors"
                viewBox="0 0 16 16"
              >
                <path d="M3.5 3.5c-.614-.884-.074-1.962.858-2.5L8 7.226 11.642 1c.932.538 1.472 1.616.858 2.5L8.81 8.61l1.556 2.661a2.5 2.5 0 1 1-.794.637L8 9.73l-1.572 2.177a2.5 2.5 0 1 1-.794-.637L7.19 8.61zm2.5 10a1.5 1.5 0 1 0-3 0 1.5 1.5 0 0 0 3 0m7 0a1.5 1.5 0 1 0-3 0 1.5 1.5 0 0 0 3 0" />
              </svg>
              <input
                type="number"
                className="form-control-sm text-center"
              ></input>
            </div>
            <div className="card-body">
              <input
                type="text"
                className="form-control-md text-center"
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
