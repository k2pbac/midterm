SELECT  options.option as name, SUM(point) as point_total, results.poll_id as poll
    FROM results
    JOIN options ON option_id = options.id
    JOIN polls ON results.poll_id = polls.id
    WHERE results.poll_id = $1
    GROUP BY options.option, results.poll_id
    ORDER BY poll, point_total DESC;


-- SELECT options.option as name, SUM(point) as point_total, results.poll_id as poll, polls.title as question, SUM(SELECT point FROM results)
--   FROM results
--   JOIN options ON option_id = options.id
--   JOIN polls ON results.poll_id = polls.id
--   WHERE results.poll_id = 1
--   GROUP BY options.option, results.poll_id, polls.title
--   ORDER BY poll, point_total DESC;

-- (SELECT SUM(point) FROM results WHERE poll_id = 1) AS poll_total;
