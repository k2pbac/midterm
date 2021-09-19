/*
 * All routes for Polls are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.get("/new_poll", (req, res) => {
    db.query(`INSERT INTO polls (title, description, creator_id, created_at, updated_at, shared_link, results_link, is_active)
    VALUES ($1, $2, $3, $4, $5, $6, $7 $8) RETURNING *`, [title, description, creator_id, created_at, updated_at, shared_link, results_link, is_active])
      .then(data => {
        const polls = data.rows[0];
        res.json({ polls });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });
  return router;
};
