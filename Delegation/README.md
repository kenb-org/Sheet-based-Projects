# 🎯 DelegateHub — Delegation Handler System

> **Web-Based | Google Apps Script | Google Sheets**
> MIS Executive Automation Tool · Reduce Manual Work by **80–90%**

---
## Glance
### Link [Click Me](https://script.google.com/macros/s/AKfycbxLkGVG9nZm4RefWD91Va-r_3R-u70-Zqc3wZHrFl9nD7vEL7N5VGse6AnO_PDQYqLy/exec)
### Watch The Video [Click Me](https://youtu.be/TcY4Spx2HtE)


## 📊 Quick Stats

| Metric | Value |
|---|---|
| Manual Work Reduction | 80–90% |
| Modules | 5 |
| Files to Deploy | 2 |
| Setup Time | ~10 minutes |

---

## 📌 Overview

**DelegateHub** is a fully web-based delegation management system built on **Google Apps Script (GAS)** and **Google Sheets**. Designed for MIS Executives, it eliminates manual task tracking, automates status updates, and provides real-time visibility into team workloads — with zero per-user software cost.

The system runs entirely within your **Google Workspace environment**, meaning all data stays on your Google Sheet with no external database required.

### Key Objectives

- Eliminate manual delegation tracking (email chains, Excel registers, WhatsApp follow-ups)
- Give MIS Executive real-time visibility over all task assignments and status
- Automatically detect overdue tasks and send email alerts to assignees
- Create a tamper-proof audit trail of every delegation action
- Enable one-click CSV export for reporting and decision-making

---

## ⚡ Features

| # | Feature | Description |
|---|---------|-------------|
| 1 | 📊 **Live Dashboard** | 7 KPI cards + Priority bar chart + Status donut chart. Updates on every load. |
| 2 | 📋 **Full CRUD** | Create, Read, Update, Delete delegations with unique auto-generated IDs (`DEL-XXXXX-XX`). |
| 3 | 🔍 **Search & Filter** | Real-time search by title / assignee / ID. Filter by Status and Priority. |
| 4 | 🚨 **Auto Overdue Detection** | System marks tasks past due date as **Overdue** automatically on every load. |
| 5 | 📧 **Email Notifications** | Auto email to assignee on delegation creation (uses Gmail via GAS). |
| 6 | 🔐 **Audit Trail** | Every CREATE / UPDATE / DELETE logged with timestamp, user, and details. |
| 7 | 👥 **Team Directory** | View all members with active delegation count per person. |
| 8 | 📥 **CSV Export** | One-click download of all delegations for reporting. |
| 9 | 🎨 **Demo Mode** | Works standalone with sample data — no GAS needed for preview. |
| 10 | 📱 **Responsive UI** | Mobile-friendly sidebar. Works on phones, tablets, and desktops. |

---

## 📁 Files Included

| File | Type | Purpose |
|------|------|---------|
| `Code.gs` | Apps Script | Full backend — all logic, data ops, email, audit, export |
| `index.html` | HTML / CSS / JS | Complete web UI — sidebar, dashboard, tables, modals |
| `README.md` | Markdown | This setup and reference guide |

---

## ⚙️ Setup Instructions

> Total setup time: approximately **10 minutes**

### Step 1 — Create a Google Sheet

1. Go to [sheets.google.com](https://sheets.google.com)
2. Create a new spreadsheet
3. Name it: `Delegation Handler System`

### Step 2 — Open Apps Script Editor

1. In the sheet, click: **Extensions → Apps Script**
2. The script editor will open in a new tab

### Step 3 — Add the Backend Code

1. **Delete** the default `myFunction()` code
2. **Copy** the entire contents of `Code.gs`
3. **Paste** it into the editor
4. Click **Save** (💾 or `Ctrl+S`)
5. Name the project: `DelegationHandler`

### Step 4 — Add the HTML File

1. In the Apps Script editor, click **+** (New File) → **HTML**
2. Name it exactly: `index` *(no extension needed)*
3. **Delete** all existing default content
4. **Copy & Paste** the full contents of `index.html`
5. **Save**

### Step 5 — Deploy as Web App

1. Click **Deploy** → **New Deployment**
2. Click the ⚙️ gear icon → **Web App**
3. Configure:
   - **Description:** `Delegation Handler v1.0`
   - **Execute as:** `Me`
   - **Who has access:** `Anyone` *(or your organization)*
4. Click **Deploy**
5. **Copy the Web App URL** — this is your app link!

### Step 6 — Authorize Permissions

1. Click **Authorize Access**
2. Choose your Google account
3. Click **Advanced** → **Go to DelegationHandler (unsafe)**
4. Click **Allow**

### Step 7 — Launch the App

1. Open the **Web App URL** in your browser
2. The system will **auto-create all required sheets** on first load
3. You're ready to use DelegateHub!

---

## 📊 Google Sheets Structure

> All sheets are created automatically on first run. **Never delete or rename them.**

### Sheet: `Delegations`

| Col | Field | Format | Description |
|-----|-------|--------|-------------|
| A | ID | `DEL-XXXXX-XX` | Auto-generated unique delegation ID |
| B | Title | Text | Short title of the delegated task |
| C | Description | Text | Full task description / instructions |
| D | Delegated By | Name | Person assigning the task |
| E | Delegated To | Name | Person responsible for execution |
| F | Priority | Critical/High/Medium/Low | Urgency level of the task |
| G | Category | Text | Department/area (Operations, IT, HR, etc.) |
| H | Due Date | Date | Deadline for task completion |
| I | Created Date | Date + Time | Auto-set when delegation is created |
| J | Status | Color-coded | Pending / In Progress / Completed / Overdue etc. |
| K | Progress % | 0–100 | Completion percentage |
| L | Notes | Text | Additional notes or instructions |
| M | Attachments | Text / URL | File references or links |
| N | Last Updated | Date + Time | Auto-updated on every edit |
| O | Completed Date | Date | Auto-set when status = Completed |

### Sheet: `Users`

| Col | Field | Example | Notes |
|-----|-------|---------|-------|
| A | Employee ID | `EMP001` | Unique employee identifier |
| B | Name | `Rajesh Kumar` | Must match dropdown selections exactly |
| C | Email | `rajesh@company.com` | Used for email notifications |
| D | Department | `Operations` | Department or team name |
| E | Role | `Manager` | Job title or role |
| F | Active | `TRUE` / `FALSE` | Set `FALSE` to hide from dropdowns |

### Sheet: `AuditLog`

Auto-populated. **Never edit manually.** Stores the last 50 entries displayed in the Audit Log view.

| Col | Field | Description |
|-----|-------|-------------|
| A | Timestamp | Date and time of the action |
| B | Action | CREATE / UPDATE / DELETE |
| C | Delegation ID | ID of the affected delegation |
| D | Performed By | Name of the user who took action |
| E | Details | Full description of what changed |
| F | Session | Google account email / session info |

---

## 🏷️ Status & Priority Reference

### Status Values

| Status | Color | Meaning |
|--------|-------|---------|
| `Pending` | 🟡 Yellow | Not yet started |
| `In Progress` | 🔵 Blue | Actively being worked on |
| `Delegated` | 🔵 Blue | Passed to a sub-team / person |
| `Review` | 🟣 Purple | Submitted, awaiting review |
| `Completed` | 🟢 Green | Fully done and verified |
| `Overdue` | 🔴 Red | Past due date — auto-detected by system |
| `Rejected` | 🔴 Red | Not accepted or cancelled |

### Priority Levels

| Priority | Color | Use When |
|----------|-------|----------|
| `Critical` | 🔴 Red | Immediate action — business impact if delayed |
| `High` | 🟠 Orange | Important — complete within 24–48 hours |
| `Medium` | 🔵 Blue | Standard — complete within the week |
| `Low` | 🟢 Green | When time permits — no urgent deadline |

---

## 👥 Adding Your Team Members

Open the `Users` sheet and add a new row for each team member:

```
EMP ID    | Name           | Email                  | Department  | Role          | Active
EMP007    | Your Name      | you@company.com        | IT          | MIS Executive | TRUE
EMP008    | Team Member    | member@company.com     | Finance     | Executive     | TRUE
```

> After adding members, **refresh the web app**. New names appear in the dropdowns immediately.

---

## 🎨 Customization

### Adding Task Categories

In `index.html`, find `id="f-category"` and add new `<option>` tags:

```html
<option>Supply Chain</option>
<option>Legal / Compliance</option>
<option>Procurement</option>
```

### Changing Theme Colors

In `index.html`, find the `:root { }` CSS block near the top and update the variables:

```css
:root {
  --accent:  #6c63ff;   /* primary brand color     */
  --accent2: #ff6584;   /* alert / overdue color   */
  --accent3: #43e97b;   /* success / completed     */
  --ink:     #0d0d14;   /* main background         */
  --panel:   #1a1a2e;   /* sidebar background      */
}
```

### Adding New Status Values

1. Open `Code.gs` and add your new status to the `STATUS_FLOW` array:
   ```javascript
   const STATUS_FLOW = ["Pending", "In Progress", "Delegated", "Review", "On Hold", "Completed", "Overdue", "Rejected"];
   ```
2. In `index.html`, add a CSS class following the naming pattern:
   ```css
   .s-On-Hold { background: rgba(255,193,7,0.15); color: #ffc107; }
   ```

---

## 📧 Email Notifications

Emails are sent automatically when a new delegation is created. Requirements:

1. ✅ Team members must have **email addresses** in the `Users` sheet (Column C)
2. ✅ Apps Script must be **authorized with Gmail permissions** (done during Step 6)
3. ✅ Script must be deployed with **"Execute as: Me"**

**Email Template sent to assignee:**

```
Subject: [Delegation System] New Task Assigned: {Task Title}

Dear {Assignee Name},

A new task has been delegated to you.

📋 Task ID:      DEL-XXXXX-XX
📌 Title:        {Task Title}
🎯 Priority:     {Priority}
📅 Due Date:     {Due Date}
👤 Assigned By:  {Delegated By}
📝 Description:  {Description}

Please log in to the Delegation Handler System to view and update your task.

Regards,
MIS Automation System
```

> **Note:** Email failures are silent — the delegation is still saved even if the email does not send. Check Apps Script execution logs if emails are not arriving.

---

## 🛠️ Troubleshooting

| Issue | Fix |
|-------|-----|
| Blank screen / still loading | Re-authorize: **Deploy → Manage Deployments → Edit → Deploy again** |
| HTML file name error | Ensure the HTML file is named exactly `index` (no `.html` extension in GAS editor) |
| Sheets not auto-created | Run `initializeSheets()` manually from the Apps Script editor using the **Run** button |
| Emails not being sent | Check Gmail authorization in Apps Script permissions. Run a test manually via the editor. |
| Dropdown names not appearing | Refresh the web app after adding users to the `Users` sheet |
| Changes not reflecting | Deploy a new version: **Deploy → Manage → Edit → New Version → Deploy** |
| Script timeout errors | Large datasets may time out. Archive old completed delegations to a separate sheet. |
| Cannot access from mobile | Ensure the Web App URL uses `https://` and "Who has access" is not set to only yourself |

---

## 🔒 Security & Access Control

- Set **"Who has access"** to `Anyone within [your organization]` for company-only access via Google Workspace domain restriction
- For enterprise deployments, use **Service Account** or **OAuth with domain-wide delegation**
- The `AuditLog` sheet records every action with the Google account email — **do not share the sheet publicly**
- Back up the Google Sheet monthly using **File → Make a copy**
- Never expose the Web App URL publicly if it contains sensitive business data

---

## 🚀 Planned Enhancements

- [ ] WhatsApp / Slack notification integration via webhooks
- [ ] Approval workflow — manager approval before delegation becomes active
- [ ] Recurring delegation templates for standard weekly tasks
- [ ] Power BI / Looker Studio connector for executive dashboards
- [ ] Mobile push notifications via Firebase Cloud Messaging
- [ ] Role-based access (Admin / Manager / Employee views) with login
- [ ] Bulk delegation import via CSV upload
- [ ] SLA tracking — time taken from creation to completion

---

## 🧠 How Demo Mode Works

When the `index.html` is opened **directly in a browser** (not via GAS deployment), the system detects that `google.script.run` is unavailable and automatically switches to **Demo Mode**:

- A yellow banner appears at the top indicating demo mode
- All 6 sample team members and 6 sample delegations are pre-loaded
- All CRUD operations (create, edit, delete) work fully — changes are stored in memory
- CSV export works and downloads real data
- When deployed to GAS, the system automatically switches to **live Google Sheets mode** — no code changes needed

---

## 📞 Support

For support or feature requests, contact your **MIS Executive**.

For Google Apps Script documentation, visit: [developers.google.com/apps-script](https://developers.google.com/apps-script)

---

*Built for MIS Executive Automation · Google Apps Script + Google Sheets · 2026*
*Reduce manual data entry by 80–90% · Zero per-user software cost*
