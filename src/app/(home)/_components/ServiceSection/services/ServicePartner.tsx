import Image from 'next/image';
import React from 'react';
import 'swiper/css';
import { Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

interface Partner {
  name: string;
  logo: string;
  description: string;
}

const ServicePartner: React.FC = () => {
  const partners: Partner[] = [
    { name: '쿠팡', logo: '/image/service-partner-coupang.png', description: '글로벌 네트워크 기반의 물류 솔루션' },
    { name: '롯데글로벌로지스틱스', logo: '/image/service-partner-lotte.png', description: '빠른 배송과 혁신적인 물류 시스템' }
  ];

  const swiperBreakpoints = {
    1024: { slidesPerView: 5, spaceBetween: 64 },
    768: { slidesPerView: 4, spaceBetween: 32 },
    0: { slidesPerView: 3, spaceBetween: 32 },
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

      {/* [Mod] bg-card/30 -> bg-muted/30 */}
      <div className="relative w-full overflow-hidden rounded-lg bg-muted/30 border border-border">
        {/* Fade effects - [Mod] from-background */}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-20 w-[100px] bg-gradient-to-r from-background to-transparent lg:w-[200px]" aria-hidden="true"></div>
        <div className="pointer-events-none absolute inset-y-0 right-0 z-20 w-[100px] bg-gradient-to-l from-background to-transparent lg:w-[200px]" aria-hidden="true"></div>

        <Swiper
          modules={[Autoplay]}
          loop={true}
          onSwiper={(swiper) => {
            swiper.wrapperEl.style.transitionTimingFunction = 'linear';
          }}
          autoplay={{
            delay: 0,
            disableOnInteraction: false,
            pauseOnMouseEnter: false,
          }}
          speed={5000}
          breakpoints={swiperBreakpoints}
          allowTouchMove={false}
          className="!ease-linear"
          style={{ paddingTop: '5rem', paddingBottom: '3rem' }}
        >
          {[...partners, ...partners, ...partners].map((partner, idx) => (
            <SwiperSlide
              className="!w-auto flex-shrink-0"
              key={`${partner.name}-${idx}`}
            >
               {/* Card Wrapper */}
               {/* [Mod] bg-card, border-gray-800 -> border-border, hover:border-cyan-600 -> hover:border-accent */}
               <div className="flex flex-col items-center justify-between w-[240px] h-[140px] rounded bg-card border border-border px-4 py-2 transition-all duration-300 hover:translate-y-[-4px] hover:border-accent hover:shadow-xl hover:shadow-accent/15">
                  <div className='flex-1 flex items-center justify-center'>
                    <Image
                      src={partner.logo}
                      alt={partner.name}
                      width={180}
                      height={60}
                    />
                  </div>
                  <div className='flex flex-col gap-1 items-center justify-center w-full'>
                    {/* [Mod] text-cyan-400 -> text-accent */}
                    <span className="block font-bold text-accent">{partner.name}</span>
                    {/* [Mod] text-gray-300 -> text-muted-foreground */}
                    <span className="text-muted-foreground text-xs">{partner.description}</span>
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
