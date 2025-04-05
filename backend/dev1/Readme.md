--> For DB:
Start your Spring Boot application (mvn spring-boot:run).

Open a browser and go to:
👉 http://localhost:8080/h2-console

Enter JDBC URL:
jdbc:h2:mem:testdb
Username: sa
Password: (leave it empty)

Click Connect to access the database.

--> Few Queries
SELECT \* FROM parking_slot;
Insert test data:

INSERT INTO parking_slot (location, is_available, latitude, longitude)
VALUES ('Mall Parking A', true, 12.9716, 77.5946);

API Testings:

//parking management

1. http://localhost:8080/parking/nearby?latitude=12.972&longitude=77.59 (for this there need to be available slots for that we can insert in db )
   INSERT INTO parking_slot (location, is_available, latitude, longitude)
   VALUES
   ('Mall Parking A', true, 12.9716, 77.5946),
   ('Mall Parking B', true, 14.0, 79.0),
   ('Mall Parking C', true, 15.5, 80.2),
   ('Mall Parking D', true, 13.0, 75.0);

   INSERT INTO PARKING_LOT (LOT_NAME,CAPACITY,AVAILABLE, latitude, longitude)
   VALUES
   ('Mall lot A', 100,true, 12.9716, 77.5946),
   ('Mall lot B', 30, true, 14.0, 79.0),
   ('Mall lot C',20, true, 15.5, 80.2),
   ('Mall lot D', 30,true, 13.0, 75.0);

   INSERT INTO parking_slot (is_available,LOT_ID)
   VALUES
   (true, 1),
   (true,2),
   (true,3),
   (true,4);

2. http://localhost:8080/parking/available

//road regulation testing

2. Post vehicle regulation
   http://localhost:8080/vehicle-regulation/admin/restriction/add?roadName=Highway 10 \_2&reason=No Work&isClosed=false

3. Checking road availability
   http://localhost:8080/vehicle-regulation/restriction/check?roadName=Highway 10 \_2

//odd even check
4.http://localhost:8080/vehicle-regulation/check/AP01AB1235 (for this days are hard coded in C:\wilp\w-fourth sem\Dissertation\TVMS_DEV\backend\dev1\src\main\java\com\tvms\dev1\vehicleregulation\VehicleRegulationService.java so as per the day it will be given)

You can test the APIs in **Postman** using the following requests:

---

### 🚦 **1. Congestion Patterns API** (`/api/congestion`)

#### **1.1 Get All Congestion Reports**

- **Method:** `GET`
- **URL:** `http://localhost:8080/api/congestion`
- **Expected Response (Example):**

```json
[
  {
    "id": 1,
    "location": "Main Street",
    "congestionLevel": "High",
    "timestamp": "2025-03-26T08:30:00"
  }
]
```

#### **1.2 Add a New Congestion Report**

- **Method:** `POST`
- **URL:** `http://localhost:8080/api/congestion`
- **Body (JSON):**

```json
{
  "location": "Highway 101",
  "congestionLevel": "Medium",
  "timestamp": "2025-03-26T09:00:00"
}
```

- **Expected Response:**

```json
{
  "id": 2,
  "location": "Highway 101",
  "congestionLevel": "Medium",
  "timestamp": "2025-03-26T09:00:00"
}
```

---

### 🅿️ **2. Parking Occupancy API** (`/api/parking`)

#### **2.1 Get Parking Reports**

- **Method:** `GET`
- **URL:** `http://localhost:8080/api/parking`
- **Expected Response:**

```json
[
  {
    "id": 1,
    "location": "Mall Parking",
    "occupiedSpots": 120,
    "totalSpots": 150,
    "timestamp": "2025-03-26T08:30:00"
  }
]
```

#### **2.2 Add a Parking Report**

- **Method:** `POST`
- **URL:** `http://localhost:8080/api/parking`
- **Body (JSON):**

```json
{
  "location": "Airport Parking",
  "occupiedSpots": 85,
  "totalSpots": 100,
  "timestamp": "2025-03-26T09:00:00"
}
```

---

### 🚗 **3. Vehicle Movement API** (`/api/vehicles`)

#### **3.1 Get Vehicle Movements**

- **Method:** `GET`
- **URL:** `http://localhost:8080/api/vehicles`
- **Expected Response:**

```json
[
  {
    "id": 1,
    "vehicleNumber": "KA-01-AB-1234",
    "location": "Highway 101",
    "timestamp": "2025-03-26T08:45:00"
  }
]
```

#### **3.2 Add a Vehicle Movement Record**

- **Method:** `POST`
- **URL:** `http://localhost:8080/api/vehicles`
- **Body (JSON):**

```json
{
  "vehicleNumber": "MH-02-XY-5678",
  "location": "City Center",
  "timestamp": "2025-03-26T09:15:00"
}
```

---

### ✅ **Steps to Test in Postman**

1. Open **Postman**.
2. Select **Method (GET/POST)**.
3. Enter **URL** (e.g., `http://localhost:8080/api/congestion`).
4. For `POST` requests, go to **Body > Raw** and select **JSON** format.
5. Click **Send** and check the response.

---

✅ Testing with Postman

1. Get All Traffic Data
   Method: GET

URL: http://localhost:8080/api/traffic

2. Get Traffic by Location
   Method: GET

URL: http://localhost:8080/api/traffic/Main Street

3. Add Traffic Data
   Method: POST

URL: http://localhost:8080/api/traffic

Body (JSON):

json
Copy
Edit
{
"location": "City Center",
"congestionLevel": "High",
"timestamp": "2025-03-26T09:30:00"
} 4. Get Recommended Routes
Method: GET

URL: http://localhost:8080/api/routes/CityCenter/Airport
