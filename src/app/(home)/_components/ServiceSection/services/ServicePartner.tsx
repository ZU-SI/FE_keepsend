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
      <div className="s-section__content">
        <div className="service-partner__intro">
          <div className="s-section__header">
              <h2 className="s-section__title">
                효율적인 인력 배치와 차량 운용으로 신속하고 정밀한 물류 서비스를 제공합니다.
              </h2>
          </div>
          <div className="service-partner__stats">
            {stats.map((stat, idx) => (
              <div className="service-partner__stat-item" key={idx}>
                <div className="service-partner__stat-icon">
                  <span>icon</span>
                </div>
                <span className="service-partner__stat-label">{stat.label}</span>
                <div className="service-partner__stat-value">
                  {stat.value}<span className="service-partner__stat-unit">{stat.unit}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="service-partner__content">
          <div className="s-section__header">
              <h3 className="s-section__subtitle">주요 고객사</h3>
              <h2 className="s-section__title">
                B2B 시장을 잇는 파트너십
              </h2>
              <p className="s-section__description">
                신뢰와 결과로 이어진 협력의 기록! 비즈니스 이상의 관계를 이어갑니다.
              </p>
          </div>
          <div className="service-partner__showcase">
            <div className="service-partner__showcase-track">
              {duplicatedPartners.map((partner, idx) => (
                <div className="service-partner__showcase-item" key={`${partner.name}-${idx}`}>
                  <Image
                    src={partner.logo}
                    alt={partner.name}
                    width={180}
                    height={60}
                    className="service-partner__showcase-logo"
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
