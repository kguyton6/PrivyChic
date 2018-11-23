select * from priv_users
join business
on priv_users.user_id = business.user_id
where user_id = $1