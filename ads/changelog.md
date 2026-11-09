# Meta Ads change log

The agent appends one entry per change it makes (newest at the top). Format:

`YYYY-MM-DD HH:MM GST | action | entity (name, ID) | before → after | reason`

---
2026-11-09 GST | no changes | review run | — | report-only: Adspirer quota 15/15; see ads/reports/2026-11-09.md
2026-10-30 03:35 GST | Advantage+ Audience off | ad set India_Metros_35-60_Website – strict (120251701296170345) | on → off | owner reported 15 junk WhatsApp chats; keep delivery inside the set cities/interests (owner approved)
2026-10-30 03:36 GST | min daily spend removed | ad set India_Metros_35-60_Website – strict (120251701296170345) | set → ₹0 | it blocked lowering the campaign budget
2026-10-30 03:37 GST | campaign daily budget | SobhaCentral_Leads_IN_Oct26 (120251620185690345) | ₹3,000 → ₹2,000 | match the owner-confirmed ₹2,000/day cap (owner approved)
2026-10-30 GST | correction | ad set India_Metros_35-60_Website – strict (120251701296170345) | Advantage+ Audience still shows ON in Ads Manager | the API change reported success but did not hold; the campaign-level Advantage+ setting appears to force it on — owner switching it off in Ads Manager
2026-10-30 GST | owner edit in Ads Manager | ad set India_Metros_35-60_Website – strict (120251701296170345) | age 25–65 suggestion → 35–60 hard control (Advantage+ audience off); added household income (India, top tier) to detailed targeting | cut off-target WhatsApp chats — published by owner
2026-11-02 GST | no changes | review run | — | read-only run (campaign-level data only); see ads/reports/2026-11-02.md
2026-11-02 GST | no changes | owner-requested check run | — | ad-set level read, no writes; push-access check; see ads/reports/2026-11-02-check.md
2026-11-05 GST | no changes | review run | — | report-only: Adspirer quota 14/15; see ads/reports/2026-11-05.md
2026-11-03 GST | owner edit in Ads Manager | ad set India_Metros_35-60_Website – strict (120251701296170345) | Advantage+ placements → Facebook + Instagram only (feed, story, reels, marketplace/explore); Audience Network, Messenger, Threads removed | confirmed via API on 2026-11-07
2026-11-07 GST | diagnosis, no changes | campaign SobhaCentral_Leads_IN_Oct26 | — | spend fell to ~₹3.5k in 7 days (budget ₹14k): account active per Meta support, ads active; likely audience too narrow (reach 3,426 in 7 days). Adspirer quota exhausted until 2026-11-28
