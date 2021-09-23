/*
 * All routes for Polls are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require("express");
const router = express.Router();

module.exports = (db) => {
  const pollOptions = () => {
    db.query(`SELECT * FROM options;`)
      .then((data) => {
        const options = data.rows;
        console.log(data.rows);
        return { options };
      })
      .catch((err) => {
        // res.status(500).json({ error: err.message });
        return {error: err.message};
      });
  };

  router.get("/", (req, res) => {
    pollOptions(options)
      .then((options) => {
        res.send({ options });
      })
      .catch((err) => {
        console.error(err);
        res.send(err);
      });
  });

  return router;
};
