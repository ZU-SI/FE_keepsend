
interface Props {
  id: string;
  index: number;
}

export default function SolutionIntro({ id, index }: Props) {
  return (
    <>
      <div className="video">
        <img src="/video/solution-logistics.gif" alt="솔루션" />
      </div>
      <div className="s-section__content">
        <div className="s-section__animation">
          <h3 className="s-section__title">
            입고, 출고, 재고, 운송을 실시간으로 연결하는
            <br />
            AI 기반 IT 솔루션으로 기업 물류를 스마트하게 관리합니다.
          </h3>
        </div>
      </div>
    </>
  );
}
