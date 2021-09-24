module.exports = (db) => {
  const insertUser = (userInfo) => {
    const queryString = {
      text: `INSERT INTO users (email)
            VALUES ($1) Returning *`,
      values: [userInfo],
    };

    return db
      .query(queryString)
      .then((results) => {
        return Object.values(results)[3][0].id;
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
        return err.message;
      });
  };

  return {
    insertUser,
    insertVoter,
  };
};
