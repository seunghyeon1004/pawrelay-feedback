# PawRelay Feedback Board

귀여운 공개 의견함 + 비공개 테스트 리포트 저장소입니다. 기존 PawRelay 홈페이지나 앱 코드를 올리는 저장소가 아니라, 테스터 피드백을 수집하고 Play Console 제출 근거를 정리하기 위한 별도 마이크로사이트입니다.

## 공개 화면 원칙

- 공개 목록에는 제목, 닉네임, 카테고리, 앱 버전, 처리 상태만 표시합니다.
- 본문, 테스트 Google ID, 기기 정보, 스크린샷 링크, 상세 답변은 공개하지 않습니다.
- 전체 원본 기록은 관리자 GitHub 로그인 후 사이트에서 CSV로 내보냅니다.
- Founder QA와 Internal QA는 실제 외부 테스터 의견과 구분해서 남깁니다.
- 배포판 공개 보드는 실제 Supabase 글만 보여줍니다. 로컬 미리보기용 seed 항목은 Supabase 연결 실패 시에도 공개 배포 화면에 대체 노출하지 않습니다.

## 로컬 미리보기

```bash
cd "/Users/m4pro-2/Desktop/PawRelay Launch Pack/13-feedback-board"
python3 -m http.server 8091
```

브라우저에서 `http://localhost:8091`을 엽니다. Supabase 설정이 없으면 브라우저 로컬 저장소로만 동작합니다.

## Supabase 연결

1. Supabase SQL Editor에서 `supabase-feedback-board.sql`을 실행합니다.
2. `config.public.js`에 Supabase URL과 public anon key를 입력합니다.
Supabase anon key는 클라이언트 공개 키입니다. 보안은 `supabase-feedback-board.sql`의 RLS와
공개 뷰 분리로 처리합니다. service role key는 절대 이 사이트에 넣지 마세요.
3. Supabase Auth의 GitHub provider를 켜고, GitHub OAuth App callback을
   `https://wfbmpkmkmluhfuumwpvd.supabase.co/auth/v1/callback`로 설정합니다.
4. Supabase Auth redirect allow list에
   `https://seunghyeon1004.github.io/pawrelay-feedback/`를 추가합니다.

## 제출 자료 운영 흐름

1. 테스터가 사이트에 피드백을 제출합니다.
2. 공개 게시판에는 제목과 닉네임만 보입니다.
3. 관리자는 `관리` 섹션에서 GitHub로 로그인합니다.
4. 원문, Google ID, 기기 정보, 스크린샷 링크를 확인합니다.
5. 상태를 `received`, `reviewing`, `planned`, `fixed`, `deferred` 중 하나로 바꾸고 답글을 남깁니다.
6. 공개 사이트에는 `답변 있음`만 표시되고, 전체 답글은 제출용 CSV에 들어갑니다.
7. 관리자 콘솔에서 공개 요약 Markdown/CSV 또는 전체 기록 CSV를 저장합니다.
8. 내보낸 파일을 Google Drive에 업로드하고 공유 URL을 Play Console 제출 자료에 첨부합니다.

## 답글과 수정

사이트의 관리자 답변함에서 GitHub 로그인 후 처리합니다.

- 상태 수정: 관리자 카드에서 상태와 반영 버전 저장
- 답글 작성: 관리자 카드의 답글 입력 후 등록
- 삭제: 스팸/오입력만 삭제
- 제출용 기록: 관리자 콘솔의 `공개 요약 Markdown`, `공개 요약 CSV`, `전체 기록 CSV`

이 방식이면 테스터는 계정 없이 쓰고, 운영자는 GitHub 계정으로 원본과 답글을 안전하게 관리합니다.
