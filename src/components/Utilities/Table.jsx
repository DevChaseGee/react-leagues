import SearchBar from "../TeamPage/SearchBar.jsx";
import TeamHeaderCol from "../TeamPage/TeamHeaderCol.jsx";

function Table({
  viewModel,
  columns,
  rows,
  sortCol,
  sortDir,
  filterText,
  onHandleFilter,
  onHandleSort,
}) {
  if (!columns || !rows) {
    console.log("Table.jsx: columns or rows is null!");
    return null;
  }

  return (
    <div className="col-sm-8">
      <SearchBar
        filterText={filterText}
        onFilterTextChange={onHandleFilter}
        title={viewModel.list.listTitle}
      />
      <table className={viewModel.list.tableClasses}>
        <thead>
          <tr>
            {columns.map((column) => (
              <TeamHeaderCol
                key={column.key}
                label={column.label}
                colName={column.key}
                sortCol={sortCol}
                sortDir={sortDir}
                onHandleSort={onHandleSort}
              />
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.id}>
              {columns.map((column) => {
                return <td key={column.key}>{row[column.key]}</td>;
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
