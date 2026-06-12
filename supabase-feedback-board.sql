-- PawRelay Feedback Board schema
-- Run this in the Supabase SQL Editor for the feedback board project.

create extension if not exists pgcrypto;

create table if not exists public.feedback_posts (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  source_type text not null default 'tester'
    check (source_type in ('tester', 'founder_qa', 'internal_qa')),
  display_name text not null check (char_length(display_name) between 1 and 40),
  tester_google_id text check (tester_google_id is null or char_length(tester_google_id) <= 120),
  app_version text check (app_version is null or char_length(app_version) <= 24),
  category text not null check (char_length(category) between 1 and 40),
  device text check (device is null or char_length(device) <= 80),
  rating integer check (rating is null or rating between 1 and 5),
  title text not null check (char_length(title) between 1 and 90),
  body text not null check (char_length(body) between 1 and 1200),
  screenshot_url text check (screenshot_url is null or char_length(screenshot_url) <= 300),
  status text not null default 'received'
    check (status in ('received', 'reviewing', 'planned', 'fixed', 'deferred')),
  fixed_version text check (fixed_version is null or char_length(fixed_version) <= 24)
);

create table if not exists public.feedback_replies (
  id uuid primary key default gen_random_uuid(),
  post_id uuid not null references public.feedback_posts(id) on delete cascade,
  created_at timestamptz not null default now(),
  reply_name text not null default 'PawRelay Studio' check (char_length(reply_name) <= 60),
  body text not null check (char_length(body) between 1 and 800)
);

alter table public.feedback_posts enable row level security;
alter table public.feedback_replies enable row level security;

drop policy if exists "Anyone can submit feedback" on public.feedback_posts;
create policy "Anyone can submit feedback"
on public.feedback_posts
for insert
to anon, authenticated
with check (
  source_type in ('tester', 'founder_qa', 'internal_qa')
  and status = 'received'
  and char_length(display_name) between 1 and 40
  and char_length(title) between 1 and 90
  and char_length(body) between 1 and 1200
);

drop view if exists public.feedback_admin;
drop view if exists public.feedback_export;
drop view if exists public.feedback_public;

create view public.feedback_public
with (security_barrier = true)
as
select
  p.id,
  p.created_at,
  p.source_type,
  p.display_name,
  p.app_version,
  p.category,
  p.status,
  p.fixed_version,
  p.title,
  exists (
    select 1
    from public.feedback_replies r
    where r.post_id = p.id
  ) as has_reply
from public.feedback_posts p
order by p.created_at desc;

create view public.feedback_export
as
select
  p.*,
  exists (
    select 1
    from public.feedback_replies r
    where r.post_id = p.id
  ) as has_reply,
  coalesce(
    (
      select json_agg(
        json_build_object(
          'id', r.id,
          'created_at', r.created_at,
          'reply_name', r.reply_name,
          'body', r.body
        )
        order by r.created_at desc
      )
      from public.feedback_replies r
      where r.post_id = p.id
    ),
    '[]'::json
  ) as replies
from public.feedback_posts p
order by p.created_at desc;

grant usage on schema public to anon, authenticated;
grant insert on public.feedback_posts to anon, authenticated;
grant select on public.feedback_public to anon, authenticated;
-- Full feedback export is intentionally not granted to anon/authenticated web users.
-- Use the Supabase dashboard or SQL Editor as the project owner to export
-- public.feedback_posts, public.feedback_replies, or public.feedback_export.
