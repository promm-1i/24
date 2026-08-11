// Shared brand/content constants for "이사가요" — used across the landing
// page and all design variants so copy only needs to change in one place.

export const COMPANY = {
  name: "이사가요",
  phone: "1544-2477", // 고객센터 대표번호
  kakaoUrl: null as string | null, // TODO: 카카오톡 상담 채널 링크 나오면 채워넣기
  ownerPhone: null as string | null, // TODO: 대표 직통 연결번호 나오면 채워넣기
  ownerName: "김미경",
  // 사업자등록상 주소 (사업자정보) — 실제 상담/영업 위치와 다를 수 있어 구분해서 표기
  bizRegisteredAddress: "충청남도 천안시 서북구 천안대로 1324 (신당동)",
  // 실제 상담을 받는 사업장 주소 — 아직 고객사에서 확정 전
  officeAddress: null as string | null, // TODO: 사업장 주소 나오면 채워넣기
};

export const HIGHLIGHTS = [
  "외국인 NO, 한국인으로만 구성된 직영팀",
  "견적을 본 매니저가 직접 이삿날 방문",
  "합리적인 비용, 꼼꼼한 포장·운반",
];

export const SERVICES = [
  {
    slug: "package-move",
    category: "이사",
    name: "포장이사",
    sortOrder: 1,
    description:
      "포장부터 운반, 정리까지 한 번에 진행해주는 편리한 이사 서비스입니다. 가구, 가전제품, 생활용품 등 모든 생활용품을 안전하게 포장하고 운송합니다.",
    features: [
      "전문 포장재를 이용한 안전한 포장",
      "가구 분해 및 조립 서비스",
      "가전제품 설치 및 연결",
      "냉장고 스팀청소 (옵션)",
      "보험 적용으로 안전 보장",
    ],
  },
  {
    slug: "home-move",
    category: "이사",
    name: "가정이사",
    sortOrder: 2,
    description:
      "가족 단위의 주거 이전을 위한 전문 서비스입니다. 가구, 가전제품, 생활용품 등 모든 생활용품을 안전하게 운송합니다.",
    features: [
      "전문 포장재를 이용한 안전한 포장",
      "가구 분해 및 조립 서비스",
      "가전제품 설치 및 연결",
      "냉장고 스팀청소 (옵션)",
      "보험 적용으로 안전 보장",
    ],
  },
  {
    slug: "office-move",
    category: "이사",
    name: "사무실이사",
    sortOrder: 3,
    description:
      "사무실·사업장의 집기와 장비를 안전하게 포장·운반·정리해주는 전문 이사 서비스입니다.",
    features: [
      "전문 포장재를 이용한 안전한 포장",
      "가구 분해 및 조립 서비스",
      "가전제품 설치 및 연결",
      "정리·정돈 서비스",
      "보험 적용으로 안전 보장",
    ],
  },
  {
    slug: "storage-move",
    category: "이사",
    name: "보관이사",
    sortOrder: 4,
    description:
      "임시 거주나 리모델링 등으로 인해 짐을 보관해야 할 때 이용하는 서비스입니다.",
    features: [
      "안전한 창고 보관 시설",
      "습도 및 온도 조절",
      "24시간 보안 시스템",
      "필요시 부분 반출 가능",
      "최대 6개월 보관 가능",
      "보험 적용으로 안전 보장",
    ],
  },
  {
    slug: "government-move",
    category: "이사",
    name: "관공서이사",
    sortOrder: 5,
    description:
      "관공서의 서류·집기·장비 등을 안전하고 체계적으로 포장·운반·배치하는 전문 이사 서비스입니다.",
    features: [
      "관공서 서류 및 집기 전문 포장",
      "중요 문서 및 장비 안전 운반",
      "사무가구 및 집기 분해·설치",
      "부서별 물품 분류 및 정리",
      "새 사무실 내 가구·집기 배치",
      "폐기물 및 불필요한 집기 처리",
      "보험 적용으로 안전 보장",
    ],
  },
  {
    slug: "studio-move",
    category: "이사",
    name: "원룸이사",
    sortOrder: 6,
    description:
      "소량의 짐을 신속하고 안전하게 포장·운반·정리해드리는 1인 가구 맞춤형 이사 서비스입니다.",
    features: [
      "소량 짐 전문 포장",
      "가구·가전 안전 운반",
      "침대·책상 등 가구 분해·설치",
      "짐 상하차 및 운송",
      "새 집 내 짐 배치",
      "필요 시 폐기물 처리",
      "보험 적용으로 안전 보장",
    ],
  },
];
