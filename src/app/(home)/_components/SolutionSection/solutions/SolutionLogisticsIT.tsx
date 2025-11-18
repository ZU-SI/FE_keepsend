interface Props {
  id: string;
  index: number;
}

const logisticsCards = [
  {
    title: "전 과정의 통합 관리",
    description: "자체 개발 OMS·WMS·TMS 간의 데이터 연동으로 실시간 통합 제어",
  },
  {
    title: "실시간 가시성 확보",
    description: "재고, 주문, 운송 현황을 실시간 모니터링 및 빠른 대응",
  },
  {
    title: "운영 효율성과 확장성 강화",
    description: "업무 자동화로 인력 리소스 최소화 및 유연한 확장, 개방형 구조",
  },
];

export default function SolutionLogisticsIT({ id, index }: Props) {
  return (
    <div className="s-section__content">
        <div className="s-section__header">
            <h3 className="s-section__subtitle">통합 물류 솔루션</h3>
            <h2 className="s-section__title">
              하나로 연결되는 물류 통합 운영의 혁신
            </h2>
            <p className="s-section__description">
              OMS, WMS, TMS를 통합한 원스톱 물류 솔루션으로 물류 전 과정을 민첩하게 유기적으로 관리합니다.
            </p>
        </div>
        <div className="logistics-cards">
          {logisticsCards.map((card, idx) => (
            <div key={idx} className="logistics-card">
              <div className="logistics-card__image">
                {/* 이미지 placeholder */}
              </div>
              <div className="logistics-card__content">
                <h4 className="logistics-card__title">{card.title}</h4>
                <p className="logistics-card__description">{card.description}</p>
              </div>
            </div>
          ))}
        </div>
    </div>
  );
}
