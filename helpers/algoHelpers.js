module.exports = (db) => {
  const applyBordaAlgo = (poll_id) => {
    const queryText = {
      text: `SELECT voter_id, option, point FROM results
            JOIN options on options.poll_id = results.poll_id
            WHERE options.poll_id = $1 AND results.option_id = options.id;
          `,
      values: [poll_id],
    };

    return db
      .query(queryText)
      .then((data) => {
        let obj = data.rows;
        let results = {};
        for (let choice of obj) {
          if (results[choice.option]) {
            results[choice.option] += choice.point;
          } else {
            results[choice.option] = choice.point;
          }
        }

        console.log(results);

        return { data: data.rows, results };
      })
      .catch((err) => console.log({ err: err.message }));
  };
  const insertVoterResults = (voter_id, options, poll_id) => {
    const queryString = `INSERT INTO results(points, voter_id, option_id, poll_id) VALUES %L`;
    const values = [];
    for (option in options) {
      values.push([options[option], voter_id, option, poll_id]);
    }
    const queryText = {
      text: queryString,
      values: values,
    };
    return db
      .query(queryText)
      .then((data) => {
        console.log("successfully inserted");
      })
      .catch((err) => console.log({ error: err.message }));
  };

  return {
    applyBordaAlgo,
    insertVoterResults,
  };
};
