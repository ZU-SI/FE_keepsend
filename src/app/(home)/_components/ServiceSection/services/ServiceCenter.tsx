interface Props {
  id: string;
  index: number;
}

export default function ServiceCenter({ id, index }: Props) {
  return (
    <div className="s-section__content">
      <div className="s-section__animation">
        <div className="s-section__header">
          <div className="s-section__title-group">
            <h3 className="s-section__title">물류센터</h3>
            <p className="s-section__subtitle">
              실시간 모니터링과 최적화 (index: {index})
            </p>
          </div>
        </div>
        <p className="s-section__description">
          첨단 물류센터 운영과 지능형 관리 기능을 제공합니다.
        </p>
      </div>
    </div>
  );
}
