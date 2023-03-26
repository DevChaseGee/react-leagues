function TeamTab() {
  return (
    <div id="teams" className="container tab-pane fade">
      <div className="row">
        <div className="col text-center my-3">
          <h1>Teams</h1>
        </div>
      </div>
      <div className="row">
        <div id="alertPlaceHolder" />
        <div id="tableContainer" className="table-responsive" />
        <button className="btn btn-md btn-primary" id="resetBtn">
          Reset
        </button>
      </div>
    </div>
  );
}

export default TeamTab;
