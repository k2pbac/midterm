/*
 * All routes for Polls are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require("express");
const router = express.Router();

module.exports = (db) => {
  const newPoll = (poll) => {
    return db
      .query(
        `INSERT INTO polls (title, description, creator_id, created_at, updated_at, shared_link, results_link, is_active, max_submission)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *`,
        [
          poll.title,
          poll.description,
          poll.creator_id,
          poll.created_at,
          poll.updated_at,
          poll.shared_link,
          poll.results_link,
          poll.is_active,
          poll.max_submission,
        ]
      )
      .then((data) => {
        const polls = data.rows[0];
        console.log("Data", data.rows[0]);
        return polls;
      })
      .catch((err) => {
        // res
        //   .status(500)
        //   .json({ error: err.message });
        console.log({ error: err.message });
        return { error: err.message };
      });
  };

  router.post("/", (req, res) => {
    const user_id = req.session.user_id;
    const poll_id = Math.random().toString(36).slice(2, 8);
    const shared_link = `http://www.localhost:8080/api/polls/${poll_id}`;
    const results_link = `http://www.localhost:8080/api/polls/${poll_id}/results`;
    const is_active = true;
    console.log(req.body);
    newPoll({
      ...req.body,
      creator_id: user_id,
      poll_id,
      shared_link,
      results_link,
      is_active,
    })
      .then((poll) => {
        res.send(poll);
      })
      .catch((err) => {
        console.log(err.message);
        console.error(err);
        res.send(err);
      });
  });

  router.get("/", (req, res) => {
    //page for new poll goes here
    res.render("new_poll");
  });

  return router;
};
