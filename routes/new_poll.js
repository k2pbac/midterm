/*
 * All routes for Polls are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router = express.Router();

//On create button (etc)
module.exports = (db) => {
  const newPoll = (poll) => {
    db.query(`INSERT INTO polls (title, description, creator_id, created_at, updated_at, shared_link, results_link, is_active, max_submission)
    VALUES ($1, $2, $3, $4, $5, $6, $7 $8. $9) RETURNING *`, [poll.title, poll.description, poll.creator_id, poll.created_at, poll.updated_at, poll.shared_link, poll.results_link, poll.is_active, poll.max_submission]
    )
      .then(data => {
        const polls = data.rows[0];
        console.log(data.rows[0]);
        res.json({ polls });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  }

  router.get("/", (req, res) => {
    //page for new poll goes here
    res.render("new_poll");
  });

  router.post("/", (req, res) => {
    const userId = req.session.userId;
    const pollId = Math.random().toString(36).slice(2, 8);
    db.newPoll({ ...req.body, owner_id: userId, pollId })
      .then(poll => {
        res.send(poll);
      })
      .catch(err => {
        console.error(err);
        res.send(err)
      })
  })
  return router;
};

/*Kris' version
module.exports = (db) => {
  router.get("/polls/new", (req, res) => {
    //page for new poll goes here
    res.render("/");
  });
  router.post("/polls", (req, res) => {
    db.query(
      `INSERT INTO polls (title, description, creator_id, created_at, updated_at, shared_link, results_link, is_active)
    VALUES ($1, $2, $3, $4, $5, $6, $7 $8) RETURNING *`,
      [
        title,
        description,
        creator_id,
        created_at,
        updated_at,
        shared_link,
        results_link,
        is_active,
      ]
    )
      .then((data) => {
        const polls = data.rows[0];
        res.json({ polls });
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });
  return router;
};
*/
