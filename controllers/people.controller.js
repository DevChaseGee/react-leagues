const People = require("../models/people.model.js");
const { check, validationResult } = require("express-validator");

// Create and Save a new Person
exports.create = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  // Create a Person
  const person = new People({
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    address1: req.body.address1,
    address2: req.body.address2,
    notes: req.body.notes,
    city: req.body.city,
    state: req.body.state,
    zip: req.body.zip,
    team_id: req.body.team_id,
    email: req.body.email,
    phone: req.body.phone,
    password: req.body.password,
    user_name: req.body.user_name,
    person_type: req.body.person_type,
  });

  // Save Person in the database
  People.create(person, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Person.",
      });
    else res.send(data);
  });
};

// Retrieve all People from the database.
exports.findAll = (req, res) => {
  People.getAll(req.query, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving people.",
      });
    else res.send(data);
  });
};

// Find a single Person with a personId
exports.findOne = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  People.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Person with id ${req.params.personId}.`,
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Person with id " + req.params.personId,
        });
      }
    } else res.send(data);
  });
};

// Update a Person identified by the personId in the request
exports.update = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  People.updateById(req.params.id, new People(req.body), (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Person with id ${req.params.personId}.`,
        });
      } else {
        res.status(500).send({
          message: "Error updating Person with id " + req.params.personId,
        });
      }
    } else res.send(data);
  });
};

// Delete a Person with the specified personId in the request
exports.delete = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  People.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Person with id ${req.params.personId}.`,
        });
      } else {
        res.status(500).send({
          message: "Could not delete Person with id " + req.params.personId,
        });
      }
    } else res.send({ message: `Person was deleted successfully!` });
  });
};

exports.findByEmail = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  People.findByEmail(req.params.email, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Person with email ${req.params.email}.`,
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Person with email " + req.params.email,
        });
      }
    } else res.send(data);
  });
};

// Delete all People from the database.
exports.clear = (req, res) => {
  People.clear((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all people.",
      });
    else res.send({ message: `All People were deleted successfully!` });
  });
};

// Validate the request body for the createTeam route
exports.validate = (method) => {
  switch (method) {
    case "createPerson": {
      return [
        check("first_name", "First Name is required").exists().trim().escape(),
        check("last_name", "Last Name is required").exists().trim().escape(),
        check("address1", "Address 1 is required").exists().trim().escape(),
        check("address2", "Address 2 is required").exists().trim().escape(),
        check("city", "City is required").exists().trim().escape(),
        check("state", "State is required").exists().trim().escape(),
        check("zip", "Zip is required").exists().trim().escape(),
        check("team_id", "Team ID is required").exists().trim().escape(),
        check("email", "Email is required").exists().trim().escape(),
        check("phone", "Phone is required").exists().trim().escape(),
        check("password", "Password is required").exists().trim().escape(),
        check("user_name", "User Name is required").exists().trim().escape(),
        check("person_type", "Person Type is required")
          .exists()
          .trim()
          .escape(),
      ];
    }
    case "findPerson": {
      return [check("id", "ID is required").exists()];
    }
    case "findPersonByEmail": {
      return [check("email", "Email is required").exists()];
    }
    case "updatePerson": {
      return [
        check("id", "ID is required").exists().trim().escape(),
        check("first_name", "First Name is required").exists().trim().escape(),
        check("last_name", "Last Name is required").exists().trim().escape(),
        check("address1", "Address 1 is required").exists().trim().escape(),
        check("address2", "Address 2 is required").exists().trim().escape(),
        check("city", "City is required").exists().trim().escape(),
        check("state", "State is required").exists().trim().escape(),
        check("zip", "Zip is required").exists().trim().escape(),
        check("team_id", "Team ID is required").exists().trim().escape(),
        check("email", "Email is required").exists().trim().escape(),
        check("phone", "Phone is required").exists().trim().escape(),
        check("password", "Password is required").exists().trim().escape(),
        check("user_name", "User Name is required").exists().trim().escape(),
        check("person_type", "Person Type is required")
          .exists()
          .trim()
          .escape(),
      ];
    }
    case "deletePerson": {
      return [check("id", "ID is required").exists().trim().escape()];
    }
    default: {
      return [];
    }
  }
};
