import Image from 'next/image';
import React, { useState } from 'react';

import type { Swiper as SwiperType } from 'swiper';
import 'swiper/css';
import { Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

interface Props {
  id: string;
  index: number;
}

interface Partner {
  name: string;
  logo: string;
  description: string;
}

const ServicePartner: React.FC<Props> = ({ id, index }) => {
  const [swiperInstance, setSwiperInstance] = useState<SwiperType | null>(null);

  const partners: Partner[] = [
    { name: '쿠팡', logo: '/images/coupang-logo.png', description: '빠른 배송과 혁신적인 물류 시스템' },
    { name: '롯데글로벌로지스틱스', logo: '/images/lotte-logo.png', description: '글로벌 네트워크 기반의 물류 솔루션' },
    { name: '쿠팡', logo: '/images/coupang-logo.png', description: '빠른 배송과 혁신적인 물류 시스템' },
    { name: '롯데글로벌로지스틱스', logo: '/images/lotte-logo.png', description: '글로벌 네트워크 기반의 물류 솔루션' },
    { name: '쿠팡', logo: '/images/coupang-logo.png', description: '빠른 배송과 혁신적인 물류 시스템' },
    { name: '롯데글로벌로지스틱스', logo: '/images/lotte-logo.png', description: '글로벌 네트워크 기반의 물류 솔루션' },
  ];

  const swiperBreakpoints = {
    1024: { slidesPerView: 5, spaceBetween: 64 },
    768: { slidesPerView: 4, spaceBetween: 32 },
    0: { slidesPerView: 3, spaceBetween: 32 },
  };

  // 카드에 마우스 올렸을 때: 슬라이드 멈춤
  const handleCardMouseEnter = () => {
    if (swiperInstance) {
      swiperInstance.autoplay.stop();
    }
  };

  // 카드에서 마우스 뗐을 때: 슬라이드 재개
  const handleCardMouseLeave = () => {
    if (swiperInstance) {
      swiperInstance.autoplay.start();
    }
  };

  return (
    <div className="s-section__content min-h-screen">
      <div className="s-section__header">
        <h3 className="s-section__subtitle">주요 고객사</h3>
        <h2 className="s-section__title">B2B 시장을 잇는 파트너십</h2>
        <p className="s-section__description">
          신뢰와 결과로 이어진 협력의 기록! 비즈니스 이상의 관계를 이어갑니다.
        </p>
      </div>

      <div className="relative w-full overflow-hidden rounded-lg bg-card/30">
        {/* Fade effects */}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-20 w-[100px] bg-gradient-to-r from-background to-transparent lg:w-[200px]" aria-hidden="true"></div>
        <div className="pointer-events-none absolute inset-y-0 right-0 z-20 w-[100px] bg-gradient-to-l from-background to-transparent lg:w-[200px]" aria-hidden="true"></div>

        {/* Swiper Container */}
        <Swiper
          modules={[Autoplay]}
          loop={true}
          onSwiper={(swiper) => {
            setSwiperInstance(swiper);
            swiper.wrapperEl.style.transitionTimingFunction = 'linear';
          }}
          autoplay={{
            delay: 0,
            disableOnInteraction: false,
            pauseOnMouseEnter: false, // 수동 제어를 위해 false 유지
          }}
          speed={5000}
          breakpoints={swiperBreakpoints}
          allowTouchMove={false}
          className="!ease-linear"
          // [중요] 툴팁이 잘리지 않도록 상단 패딩(pt-20)을 넉넉하게 확보합니다.
          style={{ paddingTop: '5rem', paddingBottom: '3rem' }}
        >
          {partners.map((partner, idx) => (
            <SwiperSlide
              className="!w-auto flex-shrink-0"
              key={`${partner.name}-${idx}`}
            >
              {/* Card Wrapper (Group) */}
              <div
                className="group relative flex min-w-[200px] flex-shrink-0 cursor-default flex-col items-center justify-center"
                onMouseEnter={handleCardMouseEnter}
                onMouseLeave={handleCardMouseLeave}
              >

                {/* 1. Description Tooltip (Hover시 노출) */}
                <div className="pointer-events-none absolute bottom-full mb-4 w-[220px] opacity-0 transition-opacity duration-300 group-hover:opacity-100 z-30">
                  <div className="relative rounded-lg bg-gray-900 px-4 py-3 text-center text-sm text-white shadow-xl border border-gray-700">
                    {/* 툴팁 내용 */}
                    <span className="block font-bold mb-1 text-cyan-400">{partner.name}</span>
                    <span className="text-gray-300 text-xs">{partner.description}</span>

                    {/* 말풍선 화살표 */}
                    <div className="absolute -bottom-2 left-1/2 h-4 w-4 -translate-x-1/2 rotate-45 bg-gray-900 border-r border-b border-gray-700"></div>
                  </div>
                </div>

                {/* 2. Logo Card Design */}
                <div className="flex w-full items-center justify-center rounded bg-card border border-gray-800 p-4 transition-all duration-300 group-hover:translate-y-[-4px] group-hover:border-cyan-600 group-hover:shadow-xl group-hover:shadow-cyan-500/15 lg:min-w-[250px] lg:p-6">
                  <Image
                    src={partner.logo}
                    alt={partner.name}
                    width={180}
                    height={60}
                    className="h-auto w-[140px] object-contain opacity-70 grayscale transition-all duration-300 group-hover:opacity-100 group-hover:grayscale-0 lg:w-[180px]"
                  />
                </div>

              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default ServicePartner;
