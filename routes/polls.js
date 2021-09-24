/*
 * All routes for Polls are defined here
 */

const express = require("express");
const router = express.Router();

module.exports = (pollHelpers) => {
  //POST route to create a new post
  router.post("/polls", (req, res) => {
    const user_id = req.session.user_id;
    const poll_id = Math.random().toString(36).slice(2, 8);
    const shared_link = `https://morning-ridge-80955.herokuapp.com/polls/${poll_id}`;
    const results_link = `https://morning-ridge-80955.herokuapp.com/polls/results/${poll_id}`;
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
  //GET route to view the create poll page
  router.get("/polls/new", (req, res) => {
    //page for new poll goes here
    res.render("new_poll");
  });

  router.get("/polls/:poll_id/results", (req, res) => {
    const { poll_id } = req.params;

    pollHelpers
      .renderPollResults(poll_id)
      .then((result) =>
        res.render("results", {
          ...result,
        })
      )
      .catch((err) => res.status(500).json({ error: err.message }));
  });

  return router;
};
