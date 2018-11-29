
with newBusiness as (
insert into business(user_id, business_name, phone_number, streetaddress, city, state, zipcode, portfolio )
values($1, $2, $3, $4, $5, $6, $7, $8)
returning user_id
)

insert into profile (user_id, full_name, first_name, last_name, profession, about, picture, accept_payment)
values ((select user_id from newBusiness),
 $9, $10, $11, $12, $13, $14, $15)

 returning *