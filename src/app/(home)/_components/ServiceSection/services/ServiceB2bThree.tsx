interface Props {
  id: string;
  index: number;
}

export default function ServiceB2bThree({ id, index }: Props) {
  return (
    <div className="s-section__content">
      <div className="s-section__animation">
        <div className="s-section__header">
          <div className="s-section__title-group">
            <h3 className="s-section__title">B2B 섹션 3</h3>
            <p className="s-section__subtitle">
              자동화된 의사결정과 추적 (index: {index})
            </p>
          </div>
        </div>
        <p className="s-section__description">
          AI 기반 자동화와 실시간 추적으로 운영 효율을 극대화합니다.
        </p>
      </div>
    </div>
  );
}
