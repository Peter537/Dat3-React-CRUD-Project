// API
import { fetchData } from "../modules/utils.mjs";

const BASE_URL = "http://localhost:3001/";

// #region Login

async function getAllUsers() {
  const url = `${BASE_URL}user`;
  let users = [];
  await fetchData(url, (data) => {
    users = data;
  });

  return users;
}

export async function login(name, password) {
  const url = `${BASE_URL}user`;
  let users = [];
  await fetchData(url, (data) => {
    users = data;
  });

  return users.find((user) => user.name === name && user.password === password);
}

export async function register(name, password) {
  const users = await getAllUsers();
  if (users.find((user) => user.name === name)) {
    return null;
  }
  const url = `${BASE_URL}user`;
  const method = "POST";
  const body = { name, password };
  let user = null;

  await fetchData(
    url,
    (data) => {
      user = data;
    },
    method,
    body
  );

  return user;
}

// #endregion

// #region Card

export async function getAllCards() {
  const url = `${BASE_URL}card`;
  let cards = [];
  await fetchData(url, (data) => {
    cards = data;
  });

  return cards;
}

export async function createCard(card) {
  const url = `${BASE_URL}card`;
  const method = "POST";
  const body = card;

  await fetchData(
    url,
    (data) => {
      return data;
    },
    method,
    body
  );
}

export async function deleteCard(cardId) {
  const url = `${BASE_URL}card/${cardId}`;
  const method = "DELETE";

  await fetchData(url, () => {}, method);
}

// #endregion

// #region MainPage

export async function createGame(game) {
  const url = `${BASE_URL}game`;
  const method = "POST";
  const body = game;

  await fetchData(url, () => {}, method, body);
}

async function readAllGames() {
  const url = `${BASE_URL}game`;
  let games = [];
  await fetchData(url, (data) => {
    games = data;
  });

  return games;
}

export async function readGamesByUser(userId) {
  return (await readAllGames()).filter((game) => {
    let players = game.players;
    return players.find((player) => player.id === userId);
  });
}

export async function readGamesUserIsNotIn(userId) {
  return (await readAllGames()).filter((game) => {
    let players = game.players;
    return !players.find((player) => player.id === userId) && !game.againstAI;
  });
}

export async function deleteGame(gameId) {
  const url = `${BASE_URL}game/${gameId}`;
  const method = "DELETE";

  await fetchData(url, () => {}, method);
}

export async function updateUserInfo(user) {
  const url = `${BASE_URL}user/` + user.id;
  const method = "PUT";
  const body = user;

  // Hvordan opdateres user med denne slags db?
  await fetchData(url, () => {}, method, body);
}

// #endregion
