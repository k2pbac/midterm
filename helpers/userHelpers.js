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

  return {
    insertUser,
  };
};
