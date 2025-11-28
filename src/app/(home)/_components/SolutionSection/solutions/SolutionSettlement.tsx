'use client';

import { motion, Variants } from 'framer-motion';
import Image from 'next/image';
import { useRef, useState } from 'react';
import type { Swiper as SwiperType } from 'swiper';
import 'swiper/css';
import 'swiper/css/pagination';
import { Autoplay, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

const settlementFeatures = [
  // ... (데이터 동일)
  {
    title: "자동 정산",
    description: "플랫폼별 거래 데이터를 자동 수집하고 정확하게 계산합니다.",
    image: '/image/solution-ulma-01.png'
  },
  {
    title: "정확한 검증",
    description: "시스템 기반의 오류 감지와 중복 방지로 신뢰성을 높입니다.",
    image: '/image/solution-ulma-02.png'
  },
  {
    title: "운영 부담 절감",
    description: "수작업과 엑셀 업무를 제거하여 관리 효율을 극대화합니다.",
    image: '/image/solution-ulma-03.png'
  },
  {
    title: "투명한 데이터 관리",
    description: "정산 내역을 실시간으로 확인하고 리포트를 자동 생성합니다.",
    image: '/image/solution-ulma-04.png'
  },
];

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
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
      staggerChildren: 0.2
    }
  }
};

export default function SolutionSettlement() {
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

      {/* Container */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center w-full">

        {/* Slider Section */}
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
            className="h-[30vh] rounded-xl lg:h-[50vh] "
          >
            {settlementFeatures.map((item, idx) => (
              <SwiperSlide key={idx}>
                {/* [Mod] bg-gray-100 -> bg-muted-light (Placeholder) */}
                <div className="relative h-full overflow-hidden rounded-xl bg-muted-light">
                  <Image width={1200} height={800} src={item.image} alt={item.title} className='min-w-full min-h-full object-cover absolute top-0 left-0' />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Features List Section */}
        <div className="flex flex-1 flex-col gap-2 order-1 lg:order-2">
          {settlementFeatures.map((feature, idx) => {
            const isActive = activeIndex === idx;
            return (
              <div
                key={idx}
                onClick={() => handleFeatureClick(idx)}
                className={`flex cursor-pointer gap-4 rounded-lg p-3 transition-all duration-300
                  ${isActive
                    ? 'flex opacity-100 bg-primary/5 border border-primary/30'
                    : 'hidden opacity-50 lg:flex border border-transparent hover:bg-muted-light/50'
                  }
                `}
              >
                {/* Indicator Dot */}
                <div
                  className={`mt-[6px] h-3 w-3 min-w-[12px] rounded-full transition-all duration-300
                    ${isActive
                      ? 'bg-primary shadow-[0_0_10px_rgba(59,130,246,0.4)]'
                      : 'bg-border-light' // [Mod] bg-gray-600 -> bg-border-light (Inactive state fixed)
                    }
                  `}
                />

                <div className="flex-1">
                  {/* [Mod] text-foreground -> text-foreground-light (Light Theme fixed) */}
                  <h4 className={`mb-2 text-lg font-semibold transition-colors ${isActive ? 'text-primary' : 'text-background-light'}`}>
                    {feature.title}
                  </h4>
                  {/* [Mod] text-muted-foreground -> text-muted-foreground-light */}
                  <p className="text-sm leading-relaxed text-white">
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
