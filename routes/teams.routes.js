module.exports = (app) => {
  const teams = require("../controllers/teams.controller.js");

  var router = require("express").Router();

  // Create a new Team
  router.post("/teams/", teams.validate("createTeam"), teams.create);

  // Retrieve all Teams
  router.get("/teams/", teams.findAll);

  // Retrieve a single Team with id
  router.get("/teams/:id", teams.validate("findTeam"), teams.findOne);

  // Update a Team with id
  router.put("/teams/:id", teams.validate("updateTeam"), teams.update);

  // Delete a Team with id
  router.delete("/teams/:id", teams.validate("deleteTeam"), teams.delete);

  // Clear all the Teams
  router.delete("/teams/", teams.clear);

  app.use("/api", router);
};
