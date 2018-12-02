select * from profile
join business
on profile.user_id = business.user_id 
join business_hours
on business_hours.business_id = business.business_id
join priv_users
on business.user_id = priv_users.user_id 
where business.user_id = $1