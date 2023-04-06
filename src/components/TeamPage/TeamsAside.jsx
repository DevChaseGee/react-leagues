function TeamsAside() {
  return (
    <div className="col-4 shadow-lg rounded-3 p-3 mb-3 bg-black bg-gradient bg-opacity-75 text-white table-responsive">
      <h3>Match Results</h3>
      <table className="table table-striped table-hover table-dark">
        <thead>
          <tr>
            <th className="bg-black bg-gradient" scope="col">
              Team Name
            </th>
            <th className="bg-black bg-gradient" scope="col">
              Wins
            </th>
            <th className="bg-black bg-gradient" scope="col">
              Kills
            </th>
            <th className="bg-black bg-gradient" scope="col">
              Points
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Cloud9</td>
            <td>2</td>
            <td>10</td>
            <td>34</td>
          </tr>
          <tr>
            <td>Team Liquid</td>
            <td>1</td>
            <td>8</td>
            <td>30</td>
          </tr>
          <tr>
            <td>NRG</td>
            <td>4</td>
            <td>18</td>
            <td>66</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default TeamsAside;
