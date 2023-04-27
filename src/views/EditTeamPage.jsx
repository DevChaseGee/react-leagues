import { Form } from "react-bootstrap";
import { Button } from "react-bootstrap";
import RestStorageService from "../services/rest_storage_service";
import { useEffect, useState } from "react";

function EditTeamPage() {
  const [oldTeam, setOldTeam] = useState({});
  const [oldCoach, setOldCoach] = useState({});

  const index = window.location.href.split("/").pop();

  useEffect(() => {
    let restStorage = new RestStorageService();

    async function getInfo() {
      let myTeam = await restStorage.get("teams", index);
      console.log("My team!", myTeam);
      setOldTeam(myTeam);

      let myCoach = await restStorage.get("people", myTeam.coach_id);
      setOldCoach(myCoach);
    }

    getInfo();
  }, [index]);

  let newTeam = {
    id: oldTeam.id,
    name: oldTeam.name,
    motto: oldTeam.motto,
    coach_id: oldTeam.coach_id,
  };

  let newCoach = {
    id: oldCoach.id,
    first_name: oldCoach.first_name,
    last_name: oldCoach.last_name,
    address1: oldCoach.address1,
    address2: oldCoach.address2,
    notes: oldCoach.notes,
    city: oldCoach.city,
    state: oldCoach.state,
    zip: oldCoach.zip,
    phone: oldCoach.phone,
    email: oldCoach.email,
    team_id: oldCoach.team_id,
    password: "random-password",
    user_name: "random-username",
    person_type: "coach",
  };

  return (
    <div className="form">
      <h1 className="form__title">Edit Team</h1>

      <Form>
        <div className="form__input">
          <Form.Label className="form__label">Team Name</Form.Label>
          <Form.Control
            onChange={(e) => (newTeam.name = e.target.value)}
            type="text"
            placeholder="Enter team name"
            defaultValue={newTeam.name}
          />
        </div>

        <div className="form__input">
          <Form.Label className="form__label">Team Motto</Form.Label>
          <Form.Control
            onChange={(e) => (newTeam.motto = e.target.value)}
            type="text"
            placeholder="Enter team motto"
            defaultValue={newTeam.motto}
          />
        </div>

        <h2 className="form__heading">Coach Information</h2>
        <hr className="form__hr"></hr>

        <div className="form__input">
          <Form.Label className="form__label">First Name</Form.Label>
          <Form.Control
            onInput={(e) => (newCoach.first_name = e.target.value)}
            type="text"
            placeholder="Enter coach first name..."
            defaultValue={newCoach.first_name}
          />
        </div>

        <div className="form__input">
          <Form.Label className="form__label">Last Name</Form.Label>
          <Form.Control
            onChange={(e) => (newCoach.last_name = e.target.value)}
            type="text"
            placeholder="Enter coach last name..."
            defaultValue={newCoach.last_name}
          />
        </div>

        <div className="form__input">
          <Form.Label className="form__label">Address 1</Form.Label>
          <Form.Control
            onChange={(e) => (newCoach.address1 = e.target.value)}
            type="text"
            placeholder="Enter coach address 1..."
            defaultValue={newCoach.address1}
          />
        </div>

        <div className="form__input">
          <Form.Label className="form__label">Address 2</Form.Label>
          <Form.Control
            onChange={(e) => (newCoach.address2 = e.target.value)}
            type="text"
            placeholder="Enter coach address 2..."
            defaultValue={newCoach.address2}
          />
        </div>
        <div className="form__input">
          <Form.Label className="form__label">City</Form.Label>
          <Form.Control
            onChange={(e) => (newCoach.city = e.target.value)}
            type="text"
            placeholder="Enter coach city..."
            defaultValue={newCoach.city}
          />
        </div>
        <div className="form__input">
          <Form.Label className="form__label">State</Form.Label>
          <Form.Control
            onChange={(e) => (newCoach.state = e.target.value)}
            type="text"
            placeholder="Enter coach state..."
            defaultValue={newCoach.state}
          />
        </div>
        <div className="form__input">
          <Form.Label className="form__label">Zip</Form.Label>
          <Form.Control
            onChange={(e) => (newCoach.zip = e.target.value)}
            type="text"
            placeholder="Enter coach zip..."
            defaultValue={newCoach.zip}
          />
        </div>
        <div className="form__input">
          <Form.Label className="form__label">Phone</Form.Label>
          <Form.Control
            onChange={(e) => (newCoach.phone = e.target.value)}
            type="text"
            placeholder="Enter coach phone..."
            defaultValue={newCoach.phone}
          />
        </div>
        <div className="form__input">
          <Form.Label className="form__label">Email</Form.Label>
          <Form.Control
            onChange={(e) => (newCoach.email = e.target.value)}
            type="text"
            placeholder="Enter coach email..."
            defaultValue={newCoach.email}
          />
        </div>
        <div className="form__input">
          <Form.Label className="form__label">Notes</Form.Label>
          <Form.Control
            onChange={(e) => (newCoach.notes = e.target.value)}
            type="text"
            placeholder="Enter coach notes..."
            defaultValue={newCoach.notes}
          />
        </div>

        <Button
          className="m-2 add-btn"
          variant="success"
          onClick={() => submitTeam(newTeam, newCoach)}
        >
          Update
        </Button>
      </Form>
    </div>
  );
}

function submitTeam(newTeam, newCoach) {
  let restStorage = new RestStorageService();

  restStorage.update("teams", newTeam.id, newTeam);

  restStorage.update("people", newCoach.id, newCoach).then(() => {
    window.location.href = "/teams";
  });
}

export default EditTeamPage;
