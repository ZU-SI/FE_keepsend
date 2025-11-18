interface Props {
  id: string;
  index: number;
}

const aiFeatures = [
  {
    tag: "AI Assistant",
    title: "AI 비서와 함께 움직이는 스마트 물류",
    description: "음성·채팅 기반의 AI 어시스턴트가 현장 운영자의 질문에 즉시 응답하고, 업무 지시부터 일정 관리, 데이터 분석까지 비서처럼 지원합니다. 동시에 재고관리 로봇이 창고 내 이동과 적재를 자동으로 수행하여, 사람은 판단에 집중하고 시스템은 실행을 담당하는 지능형 물류 환경을 완성합니다.",
    tags: ["음성 인식", "데이터 분석", "실시간 응답"],
    imagePosition: "right" as const,
  },
  {
    tag: "AI Automation",
    title: "AI와 로봇이 만드는 새로운 물류 현장",
    description: "지능형 어시스턴트는 현장 이슈를 실시간으로 파악하고, 로봇은 데이터를 기반으로 재고를 정확하게 이동·배치합니다. AI와 자동화 기술이 결합된 차세대 물류 혁신 서비스, 사람은 전략에 집중하고, 시스템이 나머지를 해결합니다.",
    tags: ["자동화", "로봇 관리", "실시간 모니터링"],
    imagePosition: "left" as const,
  },
];

export default function SolutionAIPlatform({ id, index }: Props) {
  return (
    <div className="s-section__content">
        <div className="s-section__header">
            <h3 className="s-section__subtitle">AI 물류의 시대</h3>
            <h2 className="s-section__title">
              스마트 오퍼레이션의 시작, AI와 함께!
            </h2>
            <p className="s-section__description">
              AI 기반 채팅 어시스턴트와 재고관리 로봇이 결합된 지능형 물류 자동화 서비스를 준비 중입니다.
            </p>
        </div>
        <div className="ai-features">
          {aiFeatures.map((feature, idx) => (
            <div
              key={idx}
              className={`ai-feature ai-feature--${feature.imagePosition}`}
            >
              <div className="ai-feature__content">
                <span className="ai-feature__tag">{feature.tag}</span>
                <h3 className="ai-feature__title">{feature.title}</h3>
                <p className="ai-feature__description">{feature.description}</p>
                <div className="ai-feature__tags">
                  {feature.tags.map((tag, tagIdx) => (
                    <span key={tagIdx} className="ai-feature__tag-item">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <div className="ai-feature__image">
                <div className="ai-feature__image-placeholder">
                  {/* 이미지 placeholder */}
                  AI 이미지 {idx + 1}
                </div>
              </div>
            </div>
          ))}
        </div>
    </div>
  );
}
