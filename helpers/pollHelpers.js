const mailgun = require("mailgun-js");
const format = require("pg-format");

module.exports = (db) => {
  const emailLinksToUser = (links, email) => {
    const API_KEY = process.env.API_KEY;
    const DOMAIN = process.env.DOMAIN;
    const mg = mailgun({ apiKey: API_KEY, domain: DOMAIN });
    const data = {
      from: "Mailgun Sandbox <postmaster@sandboxe4d5af4775b14a9ca7dfd4fae78a8885.mailgun.org>",
      to: email,
      subject: "New Poll Creation",
      text: `Hello from the Polls Team!
    Here are your links that you can send to your friends (or anyone!) ${links.shared_link}
    and your link to view the poll results: ${links.results_link}`,
    };
    mg.messages().send(data, function (error, body) {
      console.log(body);
    });
  };

  const renderHomePagePolls = () => {
    const queryString = {
      text: `SELECT polls.*, users.name, polls.id FROM polls
      JOIN users on users.id = creator_id
      WHERE is_active = true;`,
    };

    return db
      .query(queryString)
      .then((result) => {
        return { polls: result.rows };
      })
      .catch((err) => err.message);
  };

  const insertOptions = (optionInfo, poll_id) => {
    const results = [];
    let count = 1;
    for (let option in optionInfo) {
      if (option && option.length && optionInfo[`option${count}`]) {
        results.push([optionInfo[`option${count}`], "NA", Number(poll_id)]);
        count++;
      }
    }
    return db
      .query(
        format(
          `INSERT INTO options (option, option_info, poll_id)
            VALUES %L`,
          results
        )
      )
      .then((results) => {
        return results;
      })
      .catch((err) => err.message);
  };

  const newPoll = (poll) => {
    return db
      .query(
        `INSERT INTO polls (title, description, creator_id, created_at, updated_at, shared_link, results_link, is_active, max_submission)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *`,
        [
          poll.title,
          poll.description,
          poll.creator_id,
          poll.created_at,
          poll.updated_at,
          poll.shared_link,
          poll.results_link,
          poll.is_active,
          poll.max_submission,
        ]
      )
      .then((data) => {
        const polls = data.rows[0];
        return polls;
      })
      .catch((err) => {
        // res
        //   .status(500)
        //   .json({ error: err.message });
        console.log({ error: err.message });
        return { error: err.message };
      });
  };

  return {
    emailLinksToUser,
    renderHomePagePolls,
    insertOptions,
    newPoll,
  };
};
