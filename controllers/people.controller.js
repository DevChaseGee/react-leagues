const People = require("../models/people.model.js");

// Create and Save a new Person
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  console.log(req.body);

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
    console.log(data);
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
  People.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving people.",
      });
    else res.send(data);
  });
};

// Find a single Person with a personId
exports.findOne = (req, res) => {
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
