/* eslint-disable react/prop-types */
function YourGames(props) {
  const { games, surrender, joinGame } = props;

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
              <td>{game.opponent}</td>
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
