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
  // Swiper 인스턴스를 저장할 State
  const [swiperInstance, setSwiperInstance] = useState<SwiperType | null>(null);

  const partners: Partner[] = [
    { name: '쿠팡', logo: '/images/coupang-logo.png', description: '상세 설명'},
    { name: '롯데글로벌로지스틱스', logo: '/images/lotte-logo.png', description: '상세 설명' },
    { name: 'CJ대한통운', logo: '/images/cj-logo.png', description: '상세 설명' },
    { name: '한진', logo: '/images/hanjin-logo.png', description: '상세 설명' },
    { name: 'GS리테일', logo: '/images/gs-logo.png', description: '상세 설명' },
    { name: '네이버', logo: '/images/naver-logo.png', description: '상세 설명' }
  ];

  const swiperBreakpoints = {
    1024: { slidesPerView: 5, spaceBetween: 64 },
    768: { slidesPerView: 4, spaceBetween: 32 },
    0: { slidesPerView: 3, spaceBetween: 32 },
  };

  // 이벤트 핸들러: 마우스 오버 시 즉시 멈춤
  const handleMouseEnter = () => {
    if (swiperInstance) {
      swiperInstance.autoplay.stop();
    }
  };

  // 이벤트 핸들러: 마우스 이탈 시 부드럽게 다시 시작
  const handleMouseLeave = () => {
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

      {/* 컨테이너에 이벤트 핸들러 연결 */}
      <div
        className="relative w-full overflow-hidden py-xl rounded-lg bg-card/30 py-8 lg:py-12"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* Fade effects */}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-20 w-[100px] bg-gradient-to-r from-background to-transparent lg:w-[200px]" aria-hidden="true"></div>
        <div className="pointer-events-none absolute inset-y-0 right-0 z-20 w-[100px] bg-gradient-to-l from-background to-transparent lg:w-[200px]" aria-hidden="true"></div>

        <Swiper
          modules={[Autoplay]}
          loop={true}
          // 중요: onSwiper로 인스턴스 캡처 및 linear easing 강제 적용
          onSwiper={(swiper) => {
            setSwiperInstance(swiper);
            // JS로 강제로 wrapper의 트랜지션을 linear로 고정 (CSS 파일 없이 해결)
            swiper.wrapperEl.style.transitionTimingFunction = 'linear';
          }}
          autoplay={{
            delay: 0,
            disableOnInteraction: false,
            pauseOnMouseEnter: false,
          }}
          speed={5000}
          breakpoints={swiperBreakpoints}
          allowTouchMove={false} // 마우스 드래그 방지 (Marquee 느낌 유지)
          className="!ease-linear" // Tailwind 클래스로 보조
        >
          {partners.map((partner, idx) => (
            <SwiperSlide
              className="!w-auto flex-shrink-0 py-xl"
              key={`${partner.name}-${idx}`}
            >
              <div className="flex min-w-[200px] flex-shrink-0 items-center justify-center rounded bg-card border border-gray-800 p-4 transition-all duration-300 hover:translate-y-[-4px] hover:border-cyan-600 hover:shadow-xl hover:shadow-cyan-500/15 lg:min-w-[250px] lg:p-6">
                <Image
                  src={partner.logo}
                  alt={partner.name}
                  width={180}
                  height={60}
                  className="h-auto w-[140px] object-contain opacity-70 grayscale transition-all duration-300 hover:opacity-100 hover:grayscale-0 lg:w-[180px]"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default ServicePartner;
