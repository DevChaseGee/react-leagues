import Modal from "../Modal.jsx";
import SearchBar from "./SearchBar.jsx";
import TeamsTable from "./TeamsTable.jsx";
import Button from "react-bootstrap/Button";
import { useState } from "react";
import DeleteAlert from "./DeleteAlert.jsx";

function TeamsList({ viewModel, model }) {
  const [filterText, setFilterText] = useState("");
  const [data, updateData] = useState(model.list());
  const [show, setShow] = useState(false);

  function handleReset() {
    model.reset();
    updateData(model.list());
  }

  function handleDelete(id) {
    model.delete(id);
    updateData(model.list());
    setShow(true);
  }

  function handleHideAlert() {
    setShow(false);
  }

  function handleSort(sortCol) {
    let currentDirection = model.sortDir;

    if (model.sortCol === sortCol) {
      model.sortDir = currentDirection === "asc" ? "desc" : "asc";
    } else {
      model.sortDir = "asc";
    }

    model.sortCol = sortCol;
    model.sort(model.sortCol, model.sortDir, true);

    updateData(model.list());
  }

  function handleFilter(value) {
    model.filterStr = value;
    setFilterText(value);
    updateData(model.list());
  }

  return (
    <div className="col-sm-8">
      <div className="row">
        <div className="col text-center my-3">
          <h1>Teams</h1>
        </div>
      </div>
      <div className="row">
        <div className="col text-center my-3">
          <DeleteAlert show={show} onHandleHideAlert={handleHideAlert} />
        </div>
      </div>
      <div className="row">
        <SearchBar
          filterText={filterText}
          onFilterTextChange={handleFilter}
          title={viewModel.list.listTitle}
        />
        <div id="alertPlaceHolder" />
        <TeamsTable
          teams={data}
          sortCol={model.sortCol}
          sortDir={model.sortDir}
          viewModel={viewModel}
          onHandleDelete={handleDelete}
          onHandleSort={handleSort}
        />
        <Button
          variant="primary"
          id="resetBtn"
          onClick={(e) => {
            handleReset();
          }}
        >
          Reset
        </Button>
      </div>
      <Modal />
    </div>
  );
}

export default TeamsList;
