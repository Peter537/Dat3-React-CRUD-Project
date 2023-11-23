import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { getAllCards } from "../api/api.js";
import Card from "../components/Card/Card.jsx";
import CardGrid from "../components/Card/CardGrid.jsx";

function GameBoard() {
  const [gameState, setGameState] = useState({
    currentPlayer: 1,
    player1Mana: 10,
    player2Mana: 0,
    maxMana: 0,
    player1Health: 30,
    player2Health: 30,
    player1Hand: [],
    player2Hand: [],
    player1Field: [],
    player2Field: [],
  });

  const [allCards, setAllCards] = useState([]);

  useEffect(() => {
    async function loadCards() {
      const allCards = await getAllCards();
      setAllCards(allCards);
    }

    loadCards();
  });

  function initializePlayerHands() {
    // Randomly select a card from the available cards

    for (let j = 0; j < 4; j++) {
      const randomCard = allCards[Math.floor(Math.random() * allCards.length)];
      // Add the card to the player's hand
      gameState.player1Hand.push(randomCard);
    }

    for (let j = 0; j < 4; j++) {
      const randomCardOpponent =
        allCards[Math.floor(Math.random() * allCards.length)];
      // Add the card to the player's hand
      gameState.player2Hand.push(randomCardOpponent);
    }

    setGameState(gameState);
  }

  function nextRound() {
    // Draw a new card for each player and add it to their hand
    const newCardPlayer1 = drawCard();
    const newCardPlayer2 = drawCard();

    setGameState((prevState) => ({
      ...prevState,
      player1Hand: [...prevState.player1Hand, newCardPlayer1],
      player2Hand: [...prevState.player2Hand, newCardPlayer2],
    }));

    // Call the gainMana method for both players
    gainMana(1);
    gainMana(2);

    // Update the UI or perform any other actions as needed
    updateHandDisplay();
    updateManaDisplay();
  }

  function drawCard() {
    // maybe have it somehow choose a card that isnt already there
    //Maybe have a minimum card size requirement?
    const availableCards = getAllCards();
    return availableCards[Math.floor(Math.random() * availableCards.length)];
  }

  function updateHandDisplay() {
    return (
      <div>
        <h2>Player 1 Hand:</h2>
        <ul>
          {gameState.player1Hand.map((card) => (
            <li key={card.id}>{card.name}</li>
          ))}
        </ul>

        <h2>Player 2 Hand:</h2>
        <ul>
          {gameState.player2Hand.map((card) => (
            <li key={card.id}>{card.name}</li>
          ))}
        </ul>
      </div>
    );
  }

  function updateManaDisplay() {
    return (
      <div>
        Mana:{" "}
        <span id="currentMana">
          {gameState.currentPlayer === 1
            ? JSON.stringify(gameState.player1Mana)
            : JSON.stringify(gameState.player2Mana)}
        </span>
        /<span id="maxMana">{gameState.maxMana}</span>
      </div>
    );
  }

  function gainMana(player) {
    setGameState((prevState) => ({
      ...prevState,
      maxMana: prevState.maxMana + 1,
      player1Mana:
        player === 1 ? prevState.player1Mana + 1 : prevState.player1Mana,
      player2Mana:
        player === 2 ? prevState.player2Mana + 1 : prevState.player2Mana,
    }));
    updateManaDisplay();
  }

  function endTurn() {
    // Switch the current player
    if (gameState.currentPlayer === 2) {
      return;
    }
    setGameState((prevState) => ({
      ...prevState,
      currentPlayer: prevState.currentPlayer === 1 ? 2 : 1,
    }));
  }

  function spendMana(player, amount) {
    setGameState((prevState) => ({
      ...prevState,
      player1Mana:
        player === 1
          ? prevState.player1Mana - amount
          : prevState.player1Mana - amount,
    }));

    updateManaDisplay();
  }

  function playCard(cardId) {
    console.log("playCard called");
    const player = gameState.currentPlayer === 1 ? 1 : 2;

    const hand = player === 1 ? gameState.player1Hand : gameState.player2Hand;
    const field =
      player === 1 ? gameState.player1Field : gameState.player2Field;
    console.log(cardId);

    // Find the corresponding card object from allCards array using cardId

    const card =
      gameState.currentPlayer === 1
        ? gameState.player1Hand.filter((card) => card.id === cardId)[0]
        : gameState.player2Hand.filter((card) => card.id === cardId)[0];

    console.log(card);

    if (!card) {
      console.error(`Card with ID ${cardId} not found.`);
      return;
    }


    if (
      hand.includes(card) &&
      (player == 1 ? gameState.player1Mana : gameState.player2Mana) >= card.cost
    ) {
      // Remove the chosen card from the player's hand
      const cardIndex = hand.indexOf(card);
      hand.splice(cardIndex, 1);
      console.log(hand, "is the number");

      // Add the card to the player's field
      field.push(card);

      // Update the gameState with the modified hand and field
      setGameState((prevState) => ({
        ...prevState,
        player1Hand: player === 1 ? hand : prevState.player1Hand,
        player2Hand: player === 2 ? hand : prevState.player2Hand,
        player1Field: player === 1 ? field : prevState.player1Field,
        player2Field: player === 2 ? field : prevState.player2Field,
      }));

      // Update the UI or perform any other actions as needed
      // TODO: More UI updates or game logic
    }
  }

  //TODO: Add more functions

return (
  

  
    <div className="container">
      <h1>Game Board</h1>
      <hr></hr>
      <div className="row md-4" style={{ marginBottom: "10%" }}>
        <button onClick={initializePlayerHands}> </button>
        <label>
          {gameState.player1Hand == undefined
            ? "undefined"
            : JSON.stringify(gameState.player1Hand.length) || "bruh"}{" "}
        </label>

        <div className="testfield">
          <CardGrid cards={gameState.player1Field} />
        </div>
      </div>

      <div style={{ scale: "70%" }}>
        <CardGrid
          cards={gameState.player1Hand}
          click={playCard}
          button_text={"send to field"}
        />
      </div>

      <div className="row ">
        <input type="number" min={1} max={4} id="fieldNumber" />
      </div>
    </div>
    
  );
}



export default GameBoard;
