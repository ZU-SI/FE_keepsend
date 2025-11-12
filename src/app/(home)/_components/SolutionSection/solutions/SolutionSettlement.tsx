'use client';

import { useRef, useState } from 'react';
import type { Swiper as SwiperType } from 'swiper';
import { Autoplay, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/pagination';

interface Props {
  id: string;
  index: number;
}

const settlementFeatures = [
  {
    title: "자동 정산",
    description: "플랫폼별 거래 데이터를 자동 수집하고 정확하게 계산합니다.",
  },
  {
    title: "정확한 검증",
    description: "시스템 기반의 오류 감지와 중복 방지로 신뢰성을 높입니다.",
  },
  {
    title: "운영 부담 절감",
    description: "수작업과 엑셀 업무를 제거하여 관리 효율을 극대화합니다.",
  },
  {
    title: "투명한 데이터 관리",
    description: "정산 내역을 실시간으로 확인하고 리포트를 자동 생성합니다.",
  },
];

export default function SolutionSettlement({ id, index }: Props) {
  const [activeIndex, setActiveIndex] = useState(0);
  const swiperRef = useRef<SwiperType | null>(null);

  const handleSlideChange = (swiper: SwiperType) => {
    setActiveIndex(swiper.realIndex);
  };

  const handleFeatureClick = (index: number) => {
    if (swiperRef.current) {
      swiperRef.current.slideToLoop(index);
    }
  };

  return (
    <div className="s-section__content solution-stm">
      <div className="s-section__animation">
        <div className="s-section__header">
          <div className="s-section__title-group">
            <h3 className="s-section__subtitle">정산 솔루션</h3>
            <h2 className="s-section__title">
              복잡한 물류 정산 대행 솔루션 'ULMA'
            </h2>
          </div>
        </div>
        <p className="s-section__description">
          ULMA는 물류 플랫폼과 기업 간 거래 데이터를 자동으로 집계, 정산하는 B2B 특화 정산 솔루션입니다.<br />
          정확한 데이터 기반으로 정산 오류를 최소화하고, 시간과 비용을 절감하는 지능형 정산 환경을 제공합니다.
        </p>

        <div className="stm-container">
          <div className="stm-slider">
            <Swiper
              modules={[Autoplay, Pagination]}
              direction="vertical"
              loop={true}
              speed={1500}
              autoplay={{
                delay: 5000,
                disableOnInteraction: false,
              }}
              pagination={{
                clickable: true,
              }}
              onSwiper={(swiper) => {
                swiperRef.current = swiper;
              }}
              onSlideChange={handleSlideChange}
              className="stm-swiper"
            >
              {settlementFeatures.map((_, idx) => (
                <SwiperSlide key={idx}>
                  <div className="stm-slide">
                    <div className="stm-slide__placeholder">
                      {/* 이미지 placeholder */}
                      ULMA 화면 {idx + 1}
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          <div className="stm-features">
            {settlementFeatures.map((feature, idx) => (
              <div
                key={idx}
                className={`stm-feature ${
                  activeIndex === idx ? 'stm-feature--active' : ''
                }`}
                onClick={() => handleFeatureClick(idx)}
                style={{ cursor: 'pointer' }}
              >
                <div className="stm-feature__indicator" />
                <div className="stm-feature__content">
                  <h4 className="stm-feature__title">{feature.title}</h4>
                  <p className="stm-feature__description">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
