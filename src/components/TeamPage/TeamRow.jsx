import Button from "react-bootstrap/Button";
import { FaEdit, FaTrash } from "react-icons/fa";

function TeamRow({ team, id, onHandleDelete, onHandleEdit }) {
  return (
    <tr key={id}>
      <td>{team.name}</td>
      <td>{team.coachName}</td>
      <td>{team.coachPhone}</td>
      <td>{team.coachEmail}</td>
      <td>
        <Button className="m-2" variant="primary" onClick={onHandleEdit}>
          <FaEdit />
        </Button>
        <Button className="m-2" variant="primary" onClick={onHandleDelete}>
          <FaTrash />
        </Button>
      </td>
    </tr>
  );
}
export default TeamRow;
