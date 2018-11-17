select * from business
where lower like(first_name = $1) or upper like(first_name = $1)