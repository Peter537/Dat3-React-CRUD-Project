/* eslint-disable react/prop-types */
function UserInformation(props) {
  const { user, changeName, changePassword } = props;

  return (
    <>
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
              <td>{user?.id}</td>
              <td></td>
            </tr>
            <tr>
              <td>Name</td>
              <td>{user?.name}</td>
              <td>
                <input type="text" id="name" placeholder="New name" />
                <button id="changeName" onClick={changeName}>
                  Change
                </button>
              </td>
            </tr>
            <tr>
              <td>Password</td>
              <td>{user?.password}</td>
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
    </>
  );
}

export default UserInformation;
