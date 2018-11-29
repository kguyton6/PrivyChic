select * from profile
join business
on profile.user_id = business.user_id
where zipcode = $1