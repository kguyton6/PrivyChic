insert into business (user_id, business_name, phone_number, streetaddress, state, zipcode, city)
values($1, $2, $3, $4, $5, $6, $7)
returning *