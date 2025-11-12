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

const ServicePartner: React.FC<Props> = ({ id, index }) => {
  const stats: StatItem[] = [
    { label: '물류 센터', value: '0,000', unit: '개' },
    { label: '운송 기사', value: '0,000', unit: '명' },
    { label: '운송 차량', value: '0,000', unit: '대' },
    { label: '운용 장비', value: '0,000', unit: '대' }
  ];

  const partners = [
    {
      name: '쿠팡',
      logo: '/images/coupang-logo.png',
      description: '신뢰와 혁신의 이커머스 기업'
    },
    {
      name: '롯데글로벌로지스틱스',
      logo: '/images/lotte-logo.png',
      description: '글로벌 물류 네트워크'
    }
  ];

  return (
      <div className="service-partner__container">
        <div className="service-partner__intro">
          <h2 className="service-partner__headline">효율적인 인력 배치와 차량 운용으로 신속하고 정밀한 물류 서비스를 제공합니다.</h2>
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
          <div className="service-partner__header">
            <span className="service-partner__subtitle">주요 고객사</span>
            <h3 className="service-partner__title">B2B 시장을 잇는 파트너십</h3>
            <p className="service-partner__description">산업과 플랫폼을 이어주는 기업! 비즈니스의 성장을 이끕니다.</p>
          </div>

          <div className="service-partner__showcase">
            <div className="service-partner__partner-column">
              <div className="service-partner__partner-card">
                <div className="service-partner__partner-logo">
                  <Image
                    src={partners[0].logo}
                    alt={partners[0].name}
                    width={180}
                    height={50}
                    layout="responsive"
                  />
                </div>
                <p className="service-partner__partner-desc">{partners[0].description}</p>
              </div>
            </div>

            <div className="service-partner__main-image">
              <div className="service-partner__experience-badge">
                <span>10+ Years of Experience</span>
              </div>
              <Image
                src="/images/business-meeting.jpg"
                alt="Business partners in meeting"
                width={800}
                height={300}
                layout="responsive"
              />
              <div className="service-partner__growth-badge">
                <h4>Growth-Driven</h4>
                <p>KPI-focused for real growth.</p>
              </div>
            </div>

            <div className="service-partner__partner-column">
              <div className="service-partner__partner-card">
                <div className="service-partner__partner-logo">
                  <Image
                    src={partners[1].logo}
                    alt={partners[1].name}
                    width={180}
                    height={50}
                    layout="responsive"
                  />
                </div>
                <p className="service-partner__partner-desc">{partners[1].description}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
};

export default ServicePartner;
