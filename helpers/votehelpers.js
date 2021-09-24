const format = require("pg-format");

module.exports = (db) => {
  const renderVoterView = (poll_id) => {
    const queryText = {
      text: `SELECT *, name, options.id as option_id, polls.id as poll_id FROM polls
            JOIN options on poll_id = polls.id
            JOIN users on creator_id = users.id
            WHERE options.poll_id = $1;
          `,
      values: [poll_id],
    };
    return db
      .query(queryText)
      .then((data) => {
        let obj = data.rows;
        let results = {};
        let creator = data.rows[0].name;
        let option_ids = [];
        for (let row of obj) {
          results[row.option] = row.description;
          option_ids.push(row.option_id);
        }
        return {
          title: obj[0].title,
          data: results,
          creator,
          option_ids,
          poll_id,
        };
      })
      .catch((err) => console.log({ err: err.message }));
  };

  const insertUserVote = (poll_id, vote_data, voter_id) => {
    const values = [];
    for (let vote in vote_data) {
      for (let point of vote_data[vote]) {
        values.push([
          Object.values(vote_data).length - Number(point),
          vote,
          voter_id,
          poll_id,
        ]);
      }
    }

    return db
      .query(
        format(
          `INSERT INTO results (point, option_id, voter_id, poll_id) VALUES %L`,
          values
        )
      )
      .then((results) => {
        return results;
      })
      .catch((err) => console.log({ err: err.message }));
  };

  return {
    renderVoterView,
    insertUserVote,
  };
};
