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
    <div className="s-section__content">
      <div className="s-section__header">
        <h3 className="s-section__subtitle">정산 솔루션</h3>
        <h2 className="s-section__title">
          복잡한 물류 정산 대행 솔루션 'ULMA'
        </h2>
        <p className="s-section__description">
          ULMA는 물류 플랫폼과 기업 간 거래 데이터를 자동으로 집계, 정산하는 B2B 특화 정산 솔루션입니다.<br />
          정확한 데이터 기반으로 정산 오류를 최소화하고, 시간과 비용을 절감하는 지능형 정산 환경을 제공합니다.
        </p>
      </div>

      {/* Container: Flex column mobile, Row desktop */}
      <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:gap-16">

        {/* Slider Section (Order 2 on mobile, 1 on desktop) */}
        <div className="flex-1 w-full order-2 lg:order-1">
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
            // h-[30vh] mobile, h-[40vh] desktop
            className="h-[30vh] rounded-xl lg:h-[40vh]"
          >
            {settlementFeatures.map((_, idx) => (
              <SwiperSlide key={idx}>
                <div className="h-full overflow-hidden rounded-xl bg-card shadow-[0_10px_40px_rgba(0,0,0,0.3)]">
                  <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-gray-800 to-gray-900 text-2xl font-semibold text-muted-foreground">
                    {/* 이미지 placeholder */}
                    ULMA 화면 {idx + 1}
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Features List Section (Order 1 on mobile, 2 on desktop) */}
        <div className="flex flex-1 flex-col gap-6 order-1 lg:order-2">
          {settlementFeatures.map((feature, idx) => {
            const isActive = activeIndex === idx;
            return (
              <div
                key={idx}
                onClick={() => handleFeatureClick(idx)}
                className={`flex cursor-pointer gap-4 rounded-lg p-6 transition-all duration-300
                  ${isActive
                    ? 'flex opacity-100 bg-primary/10 border border-primary/30'
                    : 'hidden opacity-50 lg:flex border border-transparent'
                  }
                `}
              >
                {/* Indicator Dot */}
                <div
                  className={`mt-[6px] h-3 w-3 min-w-[12px] rounded-full transition-all duration-300
                    ${isActive
                      ? 'bg-primary shadow-[0_0_20px_rgba(var(--primary),0.5)]'
                      : 'bg-gray-600'
                    }
                  `}
                />

                <div className="flex-1">
                  <h4 className="mb-2 text-lg font-semibold text-foreground">
                    {feature.title}
                  </h4>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {feature.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
