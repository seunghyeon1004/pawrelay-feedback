-- PawRelay feedback board fallback operations.
-- Normal operation happens in the site's GitHub-admin console. Use this file
-- only if the web admin console is temporarily unavailable.

-- 1. Find recent feedback and copy the id you want to edit.
select
  id,
  created_at,
  display_name,
  tester_google_id,
  app_version,
  category,
  status,
  fixed_version,
  title,
  body
from public.feedback_posts
order by created_at desc
limit 50;

-- 2. Change status.
-- Allowed status values: received, reviewing, planned, fixed, deferred.
-- update public.feedback_posts
-- set status = 'reviewing'
-- where id = 'PASTE_FEEDBACK_ID_HERE';

-- 3. Add a reply / resolution note.
-- insert into public.feedback_replies (post_id, reply_name, body)
-- values (
--   'PASTE_FEEDBACK_ID_HERE',
--   'PawRelay Studio',
--   '확인했습니다. 다음 빌드에서 수정하겠습니다.'
-- );

-- 4. Mark as fixed with version.
-- update public.feedback_posts
-- set status = 'fixed', fixed_version = 'v11'
-- where id = 'PASTE_FEEDBACK_ID_HERE';

-- 5. Export full evidence table.
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
