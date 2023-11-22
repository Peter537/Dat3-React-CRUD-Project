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
