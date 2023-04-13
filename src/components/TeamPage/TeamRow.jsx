import Button from "react-bootstrap/Button";
import { FaEdit } from "react-icons/fa";
import Popover from "react-bootstrap/Popover";
import Image from "react-bootstrap/Image";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import DeleteButton from "./DeleteButton";

function TeamRow({ team, id, onHandleDelete, onHandleEdit }) {
  let deletePrompt = `Are you sure you want to delete ${team.name}?`;

  const popover = (
    <Popover id="popover-basic" style={{ color: "black" }}>
      <Popover.Header as="h3">
        <Image
          src={team.logo}
          roundedCircle
          width="50"
          height="50"
          style={{ marginRight: "20px" }}
        />
        {team.name}
      </Popover.Header>
      <Popover.Body>{team.motto}</Popover.Body>
    </Popover>
  );

  return (
    <OverlayTrigger
      trigger={["hover", "focus"]}
      placement="auto"
      overlay={popover}
      delay={{ show: 250, hide: 400 }}
    >
      <tr key={id}>
        <td>{team.name}</td>
        <td>{team.coachName}</td>
        <td>{team.coachPhone}</td>
        <td>{team.coachEmail}</td>
        <td>
          <Button className="m-2" variant="primary" onClick={onHandleEdit}>
            <FaEdit />
          </Button>
          <DeleteButton
            bodyText={deletePrompt}
            noText="No"
            confirmText="Yes"
            title="Confirm Delete?"
            iconClass="fa fa-trash"
            itemKey={id}
            callback={onHandleDelete}
          />
        </td>
      </tr>
    </OverlayTrigger>
  );
}
export default TeamRow;
