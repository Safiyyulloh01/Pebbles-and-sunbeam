# NICE TO CU — Digital Design System & UI Library Specification
> BGF Retail (CU 편의점) 공식 브랜드 아이덴티티 및 디지털 프로덕트 디자인 시스템 가이드

---

## 1. 브랜드 개요 및 철학 (Brand Philosophy)

- **기업명**: BGF리테일 (BGF Retail — "Be Good Friends")
- **브랜드 슬로건**: **NICE TO CU** (만나면 반갑고 언제나 다시 찾고 싶은 친근한 일상의 편의점)
- **디자인 모티프**: **말풍선(Speech Bubble)** — 고객과의 열린 소통과 유연한 관계를 상징하며, 모서리가 부드럽게 라운딩된 캡슐 형태를 기본 조형 언어로 채택
- **서브 브랜드 및 PB 라인업**:
  - **HEYROO (헤이루)**: 친근한 곰/캥거루 마스코트와 옐로우-퍼플 배색의 독점 PB 브랜드
  - **get (겟커피)**: RFA 인증 100% 친환경 원두를 사용하는 CU 자체 프리미엄 즉석 원두커피 브랜드
  - **delaffe (델라페)**: 빅얼음컵과 함께 즐기는 아이스티, 에이드 등 파우치 음료 라인업
  - **포켓CU (Pocket CU)**: 온·오프라인을 연계한 O4O(Online-for-Offline) 라이프스타일 커머스 앱 (스마트앱어워드 최고대상 수상)

---

## 2. 컬러 시스템 (Color Tokens)

### 2.1 메인 코어 컬러 (Core Brand Colors)

| 색상명 | 명칭 / 역할 | PANTONE | HEX | RGB | 의미 |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **CU Purple** | 브랜드 대표 컬러 | Pantone 267C | `#751485` | R117 G20 B133 | 고객을 소중히 생각하는 "소중함과 가치" |
| **CU Green** | 브랜드 대표 컬러 | Pantone 368C | `#9DC92A` | R157 G201 B42 | 새롭고 신선한 서비스를 제공하는 "신선함과 새로움" |

### 2.2 디지털 프로덕션 & 프로모션 뱃지 컬러 (Digital Tokens)

| 토큰명 | 용도 | HEX | 배경색 / 텍스트 배색 |
| :--- | :--- | :--- | :--- |
| **CU Lime Green** | 1+1 프로모션 뱃지 | `#37D243` | `#37D243` (White text, 30px pill) |
| **CU Violet** | 2+1 프로모션 뱃지 | `#8059EA` | `#8059EA` (White text, 30px pill) |
| **HEYROO Yellow** | 헤이루 PB 단독 뱃지 | `#FFB800` | `#751485` (Gold border & text) |
| **CU Alert Red** | 신상품(NEW), 마감세일 | `#FF4757` | `#FF4757` (White text) |
| **CU Best Amber** | 베스트셀러(BEST) | `#FF9800` | `#FF9800` (White text) |

### 2.3 서브 컬러 및 표면 토큰 (Neutrals & Surfaces)

| 토큰명 | HEX | 역할 |
| :--- | :--- | :--- |
| **CU Dark Beige** | `#D8CEBF` | 오프라인 인테리어 및 자연식품 패키지 서브 컬러 |
| **CU Light Beige** | `#FAF6F0` | 따뜻하고 부드러운 캔버스 베이지 |
| **Digital Canvas** | `#F5F6F8` | 모던 리테일 웹/앱 배경 서페이스 |
| **Surface White** | `#FFFFFF` | 고대비 상품 카드 및 팝업 표면 |
| **Text Primary** | `#1E1E1E` | 제품명 및 가격 가독성 극대화 다크 차콜 |
| **Text Secondary** | `#5A5A5A` | 카테고리, 보관방법, 부가설명 |
| **Border Card** | `#DEDEDE` | 상품 카드 표준 테두리 (1px solid) |

---

## 3. 타이포그래피 (Typography)

1. **국문 기본 서체 (Body & Heading)**: `'Noto Sans KR'`, `'Pretendard'`, `-apple-system`, `sans-serif`
   - 본문/라벨 자간: `-0.02em`
   - 행간: `1.4 ~ 1.5`
2. **숫자 및 가격 표기 (Numeric Display)**: `'Roboto'`, `sans-serif` (Tabular Figures)
   - 가격 폰트: Roboto Bold `20px ~ 24px`
   - 통화 단위: `원` (동일 행 14px~18px Regular)
3. **상품명 표기 규칙**:
   - 최대 2줄 제한 (`-webkit-line-clamp: 2`, `text-overflow: ellipsis`)
   - 최소 높이 38px~41px 확보로 일관된 카드 그리드 리듬 유지

---

## 4. 컴포넌트 아키텍처 (Component Architecture)

### 4.1 프로덕트 카드 (`CUProductCard`)
- **컨테이너**: `border-radius: 16px` (모바일 12px), `border: 1px solid #DEDEDE`, `background: #FFFFFF`
- **인터랙션**: 호버 시 `border-color: #751485`, 그림자 팽창, 이미지 `transform: scale(1.08)` (`transition: 0.34s ease-in-out`)
- **상단 뱃지 배치**:
  - 좌측 상단 (`absolute top-3 left-3`): 프로모션 뱃지 (`1+1`, `2+1`)
  - 우측 상단 (`absolute top-3 right-3`): 상태 태그 (`NEW`, `BEST`, `CU단독`)
- **하단 액션**:
  - `재고조회` 버튼: 해당 상품의 주변 매장 재고 모달 즉시 호출
  - `담기` 버튼: 포켓CU 장바구니 즉시 담기 및 피드백

### 4.2 프로모션 뱃지 (`CUBadge`)
- 형태: `border-radius: 30px` 타원형 캡슐
- 사이즈:
  - `sm`: 11px 폰트, 높이 20px
  - `md`: 13px 폰트, 높이 26px
  - `lg`: 14px 폰트, 높이 30px

### 4.3 포켓CU 원QR (`CUOneQRModal`)
- **개념**: 결제, CU 멤버십 적립, 모바일 쿠폰, 통신사 할인을 한 번의 스캔으로 처리하는 특허 UI
- **구성 요소**:
  - 1D 바코드 (포인트 적립용) + 2D 매트릭스 QR (간편결제용)
  - 3분(180초) 보안 카운트다운 타이머 & 원클릭 새로고침
  - 키핑쿠폰(Keeping Coupon) 탭: 1+1 행사로 받은 무료 증정품을 가상 보관함에 저장하고 전국 매장에서 언제든 교환

### 4.4 지도 기반 실시간 점포 재고찾기 (`CUStoreMapStockLocator`)
- **실시간 지도 캔버스**: 반경 1km 내 CU 편의점 위치 핀 시각화
- **핀 뱃지**: 매장 핀 위에 해당 상품의 실시간 재고(초록: 여유, 주황: 품절임박, 회색: 품절) 표시
- **매장 정보 시트**:
  - 24시간 영업 여부 (24H 뱃지)
  - 매장 제공 편의 서비스 (편PICK, 택배, 베이커리, 치킨, ATM, 의약품)
  - 실시간 잔여 재고 수량
  - 편PICK 즉시 예약 버튼 및 길찾기/전화 연동
  - 품절 시 **입고 알림 신청(Restock Alert)** 푸시 구독

---

## 5. Pebbles & Sunbeam 라이브러리와의 통합

본 프로젝트는 기존 `Pebbles & Sunbeam`의 부드러운 스퀴클(Squircle), 햅틱 오디오 피드백, 반응형 뷰포트 스위처를 온전히 계승하면서, 최상단 헤더에 **브랜드 테마 토글(CU 편의점 ↔ Tender Bakery)**을 장착하여 두 디자인 세계를 자유롭게 넘나들 수 있도록 설계되었습니다.
