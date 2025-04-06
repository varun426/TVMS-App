INSERT INTO parking_slot (is_available,LOT_ID)
VALUES
(true, 1),
(true,2),
(true,3),
(true,4);

INSERT INTO PARKING_LOT (LOT_NAME,CAPACITY,AVAILABLE, latitude, longitude)
VALUES
('Mall lot A', 100,true, 12.9716, 77.5946),
('Mall lot B', 30, true, 14.0, 79.0),
('Mall lot C',20, true, 15.5, 80.2),
('Mall lot D', 30,true, 13.0, 75.0);

INSERT INTO vehicle_regulation (VEHICLE_NUMBER , penalty_amount, PENALTY , DATE_TIME ) VALUES
('AP01AB1234', 500, 'Over-speeding', NOW()),
('TS05CD5678', 1000, 'Signal Jump', NOW()),
('KA03EF9012', 750, 'No Parking', NOW()),
('MH12GH3456', 1200, 'Driving Without Helmet', NOW()),
('DL04IJ7890', 800, 'Wrong Lane Driving', NOW()),
('TN07KL2345', 950, 'Over-speeding', NOW()),
('GJ08MN6789', 1100, 'Drunk Driving', NOW()),
('WB10OP4567', 600, 'No Seatbelt', NOW()),
('RJ11QR8901', 1300, 'Using Mobile While Driving', NOW()),
('UP06ST2345', 700, 'Driving Without License', NOW());
('UP06ST2345', 700, 'Even/Odd rule', NOW());

INSERT INTO VEHICLE_REGULATION (VEHICLE_NUMBER , PENALTY_AMOUNT , VIOLATION_TIME , FAST_TAG_AMOUNT ) VALUES
('KA03EF9012', 500, '2025-04-01T08:30:07.860', 200),
('TS09XY5678', 1000, '2025-04-01T12:45:15.230', 500),
('TS07MN7890', 300, '2025-04-01T14:10:32.560', 150),
('TS06PQ3456', 700, '2025-04-01T18:20:45.120', 300),
('TS05UV6789', 1200, '2025-04-01T20:55:55.980', 1000),
('TS04WX1122', 900, '2025-04-01T22:30:10.760', 700),
('TS03YZ3344', 600, '2025-04-01T06:40:22.340', 400),
('TS02CD5566', 400, '2025-04-01T10:15:37.670', 250),
('TS01EF7788', 1100, '2025-04-01T15:50:47.250', 600),
('TS10GH9900', 250, '2025-04-01T19:25:55.890', 120);

INSERT INTO TRAFFIC_DATA (location, congestionLevel, timestamp, fasttagAmount) VALUES
('Hitech City', 'High', '2025-04-01T08:30:07.860', 50.00),
('Hitech City', 'Medium', '2025-04-01T12:30:15.234', 30.50),
('Hitech City', 'Low', '2025-04-01T22:00:45.567', 10.25),
('Madhapur', 'Medium', '2025-04-01T09:00:25.982', 45.75),
('Madhapur', 'High', '2025-04-01T18:00:33.410', 60.00),
('Madhapur', 'Low', '2025-04-01T23:00:55.720', 15.00),
('Gachibowli', 'Low', '2025-04-01T07:30:17.890', 20.00),
('Gachibowli', 'High', '2025-04-01T17:30:29.456', 55.20),
('Gachibowli', 'Medium', '2025-04-01T20:30:14.321', 35.80),
('Ameerpet', 'High', '2025-04-01T08:00:05.678', 70.00),
('Ameerpet', 'Medium', '2025-04-01T14:00:49.654', 40.00),
('Ameerpet', 'Low', '2025-04-01T21:00:23.876', 25.50),
('Secunderabad', 'Medium', '2025-04-01T10:00:31.900', 38.90),
('Secunderabad', 'High', '2025-04-01T19:00:42.320', 65.00),
('Secunderabad', 'Low', '2025-04-01T23:30:11.500', 18.75),
('Mehdipatnam', 'High', '2025-04-01T09:30:37.245', 58.30),
('Mehdipatnam', 'Medium', '2025-04-01T15:30:55.875', 42.60),
('Mehdipatnam', 'Low', '2025-04-01T22:30:09.432', 22.10),
('Begumpet', 'High', '2025-04-01T08:45:48.120', 62.40),
('Begumpet', 'Medium', '2025-04-01T13:45:29.786', 48.20);

INSERT INTO `tvms_dbmysql`.`vehicle_regulation`
(`fast_tag_amount`, `penalty_amount`, `vehicle_number`, `violation_time`, `violation_type`)
VALUES
(200, 500, 'TS09AB1234', '2025-04-01 08:30:07', 'Over Speeding'),
(150, 300, 'TS10XY5678', '2025-04-01 09:15:22', 'Signal Jumping'),
(100, 200, 'TS07GH2468', '2025-04-01 10:45:50', 'Wrong Parking'),
(250, 700, 'TS05CD7890', '2025-04-01 12:05:30', 'No Helmet'),
(180, 400, 'TS11EF1357', '2025-04-01 14:20:15', 'Lane Violation');

