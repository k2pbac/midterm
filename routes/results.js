/*
 * All routes for Results are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require("express");
const router = express.Router();
const dbHelpers = require("./helpers/algoHelpers")(db);

module.exports = () => {
  router.get("/polls/:poll_id/results", (req, res) => {
    const { poll_id } = req.params;
    //Still need to implement borda algo in function
    dbHelpers.applyBordaAlgo(poll_id);
  });
  return router;
};
