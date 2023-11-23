let currentPlayer = 1;
let hasPlayed = false;
let player1Mana = 0;
let player2Mana = 0;
let maxMana = 0;
let player1Health = 30;
let player2Health = 30;
let player1Hand = [];
let player2Hand = [];
let player1Field = [];
let player2Field = [];

function updateManaDisplay() {
    document.getElementById('currentMana').textContent = currentPlayer === 1 ? player1Mana : player2Mana;
    document.getElementById('maxMana').textContent = maxMana;
}

function gainMana() {
    maxMana++;
    if (currentPlayer === 1) player1Mana = maxMana;
    else player2Mana = maxMana;
    updateManaDisplay();
}

function playCard(card, player) {
    const hand = player === 1 ? player1Hand : player2Hand;
    const field = player === 1 ? player1Field : player2Field;
    if (hand.includes(card) && (player === 1 ? player1Mana : player2Mana) >= card.manaCost) {
        hand.splice(hand.indexOf(card), 1);
        field.push(card);
        updateFieldDisplay();
        updateHandDisplay();
    }
}

function attackEnemy(attackingCard, enemyCard) {
    enemyCard.health -= attackingCard.damage;
}

function handlePlayerDamage() {
    const opponentPlayerHealth = currentPlayer === 1 ? player2Health : player1Health;
    opponentPlayerHealth -= 1;
}

function activateField() {
    const currentField = currentPlayer === 1 ? player1Field : player2Field;
    const opponentField = currentPlayer === 1 ? player2Field : player1Field;
    if (opponentField.length > 0) {
        const enemyCardToAttack = opponentField[0];
        currentField.forEach(card => {
            attackEnemy(card, enemyCardToAttack);
        });
    } else {
        handlePlayerDamage();
    }
    player1Field = player1Field.filter(card => card.health > 0);
    player2Field = player2Field.filter(card => card.health > 0);
}

document.getElementById('endTurnBtn').addEventListener('click', function () {
    if (!hasPlayed) {
        const currentCards = currentPlayer === 1 ? player1Field : player2Field;
        currentCards.forEach(card => {
            playCard(card, currentPlayer);
        });
        hasPlayed = true;
        if (hasPlayed && player1Field.length > 0 && player2Field.length > 0) {
            activateField();
            switchTurn();
        }
    } else {
        console.log("You've already played this turn.");
    }
});

function switchTurn() {
    currentPlayer = 3 - currentPlayer;
    hasPlayed = false;
}

function updateFieldDisplay() {
    // Implement this function if you want to update the display of cards on the field
}

function updateHandDisplay() {
    // Implement this function if you want to update the display of cards in hand
}

// Example: Initialize cards
const card1 = { name: 'Card A', damage: 3, health: 5, manaCost: 2 };
const card2 = { name: 'Card B', damage: 2, health: 4, manaCost: 1 };
player1Hand.push(card1, card2);

console.log(`It's now Player ${currentPlayer}'s turn.`);
gainMana();
updateManaDisplay();
