interface Props {
  id: string;
  index: number;
}

export default function ServiceProcess({ id, index }: Props) {
  return (
    <div className="s-section__content">
      <div className="s-section__animation">
        <div className="s-section__header">
          <div className="s-section__title-group">
            <h3 className="s-section__title">프로세스</h3>
            <p className="s-section__subtitle">
              자동화와 최적화 (index: {index})
            </p>
          </div>
        </div>
        <p className="s-section__description">
          자동화된 프로세스를 통해 운영 전반의 효율성을 높입니다.
        </p>
      </div>
    </div>
  );
}
