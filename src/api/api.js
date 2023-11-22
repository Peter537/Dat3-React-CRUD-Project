// API
import { fetchData } from "../modules/utils.mjs";

const BASE_URL = "http://localhost:3001/";

// #region Login

function login(username, password) {
  const url = `${BASE_URL}login`;
  const method = "POST";
  const body = { username, password };

  fetchData(
    url,
    (data) => {
      console.log(data);
    },
    method,
    body
  );
}

// #endregion
