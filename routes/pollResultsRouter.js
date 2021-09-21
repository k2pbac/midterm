const express = require('express');
const router  = express.Router();

const pollResultsRouter = (db) => {

  // Get results for a specific poll
  router.get('/:poll_id', (req, res) => {
    db.query(`
  SELECT  options.option as name, SUM(point) as point_total, results.poll_id as poll
  FROM results
  JOIN options ON option_id = options.id
  JOIN polls ON results.poll_id = polls.id
  WHERE results.poll_id = $1
  GROUP BY options.option, results.poll_id
  ORDER BY poll, point_total DESC;`, [req.params.poll_id])
    .then((response) => {
      // res.json(response.rows);
      res.render("results", { data: response.rows })
      console.log(response.rows)
    })
    // (res.render("results"))
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
  });

  //  GET/ results/ all polls
  router.get('/', (req, res) => {
    db.query( `
    SELECT  options.option as name, SUM(point) as point_total, results.poll_id as poll
    FROM results
    JOIN options ON option_id = options.id
    JOIN polls ON results.poll_id = polls.id
    GROUP BY options.option, results.poll_id
    ORDER BY poll, point_total DESC;`)
    .then((response) => {
      res.json(response.rows);
    })
    // .then(
    //   res.render("results")
    // )
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });

    // router.get('/', (req, res) => {
    //   res.render("results")
    // })


  })

  return router;
}

module.exports = pollResultsRouter

//  How to render just the site */
//  module.exports = (db) => {
//    router.get("/", (req, res) => {

//          res.render( "results");
//        })

//   return router;
//  }
