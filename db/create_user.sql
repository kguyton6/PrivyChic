insert into priv_users (email, password, full_name)
values($2, $3, $1)
returning *;