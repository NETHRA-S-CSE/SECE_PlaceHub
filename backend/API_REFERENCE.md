# API Quick Reference

## Base URL
```
http://localhost:5000/api
```

## Placement Drives API

### Get All Drives
```bash
GET /drives
```
**Response:**
```json
{
  "success": true,
  "data": [
    {
      "_id": "mongodb_id",
      "title": "Google Internship",
      "description": "Summer internship opportunity",
      "deadline": "2026-05-30T00:00:00.000Z",
      "eligibleYears": ["III", "IV"],
      "eligibleDepartments": ["CSE"],
      "minCGPA": 7.5,
      "applicationCount": 15,
      "createdAt": "2026-04-06T..."
    }
  ]
}
```

### Create Drive (Admin)
```bash
POST /drives
Content-Type: application/json

{
  "title": "Google Internship",
  "description": "Summer internship opportunity",
  "registrationLink": "https://example.com/apply",
  "deadline": "2026-05-30",
  "eligibleYears": ["III", "IV"],
  "eligibleDepartments": ["CSE"],
  "minCGPA": 7.5
}
```

### Get Drive by ID
```bash
GET /drives/:id
```

### Update Drive (Admin)
```bash
PUT /drives/:id
Content-Type: application/json

{
  "title": "Updated Title",
  "minCGPA": 8.0
}
```

### Delete Drive (Admin)
```bash
DELETE /drives/:id
```

---

## Applications API

### Apply for Drive (Student)
```bash
POST /applications/apply
Content-Type: application/json

{
  "driveId": "mongodb_drive_id",
  "driveTitle": "Google Internship",
  "studentId": "student_username",
  "studentData": {
    "registerNumber": "REG123",
    "rollNumber": "ROLL001",
    "year": "III",
    "department": "CSE",
    "cgpa": 8.5,
    "resumeLink": "https://example.com/resume.pdf"
  }
}
```

### Get Student's Applications
```bash
GET /applications/student/:studentId
```
Example: `/applications/student/student1`

### Get All Applications (Admin)
```bash
GET /applications
```

### Get Applications for a Drive (Admin)
```bash
GET /applications/drive/:driveId
```

---

## Notifications API

### Get All Notifications
```bash
GET /notifications
```

### Get Notifications for a Drive
```bash
GET /notifications/drive/:driveId
```

### Create Notification (Admin)
```bash
POST /notifications
Content-Type: application/json

{
  "driveId": "mongodb_drive_id",
  "driveTitle": "Google Internship",
  "message": "Round 1 results are announced. Check your email."
}
```

### Delete Notification (Admin)
```bash
DELETE /notifications/:id
```

---

## Testing with cURL

### Test API Health
```bash
curl http://localhost:5000/api/health
```

### Fetch All Drives
```bash
curl http://localhost:5000/api/drives
```

### Create a Drive
```bash
curl -X POST http://localhost:5000/api/drives \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Amazon Placement",
    "description": "Full-time placement opportunity",
    "registrationLink": "https://amazon.com/apply",
    "deadline": "2026-05-30",
    "eligibleYears": ["IV"],
    "eligibleDepartments": ["CSE"],
    "minCGPA": 8.0
  }'
```

### Apply for a Drive
```bash
curl -X POST http://localhost:5000/api/applications/apply \
  -H "Content-Type: application/json" \
  -d '{
    "driveId": "MONGODB_ID_HERE",
    "driveTitle": "Amazon Placement",
    "studentId": "student1",
    "studentData": {
      "registerNumber": "REG456",
      "rollNumber": "ROLL002",
      "year": "IV",
      "department": "CSE",
      "cgpa": 8.2,
      "resumeLink": "https://example.com/resume.pdf"
    }
  }'
```

---

## Common Response Codes

| Code | Meaning |
|------|---------|
| 200 | Success - Request succeeded |
| 201 | Created - Resource created successfully |
| 400 | Bad Request - Missing or invalid data |
| 404 | Not Found - Resource doesn't exist |
| 500 | Server Error - Internal server error |

---

## Frontend Usage Example

```javascript
// Import API service
import { driveAPI, applicationAPI, notificationAPI } from "../services/api";

// Get all drives
const response = await driveAPI.getAllDrives();
if (response.success) {
  console.log(response.data); // Array of drives
}

// Apply for drive
const result = await applicationAPI.applyForDrive(applicationData);
if (result.success) {
  console.log("Applied successfully");
}

// Post notification
const notifResult = await notificationAPI.createNotification(notifData);
if (notifResult.success) {
  console.log("Notification posted");
}
```

---

## Postman Collection

Import this into Postman to test all endpoints:

1. Open Postman
2. Create new collection: "PlaceHub API"
3. Add folder: "Drives"
4. Add requests using the examples above
5. Set `{{base_url}}` variable to `http://localhost:5000/api`

---

## Debugging Tips

1. **Check MongoDB Connection**: Look for "✅ MongoDB connected" in terminal
2. **API Health**: Visit `http://localhost:5000/api/health` in browser
3. **Check Logs**: Look at both terminal and browser console
4. **Network Tab**: Use DevTools Network tab to inspect API calls
5. **Error Status**: Check response status and error messages

---

## Rate Notes

- No rate limiting implemented
- Suitable for development/testing
- In production, consider adding rate limiting
