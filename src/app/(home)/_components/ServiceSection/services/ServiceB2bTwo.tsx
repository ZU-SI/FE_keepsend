interface Props {
  id: string;
  index: number;
}

export default function ServiceB2bTwo({ id, index }: Props) {
  return (
    <div className="s-section__content">
      <div className="s-section__animation">
        <div className="s-section__header">
          <div className="s-section__title-group">
            <h3 className="s-section__title">B2B 섹션 2</h3>
            <p className="s-section__subtitle">
              유연한 프로세스와 데이터 가시성 (index: {index})
            </p>
          </div>
        </div>
        <p className="s-section__description">
          주문부터 출고까지 데이터를 연결해 투명성과 효율을 제공합니다.
        </p>
      </div>
    </div>
  );
}
