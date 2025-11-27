import GlobalFooter from "@/components/layouts/GlobalFooter";
import GlobalHeader from "@/components/layouts/GlobalHeader";
import GlobalModals from "@/components/layouts/GlobalModals";
import type { Metadata } from "next";
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
})
const suite = localFont({
  src: '../../public/fonts/SUITE-Variable.woff2',
  display: 'swap',
  weight: '100 900',
  variable: '--font-suite'
})
const suit = localFont({
  src: '../../public/fonts/SUIT-Variable.woff2',
  display: 'swap',
  weight: '100 900',
  variable: '--font-suit'
})

/** ------------------------------
 * 메타 데이터 설정
 * ------------------------------ */
export const metadata: Metadata = {
  title: "KEEPSEND",
  description: "AI LOGISTICS",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {




  return (
    <html lang="ko">
      <head>
        <Script
          strategy="beforeInteractive"
          type="text/javascript"
          src={`https://oapi.map.naver.com/openapi/v3/maps.js?ncpKeyId=${process.env.NEXT_PUBLIC_NAVER_CLIENT_ID}`}
        />
      </head>
      <body
        className={`${suit.variable} ${suite.variable} ${rajdhani.variable} antialiased`}
      >
        <GlobalHeader />
        {children}
        <GlobalFooter />
        <GlobalModals />
      </body>
    </html>
  );
}
