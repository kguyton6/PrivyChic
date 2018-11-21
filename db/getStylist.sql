select * from profile
join business
on profile.user_id = business.business_id 
where business_id = $1