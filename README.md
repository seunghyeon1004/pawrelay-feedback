# PawRelay Feedback Board

귀여운 공개 의견함 + 비공개 테스트 리포트 저장소입니다. 기존 PawRelay 홈페이지나 앱 코드를 올리는 저장소가 아니라, 테스터 피드백을 수집하고 Play Console 제출 근거를 정리하기 위한 별도 마이크로사이트입니다.

## 공개 화면 원칙

- 공개 목록에는 제목, 닉네임, 카테고리, 앱 버전, 처리 상태만 표시합니다.
- 본문, 테스트 Google ID, 기기 정보, 스크린샷 링크, 상세 관리자 답변은 공개하지 않습니다.
- 관리자 로그인 후에만 전체 기록을 보고 Markdown 또는 Excel CSV로 내보냅니다.
- Founder QA와 Internal QA는 실제 외부 테스터 의견과 구분해서 남깁니다.

## 로컬 미리보기

```bash
cd "/Users/m4pro-2/Desktop/PawRelay Launch Pack/13-feedback-board"
python3 -m http.server 8091
```

브라우저에서 `http://localhost:8091`을 엽니다. Supabase 설정이 없으면 브라우저 로컬 저장소로만 동작합니다.

## Supabase 연결

1. Supabase SQL Editor에서 `supabase-feedback-board.sql`을 실행합니다.
2. `config.public.js`에 Supabase URL과 public anon key를 입력합니다.
4. Supabase Auth Google provider에 관리자 계정 `hyunever100@gmail.com` 로그인이 가능하도록 설정합니다.

Supabase anon key는 클라이언트 공개 키입니다. 보안은 `supabase-feedback-board.sql`의 RLS와
관리자 이메일 제한으로 처리합니다. service role key는 절대 이 사이트에 넣지 마세요.

## 제출 자료 운영 흐름

1. 테스터가 사이트에 피드백을 제출합니다.
2. 공개 게시판에는 제목과 닉네임만 보입니다.
3. 관리자가 Google 로그인 후 상태와 답변을 남깁니다.
4. `Excel CSV 저장` 또는 `Markdown 저장`으로 전체 테스트 기록을 내보냅니다.
5. 내보낸 파일을 Google Drive에 업로드하고 공유 URL을 Play Console 제출 자료에 첨부합니다.
