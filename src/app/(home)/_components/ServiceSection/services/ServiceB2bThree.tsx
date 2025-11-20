import React, { useState } from 'react';

interface Props {
  id?: string;
  index?: number;
}

// 위치별 데이터 정의
const logisticsCards = [
  {
    id: 'card-tl',
    position: 'top-left',
    title: "실시간 가시성 & 추적",
    description: "재고·주문·운송 현황을 한눈에 파악하고 리스크 최소화",
    solutions: ['WMS', 'TMS']
  },
  {
    id: 'card-bl',
    position: 'bottom-left',
    title: "예측형 운영 최적화",
    description: "데이터 분석을 통한 수요 예측 및 공급망 운영 효율화",
    solutions: ['OMS', 'TMS']
  },
  {
    id: 'card-tr',
    position: 'top-right',
    title: "정확한 정산 관리",
    description: "거래 별 운임·비용 자동 집계 및 투명한 정산 구현",
    solutions: ['OMS', 'WMS']
  },
  {
    id: 'card-br',
    position: 'bottom-right',
    title: "유연한 인프라 확장",
    description: "성장 단계에 맞춘 거점 및 시스템 확장 구조 제공",
    solutions: ['OMS', 'WMS', 'TMS']
  },
];

export default function ServiceB2bThree({ id, index }: Props) {
  const [hovered, setHovered] = useState<{ type: 'planet' | 'card'; id: string } | null>(null);

  const handlePlanetEnter = (planetId: string) => {
    setHovered({ type: 'planet', id: planetId });
  };

  const handleCardEnter = (cardId: string) => {
    setHovered({ type: 'card', id: cardId });
  };

  const handleLeave = () => {
    setHovered(null);
  };

  const isPlanetHighlighted = (planetId: string) => {
    if (!hovered) return false;
    if (hovered.type === 'planet') return hovered.id === planetId;
    if (hovered.type === 'card') {
      const card = logisticsCards.find((c) => c.id === hovered.id);
      return card?.solutions.includes(planetId);
    }
    return false;
  };

  const isCardHighlighted = (card: typeof logisticsCards[0]) => {
    if (!hovered) return false;
    if (hovered.type === 'card') return hovered.id === card.id;
    if (hovered.type === 'planet') {
      return card.solutions.includes(hovered.id);
    }
    return false;
  };

  return (
    <section className="s-section__content" id={id}>
      <div className="s-section__header">
        <h3 className="s-section__subtitle">통합 물류 솔루션</h3>
        <h2 className="s-section__title">
          하나로 연결되는 물류 통합 운영의 혁신
        </h2>
        <p className="s-section__description">
          OMS, WMS, TMS를 통합한 원스톱 솔루션으로 복잡한 물류 과정을 단순화합니다.
        </p>
      </div>
      {/* 특장점 영역 */}

      {/* 다이어그램 영역 */}
      <div className="logistics-diagram">

        {/* 1. 중앙 허브 (Core System & Planets) */}
        <div className="diagram-core">

          {/* 중앙 메인 원 */}
          <div className="core-sun">
            <div className="sun-content">
              <span className="sun-title">통합 운영</span>
              <span className="sun-desc">단일 플랫폼</span>
            </div>
          </div>

          {/* 궤도 및 행성들 (OMS/WMS/TMS) */}
          <div className="orbit-system">
            {/* 궤도 선 (시각적) */}
            <div className="orbit-ring"></div>

            {/* 회전하는 컨테이너 */}
            <div className="planet-container">
              <div
                className={`planet-wrapper type-oms ${isPlanetHighlighted('OMS') ? 'is-highlighted' : ''}`}
                data-solutions="OMS"
                onMouseEnter={() => handlePlanetEnter('OMS')}
                onMouseLeave={handleLeave}
              >
                <div className="planet">
                  <span className="planet-icon">📦</span>
                  <span className="planet-text">OMS</span>
                </div>
              </div>
              <div
                className={`planet-wrapper type-wms ${isPlanetHighlighted('WMS') ? 'is-highlighted' : ''}`}
                data-solutions="WMS"
                onMouseEnter={() => handlePlanetEnter('WMS')}
                onMouseLeave={handleLeave}
              >
                <div className="planet">
                  <span className="planet-icon">🏭</span>
                  <span className="planet-text">WMS</span>
                </div>
              </div>
              <div
                className={`planet-wrapper type-tms ${isPlanetHighlighted('TMS') ? 'is-highlighted' : ''}`}
                data-solutions="TMS"
                onMouseEnter={() => handlePlanetEnter('TMS')}
                onMouseLeave={handleLeave}
              >
                <div className="planet">
                  <span className="planet-icon">🚚</span>
                  <span className="planet-text">TMS</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 2. 위성 카드들 (Satellites) */}
        <div className="diagram-satellites">
          {logisticsCards.map((card) => (
            <div
              key={card.id}
              className={`logistics-card position-${card.position} ${isCardHighlighted(card) ? 'is-highlighted' : ''}`}
              onMouseEnter={() => handleCardEnter(card.id)}
              onMouseLeave={handleLeave}
            >
              {/* 연결선 */}
              <div className="connection-line"></div>

              <div className="logistics-card__content">
                <div className="logistics-card__icon-placeholder">
                  <span>IMG</span>
                </div>
                <h4 className="logistics-card__title">{card.title}</h4>
                <p className="logistics-card__description">{card.description}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}