const express = require("express");
const cors = require("cors");
const expressValidator = require("express-validator");

const app = express();

var corsOptions = {
  origin: "http://localhost:3000",
};

app.use(cors(corsOptions));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.json({
    message:
      "This message is contained in the server.js! You have reached the server!",
  });
});

require("./routes/teams.routes")(app);
require("./routes/people.routes")(app);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
