# Fix 403 Error & Script Issues

The `403 Forbidden` error happens for one specific reason: **Permissions**.
Google restricts the script so "Anonymous" people (like your website visitors) can't access it.

### Step 1: Fix Permissions (Crucial!)
1. Go back to your Google Apps Script tab.
2. Click the blue **Deploy** button > **Manage deployments**.
3. Select your deployment on the left.
4. Click the **pencil icon** (Edit).
5. Change **"Who has access"** to **"Anyone"**.
   - *Note: If it was already "Anyone", you MUST create a NEW deployment to force the update.*
6. If you create a new deployment, copy the **NEW URL** and update `App.jsx`.

### Step 2: Use the Correct Code
The code you were using expects "form parameters" (like `name`, `email`), but our website sends **JSON data** (`studentName`, `fatherPhone`, etc.). Also, the column order needs to match your screenshot.

**Delete everything in your Apps Script and paste this fixed version:**

```javascript
function doPost(e) {
  // 1. Get the active sheet (safest way)
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  
  // 2. Parse the JSON data sent from React
  var data = JSON.parse(e.postData.contents);
  
  // 3. Add the row in the EXACT order of your columns:
  // Timestamp | Name | Birthday | Father Phone | Mode | Mother Phone | Course
  sheet.appendRow([
    new Date(),               // Column A: Timestamp
    data.studentName,         // Column B: Student Name
    data.birthday,            // Column C: Birthday
    data.fatherPhone,         // Column D: Father Phone
    data.mode,                // Column E: Online/Onsite
    data.motherPhone,         // Column F: Mother Phone
    data.course               // Column G: Course
  ]);
  
  // 4. Return success
  return ContentService.createTextOutput(JSON.stringify({ "status": "success" }))
    .setMimeType(ContentService.MimeType.JSON);
}
```

### Step 3: Save & Deploy Again
1. **Save** the script.
2. Click **Deploy** > **New Deployment**.
3. **Select type**: Web app.
4. **Description**: "Fixed JSON version".
5. **Execute as**: Me.
6. **Who has access**: **Anyone** (This is the most important part!).
7. Click **Deploy**.
8. **Copy the NEW URL**.

### Step 4: Update App.jsx
Paste the new URL into your `src/App.jsx` file at `SHEET_API_URL`.
