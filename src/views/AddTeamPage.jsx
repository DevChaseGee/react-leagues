import { Form } from "react-bootstrap";
import { Button } from "react-bootstrap";
import RestStorageService from "../services/rest_storage_service";

function AddTeamPage() {
  let newTeam = {
    name: "",
    motto: "",
    coach_id: "",
  };

  let newCoach = {
    first_name: "",
    last_name: "",
    address1: "",
    address2: "",
    notes: "",
    city: "",
    state: "",
    zip: "",
    phone: "",
    email: "",
    team_id: 1,
    password: "myPassword",
    user_name: "random-username",
    person_type: "coach",
  };

  return (
    <div className="form">
      <h1 className="form__title">Add Team</h1>

      <Form>
        <div className="form__input">
          <Form.Label className="form__label">Team Name</Form.Label>
          <Form.Control
            onChange={(e) => (newTeam.name = e.target.value)}
            type="text"
            placeholder="Enter team name"
          />
        </div>

        <div className="form__input">
          <Form.Label className="form__label">Team Motto</Form.Label>
          <Form.Control
            onChange={(e) => (newTeam.motto = e.target.value)}
            type="text"
            placeholder="Enter team motto"
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
          />
        </div>

        <div className="form__input">
          <Form.Label className="form__label">Last Name</Form.Label>
          <Form.Control
            onChange={(e) => (newCoach.last_name = e.target.value)}
            type="text"
            placeholder="Enter coach last name..."
          />
        </div>

        <div className="form__input">
          <Form.Label className="form__label">Address 1</Form.Label>
          <Form.Control
            onChange={(e) => (newCoach.address1 = e.target.value)}
            type="text"
            placeholder="Enter coach address 1..."
          />
        </div>

        <div className="form__input">
          <Form.Label className="form__label">Address 2</Form.Label>
          <Form.Control
            onChange={(e) => (newCoach.address2 = e.target.value)}
            type="text"
            placeholder="Enter coach address 2..."
          />
        </div>
        <div className="form__input">
          <Form.Label className="form__label">City</Form.Label>
          <Form.Control
            onChange={(e) => (newCoach.city = e.target.value)}
            type="text"
            placeholder="Enter coach city..."
          />
        </div>
        <div className="form__input">
          <Form.Label className="form__label">State</Form.Label>
          <Form.Control
            onChange={(e) => (newCoach.state = e.target.value)}
            type="text"
            placeholder="Enter coach state..."
          />
        </div>
        <div className="form__input">
          <Form.Label className="form__label">Zip</Form.Label>
          <Form.Control
            onChange={(e) => (newCoach.zip = e.target.value)}
            type="text"
            placeholder="Enter coach zip..."
          />
        </div>
        <div className="form__input">
          <Form.Label className="form__label">Phone</Form.Label>
          <Form.Control
            onChange={(e) => (newCoach.phone = e.target.value)}
            type="text"
            placeholder="Enter coach phone..."
          />
        </div>
        <div className="form__input">
          <Form.Label className="form__label">Email</Form.Label>
          <Form.Control
            onChange={(e) => (newCoach.email = e.target.value)}
            type="text"
            placeholder="Enter coach email..."
          />
        </div>
        <div className="form__input">
          <Form.Label className="form__label">Notes</Form.Label>
          <Form.Control
            onChange={(e) => (newCoach.notes = e.target.value)}
            type="text"
            placeholder="Enter coach notes..."
          />
        </div>

        <Button
          className="m-2 add-btn"
          variant="success"
          onClick={() => submitTeam(newTeam, newCoach)}
        >
          Add Team
        </Button>
      </Form>
    </div>
  );
}

function submitTeam(newTeam, newCoach) {
  let restStorage = new RestStorageService();

  restStorage.create("people", newCoach).then(() => {
    restStorage.getByEmail("people", newCoach.email).then((data) => {
      console.log(data);

      newTeam.coach_id = data.id;

      restStorage.create("teams", newTeam).then((data) => {
        // Once the team is created, redirect to the teams page
        window.location.href = "/teams";
      });
    });
  });
}

export default AddTeamPage;
