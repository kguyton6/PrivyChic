
select * from profile
join business
on profile.user_id = business.user_id
where business.user_id in(select calendar.business_id from calendar
where date = $1)