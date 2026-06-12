# PawRelay Closed Test Internal QA Seed

이 파일은 피드백 보드에 기본으로 들어간 내부 QA 타임라인의 출처 요약입니다. Play Console 제출 시에는 사이트에서 최신 Markdown/CSV를 다시 내보내세요.

## v2

- Issue: Closed-test baseline had setup gaps around tester list, billing access, screenshots, and native QA.
- Action: Created launch pack, Play copy, tester setup notes, build artifacts, and first Alpha release path.
- Result: Completed.

## v5

- Issue: Family sharing needed a paid boundary that handles overlapping households and private pets.
- Action: Changed the model to one shared-pet slot per subscription, capped future shared slots at 3, and added Supabase/RLS checks by pet id.
- Result: Fixed.

## v8

- Issue: Play-installed first-run, Plus purchase, ads, Calendar 100%, and weekly care report needed end-to-end QA.
- Action: Installed through the Play closed-test opt-in flow, completed onboarding/tutorial, purchased Plus with a Play test card, and confirmed ads were hidden.
- Result: Verified.

## v8 to v9

- Issue: Google OAuth passed consent but returned `Missing OAuth callback code`.
- Action: Forced Supabase PKCE flow and verified callback success in a local v9 build.
- Result: Fixed.

## v10

- Issue: Alpha needed a Play-signed build containing billing, Family Sync subscription flag, and OAuth callback hardening.
- Action: Built and uploaded versionCode 10 to Alpha closed test with product catalog and release status checks.
- Result: Released.

## v10+

- Issue: Google Drive manual sync must be separate from Supabase Family Sync and must not imply PawRelay server storage.
- Action: Added dedicated Drive OAuth boundary, owner-file copy, merge rules, and pet-name display instead of internal ids.
- Result: Native Drive QA pending.

