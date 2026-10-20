/**
 * Espousal × Sobha — lead capture into Google Sheets.
 *
 * Paste this into Extensions → Apps Script of your leads spreadsheet,
 * then Deploy → New deployment → Web app
 *   Execute as: Me      Who has access: Anyone
 * Copy the Web app URL into SHEET_URL in sobhacentral/assets/js/main.js.
 */

var SHEET_NAME = 'Leads';
var HEADERS = ['Received', 'Name', 'Email', 'Phone', 'City', 'Enquiry', 'Unit', 'Project', 'Source', 'Page', 'Visitor time'];

// Optional: also email each lead from your own Gmail (FormSubmit already emails you).
var NOTIFY_EMAIL = '';

function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    var p = (e && e.parameter) || {};
    var sheet = getSheet_();
    sheet.appendRow([
      new Date(),
      clean_(p.name), clean_(p.email), clean_(p.phone), clean_(p.city),
      clean_(p.enquiry_type), clean_(p.unit_type), clean_(p.project),
      clean_(p.source), clean_(p.page), clean_(p.submitted_at)
    ]);
    if (NOTIFY_EMAIL) {
      MailApp.sendEmail(NOTIFY_EMAIL, 'New lead: ' + clean_(p.enquiry_type) + ' — ' + clean_(p.name),
        HEADERS.slice(1, 7).map(function (h, i) {
          return h + ': ' + clean_([p.name, p.email, p.phone, p.city, p.enquiry_type, p.unit_type][i]);
        }).join('\n'));
    }
    return json_({ result: 'success' });
  } catch (err) {
    return json_({ result: 'error', message: String(err) });
  } finally {
    lock.releaseLock();
  }
}

// Visiting the Web app URL in a browser should show {"result":"ready"}.
function doGet() {
  getSheet_();
  return json_({ result: 'ready' });
}

function getSheet_() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(SHEET_NAME) || ss.insertSheet(SHEET_NAME);
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(HEADERS);
    sheet.getRange(1, 1, 1, HEADERS.length).setFontWeight('bold').setBackground('#0b0d1c').setFontColor('#f1dcaa');
    sheet.setFrozenRows(1);
    sheet.getRange('A:A').setNumberFormat('dd mmm yyyy, hh:mm');
  }
  return sheet;
}

// Stops values that start with = + - @ being run as spreadsheet formulas.
function clean_(v) {
  v = v == null ? '' : String(v).slice(0, 500);
  return /^[=+\-@]/.test(v) ? "'" + v : v;
}

function json_(o) {
  return ContentService.createTextOutput(JSON.stringify(o)).setMimeType(ContentService.MimeType.JSON);
}
