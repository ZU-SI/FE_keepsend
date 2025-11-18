interface Props {
  id: string;
  index: number;
}

const consultingServices = [
  {
    icon: "📊",
    title: "데이터 기반의 인사이트 설계",
    description: "실시간 물류 데이터와 운영 지표를 분석하여 비효율 구간과 개선 우선순위를 명확히 도출합니다.",
    tags: ["데이터 분석", "성과 측정"],
  },
  {
    icon: "📈",
    title: "운영 프로세스 단순화 및 구조 재정립",
    description: "현장의 동선, 작업 단위, 배차 체계를 전면 진단해 중복 업무와 병목 구간을 제거합니다.",
    tags: ["프로세스 혁신", "효율화"],
  },
  {
    icon: "🤖",
    title: "자동화 전환을 위한 단계별 로드맵 수립",
    description: "AI 어시스턴트, 재고관리 로봇, WMS 등 기술 인프라를 단계적으로 적용하는 자동화 전략을 제안합니다.",
    tags: ["자동화", "디지털 전환"],
  },
  {
    icon: "💰",
    title: "비용·성과 연동형 개선 전략 제안",
    description: "개선 결과를 정량화하여 성과 기반 컨설팅 체계로 운영합니다. 운영비 절감, 생산성 향상을 실현합니다.",
    tags: ["ROI 최적화", "비용 절감"],
  },
];

export default function ServiceConsulting({ id, index }: Props) {
  return (
    <div className="s-section__content">
        <div className="s-section__header">
            <h3 className="s-section__subtitle">하이퍼(Hyper) 물류 컨설팅</h3>
            <h2 className="s-section__title">
              비즈니스 확장의 시작, 최적화된 물류 전략으로 완성
            </h2>
            <p className="s-section__description">
              운영 효율을 극대화하고, 데이터 분석과 현장 진단을 기반으로,
              <br />
              비용 절감·운영 최적화·확장성 강화를 실현합니다.
            </p>
        </div>
        <div className="cs-cards">
          {consultingServices.map((service, idx) => (
            <div key={idx} className="cs-card">
              <div className="cs-card__icon">{service.icon}</div>
              <h4 className="cs-card__title">{service.title}</h4>
              <p className="cs-card__description">{service.description}</p>
              <div className="cs-card__tags">
                {service.tags.map((tag, tagIdx) => (
                  <span key={tagIdx} className="cs-card__tag">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
    </div>
  );
}
