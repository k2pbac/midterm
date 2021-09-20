const express = require('express');
const router  = express.Router();

app.get("/results", (req, res) => {
  res.render("results");
});

module.exports = (db) => {
  router.get("/results", (req, res) => {
    db.query(`SELECT * FROM users;`)
      .then(data => {
        const users = data.rows;
        console.log(users)
        res.json({ users });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });
  return router;
};
