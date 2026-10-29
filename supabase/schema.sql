-- OPTIONAL persistence. App V1 works without a Supabase connection.
-- Do NOT expose a service-role key in browser JavaScript.
create table if not exists public.readiness_submissions (
 id uuid primary key default gen_random_uuid(),
 created_at timestamptz not null default now(),
 rule_version text not null,
 answers jsonb not null,
 fit jsonb not null,
 roadmap jsonb not null,
 email text,
 followup_opt_in boolean not null default false,
 marketing_opt_in boolean not null default false
);
alter table public.readiness_submissions enable row level security;
-- No anonymous read/write policies. Use an authenticated server-side Edge Function,
-- input validation, rate limits and explicit consent before accepting submissions.
