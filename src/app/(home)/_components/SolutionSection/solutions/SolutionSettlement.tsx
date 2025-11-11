interface Props {
  id: string;
  index: number;
}

export default function SolutionSettlement({ id, index }: Props) {
  return (
    <div className="s-section__content">
      <div className="s-section__animation">
        <div className="s-section__header">
          <div className="s-section__title-group">
            <h3 className="s-section__title">정산 시스템</h3>
            <p className="s-section__subtitle">
              Settlement System (index: {index})
            </p>
          </div>
        </div>
        <p className="s-section__description">
          투명하고 정확한 자동 정산 시스템: 실시간 수익 분석과 자동화된 보고.
        </p>
      </div>
    </div>
  );
}
