update priv_users
set client_type = $1
where user_id = $2