Admin Dashboad:
-> for this we have 3 types of windows on role basis

1. For Traffic Regulator -> Incident Reports, Violation Reports

2. For Parking Administrator

---

Parking Management: endpoint: /parking
-> We will be having a screen which displays lots (ex: like mall locations) (endpoint /nearby is used for getting this information on to Lot screen)
-> once any of the lot is selected we can see the information of the slots available (needs to redirect to endpoint /available to get that information)
-> to add the slots we can use (endpoint /add)
-> once a slot is being tried to book then we need to update the status of its availability (endpoint /{id}/availability" it will update timestamp and availability both)
-> we can delete a slot aswell (endpoint /{id}) -> parking administrator can only do that

---

Traffic Monitoring: endpoint : /api/traffic
-> Traffic data we will pass is (location,congestionLevel,timestamp)
-> Location based traffic data (endpoint: /location)
-> time specific traffic data (endpoint: /timestamp -> can get the data in the period in range (-30 to +30))
-> total data can also be fetched

---

Vehicle Regulation: Two entities (Incidents, VehicleRegulation) endpoint: /vehicle-regulation

->Vehicle Regulation
--> There will be field to check the vehicle's information using it's number plate (endpoint: vehicleinformation) below things will be listed

1. They can see is the vehicle allowed onto road (odd/even rule)
2. Their fasttag balance
3. Their penalties information

-> Incident
--> We can fetch incidents happened wrt to vehicle number (/incidents)

## ->Additionally both the above two responses will be used in admin dashboard to display the statistics

Authentication: Needs to be done on role basis
Roles:

1. User
2. Traffice Regulator
3. Parking Administrator
