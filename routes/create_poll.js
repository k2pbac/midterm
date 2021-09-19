/*
 * All routes for Create_Polls are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.get("/:poll_id/results", (req, res) => {
    db.query(`INSERT INTO polls (title, description, creator_id, created_at, updated_at, shared_link, results_link, is_active)
    VALUES ;`)
      .then(data => {
        const results = data.rows;
        res.json({ results });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });
  return router;
};
