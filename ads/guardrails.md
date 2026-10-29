# Meta Ads guardrails

The Meta Ads agent reads this file at the start of every run and never acts outside it.
Any rule that depends on a value still marked `TODO` is skipped (report it as a recommendation instead).

## Account
- Ad account: Espousal – Sobha Central (ID 28680537344935012) — the only account the agent may touch
- Currency: INR
- Market: India (campaign `SobhaCentral_Leads_IN_Oct26`)
- Primary objective: Leads. Judge results on the `lead` action only. The custom pixel event (`offsite_conversion.fb_pixel_custom`) is NOT a lead — report it separately, never count it as a conversion.
- Pixel 806806699194177 (dataset "Espousal website") is shared by espousalsobha.com and mm.espousalconstruction.com, so pixel-wide event totals mix both sites. Judge this account on the leads Meta attributes to its ads, not on dataset totals. On 2026-10-29 the dataset showed 26 Lead events over 28 days, match quality 8.4/10, browser + server, used by 1 ad set. Contact (WhatsApp / call / email taps) showed 534.
- Lead quality: on 2026-10-29 the owner reported 15 WhatsApp chats, mostly junk / off-target. WhatsApp taps (Contact) are not a quality signal — never optimise for them. Advantage+ Audience must stay OFF on lead ad sets; do not re-enable it.
- Owner's lead count is the source of truth: 4 real leads by 2026-10-29 while Meta reported 2. Flag any gap between Meta's lead count and what the owner reports.

## Targets
- Target cost per lead: ₹200
- Minimum ROAS: n/a (lead gen, no purchase value)
- Max frequency (7-day) before creative is considered fatigued: 3.5

## Budget limits
- Total daily spend cap across the account: ₹2,000 (confirmed by owner)
- Max budget change per ad set / campaign per day: 20%
- Never raise any single budget above: ₹2,000/day
- Budget changes only on entities with 3+ days of data and 50+ conversions in the learning window, or that have exited the learning phase.

## Allowed without approval
- Pause an ad when, over the last 7 days, spend > 2x target cost per lead (₹400) with zero `lead` actions.
- Pause an ad whose 7-day frequency exceeds the max above and CTR has dropped 30%+ vs. its first 7 days.
- Shift budget between ad sets in the same campaign, within the per-day limit above.
- Create new ads, ad sets and campaigns — **always created PAUSED**.

## Never without explicit approval
- Pause the last active ad in a campaign, or anything that would leave the account with no active ads — recommend it instead.
- Activate (un-pause) anything, including new drafts.
- Delete or archive any campaign, ad set or ad.
- Change the objective, optimisation event, pixel / dataset, or attribution setting.
- Edit audiences on an active ad set.
- Exceed the total daily spend cap.
- Touch any campaign whose name contains `[MANUAL]`.

## Adspirer quota
The Adspirer plan allows 15 counted actions a month and the agent runs twice a week.
- Per run: at most 1 performance read and at most 1 write (pause, budget change or new draft). `search_tools` and `get_tool_schema` are free.
- Call `get_usage_status` first; if fewer than 3 actions remain this month, report only.

## Brand
- Brand: Espousal – Sobha Central (real estate)
- Tone: TODO (e.g. playful, premium, late-night)
- Always / never say: TODO
- Ad copy must be in: English
