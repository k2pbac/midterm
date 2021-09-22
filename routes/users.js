/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require("express");
const router = express.Router();

module.exports = () => {
  router.get("/login/:id", (req, res) => {
    // cookie-session
    req.session.user_id = req.params.id;

    // redirect the client
    res.redirect("/");
  });

  router.get("/logout", (req, res) => {
    req.session.user_id = null;
  });
  return router;
};
