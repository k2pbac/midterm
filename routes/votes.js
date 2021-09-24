const express = require("express");
const router = express.Router();

module.exports = (voteHelpers, userHelpers) => {
  router.get("/:poll_id", (req, res) => {
    const { poll_id } = req.params;
    voteHelpers
      .renderVoterView(poll_id)
      .then((result) => {
        console.log(result);
        res.render("user_vote", { poll: result });
      })
      .catch((err) => err.message);
  });
  router.post("/:poll_id/vote", (req, res) => {
    const { poll_id } = req.params;
    const { name } = req.body;
    delete req.body.name;

    userHelpers
      .insertVoter(name)
      .then((results) => {
        console.log("User ID:", results);

        voteHelpers
          .insertUserVote(poll_id, req.body, results)
          .then((results2) => {
            res.redirect("/");
          })
          .catch((err) => console.log({ error: err.message }));
      })
      .catch((err) => err.message);
  });
  return router;
};
