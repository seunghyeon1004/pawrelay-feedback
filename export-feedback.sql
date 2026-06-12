-- Run in Supabase SQL Editor, then use "Download CSV".
-- This contains private feedback body and tester Google ID, so do not expose it publicly.

select
  created_at,
  source_type,
  display_name,
  tester_google_id,
  app_version,
  category,
  device,
  rating,
  status,
  fixed_version,
  title,
  body,
  screenshot_url,
  replies
from public.feedback_export
order by created_at desc;

