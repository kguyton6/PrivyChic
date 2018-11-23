select * from calendar
join business
on calendar.user_id = business.business_id
where calendar_month = $1 and calendar_day = $2