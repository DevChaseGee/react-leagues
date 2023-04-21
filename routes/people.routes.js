module.exports = (app) => {
  const people = require("../controllers/people.controller.js");

  var router = require("express").Router();

  // Create a new Person
  router.post("/people/", people.create);

  // Retrieve all People
  router.get("/people/", people.findAll);

  // Retrieve a single Person with id
  router.get("/people/:id", people.findOne);

  // Retrieve a single Person with email
  router.get("/people/email/:email", people.findByEmail);

  // Update a Person with id
  router.put("/people/:id", people.update);

  // Delete a Person with id
  router.delete("/people/:id", people.delete);

  // Clear all the People
  router.delete("/people/", people.clear);

  app.use("/api", router);
};
