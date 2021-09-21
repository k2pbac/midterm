SELECT  options.option as name, SUM(point) as point_total, results.poll_id as poll
FROM results
JOIN options ON option_id = options.id
JOIN polls ON results.poll_id = polls.id
GROUP BY options.option, results.poll_id
ORDER BY poll, point_total DESC;
