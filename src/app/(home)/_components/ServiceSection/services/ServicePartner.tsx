interface Props {
  id: string;
  index: number;
}

export default function ServicePartner({ id, index }: Props) {
  return (
    <div className="s-section__content">
      <div className="s-section__animation">
        <div className="s-section__header">
          <div className="s-section__title-group">
            <h3 className="s-section__title">파트너</h3>
            <p className="s-section__subtitle">
              파트너십과 공동 성장 (index: {index})
            </p>
          </div>
        </div>
        <p className="s-section__description">
          KEEPSEND와 함께 성장하는 파트너 네트워크를 소개합니다.
        </p>
      </div>
    </div>
  );
}
