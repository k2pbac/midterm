const express = require("express");
const router = express.Router();

const pollResultsRouter = (db) => {
  // Get results for a specific poll
  router.get("/:poll_id", (req, res) => {
    const promise1 = db.query(`
    SELECT  options.option as name, SUM(point) as point_total, results.poll_id as poll, polls.title as question
    FROM results
    JOIN options ON option_id = options.id
    JOIN polls ON results.poll_id = polls.id
    WHERE results.poll_id = $1
    GROUP BY options.option, results.poll_id, polls.title
    ORDER BY poll, point_total DESC;`, [req.params.poll_id]
    );

    const promise2 = db.query(`
    SELECT voter_id AS users_id,  users.name as name, options.option AS choice, results.point AS point
  FROM results
  JOIN users ON voter_id = users.id
  JOIN options ON option_id = options.id
  WHERE results.poll_id = $1
  GROUP BY users.name, voter_id, options.option, results.point
  ORDER BY name, point DESC`, [req.params.poll_id]);

    Promise.all([promise1, promise2])
    .then((response) => {
      const [query1, query2] = response
      // console.log('++++++', result1.rows)
      // console.log('---------', result2.rows)
      let total = 0;
        query1.rows.forEach((element) => {
          total += parseInt(element.point_total);
        });
        console.log(total)
      // res.json({ data1: query1.rows , data2: query2.rows });
      res.render("results", { total, polls: query1.rows, voteHistory: query2.rows });
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});



// DELETE BEFORE SUMBITTING project! - dev purposes only
  router.get("/", (req, res) => {
      console.log("---++");
      const promise1 = db.query(
        `
      SELECT  options.option as name, SUM(point) as point_total, results.poll_id as poll
      FROM results
      JOIN options ON option_id = options.id
      JOIN polls ON results.poll_id = polls.id
      GROUP BY options.option, results.poll_id
      ORDER BY poll, point_total DESC;`
      );
      const promise2 = db.query( `SELECT * FROM results`);

      Promise.all([promise1, promise2])
        .then((response) => {
          const [result1, result2] = response
          console.log('++++++', result1.rows)
          console.log('---------', result2.rows)
          res.json({ data1: result1.rows , data2: result2.rows });
        })
        .catch((err) => {
          res.status(500).json({ error: err.message });
        });
    });


  return router;
};

module.exports = pollResultsRouter;
