select * from profile
join business
on profile.user_id = business.business_id
where upper(first_name) like $1 