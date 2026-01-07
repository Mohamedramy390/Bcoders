# How to Connect Directly to Google Sheets (The Easy Way)

Since the "entry ID" method was too difficult, we will use a **Google Apps Script**. This allows your website to send data directly to the sheet without needing to find any hidden IDs.

### Step 1: Prepare the Sheet
1. Create a new [Google Sheet](https://sheets.new).
2. Name it "B-Coders Students".
3. In the first row (Header), write these column names:
   - **A1**: Timestamp
   - **B1**: Name
   - **C1**: Birthday
   - **D1**: Father Phone
   - **E1**: Mother Phone
   - **F1**: Mode
   - **G1**: Course

### Step 2: Add the Script
1. In your Google Sheet, click **Extensions** > **Apps Script**.
2. Delete any code there and paste the following code EXACTLY:

function doPost(e) {
  const sheet = SpreadsheetApp.openById("1EoIXCZfcN0EPFDp1eH4H1IENKnSwjZQY7PD2mxIYvpo").getSheetByName("Form Responses 1");

  sheet.appendRow([
    new Date(),
    e.parameter.name || "",
    e.parameter.email || "",
    e.parameter.service || "",
    e.parameter.date || "",
  ]);

  return ContentService.createTextOutput(
    JSON.stringify({ status: "success" })
  ).setMimeType(ContentService.MimeType.JSON);
}


```javascript
function doPost(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  
  // Parse the data sent from the website
  var data = JSON.parse(e.postData.contents);
  
  // Add a new row with the data
  sheet.appendRow([
    new Date(),
    data.studentName,
    data.birthday,
    data.fatherPhone,
    data.motherPhone,
    data.mode,
    data.course
  ]);
  
  // Return a success message
  return ContentService.createTextOutput(JSON.stringify({ "status": "success" }))
    .setMimeType(ContentService.MimeType.JSON);
}
```

3. Click the disk icon (💾) to **Save**. Name it "Code".

### Step 3: Deploy as Web App
1. Click the blue **Deploy** button (top right) > **New deployment**.
2. Click the gear icon (⚙️) next to "Select type" and choose **Web app**.
3. Fill in these details:
   - **Description**: API
   - **Execute as**: Me (your email)
   - **Who has access**: **Anyone** (This is crucial!)
4. Click **Deploy**.
5. You might be asked to **Authorize access**. Click "Review permissions", choose your account, click "Advanced" > "Go to... (unsafe)" (it is safe, it's your own script) > Allow.
6. Copy the **Web App URL**. It ends with `/exec`.

### Step 4: Update Your Website
1. Go to `src/App.jsx`.
2. Paste your **Web App URL** into the `SHEET_API_URL` variable at the top.

That's it! Now the form sends data directly to your sheet.
