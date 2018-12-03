select * from calendar
where id not in (select calendar_id from bookings
join calendar on
calendar.id = bookings.calendar_id
where calendar.business_id = $1)
