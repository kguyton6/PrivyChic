select * from bookings
where calendar_id in(select id from calendar
join bookings
on calendar.id = bookings.calendar_id
where client_id = $1)