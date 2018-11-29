select * from calendar
join profile
on calendar.business_id = profile.business_id
where six_digit_date = $1