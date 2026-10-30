/**
 * Espousal × Sobha — lead capture into Google Sheets.
 *
 * Paste this into Extensions → Apps Script of your leads spreadsheet,
 * then Deploy → New deployment → Web app
 *   Execute as: Me      Who has access: Anyone
 * Copy the Web app URL into SHEET_URL in sobhacentral/assets/js/main.js.
 *
 * Meta Conversions API (optional, recommended): every lead is also sent to Meta
 * from here, so it counts even when the browser blocks the Pixel. In Apps Script
 * open Project Settings → Script properties and add META_CAPI_TOKEN (Events
 * Manager → your Pixel → Settings → Conversions API → Generate access token).
 * Meta de-duplicates it against the browser Lead using the shared event_id.
 */

var SHEET_NAME = 'Leads';
var HEADERS = ['Received', 'Name', 'Email', 'Phone', 'City', 'Enquiry', 'Unit', 'Project', 'Source', 'Page', 'Visitor time'];

// Optional: also email each lead from your own Gmail (FormSubmit already emails you).
var NOTIFY_EMAIL = '';

var META_PIXEL_ID = '806806699194177';
var META_API_VERSION = 'v23.0';

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
    sendMetaLead_(p);
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

// Server-side Lead for the Meta Conversions API. Never throws: a Meta outage
// must not stop the lead being saved.
function sendMetaLead_(p) {
  var token = PropertiesService.getScriptProperties().getProperty('META_CAPI_TOKEN');
  if (!token || !p.event_id) return;
  try {
    var user = { client_user_agent: String(p.user_agent || '') };
    var em = hash_(String(p.email || '').trim().toLowerCase());
    var ph = hash_(String(p.phone || '').replace(/\D/g, ''));
    var fn = hash_(String(p.name || '').trim().split(/\s+/)[0].toLowerCase());
    var ct = hash_(String(p.city || '').toLowerCase().replace(/[^a-z]/g, ''));
    if (em) user.em = [em];
    if (ph) user.ph = [ph];
    if (fn) user.fn = [fn];
    if (ct) user.ct = [ct];
    if (p.fbp) user.fbp = String(p.fbp);
    if (p.fbc) user.fbc = String(p.fbc);
    var payload = {
      data: [{
        event_name: 'Lead',
        event_time: Math.floor(Date.now() / 1000),
        event_id: String(p.event_id),
        action_source: 'website',
        event_source_url: String(p.page || ''),
        user_data: user,
        custom_data: { content_name: String(p.enquiry_type || ''), content_category: String(p.unit_type || 'General'), currency: 'AED', value: 0 }
      }]
    };
    var res = UrlFetchApp.fetch('https://graph.facebook.com/' + META_API_VERSION + '/' + META_PIXEL_ID + '/events?access_token=' + encodeURIComponent(token), {
      method: 'post', contentType: 'application/json', payload: JSON.stringify(payload), muteHttpExceptions: true
    });
    if (res.getResponseCode() !== 200) console.warn('Meta CAPI ' + res.getResponseCode() + ': ' + res.getContentText());
  } catch (err) {
    console.warn('Meta CAPI failed: ' + err);
  }
}

// SHA-256 hex, as Meta requires for personal data; empty in → empty out.
function hash_(v) {
  if (!v) return '';
  return Utilities.computeDigest(Utilities.DigestAlgorithm.SHA_256, v, Utilities.Charset.UTF_8)
    .map(function (b) { return ('0' + (b & 0xff).toString(16)).slice(-2); }).join('');
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
