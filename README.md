# Espousal × Sobha

Static project pages for **Sobha Realty** developments in Dubai, presented by Espousal (GitHub Pages, published from the `sobha` branch; `CNAME` sets the domain).

- **https://espousalsobha.com/** — projects homepage (`index.html`) with a card for each project.
- **https://espousalsobha.com/sobhacentral/** — Sobha Central (Sheikh Zayed Road).
- **https://espousalsobha.com/sobha-sanctuary/** — Sobha Sanctuary: The Woods (apartments), The Greens and The Grove (villas). It reuses `sobhacentral/assets/css/style.css`; its own files are `sobha-sanctuary/assets/css/sanctuary.css`, `assets/js/units.js` (floor-plan data) and `assets/js/sanctuary.js`.

Both project pages send leads to the same FormSubmit inbox and Google Sheet; the Sheet's Project column shows which project was enquired about.

## Sobha Central

## Sections
About · Exclusive 20/80 offer · Floor plans (1/2/3 BHK tabs) · Price list · Amenities · Gallery · Location & master plan · Virtual tour (YouTube + reel) · Brochure download · WhatsApp / site visit / meeting.

## Lead capture
Every form (floor plan, payment plan, site visit, brochure, inline enquiry) collects **name, email, phone, city** and emails the lead to
`masroorshad@gmail.com` through [FormSubmit](https://formsubmit.co) — no server code needed.

**One-time activation:** after the site is live, submit any form once. FormSubmit sends an "Activate Form" email to
masroorshad@gmail.com — click it. From then on every lead arrives automatically.

To change the receiving inbox, edit `LEAD_EMAIL` / `ENDPOINT` at the top of `sobhacentral/assets/js/main.js`.

The brochure (`sobhacentral/assets/docs/Sobha-Central-Brochure.pdf`, 77 pages, 6.6 MB) downloads as soon as a valid form is submitted.

## Google Sheet (lead log)
Every lead can also be added as a row in a Google Sheet (time, name, email, phone, city, enquiry, unit, source/UTM, page).
1. Create a Google Sheet → **Extensions → Apps Script**, replace the code with `google-sheet/Code.gs`, save.
2. **Deploy → New deployment → Web app**, Execute as **Me**, Who has access **Anyone** → Deploy → authorise.
3. Copy the Web app URL into `SHEET_URL` at the top of `sobhacentral/assets/js/main.js`.

## Meta Pixel and Conversions API
The page reports `PageView`, `ViewContent` (towers, floor plans), `Contact` (WhatsApp / call / email taps) and `Lead`
(every valid enquiry) to Pixel `806806699194177`. The Lead fires as soon as the form is submitted, with an `event_id`.

The Sheet script can send the same Lead from the server through the Conversions API, so leads still count when an
ad blocker or browser privacy setting stops the Pixel. Meta merges the two copies using the shared `event_id`.
1. Events Manager → Pixel `806806699194177` → **Settings** → **Conversions API** → **Generate access token**.
2. Apps Script → **Project Settings** → **Script properties** → add `META_CAPI_TOKEN` with that token.
3. Paste the updated `google-sheet/Code.gs`, then **Deploy → Manage deployments → Edit → Version: New version → Deploy**
   (the Web app URL stays the same).
4. Submit a test enquiry and check Events Manager → **Test events** / **Overview** for a Lead received from both
   Browser and Server.

## Contacts wired in
- WhatsApp: +91 79807 02399
- Meeting: +971 50 642 9453 · masroorshad@gmail.com
