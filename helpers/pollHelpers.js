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
        `INSERT INTO polls (title, description, creator_id, created_at, updated_at, is_active, max_submission)
    VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
        [
          poll.title,
          poll.description,
          poll.creator_id,
          poll.created_at,
          poll.updated_at,
          poll.is_active,
          poll.max_submission,
        ]
      )
      .then((data) => {
        const polls = data.rows[0];
        const poll_id = Number(data.rows[0].id);

        const linkQuery = `
        UPDATE polls
        SET shared_link = 'https://morning-ridge-80955.herokuapp.com/polls/${poll_id}',
            results_link = 'https://morning-ridge-80955.herokuapp.com/polls/${poll_id}/results'
        WHERE polls.id = ${poll_id}q`;

        return db
          .query(linkQuery)
          .then((result) => {
            return result;
          })
          .catch((err) => {
            return err.message;
          });
      })
      .catch((err) => {
        return { error: err.message };
      });
  };

  const renderPollResults = (poll_id) => {
    // Get results for a specific poll

    const promise1 = db.query(
      `
      SELECT  options.option as name, SUM(point) as point_total, results.poll_id as poll, polls.title as question
      FROM results
      JOIN options ON option_id = options.id
      JOIN polls ON results.poll_id = polls.id
      WHERE results.poll_id = $1
      GROUP BY options.option, results.poll_id, polls.title
      ORDER BY poll, point_total DESC;`,
      [poll_id]
    );

    const promise2 = db.query(
      `
      SELECT voter_id AS users_id,  users.name as name, options.option AS choice, results.point AS point
      FROM results
      JOIN users ON voter_id = users.id
      JOIN options ON option_id = options.id
      WHERE results.poll_id = $1
      GROUP BY users.name, voter_id, options.option, results.point
      ORDER BY name, point DESC`,
      [poll_id]
    );

    return Promise.all([promise1, promise2])
      .then((response) => {
        const [query1, query2] = response;
        let total = 0;
        query1.rows.forEach((element) => {
          total += parseInt(element.point_total);
        });

        return { total, polls: query1.rows, voteHistory: query2.rows };
      })
      .catch((err) => {
        return { error: err.message };
      });
  };

  return {
    emailLinksToUser,
    renderHomePagePolls,
    insertOptions,
    newPoll,
    renderPollResults,
  };
};
