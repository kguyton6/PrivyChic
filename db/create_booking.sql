insert into bookings(service_id, business_id, client_id, calendar_id, token)
values($1, $2, $3, $4, $5)
returning *
