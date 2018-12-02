select * from calendar
where calendar.id = $1
and id in(select calendar_id from bookings
join calendar
on calendar.id = bookings.calendar_id
where client_id = $2)