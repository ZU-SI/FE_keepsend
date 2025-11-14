interface Props {
  id: string;
  index: number;
}

export default function ServiceIntro({ id, index }: Props) {
  return (
    <>
      <div className="video">
        <img src="/video/solution-logistics.gif" alt="솔루션" />
      </div>
      <div className="s-section__content">
        <div className="s-section__animation">
          <h3 className="s-section__title">
            입고부터 회수까지 모든 경로를 설계하고
                        <br />
            물류를 넘어, 고객의 경험까지 책임지는 B2B 전문 물류 서비스
          </h3>
        </div>
      </div>
    </>
  );
}
