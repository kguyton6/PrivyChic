select * from profile
join business
on profile.user_id = business.user_id
where business_id = $1