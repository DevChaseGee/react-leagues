import LocalStorageService from "../services/local_storage_service.js";
import TeamsAside from "../components/TeamPage/TeamsAside.jsx";
import TeamsList from "../components/TeamPage/TeamsList.jsx";
import AppViewModel from "../services/appViewModel.meta.js";

function TeamsPage() {
  let localStorage = new LocalStorageService(
    AppViewModel.data,
    AppViewModel.list.entity
  );

  return (
    <div id="team" className="col-12 mh-100">
      <div className="container-fluid">
        <div className="row">
          <TeamsAside />
          <TeamsList viewModel={AppViewModel} model={localStorage} />
        </div>
      </div>
    </div>
  );
}

export default TeamsPage;
