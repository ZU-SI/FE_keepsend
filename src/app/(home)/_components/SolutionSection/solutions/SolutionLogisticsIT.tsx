interface Props {
  id: string;
  index: number;
}

export default function SolutionLogisticsIT({ id, index }: Props) {
  return (
    <div className="s-section__content">
      <div className="s-section__animation">
        <div className="s-section__header">
          <div className="s-section__title-group">
            <h3 className="s-section__title">물류 IT</h3>
            <p className="s-section__subtitle">Logistics IT (index: {index})</p>
          </div>
        </div>
        <p className="s-section__description">
          통합 물류 관리 시스템: 실시간 추적, 자동화된 프로세스, 데이터 기반
          의사결정.
        </p>
      </div>
    </div>
  );
}
