import TeamHeaderCol from "./TeamHeaderCol";

function TeamHeaderRow({ label, thClasses, sortCol, sortDir, onHandleSort }) {
  return (
    <tr>
      <TeamHeaderCol
        label="Name"
        thClasses={thClasses}
        colName="name"
        sortCol={sortCol}
        sortDir={sortDir}
        onHandleSort={onHandleSort}
      />
      <TeamHeaderCol
        label="Coach Name"
        thClasses={thClasses}
        colName="coachName"
        sortCol={sortCol}
        sortDir={sortDir}
        onHandleSort={onHandleSort}
      />
      <TeamHeaderCol
        label="Coach Phone"
        thClasses={thClasses}
        colName="coachPhone"
        sortCol={sortCol}
        sortDir={sortDir}
        onHandleSort={onHandleSort}
      />
      <TeamHeaderCol
        label="Coach Email"
        thClasses={thClasses}
        colName="coachEmail"
        sortCol={sortCol}
        sortDir={sortDir}
        onHandleSort={onHandleSort}
      />
      <th>Actions</th>
    </tr>
  );
}
export default TeamHeaderRow;
