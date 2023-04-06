import { FaSortUp, FaSortDown, FaSort } from "react-icons/fa";

function TeamHeaderCol({
  label,
  thClasses,
  colName,
  sortCol,
  sortDir,
  onHandleSort,
}) {
  let headerIcon = <FaSort />;
  if (colName === sortCol) {
    headerIcon = sortDir === "asc" ? <FaSortDown /> : <FaSortUp />;
  }
  const handleColumnClick = () => {
    onHandleSort(colName);
  };
  return (
    <>
      <th className={thClasses} onClick={handleColumnClick}>
        {" "}
        {label} {headerIcon}
      </th>
    </>
  );
}
export default TeamHeaderCol;
