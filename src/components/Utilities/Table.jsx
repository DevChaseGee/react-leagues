function Table({ viewModel, columns, rows }) {
  if (!columns || !rows) {
    console.log("Table.jsx: columns or rows is null!");
    return null;
  }

  return (
    <table className={viewModel.list.tableClasses}>
      <thead>
        <tr>
          {columns.map((column) => (
            <th key={column.key}>{column.label}</th>
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
  );
}

export default Table;
