import React, { useEffect, useState } from "react";
import CardGrid from "../components/Card/CardGrid";
import img from "../components/Card/placeholder.png";
import { AttackIcon, HealthIcon, ManaIcon } from "../components/Card/CardIcons";
import { createCard, deleteCard, getAllCards } from "../api/api";
import "../components/Card/Card.css";

function CardMaker() {
  const [cards, setCards] = useState([]);
  const [image, setImage] = useState(img);
  const [mana, setMana] = useState(0);

  document.addEventListener("DOMContentLoaded", function () {
    if (sessionStorage.getItem("user") === null) {
      window.location.replace("/");
    }
  });

  useEffect(() => {
    async function loadCards() {
      const allCards = await getAllCards();
      if (JSON.stringify(cards) !== JSON.stringify(allCards))
        setCards(allCards);
      console.log("Cards loaded");

      if (allCards.length > 3) {
        document.getElementById("cardParent").style.marginLeft = "3%";
      } else if (allCards.length > 2) {
        document.getElementById("cardParent").style.marginLeft = "-2%";
      } else {
        document.getElementById("cardParent").style.marginLeft = "-10%";
      }
    }
    loadCards();

    const interval = setInterval(() => {
      loadCards();
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  function createHandler() {
    const name = document.getElementById("title")?.value;
    const desc = document.getElementById("desc")?.value;
    const attack = document.getElementById("attack")?.value;
    const health = document.getElementById("health")?.value;
    const cost = mana;
    const createdBy = JSON.parse(sessionStorage.getItem("user"))?.name;
    const image_url = image;

    if (!name || !desc || !attack || !health || !createdBy) {
      alert("Please fill in all fields");
      return;
    }

    const data = {
      name,
      desc,
      attack,
      health,
      cost,
      createdBy,
      image_url,
    };

    createCard(data);
    $("#cardParent")
      .find(".form-control")
      .each((index, element) => (element.value = ""));
  }

  function deleteCardHandler(id) {
    deleteCard(id);
  }

  return (
    <div className="container">
      <h1>Card Maker</h1>
      <hr></hr>
      <div className="row mt-4 mb-4">
        <div className="col-sm-4"></div>
        <div id="cardParent" className="col-sm-4">
          <div
            className="card"
            style={{
              width: "18rem",
              boxShadow: "0px 2px 2px 1.2px black",
              minHeight: "100%",
            }}
          >
            <img src={image} className="card-img img"></img>
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
                id="image"
                onChange={(e) => setImage(e.target.value)}
              ></input>
            </div>
            <div className="row mt-2">
              <div className="col-sm-1"></div>
              <div className="col-sm-5">
                <input
                  type="submit"
                  className="btn btn-cstm-primary"
                  value={"+ Mana "}
                  style={{ width: "100%" }}
                  onClick={() => setMana(mana + 1)}
                ></input>
              </div>
              <div className="col-sm-5">
                <input
                  type="submit"
                  className="btn btn-cstm-primary"
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
                id="health"
                defaultValue={0}
                style={{ width: "20%", display: "inline" }}
              ></input>

              <AttackIcon />
              <input
                type="number"
                className="form-control form-control-sm text-center"
                id="attack"
                defaultValue={0}
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
                  id="desc"
                  defaultValue={
                    "Some quick example text to build on the card title and make up the bulk of the card's content."
                  }
                ></textarea>
              </p>
              <button className="btn btn-cstm-primary" onClick={createHandler}>
                Create
              </button>
            </div>
          </div>
        </div>
        <div className="col-sm-4"></div>
      </div>
      <h2>Existing cards</h2>
      <hr></hr>
      <CardGrid
        cards={cards}
        click={deleteCardHandler}
        button_text={"Delete"}
      />
    </div>
  );
}

export default CardMaker;
