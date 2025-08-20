# Cutlet - URL 단축기 웹 애플리케이션

Cutlet은 현대적이고 사용자 친화적인 URL 단축 서비스입니다. 긴 URL을 짧고 기억하기 쉬운 링크로 변환하고, 고급 기능들을 제공합니다.

## ✨ 주요 기능

- 🚀 **빠른 URL 단축**: 복잡한 URL을 몇 초 만에 짧은 링크로 변환
- 🎯 **커스텀 URL**: 원하는 단축 코드로 링크 생성 (프리미엄 기능)
- 🏷️ **태그 분류**: URL을 카테고리별로 분류하고 관리
- ⏰ **만료일 설정**: 링크에 자동 만료일 설정
- ❤️ **즐겨찾기**: 자주 사용하는 링크를 즐겨찾기로 관리
- 📊 **클릭 분석**: 링크 클릭 통계 및 분석
- 🌍 **다국어 지원**: 한국어, 영어, 일본어, 중국어, 러시아어, 프랑스어, 독일어
- 📱 **반응형 디자인**: 모든 디바이스에서 최적화된 사용자 경험

## 🛠️ 기술 스택

### 프론트엔드
- **Next.js 15** - React 기반 풀스택 프레임워크
- **TypeScript** - 타입 안전성과 개발자 경험 향상
- **Tailwind CSS** - 유틸리티 우선 CSS 프레임워크
- **Radix UI** - 접근성이 뛰어난 UI 컴포넌트
- **Lucide React** - 아름다운 아이콘 라이브러리

### 백엔드
- **Next.js API Routes** - 서버리스 API 엔드포인트
- **Prisma** - 현대적인 데이터베이스 ORM
- **PostgreSQL** - 강력한 관계형 데이터베이스
- **JWT** - 안전한 인증 시스템

## 🚀 시작하기

### 필수 요구사항
- Node.js 18+ 
- PostgreSQL 데이터베이스
- pnpm (권장) 또는 npm

### 1. 저장소 클론
```bash
git clone <repository-url>
cd cutlet-v0-style
```

### 2. 의존성 설치
```bash
pnpm install
```

### 3. 환경 변수 설정
```bash
cp env.example .env.local
```

`.env.local` 파일을 편집하여 다음 정보를 입력하세요:
```env
# 데이터베이스 설정
DATABASE_URL="postgresql://username:password@localhost:5432/cutlet_db"

# 애플리케이션 설정
NEXT_PUBLIC_BASE_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key-here"
NEXTAUTH_URL="http://localhost:3000"

# JWT 설정
JWT_SECRET="your-jwt-secret-here"
```

### 4. 데이터베이스 설정
```bash
# Prisma 클라이언트 생성
pnpm prisma generate

# 데이터베이스 마이그레이션
pnpm prisma db push

# (선택사항) Prisma Studio 실행
pnpm prisma studio
```

### 5. 개발 서버 실행
```bash
pnpm dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000)을 열어 애플리케이션을 확인하세요.

## 📁 프로젝트 구조

```
cutlet-v0-style/
├── app/                    # Next.js 13+ App Router
│   ├── api/               # API 엔드포인트
│   │   ├── shorten/       # URL 단축 API
│   │   └── redirect/      # URL 리다이렉트 API
│   ├── shortener/         # URL 단축 페이지
│   ├── auth/              # 인증 페이지들
│   ├── dashboard/         # 대시보드
│   └── profile/           # 사용자 프로필
├── components/            # 재사용 가능한 UI 컴포넌트
│   └── ui/               # 기본 UI 컴포넌트들
├── lib/                   # 유틸리티 함수들
│   ├── database.ts       # 데이터베이스 연결
│   ├── url-utils.ts      # URL 관련 유틸리티
│   └── translations.ts   # 다국어 번역
├── prisma/               # 데이터베이스 스키마
│   └── schema.prisma     # Prisma 스키마 정의
└── contexts/             # React Context
    ├── auth-context.tsx  # 인증 컨텍스트
    └── language-context.tsx # 언어 설정 컨텍스트
```

## 🔧 개발 가이드

### 새로운 API 엔드포인트 추가
```typescript
// app/api/example/route.ts
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  // API 로직 구현
  return NextResponse.json({ message: 'Hello World' })
}
```

### 데이터베이스 모델 추가
```typescript
// prisma/schema.prisma
model Example {
  id        String   @id @default(cuid())
  name      String
  createdAt DateTime @default(now())
}
```

### 다국어 지원 추가
```typescript
// lib/translations.ts
export const translations = {
  en: {
    newKey: "English text"
  },
  ko: {
    newKey: "한국어 텍스트"
  }
}
```

## 🧪 테스트

```bash
# 타입 체크
pnpm type-check

# 린트 검사
pnpm lint

# 빌드 테스트
pnpm build
```

## 📦 배포

### Vercel 배포 (권장)
1. GitHub 저장소를 Vercel에 연결
2. 환경 변수 설정
3. 자동 배포 활성화

### Docker 배포
```bash
# Docker 이미지 빌드
docker build -t cutlet .

# 컨테이너 실행
docker run -p 3000:3000 cutlet
```

## 🤝 기여하기

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 라이선스

이 프로젝트는 MIT 라이선스 하에 배포됩니다. 자세한 내용은 `LICENSE` 파일을 참조하세요.

## 📞 지원

문제가 있거나 질문이 있으시면 [Issues](https://github.com/yourusername/cutlet-v0-style/issues)를 통해 문의해 주세요.

---

**Cutlet** - URL을 더 스마트하게, 더 아름답게 ✨
