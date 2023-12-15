
CREATE PROC getAllTicketOfPartner
	@partner_id VARCHAR(20)
AS
BEGIN
	SELECT 
		co.coach_id,
		co.license_plate,
		tr.trip_name,
		co.service_level,
		tr.departure_date,
		COUNT(CASE WHEN ti.customer_id_ IS NULL THEN 1 ELSE NULL END) AS sum_buy_ticket,
		COUNT(co.coach_id) AS sum_max_ticket
	FROM 
		Tickets ti 
		JOIN Trips tr ON ti.trip_id = tr.trip_id
		JOIN Coaches co ON tr.coach_id = co.coach_id
		JOIN Partners pa ON co.partner_id = pa.partner_id
	WHERE 
		pa.partner_id = @partner_id AND tr.departure_date > CONVERT(SMALLDATETIME, GETDATE())
	GROUP BY 
		co.coach_id, 
		co.license_plate, 
		co.service_level, 
		tr.trip_name, 
		tr.departure_date;
END;


CREATE PROC getPartner
	@partner_id VARCHAR(20)
AS
BEGIN
	SELECT
		*
	FROM Partners
	WHERE partner_id = @partner_id;
END;



CREATE PROC getAllCoachOfPartner
	@partner_id VARCHAR(20)
AS
BEGIN
	SELECT 
		co.license_plate,
		co.service_level,
		co.seat_capacity,
		COUNT(tr.departure_date) AS time_run,
		co.status_
	FROM Coaches co JOIN Trips tr ON co.coach_id = tr.coach_id
	WHERE co.partner_id = @partner_id
	GROUP BY
		co.license_plate,
		co.service_level,
		co.seat_capacity,
		co.status_;
END




CREATE PROC getAccount
	@username VARCHAR(50),
	@password VARCHAR(50)
AS
BEGIN
	-- Lấy thông tin từ bảng Drivers nếu có username và password khớp
	SELECT 
		driver_id AS id, 
		'driver' AS role
	FROM Drivers
	WHERE user_id_ = (
		SELECT user_id_ 
		FROM Users 
		WHERE username = @username AND password = @password
	)

	UNION

	-- Lấy thông tin từ bảng Admins nếu có username và password khớp
	SELECT 
		admin_id AS id, 
		'admin' AS role
	FROM Admins
	WHERE user_id_ = (
		SELECT user_id_ 
		FROM Users 
		WHERE username = @username AND password = @password
	)

	UNION

	-- Lấy thông tin từ bảng Customers nếu có username và password khớp
	SELECT 
		customer_id AS id, 
		'customer' AS role
	FROM Customers
	WHERE user_id_ = (
		SELECT user_id_ 
		FROM Users 
		WHERE username = @username AND password = @password
	)

	UNION

	-- Lấy thông tin từ bảng Partners nếu có username và password khớp
	SELECT 
		partner_id AS id, 
		'partner' AS role
	FROM Partners
	WHERE partner_id = (
		SELECT 
			partner_id 
		FROM Staffs 
		WHERE user_id_ = (
			SELECT user_id_ 
			FROM Users 
			WHERE username = @username AND password = @password
		)
	);
END

CREATE PROC getAllRevenueOfPartner
	@partner_id VARCHAR(20)
AS
BEGIN
	SELECT
		STRING_AGG(dr.full_name, ', ') AS driver_name,
		co.license_plate,	
		tr.trip_name,
		ti.departure_datetime,
		ti.arrival_datetime,
		SUM(pay.amount) AS total_amount
	FROM Partners pa 
			JOIN Drivers dr ON pa.partner_id = dr.partner_id
			JOIN Coaches co ON dr.driver_id = co.driver_id
			jOIN Trips tr ON co.coach_id = tr.coach_id
			JOIN Tickets ti ON tr.trip_id = ti.trip_id
			jOIN Payments pay ON ti.ticket_id = pay.ticket_id
	WHERE pa.partner_id = @partner_id
	GROUP BY
		co.license_plate,
		tr.trip_name,
		ti.departure_datetime,
		ti.arrival_datetime;
END;


CREATE PROC getAllDriverOfPartner
	@partner_id	VARCHAR(20)
AS
BEGIN
	SELECT *
	FROM Drivers dr
	WHERE dr.partner_id = @partner_id;
END



CREATE PROC sumRevenueAndPassengerEveryMonthOfPartner
	@partner_id VARCHAR(20)
AS
BEGIN
	SELECT 
		SUM(CASE WHEN YEAR(pay.payment_date) = YEAR(GETDATE()) THEN pay.amount ELSE 0 END) AS total_revenue_current_year,
		SUM(CASE WHEN YEAR(pay.payment_date) = YEAR(GETDATE()) - 1 THEN pay.amount ELSE 0 END) AS total_revenue_previous_year,
		COUNT(CASE WHEN YEAR(pay.payment_date) = YEAR(GETDATE()) THEN pay.payment_id END) AS total_passenger_count_current_year,
		COUNT(CASE WHEN YEAR(pay.payment_date) = YEAR(GETDATE()) - 1 THEN pay.payment_id END) AS total_passenger_count_previous_year	
	FROM Partners pa
			JOIN Coaches co ON pa.partner_id = co.coach_id
			JOIN Trips tr ON co.coach_id = tr.coach_id
			JOIN Tickets ti ON tr.trip_id = ti.trip_id
			JOIN Payments pay ON ti.ticket_id = pay.ticket_id
	WHERE pa.partner_id = @partner_id;
END;

