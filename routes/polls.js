/*
 * All routes for Polls are defined here
 */

const express = require("express");
const router = express.Router();

module.exports = (pollHelpers) => {
  //POST route to create a new post
  router.post("/polls", (req, res) => {
    const user_id = req.session.user_id;
    const is_active = true;
    pollHelpers
      .newPoll({
        ...req.body,
        creator_id: user_id,
        is_active,
      })
      .then((poll) => {
        pollHelpers
          .insertOptions(req.body, poll.id)
          .then((results) => {
            const shared_link = `https://morning-ridge-80955.herokuapp.com/polls/${poll.id}`;
            const results_link = `https://morning-ridge-80955.herokuapp.com/polls/${poll.id}/results`;
            pollHelpers.emailLinksToUser(
              { shared_link, results_link },
              req.session.email
            );

            pollHelpers
              .insertLinks(poll.id)
              .then((results) => {
                res.redirect("/");
              })
              .catch((err) => {
                console.log(err.message);
                res.redirect("/");
              });
          })
          .catch((err) => {
            console.log(err.message);
            res.redirect("/");
          });
      })
      .catch((err) => {
        console.log(err.message);
        res.redirect("/");
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
      .catch((err) => {
        console.log(err.message);
        res.redirect("/");
      });
  });

  return router;
};
