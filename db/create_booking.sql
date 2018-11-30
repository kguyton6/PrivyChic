insert into bookings(service_id, business_id, client_id, available_id)
values($1, $2, $3, $4)
returning *
