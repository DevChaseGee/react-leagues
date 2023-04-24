import LocalStorageService from "../services/local_storage_service.js";
import TeamsAside from "../components/TeamPage/TeamsAside.jsx";
import TeamsList from "../components/TeamPage/TeamsList.jsx";
import AppViewModel from "../services/appViewModel.meta.js";
import RestStorageService from "../services/rest_storage_service.js";
import Table from "../components/Utilities/Table.jsx";
import { useEffect, useState } from "react";
import { FaEdit } from "react-icons/fa";
import { Button } from "react-bootstrap";
import DeleteButton from "../components/TeamPage/DeleteButton.jsx";
import DeleteAlert from "../components/TeamPage/DeleteAlert.jsx";

function TeamsPage() {
  let localStorage = new LocalStorageService(
    AppViewModel.data,
    AppViewModel.list.entity
  );

  let columns = [
    { key: "name", label: "Name" },
    { key: "coachName", label: "Coach Name" },
    { key: "coachPhone", label: "Coach Phone" },
    { key: "coachEmail", label: "Coach Email" },
    { key: "actions", label: "Actions" },
  ];

  const [sortCol, setSortCol] = useState("name");
  const [sortDir, setSortDir] = useState("asc");
  const [filterText, setFilterText] = useState("");
  const [teams, setTeams] = useState([]);
  const [show, setShow] = useState(false);

  function onHandleFilter(value) {
    setFilterText(value);
  }

  function onHandleSort(newSortCol) {
    let currentDirection = sortDir;

    if (sortCol === newSortCol) {
      setSortDir(currentDirection === "asc" ? "desc" : "asc");
    } else {
      setSortDir("asc");
    }

    setSortCol(newSortCol);
  }

  function onHandleDelete(id) {
    let restStorage = new RestStorageService();
    restStorage.delete("teams", id);

    setShow(true);
  }

  function onHandleAlert() {
    setShow(false);
  }

  useEffect(() => {
    let restStorage = new RestStorageService();

    async function getTeams() {
      let myList;

      if (filterText === "") {
        myList = await restStorage.list(
          "teams",
          `?sortCol=${sortCol}&sortDir=${sortDir}&limit=10&offset=0`
        );
      } else {
        myList = await restStorage.list(
          "teams",
          `?sortCol=${sortCol}&sortDir=${sortDir}&filterCol=name&filterStr=${filterText}&limit=10&offset=0`
        );
      }

      let formattedTeams = [];
      for (let team of myList) {
        let coach = await restStorage.get("people", team.coach_id);
        team.coachName = coach.first_name + " " + coach.last_name;
        team.coachPhone = coach.phone;
        team.coachEmail = coach.email;
        team.actions = (
          <div>
            <Button id={team.id} className="m-2" variant="primary">
              <FaEdit />
            </Button>
            <DeleteButton
              bodyText={"Are you sure you want to delete this team?"}
              noText="No"
              confirmText="Yes"
              title="Confirm Delete?"
              iconClass="fa fa-trash"
              itemKey={team.id}
              callback={onHandleDelete}
            />
          </div>
        );

        formattedTeams.push(team);
      }

      setTeams(formattedTeams);
    }

    getTeams();
  }, [sortCol, sortDir, filterText, show]);

  return (
    <div id="team" className="col-12 mh-100">
      <div className="container-fluid">
        <div className="row">
          <TeamsAside />
          {/* <TeamsList viewModel={AppViewModel} model={localStorage} /> */}
          <DeleteAlert show={show} onHandleHideAlert={onHandleAlert} />
          <Table
            viewModel={AppViewModel}
            columns={columns}
            rows={teams}
            sortCol={sortCol}
            sortDir={sortDir}
            filterText={filterText}
            onHandleFilter={onHandleFilter}
            onHandleSort={onHandleSort}
          />
        </div>
        <div className="row-buttons">
          <Button className="m-2 add-btn" variant="success" href="/add-team">
            Add Team
          </Button>
        </div>
      </div>
    </div>
  );
}

export default TeamsPage;
