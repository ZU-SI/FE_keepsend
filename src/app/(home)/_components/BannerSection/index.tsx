"use client";

import { Fragment } from "react";

interface Banner {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  gradient: string;
  onClick?: string;
}

const banners: Banner[] = [
  {
    id: 1,
    title: 'AI로 완성되는<br/>새로운 맞춤 물류의 시작<br/>\'KEEPSEND\'',
    subtitle: "물류 혁신",
    description:
      "킵센드는 풍부한 물류 경험 노하우와 AI 기술력을 결합하여 <br/> 저비용, 고효율! 그 이상의 가치를 제공하는 물류 서비스입니다.",
    gradient: "from-blue-600 via-cyan-500 to-blue-400",

  },
  {
    id: 2,
    title: '기업의 니즈에 맞춘<br/>물류 유형 별<br/>KEEPSEND의 해답',
    subtitle: "B2B Solutions",
    description:
      "B2B 거래 특성에 최적화된 유연한 프로세스로<br/>정확한 납기, 투명한 재고, 효율적인 출고를 실현합니다.",
    gradient: "from-cyan-500 via-blue-500 to-indigo-600",
  },
  {
    id: 3,
    title: "물류 운영 중심에<br/>IT를 통합하다.",
    subtitle: "디지털 혁신",
    description:
      "물류 전 과정을 통합 관리하는 스마트 플랫폼.<br/>주문, 재고, 출고 데이터를 하나의 흐름으로 연결해<br/>비즈니스 효율을 높입니다.",
    gradient: "from-indigo-600 via-purple-500 to-blue-400",
  },
];

interface BannerSectionProps {
  startIdx: number;
}

export default function BannerSection({ startIdx = 0 }: BannerSectionProps) {

  return (
    <Fragment>
      {banners.map((banner, idx) => (
        <div
          key={banner.id}
          data-scroll-section
          data-section-index={startIdx + idx}
          className="hero-banners__section"
        >
          <div
            className={`hero-banners__background hero-banners__background--${banner.gradient}`}
          ></div>
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
            }}
          ></div>
          <div className="hero-banners__grid-pattern"></div>
          <div className="hero-banners__content">
            <p className="hero-banners__subtitle">{banner.subtitle}</p>
            <h1 className="hero-banners__title" dangerouslySetInnerHTML={{ __html: banner.title}} />
            <p className="hero-banners__description"  dangerouslySetInnerHTML={{ __html: banner.description }} />
            <div className="hero-banners__actions">
              { banner.onClick &&
                <button
                type="button"
                className={`hero-banners__button hero-banners__button--primary`}
              >
                자세히 보기
              </button>}
              <button type="button" onClick={() => { }} className="hero-banners__button hero-banners__button--outline">
                문의하기
              </button>
            </div>
          </div>
        </div>
      ))}
    </Fragment>
  );
}
