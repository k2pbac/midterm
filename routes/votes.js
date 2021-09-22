const express = require("express");
const results = require("./results");
const router = express.Router();

module.exports = (voteHelpers) => {
  router.get("/:poll_id", (req, res) => {
    const { poll_id } = req.params;

    voteHelpers
      .renderPollView(poll_id)
      .then((result) => res.render("user_vote", { poll: result }))
      .catch((err) => res.send(err.message));
  });
  router.post("/:poll_id/vote", (req, res) => {
    const { poll_id } = req.params;
    console.log(req.body);
    voteHelpers
      .insertUserVote(poll_id, req.body)
      .then((results) => res.redirect("/"))
      .catch((err) => console.log({ error: err.message }));
  });
  return router;
};
