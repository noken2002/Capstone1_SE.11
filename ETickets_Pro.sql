ALTER PROCEDURE GetTicketInformation
    @TicketID VARCHAR(20)
AS
BEGIN
    SELECT
        Tickets.ticket_id,
        Customers.full_name AS customer_name,
        Partners.company_name AS partner_name,
        Trips.trip_name,
		Customers.phone_number AS phone_number,
        Coaches.license_plate AS coach_license_plate,
        Tickets.departure_datetime,
        Tickets.arrival_datetime,
        Tickets.seat_number,
        Tickets.price,
        Tickets.status_
    FROM Tickets
    -- Liên kết bảng Tickets với bảng Customers
    INNER JOIN Customers ON Tickets.customer_id_ = Customers.customer_id
    -- Liên kết bảng Tickets với bảng Partners
    INNER JOIN Partners ON Tickets.partner_id = Partners.partner_id
    -- Liên kết bảng Tickets với bảng Trips
    INNER JOIN Trips ON Tickets.trip_id = Trips.trip_id
    -- Liên kết bảng Tickets với bảng Coaches
    INNER JOIN Coaches ON Tickets.coach_id = Coaches.coach_id
    WHERE Tickets.ticket_id = @TicketID;
END;
EXEC GetTicketInformation'Ticket1'

CREATE PROCEDURE GetOriginAndDestination (@origin NVARCHAR(100),@destination NVARCHAR(100))
AS
BEGIN
	SELECT origin,destination
	FROM Trips
END;

EXEC GetOriginAndDestination (N'Origin 1',N'Destination 1')