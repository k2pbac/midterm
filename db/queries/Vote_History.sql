SELECT voter_id AS users_id,  users.name as name, options.option AS choice, results.point AS point
FROM results
JOIN users ON voter_id = users.id
JOIN options ON option_id = options.id
WHERE results.poll_id = 1
GROUP BY users.name

