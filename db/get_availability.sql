select * from business
join profile
on business.user_id = profile.user_id
where upper(full_name) like $1  or lower(full_name) like $1

