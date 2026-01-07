# How to Connect React Form to Google Sheets

To save your website's registration data directly to a Google Sheet, we will use a **Google Form** as the bridge. When a user submits the form on your website, it will secretly send the data to Google Forms, which automatically saves it to your Google Sheet.

### Step 1: Create the Google Form
1. Go to [Google Forms](https://docs.google.com/forms/) and create a new **Blank Form**.
2. Name it "B-Coders Registration".
3. Add the questions exactly matching your website fields:
   - **Student Name** (Short answer)
   - **Birthday** (Date)
   - **Father's Phone** (Short answer)
   - **Mother's Phone** (Short answer)
   - **Mode** (Multiple choice: "Online", "Onsite")
   - **Course** (Dropdown or Short Answer)
4. Go to the **Responses** tab and click the **Google Sheets icon** ("Link to Sheets") to create the connected Excel sheet.

### Step 2: Get the "Action URL"
1. In your Google Form, click the **Send** button (top right).
2. Click the **Link** icon (🔗) and copy the link.
3. Open a new tab in your browser and paste the link to view the form.
4. **Right-click** anywhere on the page and select **Inspect** (or View Page Source).
5. Press `Ctrl + F` (or `Cmd + F`) and search for `<form action=`.
6. You will see a URL that looks like `https://docs.google.com/forms/u/0/d/e/...../formResponse`.
7. **Copy this URL**. Additionaly, make sure not to copy the `viewform` part if you searched for the link directly; we need the `formResponse` version.

### Step 3: Get the "Entry IDs"
We need to know the specific ID for each input field (Name, Phone, etc.).
1. Go back to the "Inspect Elements" view of your live form.
2. Use the inspector tool to click on the input box for **Student Name**.
3. Look for the `name` attribute. It will look like `entry.123456789`.
   - Example: `<input type="text" name="entry.2005620554" ... >`
4. Copy the `entry.XXXXXX` ID for **every field** (Name, Birthday, Phones, Mode, Course).

### Step 4: Add to Your Code
I have updated your `App.jsx` file to easily accept these values. Look for the `GOOGLE_FORM_CONFIG` section at the top of the file and paste your values there.

```javascript
const GOOGLE_FORM_CONFIG = {
  actionURL: "PASTE_YOUR_FORM_ACTION_URL_HERE",
  fields: {
    studentName: "entry.123456",
    birthday: "entry.234567",
    fatherPhone: "entry.345678",
    motherPhone: "entry.456789",
    mode: "entry.567890",
    course: "entry.678901"
  }
};
```
