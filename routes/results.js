/*
 * All routes for Results are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */
/*Meg's version
const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.get("/", (req, res) => {
    db.query(`SELECT * FROM results;`)
      .then(data => {
        const results = data.rows;
        console.log(data.rows);
        res.json({ results });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
*/
const express = require("express");
const router = express.Router();

const algoHelpers = require("../helpers/algoHelpers");

module.exports = (algoHelpers) => {
  router.get("/polls/:poll_id/results", (req, res) => {
    const { poll_id } = req.params;
    console.log("Poll:", poll_id);
    //Still need to implement borda algo in function
    algoHelpers.applyBordaAlgo(poll_id).then((result) => res.json(result));
  });
  return router;
};
