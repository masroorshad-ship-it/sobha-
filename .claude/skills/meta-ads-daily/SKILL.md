---
name: meta-ads-daily
description: Run the scheduled (twice-weekly) Espousal – Sobha Central Meta Ads review — pull performance, act within ads/guardrails.md, draft paused creatives, and write the report. Use when asked for the ads run, "check my Meta ads", or by the scheduled task.
---

Run this as the `meta-ads-manager` agent, following its rules in `.claude/agents/meta-ads-manager.md`.

## Steps
1. **Quota** — call `get_usage_status`; follow the quota rules in the guardrails.
2. **Load context** — `ads/guardrails.md`, the latest `ads/reports/*.md`, the top of `ads/changelog.md`.
3. **Health check** — disapproved ads, ad sets not delivering, spend vs. the daily cap, payment or account issues. Flag these first.
4. **Performance** — one `get_meta_campaign_performance` call (30 days, `raw_data: true`); compare the last 3–4 days with the rest against the target cost per lead.
5. **Waste** — apply the pause rules from the guardrails. Pause only what qualifies.
6. **Budget** — move budget from ad sets below target to ad sets beating it, within the per-day limit and the account cap. Skip anything in learning.
7. **Creative fatigue** — list ads over the frequency limit with falling CTR. For each fatigued winner, draft 1–2 replacement ads (same audience, new hook / visual angle) and create them PAUSED.
8. **Log** — append every change to `ads/changelog.md`.
9. **Report** — write `ads/reports/YYYY-MM-DD.md`:
   - Summary (3 lines: spend, leads, cost per lead vs. target)
   - Alerts
   - Changes made (with reasons)
   - Drafts awaiting approval (name, ID, what to review)
   - Recommendations needing approval
10. **Save** — commit `ads/` with message `ads: run YYYY-MM-DD` and push to the `meta-ads-agent` branch.
