interface Props {
  id: string;
  index: number;
}

export default function ServiceIntro({ id, index }: Props) {
  return (
    <div className="s-section__content">
      <div className="s-section__animation">
        <div className="s-section__header">
          <div className="s-section__title-group">
            <h3 className="s-section__title">서비스 인트로</h3>
            <p className="s-section__subtitle">소개 및 개요 (index: {index})</p>
          </div>
        </div>
        <p className="s-section__description">
          여기에는 서비스 전체에 대한 요약과 핵심 메시지가 들어갑니다.
        </p>
      </div>
    </div>
  );
}
