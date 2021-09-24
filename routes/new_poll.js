/*
 * All routes for Polls are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require("express");
const router = express.Router();

module.exports = (pollHelpers) => {
  router.post("/", (req, res) => {
    const user_id = req.session.user_id;
    const poll_id = Math.random().toString(36).slice(2, 8);
    const shared_link = `http://www.localhost:8080/api/polls/${poll_id}`;
    const results_link = `http://www.localhost:8080/api/polls/${poll_id}/results`;
    const is_active = true;
    pollHelpers
      .newPoll({
        ...req.body,
        creator_id: user_id,
        poll_id,
        shared_link,
        results_link,
        is_active,
      })
      .then((poll) => {
        pollHelpers
          .insertOptions(req.body, poll.id)
          .then((results) => {
            pollHelpers.emailLinksToUser(
              { shared_link, results_link },
              req.session.email
            );
            res.redirect("/");
          })
          .catch((err) => err.message);
      })
      .catch((err) => {
        console.log(err.message);
        res.send(err);
      });
  });

  router.get("/", (req, res) => {
    //page for new poll goes here
    res.render("new_poll");
  });

  return router;
};
