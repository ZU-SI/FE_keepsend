import Image from 'next/image';
import React from 'react';

interface Props {
  id: string;
  index: number;
}

interface StatItem {
  label: string;
  value: string;
  unit: string;
}

interface Partner {
  name: string;
  logo: string;
}

const ServicePartner: React.FC<Props> = ({ id, index }) => {
  const stats: StatItem[] = [
    { label: '물류 센터', value: '0,000', unit: '개' },
    { label: '운송 기사', value: '0,000', unit: '명' },
    { label: '운송 차량', value: '0,000', unit: '대' },
    { label: '운용 장비', value: '0,000', unit: '대' }
  ];

  const partners: Partner[] = [
    { name: '쿠팡', logo: '/images/coupang-logo.png' },
    { name: '롯데글로벌로지스틱스', logo: '/images/lotte-logo.png' },
    { name: 'CJ대한통운', logo: '/images/cj-logo.png' },
    { name: '한진', logo: '/images/hanjin-logo.png' },
    { name: 'GS리테일', logo: '/images/gs-logo.png' },
    { name: '네이버', logo: '/images/naver-logo.png' }
  ];

  // 무한 스크롤을 위해 파트너 목록 2배 복제
  const duplicatedPartners = [...partners, ...partners];

  return (
      <div className="s-section__content justify-between">
        <div className="flex flex-col gap-1 lg:gap-16">
          <div className="s-section__header">
              <h2 className="s-section__title">
                효율적인 인력 배치와 차량 운용으로 신속하고 정밀한 물류 서비스를 제공합니다.
              </h2>
          </div>

          {/* service-partner__stats: grid 2-col mobile, 4-col desktop */}
          <div className="grid grid-cols-2 gap-x-4 gap-y-6 lg:grid-cols-4 lg:gap-4">
            {stats.map((stat, idx) => (
              <div className="flex flex-col items-center text-center" key={idx}>

                {/* service-partner__stat-icon */}
                <div className="mb-1 flex h-[30px] w-[30px] items-center justify-center rounded-full bg-gradient-to-br from-cyan-400 to-cyan-600 text-2xl text-white shadow-lg shadow-primary/25 lg:mb-2 lg:h-[70px] lg:w-[70px]">
                  {/* icon placeholder: Assuming `icon` is replaced by actual icon component later */}
                  <span className="text-sm lg:text-3xl">⚙️</span>
                </div>

                {/* service-partner__stat-label */}
                <span className="mb-px text-sm font-medium text-cyan-400 lg:mb-1">
                  {stat.label}
                </span>

                {/* service-partner__stat-value */}
                <div className="text-xl font-bold leading-none text-white lg:text-4xl">
                  {stat.value}
                  {/* service-partner__stat-unit */}
                  <span className="ml-px text-base opacity-80 lg:text-lg">{stat.unit}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* service-partner__content */}
        <div className="flex w-full flex-col gap-0 lg:gap-16">
          <div className="s-section__header">
              <h3 className="s-section__subtitle">주요 고객사</h3>
              <h2 className="s-section__title">
                B2B 시장을 잇는 파트너십
              </h2>
              <p className="s-section__description">
                신뢰와 결과로 이어진 협력의 기록! 비즈니스 이상의 관계를 이어갑니다.
              </p>
          </div>

          {/* service-partner__showcase: Infinite Scroll Container */}
          <div className="relative w-full overflow-hidden rounded-lg bg-card/30 py-8 lg:py-12">

            {/* Fade effect ::before & ::after */}
            <div className="pointer-events-none absolute inset-y-0 left-0 z-20 w-[100px] bg-gradient-to-r from-background to-transparent lg:w-[200px]" aria-hidden="true"></div>
            <div className="pointer-events-none absolute inset-y-0 right-0 z-20 w-[100px] bg-gradient-to-l from-background to-transparent lg:w-[200px]" aria-hidden="true"></div>

            {/* service-partner__showcase-track: Animation */}
            <div
              // Custom animation classes assumed: `animate-scroll` (30s) and `lg:animate-scroll-lg` (40s)
              className="flex w-max gap-8 animate-[scroll_30s_linear_infinite] hover:animate-pause lg:gap-16 lg:animate-[scroll_40s_linear_infinite]"
              // Note: For standard Tailwind, you would need to configure the `scroll` keyframes in `tailwind.config.js`
            >
              {duplicatedPartners.map((partner, idx) => (
                // service-partner__showcase-item
                <div
                  className="flex min-w-[200px] flex-shrink-0 items-center justify-center rounded bg-card border border-gray-800 p-4 transition-all duration-300 hover:translate-y-[-4px] hover:border-cyan-600 hover:shadow-xl hover:shadow-cyan-500/15 lg:min-w-[250px] lg:p-6"
                  key={`${partner.name}-${idx}`}
                >
                  <Image
                    src={partner.logo}
                    alt={partner.name}
                    width={180}
                    height={60}
                    // service-partner__showcase-logo
                    className="h-auto w-[140px] object-contain opacity-70 grayscale transition-all duration-300 hover:opacity-100 hover:grayscale-0 lg:w-[180px]"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
  );
};

export default ServicePartner;
