module.exports = (db) => {
  const insertUser = (userInfo) => {
    const queryString = {
      text: `INSERT INTO users (email)
            VALUES ($1)`,
      values: [userInfo],
    };

    return db
      .query(queryString)
      .then((results) => {
        console.log(results.row);
        return results.row;
      })
      .catch((err) => err.message);
  };

  const insertVoter = (name) => {
    const queryString = {
      text: `INSERT INTO users (name, email)
            VALUES ($1, $2) Returning *`,
      values: [name, "NA"],
    };

    return db
      .query(queryString)
      .then((results) => {
        return Object.values(results)[3][0].id;
      })
      .catch((err) => {
        console.log(err.message);
        err.message;
      });
  };

  return {
    insertUser,
    insertVoter,
  };
};
