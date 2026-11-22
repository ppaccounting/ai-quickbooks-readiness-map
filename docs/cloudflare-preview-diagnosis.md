# Cloudflare preview-build diagnosis — 2026-11-18

Read-only inspection of failed build `d43fc5bd-a44b-4197-8f1c-f057b2bdce7a` (commit `caa12d5`) identified the exact error:

```
[ERROR] Your Wrangler configuration is missing a `previews` block to run this command.
```

The failed branch build used `npx wrangler preview`. The Cloudflare dashboard's current **production** build setting is `npx wrangler deploy`, with production branch `main`. These are different deployment paths; do not replace preview with production deployment to silence the failing check.

Repository inspection found **no** root `wrangler.toml`, `wrangler.json`, `wrangler.jsonc`, or root `package.json` on this branch. The existing Cloudflare Worker appears to be a static-assets deployment. Do not invent a Wrangler configuration without first establishing its effective assets directory, compatibility settings, and how the current successful `main` deployment is built. Adding a guessed config risks breaking the existing site.

## Safe resolution plan

1. Inspect the successful `main` Cloudflare deployment and identify its effective static-assets configuration and source directory.
2. Determine the required `previews` syntax for the installed Wrangler version, and confirm whether preview builds are enabled for this Worker.
3. Add the minimal **verified** Wrangler config to this feature branch only, preserving the existing static-assets entrypoint and route behavior.
4. Let Cloudflare run the branch preview build. Confirm preview URL loads, 15-question assessment renders, and GHL registration gate remains unchanged.
5. Do **not** merge, deploy the Firebase function, or cut over production without separate approval.

Cloudflare Worker `ai-quickbooks-readiness-map` has no custom domains/routes shown in its dashboard; confirm actual public `aiqbomap.profitablepenny.com` routing separately. The existing `main` production deployment was successful; this failed branch build does not demonstrate a production outage.
