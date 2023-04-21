const Teams = require("../models/teams.model.js");
const { check, validationResult } = require("express-validator");

// Create and Save a new Team
exports.create = (req, res) => {
  // Check for validation errors
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

  // Create a Team
  const team = new Teams({
    name: req.body.name,
    coach_id: req.body.coach_id,
    motto: req.body.motto,
  });

  // Save Team in the database
  Teams.create(team, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Team.",
      });
    else res.send(data);
  });
};

// Retrieve all Teams from the database.
exports.findAll = (req, res) => {
  Teams.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving teams.",
      });
    else res.send(data);
  });
};

// Find a single Team with a teamId
exports.findOne = (req, res) => {
  Teams.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Team with id ${req.params.teamId}.`,
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Team with id " + req.params.teamId,
        });
      }
    } else res.send(data);
  });
};

// Update a Team identified by the teamId in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  Teams.updateById(req.params.id, new Teams(req.body), (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Team with id ${req.params.teamId}.`,
        });
      } else {
        res.status(500).send({
          message: "Error updating Team with id " + req.params.teamId,
        });
      }
    } else res.send(data);
  });
};

// Delete a Team with the specified teamId in the request
exports.delete = (req, res) => {
  Teams.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Team with id ${req.params.teamId}.`,
        });
      } else {
        res.status(500).send({
          message: "Could not delete Team with id " + req.params.teamId,
        });
      }
    } else res.send({ message: `Team was deleted successfully!` });
  });
};

// Delete all Teams from the database.
exports.clear = (req, res) => {
  Teams.clear((err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while removing all teams.",
      });
    else res.send({ message: `All Teams were deleted successfully!` });
  });
};

// Validate the request body for the createTeam route
exports.validate = (method) => {
  switch (method) {
    case "createTeam": {
      return [
        check("name", "Name is required").exists().trim().escape(),
        check("coach_id", "Coach ID is required").exists().trim().escape(),
        check("motto", "Motto is required").exists().trim().escape(),
      ];
    }
    case "findTeam": {
      return [check("id", "ID is required").exists()];
    }
    case "updateTeam": {
      return [
        check("id", "ID is required").exists().trim().escape(),
        check("name", "Name is required").exists().trim().escape(),
        check("coach_id", "Coach ID is required").exists().trim().escape(),
        check("motto", "Motto is required").exists().trim().escape(),
      ];
    }
    case "deleteTeam": {
      return [check("id", "ID is required").exists().trim().escape()];
    }
    default: {
      return [];
    }
  }
};
