import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {getAllCards} from "../api/api.js";

function GameBoard() {
    const [gameState, setGameState] = useState({
        currentPlayer: 1,
        player1Mana: 0,
        player2Mana: 0,
        maxMana: 0,
        player1Health: 30,
        player2Health: 30,
        player1Hand: [],
        player2Hand: [],
        player1Field: [],
        player2Field: [],
    });

    const allCards = getAllCards()
    function initializePlayerHands() {
        for (let i = 0; i < initialHandSize; i++) {
            // Randomly select a card from the available cards
            const randomCard = allCards[Math.floor(Math.random() * allCards.length)];
            for (let j = 0; j < 4; j++) {
                // Add the card to the player's hand
                gameState.player1Hand.push(randomCard);
            }
            const randomCardOpponent = allCards[Math.floor(Math.random() * allCards.length)];
            for (let j = 0; j < 4; j++) {
                // Add the card to the player's hand
                gameState.player2Hand.push(randomCardOpponent);
            }


        }
        // Set the player's hand in the game state or wherever you are storing player information
        setGameState((prevState) => ({
            ...prevState,
            [player === 1 ? 'player1Hand' : 'player2Hand']: playerHand,
        }));
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
                Mana: <span id="currentMana">{gameState.currentPlayer === 1 ? gameState.player1Mana : gameState.player2Mana}</span>/
                <span id="maxMana">{gameState.maxMana}</span>
            </div>
        );
    }

    function gainMana(player) {
        setGameState((prevState) => ({
            ...prevState,
            maxMana: prevState.maxMana + 1,
            player1Mana: player === 1 ? prevState.player1Mana + 1 : prevState.player1Mana,
            player2Mana: player === 2 ? prevState.player2Mana + 1 : prevState.player2Mana,
        }));
        updateManaDisplay();
    }

    function playCard(card, player) {
        const hand = player === 1 ? gameState.player1Hand : gameState.player2Hand;
        const field = player === 1 ? gameState.player1Field : gameState.player2Field;

        if (hand.includes(card) && (player === 1 ? gameState.player1Mana : gameState.player2Mana) >= card.manaCost) {
            hand.splice(hand.indexOf(card), 1);
            field.push(card);
            //TODO: more ui?
        }
    }

    //TODO: Add more functions

    return (
        <div className="container">
            <h1>Game Board</h1>
            <hr></hr>
            <div className="row mt-4 mb-4">
                {
                    //html
                }
            </div>
        </div>
    );
}

export default GameBoard;
