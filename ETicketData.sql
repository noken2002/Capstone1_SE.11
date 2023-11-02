	
--Tạo database có tên là expressTickets

CREATE DATABASE expressTickets


USE expressTickets
drop database expressTickets
--Tạo bảng Users chứa các thuộc tính user_id, username, password, email, role, face_recognition_data

CREATE TABLE Users(
	user_id_ VARCHAR(20) PRIMARY KEY,
	username VARCHAR(255) NULL,
	password VARCHAR(255) NULL,
	email NVARCHAR(255) NULL,
    role VARCHAR(10) NOT NULL,
    face_recognition_data VARBINARY(128) NOT NULL
);

--Tạo bảng Customers chứa các thuộc tính customer_id, user_id, full_name, phone_number

CREATE TABLE Customers(
	customer_id VARCHAR(20) PRIMARY KEY,
    user_id_ VARCHAR(20) FOREIGN KEY (user_id_) REFERENCES  Users(user_id_) ON UPDATE CASCADE ON DELETE NO ACTION,
    full_name NVARCHAR(255) NOT NULL,
    phone_number VARCHAR(15) NOT NULL
);


--Tạo bảng Admins chứa các thuộc tính admin_id, user_id, full_name, phone_number

CREATE TABLE Admins (
    admin_id VARCHAR(20) PRIMARY KEY,
    user_id_ VARCHAR(20) FOREIGN KEY (user_id_) REFERENCES  Users(user_id_) ON UPDATE CASCADE ON DELETE NO ACTION,
    full_name NVARCHAR(255) NOT NULL,
    phone_number VARCHAR(15) NOT NULL
);

--Tạo bảng Licenses chứa các thuộc tính license_id, image_front, image_behind, image_width, image_height, image_type

CREATE TABLE Licenses (
	license_id VARCHAR(20) PRIMARY KEY,
	image_front VARBINARY(8000) NOT NULL,
	image_behind VARBINARY(8000) NOT NULL,
	image_width INT NOT NULL,
	image_height INT NOT NULL,
	image_type VARCHAR(5) NOT NULL
);

--Tạo bảng Routes chứa các thuộc tính route_id, route_name, origin, destination, distance, duration

CREATE TABLE Trips (
    trip_id VARCHAR(20) PRIMARY KEY,
    trip_name NVARCHAR(100) NOT NULL,
    origin NVARCHAR(100) NOT NULL,
    destination NVARCHAR(100) NOT NULL,
    distance DECIMAL(4, 2) NOT NULL,
    duration INT NOT NULL
);

ALTER TABLE Trips
ADD departure_date DATE;

-- tạo bảng Citys chứa các thuộc tính

CREATE TABLE Citys (
	city_id VARCHAR(20) PRIMARY KEY NOT NULL,
	name_city NVARCHAR(50) NOT NULL,
	image_avatar NVARCHAR(255) NOT NULL
)

--tạo bảng List_visits chứa các thuộc tính 

CREATE TABLE List_visits (
	numerical_order INT NOT NULL,
	city_id VARCHAR(20) FOREIGN KEY (city_id) REFERENCES Citys(city_id),
	note NVARCHAR(100) NOT NULL,
	trip_id VARCHAR(20) FOREIGN KEY (trip_id) REFERENCES Trips(trip_id)
);

--Tạo bảng Partners chứa các thuộc tính partner_id, company_name, image_avatar, contact_name, contact_email, contact_phone_number, contact_address

CREATE TABLE Partners (
    partner_id VARCHAR(20) PRIMARY KEY,
    company_name NVARCHAR(255) NOT NULL,
	--image_avatar VARBINARY(8000) NOT NULL,
	image_avatar NVARCHAR(255) NOT NULL,
    contact_name NVARCHAR(255) NOT NULL,
    contact_email NVARCHAR(255) NOT NULL,
    contact_phone_number VARCHAR(15) NOT NULL,
	contact_address NVARCHAR(255) NOT NULL,
	point DECIMAL(1,1) NOT NULL,
	status_ BIT NOT NULL
);

--Tạo bảng Staffs chứa các thuộc tính staff_id, user_id, partner_id, image_avatar, full_name, phone_number

CREATE TABLE Staffs (
    staff_id VARCHAR(20) PRIMARY KEY,
    user_id_ VARCHAR(20) FOREIGN KEY (user_id_) REFERENCES  Users(user_id_),
	partner_id VARCHAR(20) FOREIGN KEY (partner_id) REFERENCES  Partners(partner_id),
	image_avatar NVARCHAR(255) NOT NULL,
    full_name NVARCHAR(255) NOT NULL,
    phone_number VARCHAR(15) NOT NULL
);


--Tạo bảng Drivers chứa các thuộc tính driver_id, user_id, image_avatar, full_name, birthday, address, literacy, license_id, partner_id, phone_number, status_

CREATE TABLE Drivers (
    driver_id VARCHAR(20) PRIMARY KEY,
    user_id_ VARCHAR(20) FOREIGN KEY (user_id_) REFERENCES  Users(user_id_) ,
	image_avatar NVARCHAR(255) NOT NULL,
    full_name NVARCHAR(255) NOT NULL,
	birthday DATE NOT NULL,
	address_ NVARCHAR(255) NOT NULL,
	literacy NVARCHAR(100) NOT NULL,
	license_id VARCHAR(20) FOREIGN KEY (license_id) REFERENCES  Licenses(license_id),
	partner_id VARCHAR(20) FOREIGN KEY (partner_id) REFERENCES  Partners(partner_id),
    phone_number VARCHAR(15) NOT NULL,
	point DECIMAL(1,1) NOT NULL,
	status_ BIT NOT NULL
);

--Tạo bảng Coaches chứa các thuộc tính coach_id, image_avatar, license_plate, seat_capacity, service_level, driver_id, partner_id, status_

CREATE TABLE Coaches (
	coach_id VARCHAR(20) PRIMARY KEY,
	image_avatar NVARCHAR(255) NOT NULL,
	license_plate VARCHAR(20) NOT NULL,
	seat_capacity INT NOT NULL,
	service_level NVARCHAR(50) NOT NULL,
	driver_id VARCHAR(20) FOREIGN KEY (driver_id) REFERENCES  Drivers(driver_id),
	partner_id VARCHAR(20) FOREIGN KEY (partner_id) REFERENCES  Partners(partner_id),
	status_ BIT NOT NULL
);

--Tạo bảng Tickets chứa các thuộc tính ticket_id, partner_id, route_id, coach_id, departure_datetime, arrival_datetime, seat_number, price, status_

CREATE TABLE Tickets (
	ticket_id VARCHAR(20) PRIMARY KEY,
	partner_id VARCHAR(20) FOREIGN KEY (partner_id) REFERENCES  Partners(partner_id),
	trip_id VARCHAR(20) FOREIGN KEY (trip_id) REFERENCES  Trips(trip_id) ,
	customer_id_ VARCHAR(20) FOREIGN KEY (customer_id_) REFERENCES  Customers(customer_id),
	coach_id VARCHAR(20) FOREIGN KEY (coach_id) REFERENCES  Coaches(coach_id),
	departure_datetime DATETIME NOT NULL,
	arrival_datetime DATETIME NOT NULL,
	seat_number VARCHAR(5) NOT NULL,
	price DECIMAL(7) NOT NULL,
	status_ BIT NOT NULL	
);


--Tạo bảng Payments chứa các thuộc tính payment_id, ticket_id, customer_id, qr_code_image, origin, destination, departure_datetime, payment_date, amount, payment_method

CREATE TABLE Payments (
    payment_id VARCHAR(20) PRIMARY KEY,
    ticket_id VARCHAR(20) FOREIGN KEY (ticket_id) REFERENCES  Tickets(ticket_id),
	customer_id VARCHAR(20) FOREIGN KEY (customer_id) REFERENCES  Customers(customer_id) ,
	qr_code_image NVARCHAR(255) NOT NULL,
	origin NVARCHAR(100) NOT NULL,
    destination NVARCHAR(100) NOT NULL,
	departure_datetime DATETIME NOT NULL,
	booking_date DATETIME NOT NULL,
    payment_date DATETIME NULL,
    amount DECIMAL(5, 2) NOT NULL,
    payment_method NVARCHAR(50) NOT NULL
);


INSERT INTO Users (user_id_, username, password, email, role, face_recognition_data)
VALUES
    ('User1', 'username1', 'password1', 'user1@example.com', 'Customer', 0x0123456789ABCDEF),
    ('User5', 'username5', 'password5', 'user5@example.com', 'Customer', 0x0123456789ABCDEF),
    ('User6', 'username6', 'password6', 'user6@example.com', 'Customer', 0x0123456789ABCDEF),
    ('User2', 'username2', 'password2', 'user2@example.com', 'Driver', 0xFEDCBA9876543210),
    ('User3', 'username3', 'password3', 'user3@example.com', 'Admin', 0xFEDCBA9876543210),
    ('User4', 'username4', 'password4', 'user4@example.com', 'Partner', 0xFEDCBA9876543210);
INSERT INTO Users (user_id_, username, password, email, role, face_recognition_data)
VALUES     ('User8', 'username8', 'password8', 'user8@example.com', 'Customer', 0xFEDCBA9876543210);

INSERT INTO Customers (customer_id, user_id_, full_name, phone_number)
VALUES
	('Customer4', 'User4', 'Customer Name 4', '123-456-7891'),
    ('Customer1', 'User1', 'Customer Name 1', '123-456-7891'),
    ('Customer2', 'User5', 'Customer Name 5', '123-456-7891'),
    ('Customer3', 'User6', 'Customer Name 6', '123-456-7891');

INSERT INTO Partners (partner_id, company_name, image_avatar, contact_name, contact_email, contact_phone_number, contact_address, point, status_)
VALUES
    ('Partner1', 'Company 1', 'https://i.pinimg.com/736x/be/d9/2c/bed92cdaa8c3880d5fe77735bb8fecea.jpg', 'Contact 1', 'contact1@example.com', '123-456-7891', 'Address 1', 0.8, 1);
 
INSERT INTO Staffs (staff_id, user_id_, partner_id, image_avatar, full_name, phone_number)
VALUES
    ('Staff1', 'User7', 'Partner1', 'https://i.pinimg.com/736x/be/d9/2c/bed92cdaa8c3880d5fe77735bb8fecea.jpg', 'Staff Name 1', '123-456-7895'),

INSERT INTO Admins (admin_id, user_id_, full_name, phone_number)
VALUES
    ('Admin1', 'User3', 'Admin Name 1', '123-456-7893')
  
INSERT INTO Citys (city_id, name_city, image_avatar)
VALUES
    ('City1', 'City Name 1', 'https://i.pinimg.com/736x/be/d9/2c/bed92cdaa8c3880d5fe77735bb8fecea.jpg'),
    ('City2', 'City Name 2', 'https://i.pinimg.com/736x/be/d9/2c/bed92cdaa8c3880d5fe77735bb8fecea.jpg');
    
INSERT INTO Licenses (license_id, image_front, image_behind, image_width, image_height, image_type)
VALUES
    ('License1', 0x0123456789ABCDEF, 0xFEDCBA9876543210, 200, 100, 'Type1'),
    ('License2', 0x01ABCDEF23456789, 0xFEDCBA9876543210, 180, 90, 'Type2');

INSERT INTO Trips (trip_id, trip_name, origin, destination, distance, duration)
VALUES
    ('Trip1', 'Trip Name 1', 'Origin 1', 'Destination 1', 10.50, 12.06),
    ('Trip2', 'Trip Name 2', 'Origin 2', 'Destination 2', 75.25, 90.00);
select*from Trips
UPDATE Trips
SET departure_date = '2023-12-10'
WHERE trip_id = 'Trip1' or trip_id = 'Trip2';

INSERT INTO List_visits (numerical_order, city_id, note, trip_id)
VALUES
    (1, 'City1', 'Visit Note 1', 'Trip1'),
    (2, 'City2', 'Visit Note 2', 'Trip1');


INSERT INTO List_visits (numerical_order, city_id, note, trip_id)
VALUES
    (1, 'City1','null', 'Trip1'),
    (2, 'City2','null', 'Trip1');
   
INSERT INTO Drivers (driver_id, user_id_, image_avatar, full_name, birthday, address_, literacy, license_id, partner_id, phone_number, point, status_)
VALUES
    ('Driver1', 'User2', 'Image URL 1', 'Driver Name 1', '2000-01-01', 'Driver Address 1', 'Literacy 1', 'License1', 'Partner1', '123-456-7897', 0.8, 1)
    
INSERT INTO Coaches (coach_id, image_avatar, license_plate, seat_capacity, service_level, driver_id, partner_id, status_)
VALUES
    ('Coach1', 'https://i.pinimg.com/736x/be/d9/2c/bed92cdaa8c3880d5fe77735bb8fecea.jpg', 'License Plate 1', 50, 'Service Level 1', 'Driver1', 'Partner1', 1),
    ('Coach2', 'https://i.pinimg.com/736x/be/d9/2c/bed92cdaa8c3880d5fe77735bb8fecea.jpg', 'License Plate 2', 45, 'Service Level 2', 'Driver1', 'Partner1', 1);


INSERT INTO Tickets (ticket_id, partner_id, trip_id, customer_id_, coach_id, departure_datetime, arrival_datetime, seat_number, price, status_)
VALUES
    ('Ticket3', 'Partner1', 'Trip1', 'Customer3', 'Coach1', '2023-04-15 07:30:00', '2023-04-15 12:30:00', 'A1', 50.00, 1),
    ('Ticket1', 'Partner1', 'Trip1', 'Customer1', 'Coach1', '2023-04-15 07:30:00', '2023-04-15 12:30:00', 'A1', 45.00, 1),
	('Ticket2', 'Partner1', 'Trip1', 'Customer2', 'Coach1', '2023-04-15 07:30:00', '2023-04-15 12:30:00', 'A1', 45.00, 1);

INSERT INTO Payments (payment_id, ticket_id, customer_id, qr_code_image, origin, destination, departure_datetime, booking_date, payment_date, amount, payment_method)
VALUES
	('Payment3', 'Ticket3', 'Customer4', 'https://i.pinimg.com/736x/be/d9/2c/bed92cdaa8c3880d5fe77735bb8fecea.jpg', 'Origin 4', 'Destination 4', '2023-04-10 15:30:00', '2023-04-10 15:00:00', '2023-04-10 15:30:00', 50.00, 'Credit Card'),
    ('Payment1', 'Ticket1', 'Customer1', 'https://i.pinimg.com/736x/be/d9/2c/bed92cdaa8c3880d5fe77735bb8fecea.jpg', 'Origin 1', 'Destination 1', '2023-04-10 15:30:00', '2023-04-10 15:00:00', '2023-04-10 15:30:00', 45.00, 'Credit Card'),
	('Payment2','Ticket2', 'Customer2', 'https://i.pinimg.com/736x/be/d9/2c/bed92cdaa8c3880d5fe77735bb8fecea.jpg', 'Origin 1', 'Destination 1','2023-04-11 15:00:00', '2023-04-11 14:30:00', '2023-04-11 15:00:00', 35.00, 'PayPal');



SELECT * FROM Trips
WHERE origin = N'Origin 1' and destination = N'Destination 1' and departure_date = '2023-12-10';

SELECT
    Tickets.ticket_id,
    Customers.full_name AS customer_name,
    Partners.company_name AS partner_name,
    Trips.trip_name,
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
WHERE Tickets.ticket_id = 'Ticket1';

select origin from Trips
where origin 