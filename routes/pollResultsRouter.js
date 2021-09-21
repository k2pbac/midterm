const express = require("express");
const router = express.Router();

const pollResultsRouter = (db) => {
  // Get results for a specific poll
  router.get("/:poll_id", (req, res) => {
    db.query(
      `
    SELECT  options.option as name, SUM(point) as point_total, results.poll_id as poll, polls.title as question
    FROM results
    JOIN options ON option_id = options.id
    JOIN polls ON results.poll_id = polls.id
    WHERE results.poll_id = $1
    GROUP BY options.option, results.poll_id, polls.title
    ORDER BY poll, point_total DESC;`,
      [req.params.poll_id]
    )
      .then((response) => {
        // total used for dynamic sizing in bar graph display
        let total = 0;
        response.rows.forEach((element) => {
          total += parseInt(element.point_total);
        });
        res.render("results", { total, polls: response.rows });
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });
// DELETE BEFORE SUMBITTING project! - dev purposes only
  //  GET/ results/ all polls need
  // router.get("/", (req, res) => {
  //   console.log("---++");
  //   db.query(
  //     `
  //   SELECT  options.option as name, SUM(point) as point_total, results.poll_id as poll
  //   FROM results
  //   JOIN options ON option_id = options.id
  //   JOIN polls ON results.poll_id = polls.id
  //   GROUP BY options.option, results.poll_id
  //   ORDER BY poll, point_total DESC;`
  //   )
  //     .then((response) => {
  //       let total = 0;
  //       response.rows.forEach((element) => {
  //         total += parseInt(element.point_total);
  //       });
  //       res.json({ total, data: response.rows });
  //     })
  //     .catch((err) => {
  //       res.status(500).json({ error: err.message });
  //     });
  // });

  return router;
};

module.exports = pollResultsRouter;
