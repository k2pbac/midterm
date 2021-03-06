/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require("express");
const router = express.Router();

module.exports = (userHelpers) => {
  router.post("/login", (req, res) => {
    const { email } = req.body;

    userHelpers
      .insertUser(email)
      .then((result) => {
        // cookie-session
        req.session.user_id = Number(result);
        req.session.email = email;

        // redirect the client
        res.redirect("back");
      })
      .catch((err) => {
        err.message;
      });
  });

  router.post("/logout", (req, res) => {
    req.session.user_id = null;
    req.session.email = null;

    res.redirect("/");
  });

  return router;
};
