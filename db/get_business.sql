select * from profile
join business
on profile.user_id = business.user_id
where business.user_id = $1