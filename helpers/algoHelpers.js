module.exports = (db) => {
  const applyBordaAlgo = (poll_id) => {
    const queryText = {
      text: `SELECT * FROM results
            JOIN options on options.poll_id = results.poll_id
            WHERE poll_id = $1
          `,
      values: [poll_id],
    };

    return db
      .query(queryText)
      .then((data) => {
        console.log(data.rows);
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
};
