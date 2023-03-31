import { useEffect } from "react";
import AppController from "../services/controller/app_controller.js";
import Modal from "../components/Modal.jsx";

function TeamsPage() {
  useEffect(() => {
    let app = new AppController();

    app.render();
  });

  return (
    <div id="teams" className="container">
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
      <Modal />
    </div>
  );
}

export default TeamsPage;
