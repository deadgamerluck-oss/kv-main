<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Mount the campaign popup once in the root layout; campaign-keyed browser storage controls automatic display, not permissions.
- Manage general campaigns in shared CMS content with server-validated schedules, targets and options; keep legacy Diwali storage keys to preserve dismissals.
- Blog content uses safe Markdown rendering and per-article visibility; the atomic publisher removes draft articles from the publicly readable JSON.
- Keep offer constants and validation in a shared browser-safe module; submit leads through a public, validated, rate-limited server function that only inserts into locked Cloud tables.
- Store website drafts and published content separately; expose only published columns publicly and publish atomically with version checks and revision history to prevent accidental live changes.
- Authorize all admin reads and writes using protected user_roles records, never browser storage or editable profile metadata; the Auth lifecycle trigger is pinned to the provisioned owner UUID so registering a matching email cannot claim ownership. Provision fixed login credentials only through the Auth admin API, never through a public account-creation endpoint or source code.
- Public pages consume shared CMS content through the root query provider with bundled source content as initial fallback; admin and authentication pages omit public navigation and campaign popups.
- Presentation redesigns preserve CMS-authored course and banner data; replace bundled legacy media only when the stored image still matches its original default, so owner overrides remain authoritative.
- Flagship course catalogue (tiers, modules, fees) lives in a bundled data module separate from CMS programmes, so brochure facts stay authoritative.

- Keep headquarters/search metadata in a browser-safe shared module; describe worldwide service reach without fabricated foreign offices or keyword stuffing.
- Share main-course enquiry names between course links and grouped form choices so selected courses survive navigation.
- Use the supplied public Google Maps iframe only on Contact; no Maps API or connector is needed for this keyless shared embed.
