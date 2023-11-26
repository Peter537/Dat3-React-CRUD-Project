import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { getAllCards, getGameById } from "../api/api.js";
import Card from "../components/Card/Card.jsx";
import CardGrid from "../components/Card/CardGrid.jsx";

function GameBoard() {
  const [game, setGame] = useState();
  useEffect(() => {
    let gameId = JSON.parse(sessionStorage.getItem("gameId"));
    if (gameId === undefined || gameId === null) {
      window.location.replace("/"); // If user is not logged in, redirect to login page
      return;
    }
    async function loadGame() {
      let game = await getGameById(gameId);
      setGame(game);
    }
    loadGame();
  }, []);

  // all cards
  const [allCards, setAllCards] = useState([]);

  useEffect(() => {
    async function loadCards() {
      const allCards = await getAllCards();
      setAllCards(allCards);
    }

    loadCards();
  }, []);

  //#region initializeHands
  function initializePlayerHands() {
    // Randomly select a card from the available cards

    for (let j = 0; j < 4; j++) {
      const randomCard = allCards[Math.floor(Math.random() * allCards.length)];
      // Add the card to the player's hand
      game.players[0].hand.push(randomCard);
    }

    for (let j = 0; j < 4; j++) {
      const randomCardOpponent =
        allCards[Math.floor(Math.random() * allCards.length)];
      // Add the card to the player's hand
      game.players[1].hand.push(randomCardOpponent);
    }
    setGame(prevState => ({
      ...prevState,
      players: [
        {
          ...prevState.players[0],
          hand: game.players[0].hand, mana: 10
        },
        {
          ...prevState.players[1],
          hand: game.players[1].hand, mana: 10
        },
      ],
    }));
  }
  //#endregion

  //#region playCard
  function playCard(cardId) {
    console.log("playCard called");
    const player = game.currentPlayer === 1 ? 1 : 2;

    const hand = player === 1 ? game.players[0].hand : game.players[1].hand;

    const field = player === 1 ? game.players[0].field : game.players[1].field;
    console.log(cardId);

    // Find the corresponding card object from allCards array using cardId

    const card =
      game.currentPlayer === 1
        ? game.players[0].hand.filter((card) => card.id === cardId)[0]
        : game.players[1].hand.filter((card) => card.id === cardId)[0];

    console.log(card);

    if (!card) {
      console.error(`Card with ID ${cardId} not found.`);
      return;
    }

    if (
      hand.includes(card) &&
      (player == 1 ? game.players[0].mana : game.players[1].mana) >= card.cost
    ) {
      // Remove the chosen card from the player's hand
      const cardIndex = hand.indexOf(card);
      hand.splice(cardIndex, 1);
      console.log(hand, "is the number");

      // Add the card to the player's field
      field.push(card);

      let newGame;

      if (player === 1) {
        newGame = {
          ...game,
          players: [
            { ...game.players[0], hand: hand, field: field },
            game.players[1],
          ],
        };
      } else {
        newGame = {
          ...game,
          players: [
            game.players[0],
            { ...game.players[1], hand: hand, field: field },
          ],
        };
      }
      setGame(newGame);
    }
  }
  //#endregion

  


  return (
    <div className="container">
      <h1>Game Board</h1>
      <hr></hr>
      <div className="row md-4" style={{ marginBottom: "10%" }}>
        <button className="btn btn-primary" onClick={initializePlayerHands}> Generate hand</button>

        <label>
          {game?.players[0].hand == undefined
            ? "undefined"
            : JSON.stringify(game?.players[0].hand.length)}
        </label>

        <div className="testfield">
          <CardGrid cards={game?.players[0].field} />
        </div>
      </div>

      <div >
        <CardGrid
          cards={game?.players[0].hand}
          click={playCard}
          button_text={"send to field"}
        />
      </div>

  
    </div>
  );
}

export default GameBoard;
