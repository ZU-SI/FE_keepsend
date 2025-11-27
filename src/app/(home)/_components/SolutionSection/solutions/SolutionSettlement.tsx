'use client';

import { motion, Variants } from 'framer-motion';
import { useRef, useState } from 'react';
import type { Swiper as SwiperType } from 'swiper';
import 'swiper/css';
import 'swiper/css/pagination';
import { Autoplay, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

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

const fadeInUp = {
  hidden: { opacity: 0, y: 30 }, // 아래에서 시작 (위에서 떨어지게 하려면 y: -30)
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
} as Variants;

const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2 // 자식 요소들이 0.2초 간격으로 순차 실행
    }
  }
};

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
        <motion.div
            className="s-section__header"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
        >
            <motion.h3 variants={fadeInUp} className="s-section__subtitle">
              플랫폼 정산의 새로운 기준
            </motion.h3>
            <motion.h2 variants={fadeInUp} className="s-section__title">
              물류 정산 대행 솔루션 ‘ULMA’
            </motion.h2>
            <motion.p variants={fadeInUp} className="s-section__description">
              물류 플랙폼과 기업 간 거래 데이터를 자동 집계, 정산하는 원스톱 지능형 정산 환경.
              <br />
              데이터 기반의 투명한 정산으로 비용 낭비를 막고 비즈니스 신뢰를 높이세요
            </motion.p>
        </motion.div>

      {/* Container: Flex column mobile, Row desktop */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center w-full">

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
            className="h-[30vh] rounded-xl lg:h-[50vh] "
          >
            {settlementFeatures.map((_, idx) => (
              <SwiperSlide key={idx}>
                <div className="h-full overflow-hidden rounded-xl bg-card shadow-[0_10px_40px_rgba(0,0,0,0.3)]">
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Features List Section (Order 1 on mobile, 2 on desktop) */}
        <div className="flex flex-1 flex-col gap-2 order-1 lg:order-2">
          {settlementFeatures.map((feature, idx) => {
            const isActive = activeIndex === idx;
            return (
              <div
                key={idx}
                onClick={() => handleFeatureClick(idx)}
                className={`flex cursor-pointer gap-4 rounded-lg p-3 transition-all duration-300
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
