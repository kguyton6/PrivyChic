insert into profile (user_id, profession, about, picture, first_name, last_name)
values($1, $2, $3, $4, $5, $6)
returning *