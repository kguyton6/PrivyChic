select * from calendar
where calendar.business_id not in(select business_id from bookings
where calendar.business_id = $1)