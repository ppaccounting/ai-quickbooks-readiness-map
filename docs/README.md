# AI + QuickBooks Readiness Map — Working MVP

An interactive five-stage, 15-question free gift. Responsive web app; deterministic recommendation engine; result print/save PDF; downloadable JSON; no external account required to test.

## Test locally

Run `python3 -m http.server 8000` from this directory and open `http://localhost:8000`. Do not double-click `index.html` because ES modules may be blocked by file URLs.

## Hosting

Push these files into a GitHub repository and deploy as a static site through GitHub Pages or Cloudflare Pages. The application is **not yet deployed**. Replace placeholder contact language with verified public contact links before launch.

## Supabase

Optional schema is in `supabase/schema.sql`. The MVP intentionally does not send answers to Supabase or collect email addresses. To enable submissions, add an Edge Function with server-side validation, rate limits, and opt-in. Keep the service-role key server-side only. Opt-in for receiving the roadmap and for marketing should be separate. An actual email sequence requires an email platform and a configured consent-based sending workflow.

## Next QA steps

- Review copy and confirm your preferred platform/fit criteria.
- Add final contact email, phone, and booking URL.
- Test 15-answer completion, multiple-choice limit, back navigation, print PDF, and all prioritization cases.
- Add accessible/privacy disclosures and consent-based email delivery before collecting addresses.
- Test mobile widths and print-to-PDF output.

## Guidance boundaries

This is an educational roadmap based on self-reported responses, not an accounting audit. QuickBooks Online built-in AI features depend on subscription and rollout. This tool does not access QuickBooks or automatically correct transactions.
