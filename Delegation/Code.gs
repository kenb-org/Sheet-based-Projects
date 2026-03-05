// ============================================================
// DELEGATION HANDLER SYSTEM - Google Apps Script Backend
// Author: MIS Executive Automation Tool
// ============================================================

const SHEET_NAME = "Delegations";
const USERS_SHEET = "Users";
const AUDIT_SHEET = "AuditLog";
const PRIORITY_LEVELS = ["Critical", "High", "Medium", "Low"];
const STATUS_FLOW = ["Pending", "In Progress", "Delegated", "Review", "Completed", "Overdue", "Rejected"];

// ─── ENTRY POINT ───────────────────────────────────────────
function doGet(e) {
  return HtmlService.createTemplateFromFile("index")
    .evaluate()
    .setTitle("Delegation Handler System")
    .addMetaTag("viewport", "width=device-width, initial-scale=1")
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename).getContent();
}

// ─── SHEET INITIALIZATION ───────────────────────────────────
function initializeSheets() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();

  // Delegations Sheet
  let delSheet = ss.getSheetByName(SHEET_NAME);
  if (!delSheet) {
    delSheet = ss.insertSheet(SHEET_NAME);
    const headers = [
      "ID", "Title", "Description", "Delegated By", "Delegated To",
      "Priority", "Category", "Due Date", "Created Date", "Status",
      "Progress %", "Notes", "Attachments", "Last Updated", "Completed Date"
    ];
    delSheet.getRange(1, 1, 1, headers.length).setValues([headers]);
    delSheet.getRange(1, 1, 1, headers.length)
      .setBackground("#1a1a2e").setFontColor("#ffffff")
      .setFontWeight("bold").setFontSize(11);
    delSheet.setFrozenRows(1);
  }

  // Users Sheet
  let userSheet = ss.getSheetByName(USERS_SHEET);
  if (!userSheet) {
    userSheet = ss.insertSheet(USERS_SHEET);
    const uHeaders = ["Employee ID", "Name", "Email", "Department", "Role", "Active"];
    userSheet.getRange(1, 1, 1, uHeaders.length).setValues([uHeaders]);
    userSheet.getRange(1, 1, 1, uHeaders.length)
      .setBackground("#1a1a2e").setFontColor("#ffffff")
      .setFontWeight("bold");
    // Seed sample users
    const sampleUsers = [
      ["EMP001", "Rajesh Kumar", "rajesh@company.com", "Operations", "Manager", true],
      ["EMP002", "Priya Sharma", "priya@company.com", "Finance", "Executive", true],
      ["EMP003", "Amit Singh", "amit@company.com", "IT", "MIS Executive", true],
      ["EMP004", "Sunita Patel", "sunita@company.com", "HR", "Manager", true],
      ["EMP005", "Vikram Das", "vikram@company.com", "Sales", "Executive", true],
      ["EMP006", "Neha Joshi", "neha@company.com", "Marketing", "Lead", true],
    ];
    userSheet.getRange(2, 1, sampleUsers.length, sampleUsers[0].length).setValues(sampleUsers);
    userSheet.setFrozenRows(1);
  }

  // Audit Log Sheet
  let auditSheet = ss.getSheetByName(AUDIT_SHEET);
  if (!auditSheet) {
    auditSheet = ss.insertSheet(AUDIT_SHEET);
    const aHeaders = ["Timestamp", "Action", "Delegation ID", "Performed By", "Details", "IP/Session"];
    auditSheet.getRange(1, 1, 1, aHeaders.length).setValues([aHeaders]);
    auditSheet.getRange(1, 1, 1, aHeaders.length)
      .setBackground("#1a1a2e").setFontColor("#ffffff")
      .setFontWeight("bold");
    auditSheet.setFrozenRows(1);
  }

  return { success: true, message: "Sheets initialized successfully" };
}

// ─── GENERATE UNIQUE ID ─────────────────────────────────────
function generateId() {
  const timestamp = new Date().getTime().toString(36).toUpperCase();
  const random = Math.random().toString(36).substr(2, 4).toUpperCase();
  return `DEL-${timestamp}-${random}`;
}

// ─── CREATE DELEGATION ──────────────────────────────────────
function createDelegation(data) {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = ss.getSheetByName(SHEET_NAME) || (initializeSheets(), ss.getSheetByName(SHEET_NAME));
    const id = generateId();
    const now = new Date();
    const row = [
      id,
      data.title,
      data.description,
      data.delegatedBy,
      data.delegatedTo,
      data.priority,
      data.category,
      new Date(data.dueDate),
      now,
      "Pending",
      0,
      data.notes || "",
      data.attachments || "",
      now,
      ""
    ];
    sheet.appendRow(row);
    // Format the new row
    const lastRow = sheet.getLastRow();
    const statusCell = sheet.getRange(lastRow, 10);
    applyStatusColor(statusCell, "Pending");
    logAudit("CREATE", id, data.delegatedBy, `New delegation: "${data.title}" assigned to ${data.delegatedTo}`);
    sendEmailNotification(data, id, "created");
    return { success: true, id: id, message: "Delegation created successfully!" };
  } catch (e) {
    return { success: false, message: "Error: " + e.toString() };
  }
}

// ─── GET ALL DELEGATIONS ────────────────────────────────────
function getAllDelegations() {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = ss.getSheetByName(SHEET_NAME);
    if (!sheet || sheet.getLastRow() <= 1) return { success: true, data: [] };
    const data = sheet.getRange(2, 1, sheet.getLastRow() - 1, 15).getValues();
    const delegations = data.map(row => ({
      id: row[0], title: row[1], description: row[2],
      delegatedBy: row[3], delegatedTo: row[4], priority: row[5],
      category: row[6],
      dueDate: row[7] ? Utilities.formatDate(new Date(row[7]), Session.getScriptTimeZone(), "yyyy-MM-dd") : "",
      createdDate: row[8] ? Utilities.formatDate(new Date(row[8]), Session.getScriptTimeZone(), "dd/MM/yyyy HH:mm") : "",
      status: row[9], progress: row[10], notes: row[11],
      attachments: row[12],
      lastUpdated: row[13] ? Utilities.formatDate(new Date(row[13]), Session.getScriptTimeZone(), "dd/MM/yyyy HH:mm") : "",
      completedDate: row[14] ? Utilities.formatDate(new Date(row[14]), Session.getScriptTimeZone(), "dd/MM/yyyy") : ""
    }));
    // Auto-check overdue
    checkOverdue(delegations, sheet);
    return { success: true, data: delegations };
  } catch (e) {
    return { success: false, message: e.toString() };
  }
}

// ─── UPDATE DELEGATION ──────────────────────────────────────
function updateDelegation(data) {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = ss.getSheetByName(SHEET_NAME);
    const allData = sheet.getDataRange().getValues();
    for (let i = 1; i < allData.length; i++) {
      if (allData[i][0] === data.id) {
        const now = new Date();
        sheet.getRange(i + 1, 2).setValue(data.title);
        sheet.getRange(i + 1, 3).setValue(data.description);
        sheet.getRange(i + 1, 5).setValue(data.delegatedTo);
        sheet.getRange(i + 1, 6).setValue(data.priority);
        sheet.getRange(i + 1, 7).setValue(data.category);
        sheet.getRange(i + 1, 8).setValue(new Date(data.dueDate));
        sheet.getRange(i + 1, 10).setValue(data.status);
        sheet.getRange(i + 1, 11).setValue(data.progress);
        sheet.getRange(i + 1, 12).setValue(data.notes);
        sheet.getRange(i + 1, 14).setValue(now);
        if (data.status === "Completed") sheet.getRange(i + 1, 15).setValue(now);
        applyStatusColor(sheet.getRange(i + 1, 10), data.status);
        logAudit("UPDATE", data.id, data.updatedBy || "System", `Status → ${data.status}, Progress → ${data.progress}%`);
        return { success: true, message: "Delegation updated successfully!" };
      }
    }
    return { success: false, message: "Delegation not found." };
  } catch (e) {
    return { success: false, message: e.toString() };
  }
}

// ─── DELETE DELEGATION ──────────────────────────────────────
function deleteDelegation(id, deletedBy) {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = ss.getSheetByName(SHEET_NAME);
    const allData = sheet.getDataRange().getValues();
    for (let i = 1; i < allData.length; i++) {
      if (allData[i][0] === id) {
        sheet.deleteRow(i + 1);
        logAudit("DELETE", id, deletedBy || "System", `Delegation permanently removed`);
        return { success: true, message: "Delegation deleted." };
      }
    }
    return { success: false, message: "Not found." };
  } catch (e) {
    return { success: false, message: e.toString() };
  }
}

// ─── GET DASHBOARD STATS ────────────────────────────────────
function getDashboardStats() {
  try {
    const result = getAllDelegations();
    if (!result.success) return result;
    const data = result.data;
    const stats = {
      total: data.length,
      pending: data.filter(d => d.status === "Pending").length,
      inProgress: data.filter(d => d.status === "In Progress").length,
      completed: data.filter(d => d.status === "Completed").length,
      overdue: data.filter(d => d.status === "Overdue").length,
      critical: data.filter(d => d.priority === "Critical").length,
      completionRate: data.length > 0 ? Math.round((data.filter(d => d.status === "Completed").length / data.length) * 100) : 0,
      byPriority: {
        Critical: data.filter(d => d.priority === "Critical").length,
        High: data.filter(d => d.priority === "High").length,
        Medium: data.filter(d => d.priority === "Medium").length,
        Low: data.filter(d => d.priority === "Low").length,
      },
      byStatus: {}
    };
    STATUS_FLOW.forEach(s => { stats.byStatus[s] = data.filter(d => d.status === s).length; });
    return { success: true, stats, recentDelegations: data.slice(-5).reverse() };
  } catch (e) {
    return { success: false, message: e.toString() };
  }
}

// ─── GET USERS ──────────────────────────────────────────────
function getUsers() {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = ss.getSheetByName(USERS_SHEET);
    if (!sheet || sheet.getLastRow() <= 1) return { success: true, data: [] };
    const data = sheet.getRange(2, 1, sheet.getLastRow() - 1, 6).getValues();
    return {
      success: true,
      data: data.filter(r => r[5] === true).map(r => ({
        id: r[0], name: r[1], email: r[2], department: r[3], role: r[4]
      }))
    };
  } catch (e) {
    return { success: false, message: e.toString() };
  }
}

// ─── CHECK OVERDUE ──────────────────────────────────────────
function checkOverdue(delegations, sheet) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const allData = sheet.getDataRange().getValues();
  for (let i = 1; i < allData.length; i++) {
    const status = allData[i][9];
    const dueDate = allData[i][7] ? new Date(allData[i][7]) : null;
    if (dueDate && status !== "Completed" && status !== "Overdue" && dueDate < today) {
      sheet.getRange(i + 1, 10).setValue("Overdue");
      applyStatusColor(sheet.getRange(i + 1, 10), "Overdue");
    }
  }
}

// ─── APPLY STATUS COLOR ─────────────────────────────────────
function applyStatusColor(cell, status) {
  const colors = {
    "Pending": { bg: "#FFF3CD", fg: "#856404" },
    "In Progress": { bg: "#CCE5FF", fg: "#004085" },
    "Delegated": { bg: "#D4EDDA", fg: "#155724" },
    "Review": { bg: "#E2D9F3", fg: "#4A235A" },
    "Completed": { bg: "#D4EDDA", fg: "#155724" },
    "Overdue": { bg: "#F8D7DA", fg: "#721C24" },
    "Rejected": { bg: "#F5C6CB", fg: "#491217" }
  };
  const c = colors[status] || { bg: "#FFFFFF", fg: "#000000" };
  cell.setBackground(c.bg).setFontColor(c.fg).setFontWeight("bold");
}

// ─── AUDIT LOG ──────────────────────────────────────────────
function logAudit(action, delegationId, performedBy, details) {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = ss.getSheetByName(AUDIT_SHEET);
    if (sheet) {
      sheet.appendRow([new Date(), action, delegationId, performedBy, details, Session.getActiveUser().getEmail() || "webapp"]);
    }
  } catch (e) { /* silent */ }
}

// ─── EMAIL NOTIFICATION ─────────────────────────────────────
function sendEmailNotification(data, id, type) {
  try {
    const users = getUsers().data;
    const assignee = users.find(u => u.name === data.delegatedTo);
    if (!assignee || !assignee.email) return;
    const subject = `[Delegation System] New Task Assigned: ${data.title}`;
    const body = `
Dear ${data.delegatedTo},

A new task has been delegated to you.

📋 Task ID: ${id}
📌 Title: ${data.title}
🎯 Priority: ${data.priority}
📅 Due Date: ${data.dueDate}
👤 Assigned By: ${data.delegatedBy}
📝 Description: ${data.description}

Please log in to the Delegation Handler System to view and update your task.

Regards,
MIS Automation System
    `;
    MailApp.sendEmail({ to: assignee.email, subject, body });
  } catch (e) { /* Email optional */ }
}

// ─── GET AUDIT LOG ──────────────────────────────────────────
function getAuditLog() {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = ss.getSheetByName(AUDIT_SHEET);
    if (!sheet || sheet.getLastRow() <= 1) return { success: true, data: [] };
    const data = sheet.getRange(2, 1, Math.min(sheet.getLastRow() - 1, 50), 6).getValues();
    return {
      success: true,
      data: data.reverse().map(r => ({
        timestamp: r[0] ? Utilities.formatDate(new Date(r[0]), Session.getScriptTimeZone(), "dd/MM/yyyy HH:mm:ss") : "",
        action: r[1], delegationId: r[2], performedBy: r[3], details: r[4]
      }))
    };
  } catch (e) {
    return { success: false, message: e.toString() };
  }
}

// ─── EXPORT TO CSV ──────────────────────────────────────────
function exportToCSV() {
  const result = getAllDelegations();
  if (!result.success) return result;
  const headers = ["ID","Title","Description","Delegated By","Delegated To","Priority","Category","Due Date","Created","Status","Progress %","Notes"];
  const rows = result.data.map(d => [d.id,d.title,d.description,d.delegatedBy,d.delegatedTo,d.priority,d.category,d.dueDate,d.createdDate,d.status,d.progress,d.notes]);
  const csv = [headers, ...rows].map(r => r.map(c => `"${String(c).replace(/"/g,'""')}"`).join(",")).join("\n");
  return { success: true, csv, filename: `delegations_${Utilities.formatDate(new Date(), Session.getScriptTimeZone(), "yyyyMMdd_HHmm")}.csv` };
}
