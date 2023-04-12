import TeamRow from "./TeamRow";
import TeamHeaderRow from "./TeamHeaderRow";

function TeamsTable({
  teams,
  viewModel,
  sortCol,
  sortDir,
  onHandleDelete,
  onHandleSort,
  onHandleEdit,
}) {
  const listItems = teams.map((team) => (
    <TeamRow
      key={team.id}
      id={team.id}
      team={team}
      onHandleDelete={onHandleDelete}
      onHandleEdit={onHandleEdit}
    />
  ));

  return (
    <table className={viewModel.list.tableClasses}>
      <thead>
        <TeamHeaderRow
          thClasses={viewModel.list.thClasses}
          sortCol={sortCol}
          sortDir={sortDir}
          onHandleSort={onHandleSort}
        />
      </thead>
      <tbody>{listItems}</tbody>
    </table>
  );
}

export default TeamsTable;
