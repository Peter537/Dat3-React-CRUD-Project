import "bootstrap/dist/css/bootstrap.min.css";
import { createGame, readGamesByUser, readGamesUserIsNotIn, updateUserInfo } from "../api/api.js";
import { useEffect, useState } from "react";

const a = 1;
const b = 2;
const deleteGames = [
  {
    id: 1,
    status: "IN_PROGRESS",
    opponent: "player: 2",
  },
  {
    id: 2,
    status: "FINISHED",
    opponent: "AI",
  },
  {
    id: 3,
    status: "NOT_STARTED",
    opponent: "AI",
  },
];
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
  const user = JSON.parse(sessionStorage.getItem("user"));

  useEffect(() => {
    async function loadGames() {
      console.log("getGames");
      let games;
      if (b > a) {
        games = deleteGames;
      } else {
        games = await readGamesByUser(user.id);
      }
      setGames(games);
    }
    loadGames();
  }, [user]);

  async function createNewGame(againstAI) {
    console.log("createNewGame");
    if (b > a) {
      return; // TODO: Fjern når game objekt er fundet ud af
    }

    const game = {
      id: crypto.getRandomValues(new Uint32Array(1))[0],
      status: "NOT_STARTED",
      againstAI: againstAI,
      players: [
        {
          player_id: user.id,
          // TODO: Add default attributes
        },
      ],
    };
    await createGame(user.id, game);
    setGames([...games, game]);
  }

  function changeName() {
    console.log("changeName");
    let newName = document.getElementById("name").value;
    let newUser = user;
    newUser.name = newName;
    sessionStorage.setItem("user", JSON.stringify(newUser));
    updateUserInfo(user);
  }

  function changePassword() {
    console.log("changePassword");
    let newPassword = document.getElementById("password").value;
    let newUser = user;
    newUser.password = newPassword;
    sessionStorage.setItem("user", JSON.stringify(newUser));
    updateUserInfo(user);
  }

  async function loadFindGames() {
    console.log("loadFindGames");
    let g = await readGamesUserIsNotIn(user.id);
    g = deleteGames2;
    setFindGames(g);
  }

  return (
    <>
      <h1>Main Page</h1>
      <h2>Create new Game</h2>
      <button onClick={() => createNewGame(true)}>Against AI</button>
      <button onClick={() => createNewGame(false)}>Against Player</button>
      <h2>User Information</h2>
      <div>
        <table className="table table-striped table-hover">
          <thead>
            <tr>
              <th>Key</th>
              <th>Value</th>
              <th>Options</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>ID</td>
              <td>{user.id}</td>
              <td></td>
            </tr>
            <tr>
              <td>Name</td>
              <td>{user.name}</td>
              <td>
                <input type="text" id="name" placeholder="New name" />
                <button id="changeName" onClick={changeName}>
                  Change
                </button>
              </td>
            </tr>
            <tr>
              <td>Password</td>
              <td>{user.password}</td>
              <td>
                <input type="password" id="password" placeholder="New password" />
                <button id="changePassword" onClick={changePassword}>
                  Change
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <h2>Your Games</h2>
      <table className="table table-striped table-hoved">
        <thead>
          <tr>
            <th>Game ID</th>
            <th>Status</th>
            <th>Opponent</th>
            <th>Options</th>
          </tr>
        </thead>
        <tbody>
          {games.map((game) => (
            <tr key={game.id}>
              <td>{game.id}</td>
              <td>{game.status}</td>
              <td>{game.opponent}</td>
              <td>
                <button>Surrender</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <h2>Find Games</h2>
      <button onClick={loadFindGames}>Load Game</button>
      <table className="table table-striped table-hoved">
        <thead>
          <tr>
            <th>Game ID</th>
            <th>Status</th>
            <th>Opponent</th>
            <th>Options</th>
          </tr>
        </thead>
        <tbody>
          {findGames.map((game) => (
            <tr key={game.id}>
              <td>{game.id}</td>
              <td>{game.status}</td>
              <td>{game.opponent}</td>
              <td>
                <button>Join</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default MainPage;
