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

// #endregion

// #region MainPage

export async function createGame(game) {
  const url = `${BASE_URL}game`;
  const method = "POST";
  const body = game;

  await fetchData(
    url,
    (data) => {
      // TODO: What to do hvis der ik skal noget response tilbage?
      console.log(data);
    },
    method,
    body
  );
}

export async function readGamesByUser(userId) {
  const url = `${BASE_URL}game`;
  let games = [];
  await fetchData(url, (data) => {
    games = data;
  });

  return games; // TODO: create filter
}

export async function readGamesUserIsNotIn(userId) {
  const url = `${BASE_URL}game`;
  let games = [];
  await fetchData(url, (data) => {
    games = data;
  });

  return games; // TODO: create filter
}

export async function updateUserInfo(user) {
  const url = `${BASE_URL}user`;
  const method = "PUT";
  const body = user;

  // Hvordan opdateres user med denne slags db?
  await fetchData(url, () => {}, method, body);
}

// #endregion
