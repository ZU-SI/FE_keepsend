import GlobalFooter from "@/components/layouts/GlobalFooter";
import GlobalHeader from "@/components/layouts/GlobalHeader";
import GlobalModals from "@/components/layouts/GlobalModals";
import type { Metadata, Viewport } from "next";
import { Rajdhani } from 'next/font/google';
import localFont from 'next/font/local';
import Script from "next/script";
import "../styles/globals.scss";
import "../styles/tailwind.css";

/** ------------------------------
 * 폰트 설정
 * ------------------------------ */
const rajdhani = Rajdhani({
  weight: ['400', '500', '600', '700'],
  variable: '--font-rajdhani',
  display: 'swap'
});
const suite = localFont({
  src: '../../public/fonts/SUITE-Variable.woff2',
  display: 'swap',
  weight: '100 900',
  variable: '--font-suite'
});
const suit = localFont({
  src: '../../public/fonts/SUIT-Variable.woff2',
  display: 'swap',
  weight: '100 900',
  variable: '--font-suit'
});

/** ------------------------------
 * 상수 설정 @todo 실제 도메인으로 변경 필요
 * ------------------------------ */
const DOMAIN_URL = process.env.NEXT_PUBLIC_DOMAIN_URL || "https://www.keepsend.co.kr"; // @todo 도메인주소 연동
const SITE_NAME = process.env.NEXT_PUBLIC_DOMAIN_NAME || "킵센드";

/** ------------------------------
 * 메타 데이터 설정
 * ------------------------------ */
export const metadata: Metadata = {
  metadataBase: new URL(DOMAIN_URL),
  title: {
    template: `%s | ${SITE_NAME}`, // 하위 페이지: "로그인 | KEEPSEND"
    default: `${SITE_NAME} - AI 기반 물류 플랫폼`, // 기본 타이틀
  },
  description: "AI LOGISTICS KEEPSEND. 빠르고 정확한 물류 혁신을 경험하세요.",
  keywords: ["물류", "AI 물류", "배송대행", "풀필먼트", "KEEPSEND", "킵센드"],
  authors: [{ name: "KEEPSEND Team" }],
  creator: "킵센드",
  publisher: "KEEPSEND Corp.",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  // 캐노니컬 URL 설정 (중복 콘텐츠 방지)
  alternates: {
    canonical: '/',
  },
  // 검색 엔진 크롤링 제어
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  // 소셜 미디어
  openGraph: {
    title: `${SITE_NAME} - AI Logistics`,
    description: "AI 기술을 활용한 스마트 물류 솔루션, KEEPSEND입니다.",
    url: DOMAIN_URL,
    siteName: SITE_NAME,
    locale: 'ko_KR',
    type: 'website',
    images: [
      {
        url: '/brand/og-image.png', // public 폴더 내 이미지 경로
        width: 1200,
        height: 630,
        alt: 'KEEPSEND 서비스 미리보기',
      },
    ],
  },
  // 트위터 카드
  twitter: {
    card: 'summary_large_image',
    title: SITE_NAME,
    description: "AI LOGISTICS KEEPSEND",
    images: ['/brand/og-image.png'],
  },
  // 소유권 인증 (구글 서치 콘솔, 네이버 웹마스터 도구)
  verification: {
    google: "google-site-verification-code", // 실제 코드로 교체
    other: {
      "naver-site-verification": "naver-verification-code", // 실제 코드로 교체
    },
  },
  icons: {
    icon: '/brand/favicon.ico',
    apple: '/brand/apple-touch-icon.png',
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5, // 접근성을 위해 확대 허용 권장
  themeColor: "#ffffff", // 모바일 브라우저 상단 바 색상
};

/** ------------------------------
 * 구조화된 데이터 (JSON-LD) - Organization
 * ------------------------------ */
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: SITE_NAME,
  url: DOMAIN_URL,
  logo: `${DOMAIN_URL}/images/logo.png`,
  sameAs: [
    'https://www.facebook.com/keepsend', // @todo 페이스북 계정
    'https://www.instagram.com/keepsend', // @todo 인스타그램 계정
  ],
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+82-2-1234-5678', // @todo CS 연락처
    contactType: 'customer service',
    areaServed: 'KR',
    availableLanguage: 'Korean'
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <head>
        {/* 네이버 지도 스크립트 */}
        <Script
          strategy="beforeInteractive"
          type="text/javascript"
          src={`https://oapi.map.naver.com/openapi/v3/maps.js?ncpKeyId=${process.env.NEXT_PUBLIC_NAVER_CLIENT_ID}`}
        />
      </head>
      <body
        className={`${suit.variable} ${suite.variable} ${rajdhani.variable} antialiased`}
      >
        {/* 구조화된 데이터 */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

        <GlobalHeader />
        <main className="flex-grow">
            {children}
        </main>
        <GlobalFooter />
        <GlobalModals />
      </body>
    </html>
  );
}
