interface Props {
  id: string;
  index: number;
}

export default function SolutionIntro({ id, index }: Props) {
  return (
    <div className="s-section__content">
      <div className="s-section__animation">
        <div className="s-section__header">
          <div className="s-section__title-group">
            <h3 className="s-section__title">IT 솔루션 소개</h3>
            <p className="s-section__subtitle">IT Solutions (index: {index})</p>
          </div>
        </div>
        <p className="s-section__description">
          KEEPSEND의 혁신적인 IT 솔루션으로 물류 산업의 디지털 혁신을
          시작하세요.
        </p>
      </div>
    </div>
  );
}
