/* eslint-disable react/prop-types */
function YourGames(props) {
  const { user, games, surrender, joinGame } = props;

  function getOpponent(game) {
    if (game.againstAI) {
      return "AI";
    }

    if (game.players[1].id === 0) {
      return "Waiting for player";
    }

    if (game.players[0].id === user.id) {
      return "Player with ID: '" + game.players[1].id + "'";
    }

    return "Player with ID: '" + game.players[0].id + "'";
  }

  return (
    <>
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
              <td>{getOpponent(game)}</td>
              <td>
                <button onClick={() => joinGame(game.id)}>Join</button>
                <button onClick={() => surrender(game.id)}>Surrender</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default YourGames;
