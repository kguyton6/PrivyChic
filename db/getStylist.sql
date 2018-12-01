select * from profile
join business
on profile.user_id = business.user_id 
join business_hours
on business_hours.business_id = business.business_id
where business.business_id = $1 