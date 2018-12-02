insert into priv_users (full_name, email, password, user_type)
values($1, $2, $3, $4)
returning full_name, email, user_type