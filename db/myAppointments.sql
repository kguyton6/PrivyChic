select * from calendar
where id in(select calendar_id from bookings
join calendar
on calendar.id = bookings.calendar_id
where bookings.client_id = $1)