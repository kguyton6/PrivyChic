update bookings
set token = $1
where calendar_id = $2
returning *