select * from business
join priv_users
on business.user_id = priv_users.user_id
where zipcode = $1