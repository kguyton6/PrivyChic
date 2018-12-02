select * from calendar
where id in(select bookings.business_id from bookings
join business
on business.business_id = bookings.business_id
where business.user_id = $1)