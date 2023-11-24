import "bootstrap/dist/css/bootstrap.min.css";
import {
  createGame,
  readGamesByUser,
  deleteGame,
  readGamesUserIsNotIn,
  updateUserInfo,
  getGameById,
  updateGame,
} from "../api/api.js";
import { useEffect, useState } from "react";
import UserInformation from "../components/MainPage/UserInformation.jsx";
import YourGames from "../components/MainPage/YourGames.jsx";
import FindGames from "../components/MainPage/FindGames.jsx";

function MainPage() {
  const [games, setGames] = useState([]);
  const [findGames, setFindGames] = useState([]); // TODO: Implement findGames
  const [user, setUser] = useState(JSON.parse(sessionStorage.getItem("user")));

  useEffect(() => {
    sessionStorage.removeItem("gameId"); // Reset game session storage (if any game is stored)
    if (user === undefined || user === null) {
      window.location.replace("/"); // If user is not logged in, redirect to login page
      return;
    }

    async function loadGames() {
      let games = await readGamesByUser(user.id);
      setGames(games);
    }
    loadGames();
  }, [user]);

  async function createNewGame(againstAI) {
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
    await createGame(game);
    setGames([...games, game]);
  }

  function changeName() {
    handleChange("name", document.getElementById("name").value);
    document.getElementById("name").value = "";
  }

  function changePassword() {
    handleChange("password", document.getElementById("password").value);
    document.getElementById("password").value = "";
  }

  function handleChange(name, value) {
    let newUser = { ...user, [name]: value };
    setUser(newUser);
    updateUserInfo(newUser);
    sessionStorage.setItem("user", JSON.stringify(newUser));
  }

  async function loadFindGames() {
    let foundGames = await readGamesUserIsNotIn(user.id);
    setFindGames(foundGames);
  }

  async function deleteAGame(id) {
    await deleteGame(id);
    setGames(games.filter((game) => game.id !== id));
  }

  function joinGame(gameId) {
    sessionStorage.setItem("gameId", gameId);
    window.location.replace("/game");
  }

  async function joinOtherGame(gameId) {
    console.log("joinOtherGame");
    let game = await getGameById(gameId);
    if (game.players[1].id === 0) {
      game.players[1].id = user.id;
      await updateGame(game);
      setGames([...games, game]);
      sessionStorage.setItem("gameId", gameId);
      window.location.replace("/game");
    }
  }

  return (
    <div className="container row">
      <h1>Main Page</h1>
      <div className="row" style={{ marginBottom: "40px" }}>
        <h2>Create new Game</h2>
        <div className="row">
          <div className="col-4"></div>
          <button className="btn btn-primary col-2" onClick={() => createNewGame(true)} style={{ marginRight: "10px" }}>
            Against AI
          </button>
          <button className="btn btn-primary col-2" onClick={() => createNewGame(false)} style={{ marginLeft: "10px" }}>
            Against Player
          </button>
        </div>{" "}
      </div>
      <div className="row" style={{ marginBottom: "40px" }}>
        <div className="col-6">
          <h2>User Information</h2>
          <UserInformation user={user} changeName={changeName} changePassword={changePassword} />
        </div>
        <div className="col-6">
          <h2>Your Games</h2>
          <YourGames user={user} games={games} surrender={deleteAGame} joinGame={joinGame} />
        </div>
      </div>
      <h2>Find Games</h2>
      <FindGames findGames={findGames} loadFindGames={loadFindGames} joinOtherGame={joinOtherGame} />
    </div>
  );
}

export default MainPage;
