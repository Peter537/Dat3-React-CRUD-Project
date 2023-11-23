import "bootstrap/dist/css/bootstrap.min.css";
import { createGame, readGamesByUser, deleteGame, readGamesUserIsNotIn, updateUserInfo } from "../api/api.js";
import { useEffect, useState } from "react";
import UserInformation from "../components/MainPage/UserInformation.jsx";
import YourGames from "../components/MainPage/YourGames.jsx";
import FindGames from "../components/MainPage/FindGames.jsx";

const deleteGames2 = [
  {
    id: 4,
    status: "NOT_STARTED",
    opponent: "player: 1",
  },
  {
    id: 5,
    status: "NOT_STARTED",
    opponent: "player: 2",
  },
];

function MainPage() {
  const [games, setGames] = useState([]);
  const [findGames, setFindGames] = useState([]); // TODO: Implement findGames
  const [user, setUser] = useState(JSON.parse(sessionStorage.getItem("user")));

  useEffect(() => {
    console.log("useEffect");
    sessionStorage.removeItem("gameId"); // Reset game session storage (if any game is stored)
    if (user === undefined || user === null) {
      window.location.replace("/"); // If user is not logged in, redirect to login page
      return;
    }

    async function loadGames() {
      console.log("getGames");
      let games = await readGamesByUser(user.id);
      setGames(games);
    }
    loadGames();
  }, [user]);

  async function createNewGame(againstAI) {
    if (!againstAI) {
      alert("Not implemented yet");
      return;
    }

    console.log("createNewGame");
    const game = {
      id: crypto.getRandomValues(new Uint32Array(1))[0],
      // STATUS: NOT_TAKEN, NOT_STARTED, IN_PROGRESS, FINISHED
      status: "NOT_STARTED",
      againstAI: againstAI,
      currentPlayer: 0,
      maxMana: 0,
      players: [
        {
          id: user.id,
          mana: 0,
          health: 30,
          hand: [],
          field: [],
        },
        {
          id: againstAI ? -1 : 0,
          mana: 0,
          health: 30,
          hand: [],
          field: [],
        },
      ],
    };
    console.log("game", game);
    await createGame(game);
    setGames([...games, game]);
  }

  function changeName() {
    console.log("changeName");
    let newName = document.getElementById("name").value;
    const { id, password } = user;
    let newUser = { id: id, name: newName, password: password };
    sessionStorage.setItem("user", JSON.stringify(newUser));
    updateUserInfo(newUser);
    setUser(newUser);
    document.getElementById("name").value = "";
  }

  function changePassword() {
    console.log("changePassword");
    let newPassword = document.getElementById("password").value;
    const { id, name } = user;
    let newUser = { id: id, name: name, password: newPassword };
    sessionStorage.setItem("user", JSON.stringify(newUser));
    updateUserInfo(newUser);
    setUser(newUser);
    document.getElementById("password").value = "";
  }

  async function loadFindGames() {
    console.log("loadFindGames");
    let g = await readGamesUserIsNotIn(user.id);
    g = deleteGames2; // TODO: DELETE WHEN PLAYER VS PLAYER IS IMPLEMENTED
    setFindGames(g);
  }

  async function deleteAGame(id) {
    console.log("deleteGame");
    await deleteGame(id);
    setGames(games.filter((game) => game.id !== id));
  }

  function joinGame(gameId) {
    sessionStorage.setItem("gameId", gameId);
    window.location.replace("/game");
  }

  return (
    <>
      <h1>Main Page</h1>
      <h2>Create new Game</h2>
      <button onClick={() => createNewGame(true)}>Against AI</button>
      <button onClick={() => createNewGame(false)}>Against Player</button>
      <h2>User Information</h2>
      {user === undefined ? (
        ""
      ) : (
        <UserInformation user={user} changeName={changeName} changePassword={changePassword} />
      )}
      <h2>Your Games</h2>
      <YourGames games={games} surrender={deleteAGame} joinGame={joinGame} />
      <h2>Find Games</h2>
      <FindGames findGames={findGames} loadFindGames={loadFindGames} />
    </>
  );
}

export default MainPage;
