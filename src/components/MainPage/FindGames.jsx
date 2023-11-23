/* eslint-disable react/prop-types */
function FindGames(props) {
  const { findGames, loadFindGames, joinOtherGame } = props;

  return (
    <>
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
              <td>{`Player with ID '${game.players[0].id}'`}</td>
              <td>
                <button onClick={() => joinOtherGame(game.id)}>Join</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default FindGames;
