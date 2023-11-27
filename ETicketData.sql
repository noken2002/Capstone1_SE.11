	
CREATE DATABASE EXPRESS_TICKETS_VER1;
USE EXPRESS_TICKETS_VER1

--Tạo bảng Users chứa các thuộc tính user_id, username, password, email, role, face_recognition_data
CREATE TABLE Users(
	user_id_ VARCHAR(20) PRIMARY KEY,
	username VARCHAR(50) ,
	password VARCHAR(255) ,
	email NVARCHAR(255) ,
    role VARCHAR(10) NOT NULL
);

--Tạo bảng Customers chứa các thuộc tính customer_id, user_id, full_name, phone_number
CREATE TABLE Customers(
	customer_id VARCHAR(20) PRIMARY KEY,
    user_id_ VARCHAR(20) FOREIGN KEY (user_id_) REFERENCES  Users(user_id_),
    full_name NVARCHAR(255) NOT NULL,
    phone_number VARCHAR(15) NOT NULL
);

--Tạo bảng Admins chứa các thuộc tính admin_id, user_id, full_name, phone_number
CREATE TABLE Admins (
    admin_id VARCHAR(20) PRIMARY KEY,
    user_id_ VARCHAR(20) FOREIGN KEY (user_id_) REFERENCES  Users(user_id_) ,
    full_name NVARCHAR(255) ,
    phone_number VARCHAR(15) 
);

--Tạo bảng Partners chứa các thuộc tính partner_id, company_name, image_avatar, contact_name, contact_email, contact_phone_number, contact_address
CREATE TABLE Partners (
    partner_id VARCHAR(20) PRIMARY KEY,
    company_name NVARCHAR(255) ,
	image_avatar NVARCHAR(255),
    contact_name NVARCHAR(255),
    contact_email NVARCHAR(255),
    contact_phone_number VARCHAR(15) ,
	contact_address NVARCHAR(255) ,
	point FLOAT NOT NULL,
	status_ BIT NOT NULL
);

--Tạo bảng Licenses chứa các thuộc tính license_id, image_front, image_behind, image_width, image_height, image_type
CREATE TABLE Licenses (
	license_id VARCHAR(20) PRIMARY KEY,
	image_front VARBINARY(8000),
	image_behind VARBINARY(8000),
	image_width INT,
	image_height INT,
	image_type VARCHAR(5)
);


--Tạo bảng Drivers chứa các thuộc tính driver_id, user_id, image_avatar, full_name, birthday, address, literacy, license_id, partner_id, phone_number, status_
CREATE TABLE Drivers (
    driver_id VARCHAR(20) PRIMARY KEY,
    user_id_ VARCHAR(20) FOREIGN KEY (user_id_) REFERENCES  Users(user_id_) ,
	image_avatar NVARCHAR(255) ,
    full_name NVARCHAR(255) ,
	birthday DATE ,
	address_ NVARCHAR(255) ,
	literacy NVARCHAR(100) ,
	license_id VARCHAR(20) FOREIGN KEY (license_id) REFERENCES  Licenses(license_id),
	partner_id VARCHAR(20) FOREIGN KEY (partner_id) REFERENCES  Partners(partner_id),
    phone_number VARCHAR(15) ,
	point FLOAT ,
	status_ BIT 
);

--Tạo bảng Staffs chứa các thuộc tính staff_id, user_id, partner_id, image_avatar, full_name, phone_number
CREATE TABLE Staffs (
    staff_id VARCHAR(20) PRIMARY KEY,
    user_id_ VARCHAR(20) FOREIGN KEY (user_id_) REFERENCES  Users(user_id_),
	partner_id VARCHAR(20) FOREIGN KEY (partner_id) REFERENCES  Partners(partner_id),
	image_avatar NVARCHAR(255) ,
    full_name NVARCHAR(255) ,
    phone_number VARCHAR(15) 
);

--Tạo bảng Coaches chứa các thuộc tính coach_id, image_avatar, license_plate, seat_capacity, service_level, driver_id, partner_id, status_
CREATE TABLE Coaches (
	coach_id VARCHAR(20) PRIMARY KEY,
	image_avatar NVARCHAR(255) ,
	license_plate VARCHAR(20) ,
	seat_capacity INT ,
	service_level NVARCHAR(50) ,
	driver_id VARCHAR(20) FOREIGN KEY (driver_id) REFERENCES  Drivers(driver_id),
	partner_id VARCHAR(20) FOREIGN KEY (partner_id) REFERENCES  Partners(partner_id),
	status_ BIT 
);

-- tạo bảng Citys chứa các thuộc tính
CREATE TABLE Citys (
	city_id VARCHAR(20) PRIMARY KEY NOT NULL,
	name_city NVARCHAR(50) NOT NULL,
	image_avatar NVARCHAR(255) NOT NULL
)

--tạo bảng Trips chứa các thuộc tính 
CREATE TABLE Trips (
    trip_id VARCHAR(20) PRIMARY KEY,
    trip_name NVARCHAR(100) NOT NULL,
    origin NVARCHAR(100) NOT NULL,
    destination NVARCHAR(100) NOT NULL,
    distance FLOAT,
    duration INT,
	departure_date DATETIME,
	number_of_ticket INT,
	price_trip float
);

--tạo bảng List_visits chứa các thuộc tính 
CREATE TABLE List_visits (
	numerical_order INT NOT NULL,
	city_id VARCHAR(20) FOREIGN KEY (city_id) REFERENCES Citys(city_id),
	note NVARCHAR(100) NOT NULL,
	trip_id VARCHAR(20) FOREIGN KEY (trip_id) REFERENCES Trips(trip_id)
);

--Tạo bảng Tickets chứa các thuộc tính ticket_id, partner_id, route_id, coach_id, departure_datetime, arrival_datetime, seat_number, price, status_
CREATE TABLE Tickets (
	ticket_id VARCHAR(20) PRIMARY KEY,
	trip_id VARCHAR(20) FOREIGN KEY (trip_id) REFERENCES  Trips(trip_id) ,
	customer_id_ VARCHAR(20) FOREIGN KEY (customer_id_) REFERENCES  Customers(customer_id),
	departure_datetime DATETIME NOT NULL,
	arrival_datetime DATETIME NOT NULL,
	seat_number VARCHAR(5) NOT NULL,
	price FLOAT NOT NULL,
	status_ BIT NOT NULL	
);

--Tạo bảng Payments chứa các thuộc tính payment_id, ticket_id, customer_id, qr_code_image, origin, destination, departure_datetime, payment_date, amount, payment_method
CREATE TABLE Payments (
    payment_id VARCHAR(20) PRIMARY KEY,
    ticket_id VARCHAR(20) FOREIGN KEY (ticket_id) REFERENCES  Tickets(ticket_id),
	qr_code_image NVARCHAR(255) NOT NULL,
	origin NVARCHAR(100) NOT NULL,
    destination NVARCHAR(100) NOT NULL,
	departure_datetime DATETIME NOT NULL,
	booking_date DATETIME NOT NULL,
    payment_date DATETIME NULL,
    amount FLOAT NOT NULL,
    payment_method NVARCHAR(50) NOT NULL
);

--Bảng thông báo
CREATE TABLE Notifications (
	notification_id INT IDENTITY(1,1) PRIMARY KEY,
	notification_type SMALLINT NOT NULL default 1,
	notification_content NVARCHAR(1000) NOT NULL,
    notification_status SMALLINT NOT NULL default 1
);

--Tạo bảng Seats chứa các thuộc tính 

CREATE TABLE Seats (
	seat_id VARCHAR(20) PRIMARY KEY,
	seat_number VARCHAR(5) NOT NULL,
	seat_status tinyint NOT NULL default 1, --1 Ghế chưa ai đặt, 2 Ghế có người đặt, 3 Ghế đã có người đặt, 4 Hành khách chuẩn bị xuống xe
    decker VARCHAR(2) NOT NULL, -- tầng ghế
	coach_id VARCHAR(20) FOREIGN KEY (coach_id) REFERENCES  Coaches(coach_id)
);

CREATE UNIQUE INDEX Seats_seat_number_coach_id_unique
ON Seats(seat_number, coach_id);
