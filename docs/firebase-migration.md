# Firebase migration staging checklist (not deployed)
1. Confirm live Cloudflare Pages/Worker routing and the currently deployed commit; preserve backups and existing Supabase records.
2. Create/select owner-controlled Google Cloud/Firebase project, enable billing, Firestore Native mode, and Cloud Functions; set region us-east1.
3. Configure Firebase CLI authenticated deployment and TURNSTILE_SECRET using Firebase Secret Manager. Do not commit credentials.
4. Copy engine.js verbatim to functions/engine.js; test deterministic scoring parity and invalid-input rejection.
5. Deploy to a staging project first. Configure allowed origins and Turnstile hostname; validate CORS and Cloud Function URL.
6. Update frontend endpoint on a staging branch only, remove Supabase headers, preserve GHL form and registration gate.
7. Verify GHL submission, 15 questions, validation, Turnstile, Firestore persistence, personalized roadmap, print/PDF, mobile, and failure behavior.
8. Obtain explicit production cutover approval. Switch production endpoint, monitor, and roll back if errors occur.
9. Remove temporary local fallback ONLY after production end-to-end verification; retain Supabase until data retention/transfer is confirmed.
Security: browser localStorage registration is a UX gate, not server-side proof of GHL submission. Server-side confirmation should be designed if enforcement is required.
