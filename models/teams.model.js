const sql = require("./db.js");
const { check } = require("express-validator");

// constructor
const Team = function (team) {
  this.id = team.id;
  this.name = team.name;
  this.coach_id = team.coach_id;
  this.motto = team.motto;
};

Team.create = (newTeam, result) => {
  // Insert a new team into the teams table don't allow duplicate teams
  sql.query("SELECT * FROM teams WHERE name = ?", newTeam.name, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    if (res.length) {
      console.log("duplicate team found! ", res[0]);
      result("duplicate team found!", res[0]);
      return;
    } else {
      sql.query("INSERT INTO teams SET ?", newTeam, (err, insertResult) => {
        if (err) {
          console.log("error: ", err);
          result(err, null);
          return;
        }

        let prettyResult = {
          id: insertResult.insertId,
          name: newTeam.name,
          coach_id: newTeam.coach_id,
          motto: newTeam.motto,
        };

        console.log("created team: ", prettyResult);

        result(null, prettyResult);
        return;
      });
    }
  });
};

Team.findById = (teamId, result) => {
  sql.query(`SELECT * FROM teams WHERE id = ${teamId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found team: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Team with the id
    result({ kind: "not_found" }, null);
  });
};

Team.getAll = (params, result) => {
  console.log("params: ", params);
  if (!params.sortCol) {
    console.log("NO PARAMS");
    sql.query("SELECT * FROM teams", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      console.log("teams: ", res);
      result(null, res);
    });
  } else {
    if (params.filterCol && params.filterStr) {
      console.log("FILTER PARAMS");
      sql.query(
        `SELECT * FROM teams WHERE ${params.filterCol} = "${
          params.filterStr
        }" ORDER BY ${params.sortCol}${
          params.sortDir === "desc" ? " DESC" : ""
        } LIMIT ${params.limit} OFFSET ${params.offset}`,
        (err, res) => {
          if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
          }

          console.log("teams: ", res);
          result(null, res);
        }
      );
    } else {
      console.log("SORT PARAMS");
      sql.query(
        `SELECT * FROM teams ORDER BY ${params.sortCol}${
          params.sortDir === "desc" ? " DESC" : ""
        } LIMIT ${params.limit} OFFSET ${params.offset}`,
        (err, res) => {
          if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
          }

          console.log("teams: ", res);
          result(null, res);
        }
      );
    }
  }
};

Team.updateById = (id, team, result) => {
  sql.query(
    "UPDATE teams SET name = ?, coach_id = ?, motto = ? WHERE id = ?",
    [team.name, team.coach_id, team.motto, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Team with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated team: ", { id: id, ...team });
      result(null, { id: id, ...team });
    }
  );
};

Team.remove = (id, result) => {
  sql.query(`DELETE FROM teams WHERE id = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Team with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted team with id: ", id);
    result(null, res);
  });
};

Team.clear = (result) => {
  sql.query("DELETE FROM teams", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} teams`);
    result(null, res);
  });
};

module.exports = Team;
