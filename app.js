const cfg = window.PAWRELAY_FEEDBACK_CONFIG || {};

const statusLabels = {
  received: "접수",
  reviewing: "확인중",
  planned: "반영 예정",
  fixed: "수정 완료",
  deferred: "보류"
};

const statusClass = {
  received: "status-received",
  reviewing: "status-reviewing",
  planned: "status-planned",
  fixed: "status-fixed",
  deferred: "status-deferred"
};

const sourceLabels = {
  tester: "Tester feedback",
  founder_qa: "Founder QA",
  internal_qa: "Internal QA"
};

const seedFeedback = [
  {
    id: "seed-v8-billing",
    created_at: "2026-06-12T02:30:00.000Z",
    source_type: "founder_qa",
    display_name: "Founder QA",
    app_version: "v8",
    category: "Billing",
    device: "PawRelay_API35, Play-installed",
    rating: 4,
    title: "Plus 테스트 구매 후 광고가 정상적으로 사라짐",
    body:
      "Play Billing showed the KRW 4,900 Plus tester purchase with the Play test card. After purchase, PawRelay hid ads and showed Plus active state.",
    status: "fixed",
    fixed_version: "v8",
    replies: [
      {
        reply_name: "PawRelay Studio",
        body: "Verified through Play Store installer. Restore and cancellation paths still need v10 Play-installed QA."
      }
    ]
  },
  {
    id: "seed-v8-google-oauth",
    created_at: "2026-06-12T03:10:00.000Z",
    source_type: "founder_qa",
    display_name: "Founder QA",
    app_version: "v8",
    category: "Family Sync",
    device: "PawRelay_API35",
    rating: 2,
    title: "Google 로그인 후 OAuth callback code 오류 발생",
    body:
      "OAuth reached account selection and consent, but v8 returned to the app with Missing OAuth callback code.",
    status: "fixed",
    fixed_version: "v9",
    replies: [
      {
        reply_name: "PawRelay Studio",
        body: "Fixed by forcing Supabase PKCE flow and verifying local v9 Google login callback."
      }
    ]
  },
  {
    id: "seed-v10-drive-config",
    created_at: "2026-06-12T07:50:00.000Z",
    source_type: "internal_qa",
    display_name: "Internal QA",
    app_version: "v10",
    category: "Google Drive",
    device: "Local Android APK",
    rating: 3,
    title: "Drive 수동 동기화는 Android Drive client id 필요",
    body:
      "Drive Preview tools render safely and show missing config instead of crashing. Real Drive upload/share/import remains blocked until Android Drive OAuth client id is supplied.",
    status: "planned",
    fixed_version: "",
    replies: [
      {
        reply_name: "PawRelay Studio",
        body: "Keep this as native QA pending. The UI now explains that the file is stored in the user's Google Drive."
      }
    ]
  }
];

const qaTimeline = [
  {
    version: "v2",
    title: "비공개 테스트 기본선과 첫 Alpha 트랙",
    issue:
      "초기 비공개 테스트 빌드는 테스터 목록, 결제 테스터 권한, 스크린샷, 네이티브 QA가 아직 완성되지 않았습니다.",
    fix:
      "런치팩, Play 문구, 테스터 안내, 빌드 산출물, 첫 Alpha 릴리스 경로를 정리했습니다.",
    result: "Completed"
  },
  {
    version: "v5",
    title: "가족공유 1마리 슬롯 모델",
    issue:
      "가족공유는 겹치는 가족방과 개인 반려동물을 분리하는 결제 경계가 필요했습니다.",
    fix:
      "공유 반려동물 슬롯 모델로 바꾸고, 최대 3슬롯 상한과 pet id 기준 Supabase/RLS 체크를 추가했습니다.",
    result: "Fixed"
  },
  {
    version: "v8",
    title: "Play 설치 결제와 첫 실행 QA",
    issue:
      "Play 설치, 온보딩, 튜토리얼, 광고, Plus 구매, 달력 100%, 주간 돌봄 리포트가 함께 작동하는지 확인이 필요했습니다.",
    fix:
      "Play 비공개 테스트 opt-in으로 설치하고 첫 실행 QA, Play 테스트 카드 Plus 구매, 광고 숨김을 확인했습니다.",
    result: "Verified"
  },
  {
    version: "v8 -> v9",
    title: "Google OAuth callback 실패",
    issue:
      "Google 로그인 동의는 통과했지만 v8에서 Missing OAuth callback code가 발생했습니다.",
    fix:
      "명시적인 PKCE flow 설정을 추가하고 로컬 v9 빌드에서 callback 성공을 확인했습니다.",
    result: "Fixed"
  },
  {
    version: "v10",
    title: "OAuth 수정 포함 결제 QA 릴리스",
    issue:
      "Play Alpha에 결제, Family Sync 구독 플래그, OAuth callback 보강이 포함된 Play 서명 빌드가 필요했습니다.",
    fix:
      "versionCode 10을 빌드해 Alpha 비공개 테스트에 업로드하고 상품 카탈로그와 릴리스 상태를 확인했습니다.",
    result: "Released"
  },
  {
    version: "v10+",
    title: "Google Drive 수동 동기화 분리",
    issue:
      "Drive 동기화는 Supabase Family Sync와 분리되어야 하고 PawRelay 서버 저장처럼 보이면 안 됩니다.",
    fix:
      "전용 Drive OAuth 경계, Drive 파일 문구, owner-file merge 규칙, 내부 id 대신 반려동물 이름 표시를 추가했습니다.",
    result: "QA pending"
  },
  {
    version: "v10+",
    title: "튜토리얼과 성취감 polish",
    issue:
      "선택 사진, 다음 탭 이동, 매일 반복 설정, 미획득 뱃지에 더 명확한 시각 단서가 필요했습니다.",
    fix:
      "탭 하이라이트, 밥 매일 반복 강제 설정, 선택 사진 안내, 회색 ? 미획득 뱃지를 추가했습니다.",
    result: "Fixed"
  }
];

const localStorageKey = "pawrelay-feedback-board-v1";
let feedbackItems = [];
let supabaseClient = null;

const els = {
  form: document.querySelector("[data-feedback-form]"),
  list: document.querySelector("[data-feedback-list]"),
  timeline: document.querySelector("[data-qa-timeline]"),
  search: document.querySelector("[data-search]"),
  statusFilter: document.querySelector("[data-status-filter]"),
  submitNote: document.querySelector("[data-submit-note]"),
  exportMarkdown: document.querySelector("[data-export-markdown]"),
  exportCsv: document.querySelector("[data-export-csv]")
};

function initSupabase() {
  if (!cfg.supabaseUrl || !cfg.supabaseAnonKey || !window.supabase) {
    return null;
  }
  return window.supabase.createClient(cfg.supabaseUrl, cfg.supabaseAnonKey);
}

function normalizeItem(item) {
  return {
    ...item,
    id: item.id || crypto.randomUUID(),
    body: item.body || "",
    created_at: item.created_at || new Date().toISOString(),
    status: item.status || "received",
    has_reply: Boolean(item.has_reply || item.admin_summary || item.replies?.length),
    replies: item.replies || []
  };
}

function loadLocalItems() {
  try {
    const stored = JSON.parse(localStorage.getItem(localStorageKey) || "[]");
    return [...stored, ...seedFeedback].map(normalizeItem);
  } catch {
    return seedFeedback.map(normalizeItem);
  }
}

function saveLocalUserItems() {
  const userItems = feedbackItems.filter((item) => !String(item.id).startsWith("seed-"));
  localStorage.setItem(localStorageKey, JSON.stringify(userItems));
}

async function loadFeedback() {
  if (supabaseClient) {
    const { data, error } = await supabaseClient
      .from("feedback_public")
      .select("*")
      .order("created_at", { ascending: false });
    if (!error && data) {
      feedbackItems = data.map((item) =>
        normalizeItem({
          ...item,
          replies: item.replies || []
        })
      );
      return;
    }
    console.warn("Falling back to local feedback data:", error?.message);
  }
  feedbackItems = loadLocalItems();
}

function renderFeedback() {
  const query = els.search.value.trim().toLowerCase();
  const selectedStatus = els.statusFilter.value;
  const filtered = feedbackItems
    .filter((item) => selectedStatus === "all" || item.status === selectedStatus)
    .filter((item) => {
      if (!query) return true;
      return [item.title, item.category, item.display_name, item.app_version]
        .filter(Boolean)
        .join(" ")
        .toLowerCase()
        .includes(query);
    })
    .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());

  els.list.replaceChildren(...filtered.map(renderFeedbackCard));
}

function renderFeedbackCard(item) {
  const template = document.querySelector("#feedback-card-template");
  const card = template.content.firstElementChild.cloneNode(true);
  card.classList.add("is-private");
  card.querySelector("[data-title]").textContent = item.title;
  card.querySelector("[data-body]").hidden = true;
  card.querySelector("[data-icon]").textContent = iconForCategory(item.category);

  const status = document.createElement("span");
  status.className = `status-chip ${statusClass[item.status] || statusClass.received}`;
  status.textContent = statusLabels[item.status] || "접수";
  card.querySelector("[data-status]").append(status);

  const meta = [item.display_name, item.has_reply ? "답변 있음" : ""].filter(Boolean);
  card.querySelector("[data-meta]").replaceChildren(
    ...meta.map((value) => {
      const span = document.createElement("span");
      span.textContent = value;
      return span;
    })
  );

  card.querySelector("[data-reply]").remove();
  return card;
}

function renderTimeline() {
  els.timeline.replaceChildren(
    ...qaTimeline.map((item) => {
      const row = document.createElement("article");
      row.className = "timeline-item";
      row.innerHTML = `
        <span class="timeline-version">${escapeHtml(item.version)}</span>
        <div>
          <h3>${escapeHtml(item.title)}</h3>
          <p><strong>문제:</strong> ${escapeHtml(item.issue)}</p>
          <p><strong>조치:</strong> ${escapeHtml(item.fix)}</p>
        </div>
        <span class="status-chip ${timelineResultClass(item.result)} timeline-result">${escapeHtml(item.result)}</span>
      `;
      return row;
    })
  );
}

async function submitFeedback(event) {
  event.preventDefault();
  const formData = new FormData(els.form);
  const item = normalizeItem({
    source_type: formData.get("sourceType"),
    display_name: cleanText(formData.get("displayName"), 40),
    tester_google_id: cleanText(formData.get("testerGoogleId"), 120),
    app_version: cleanText(formData.get("appVersion"), 24),
    category: cleanText(formData.get("category"), 40),
    device: cleanText(formData.get("device"), 80),
    rating: Number(formData.get("rating")) || null,
    title: cleanText(formData.get("title"), 90),
    body: cleanText(formData.get("body"), 1200),
    screenshot_url: cleanText(formData.get("screenshotUrl"), 300),
    status: "received"
  });

  if (supabaseClient) {
    const { error } = await supabaseClient.from("feedback_posts").insert({
      source_type: item.source_type,
      display_name: item.display_name,
      tester_google_id: item.tester_google_id || null,
      app_version: item.app_version || null,
      category: item.category,
      device: item.device || null,
      rating: item.rating,
      title: item.title,
      body: item.body,
      screenshot_url: item.screenshot_url || null,
      status: item.status
    });
    if (error) {
      alert(`저장 실패: ${error.message}`);
      return;
    }
    await loadFeedback();
  } else {
    feedbackItems.unshift(item);
    saveLocalUserItems();
  }
  els.form.reset();
  renderFeedback();
}

function exportMarkdown() {
  const lines = [
    "# PawRelay Closed Test Public Feedback Summary",
    "",
    `Generated: ${new Date().toISOString()}`,
    "",
    "## Summary",
    "",
    `- Public feedback items: ${feedbackItems.length}`,
    `- Internal QA milestones: ${qaTimeline.length}`,
    `- Fixed items: ${feedbackItems.filter((item) => item.status === "fixed").length}`,
    `- Pending/planned items: ${feedbackItems.filter((item) => item.status !== "fixed").length}`,
    "",
    "## Feedback",
    ""
  ];

  feedbackItems.forEach((item) => {
    lines.push(`### ${item.title}`);
    lines.push(`- Source: ${sourceLabels[item.source_type] || item.source_type}`);
    lines.push(`- Display name: ${item.display_name}`);
    lines.push(`- Version: ${item.app_version || "Not provided"}`);
    lines.push(`- Category: ${item.category || "Other"}`);
    lines.push(`- Status: ${statusLabels[item.status] || item.status}`);
    lines.push(`- Created: ${formatDate(item.created_at)}`);
    lines.push(`- Reply: ${item.has_reply ? "Registered" : "None"}`);
    lines.push("");
  });

  lines.push("## Internal QA Timeline", "");
  qaTimeline.forEach((item) => {
    lines.push(`### ${item.version} - ${item.title}`);
    lines.push(`- Issue: ${item.issue}`);
    lines.push(`- Fix: ${item.fix}`);
    lines.push(`- Result: ${item.result}`);
    lines.push("");
  });

  downloadFile("pawrelay-closed-test-public-feedback-summary.md", lines.join("\n"), "text/markdown");
}

function exportCsv() {
  const header = [
    "created_at",
    "source_type",
    "display_name",
    "app_version",
    "category",
    "status",
    "title",
    "has_reply"
  ];
  const rows = feedbackItems.map((item) =>
    [
      item.created_at,
      item.source_type,
      item.display_name,
      item.app_version,
      item.category,
      item.status,
      item.title,
      item.has_reply ? "yes" : "no"
    ].map(csvCell)
  );
  downloadFile(
    "pawrelay-closed-test-public-feedback-summary.csv",
    [header.map(csvCell), ...rows].map((row) => row.join(",")).join("\n"),
    "text/csv"
  );
}

function iconForCategory(category = "") {
  if (category.includes("Billing")) return "₩";
  if (category.includes("Family")) return "↔";
  if (category.includes("Drive")) return "G";
  if (category.includes("Ads")) return "AD";
  if (category.includes("Bug")) return "!";
  if (category.includes("Cute")) return "♥";
  return "✎";
}

function timelineResultClass(result) {
  if (result === "Fixed" || result === "Verified" || result === "Released" || result === "Completed") {
    return "status-fixed";
  }
  if (result.includes("pending")) return "status-planned";
  return "status-reviewing";
}

function cleanText(value, maxLength) {
  return String(value || "")
    .trim()
    .slice(0, maxLength);
}

function formatDate(value) {
  return new Intl.DateTimeFormat("ko-KR", {
    dateStyle: "medium",
    timeStyle: "short"
  }).format(new Date(value));
}

function escapeHtml(value) {
  return String(value || "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function escapeAttribute(value) {
  return escapeHtml(value).replaceAll("\n", " ");
}

function csvCell(value) {
  return `"${String(value ?? "").replaceAll('"', '""')}"`;
}

function downloadFile(filename, content, type) {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.append(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

function addTouchPaw(event) {
  const paw = document.createElement("span");
  paw.className = "touch-paw";
  paw.style.left = `${event.clientX}px`;
  paw.style.top = `${event.clientY}px`;
  document.body.append(paw);
  setTimeout(() => paw.remove(), 820);
}

function bindEvents() {
  els.form.addEventListener("submit", submitFeedback);
  els.search.addEventListener("input", renderFeedback);
  els.statusFilter.addEventListener("change", renderFeedback);
  els.exportMarkdown.addEventListener("click", exportMarkdown);
  els.exportCsv.addEventListener("click", exportCsv);
  document.addEventListener("pointerdown", addTouchPaw, { passive: true });
}

async function boot() {
  supabaseClient = initSupabase();
  if (supabaseClient) {
    els.submitNote.textContent = "Supabase 공개 보드에 저장됩니다. Google ID는 공개 목록에 표시하지 않습니다.";
  }
  bindEvents();
  renderTimeline();
  await loadFeedback();
  renderFeedback();
}

boot();
