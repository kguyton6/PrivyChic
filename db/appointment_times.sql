select * from calendar
where calendar.business_id = $1
and id not in(select calendar_id from bookings
join calendar
on calendar.id = bookings.calendar_id)