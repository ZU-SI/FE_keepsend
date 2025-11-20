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

// Shimmer 애니메이션을 위한 키프레임 정의 (CSS에 별도 포함 필요)
// Tailwind에서 직접 keyframes 정의를 사용하지 않으므로, SCSS의 @keyframes shimmer는 임시로 생략하거나
// Global CSS에 정의된 것으로 가정합니다. 여기서는 CSS 클래스만 적용합니다.

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

        {/* ai-features -> flex flex-col gap-[8rem] (v.$spacing-2xl * 2 = v.$spacing-8xl) */}
        <div className="flex flex-col gap-32">
          {aiFeatures.map((feature, idx) => {
            const isLeft = feature.imagePosition === "left";
            return (
              // ai-feature
              // ai-feature--left 로직: 모바일은 모두 column, 데스크탑에서만 row-reverse 적용
              <div
                key={idx}
                className={`flex flex-col gap-8 items-center
                  lg:flex-row lg:gap-16
                  ${isLeft ? 'lg:flex-row-reverse' : ''}
                `}
              >
                {/* ai-feature__content (flex: 1, order: 1) */}
                <div className="flex-1 order-1">

                  {/* ai-feature__tag */}
                  <span className="inline-block rounded-sm bg-foreground-light px-3 py-1 text-xs font-semibold uppercase tracking-wider text-background-light mb-4">
                    {feature.tag}
                  </span>

                  {/* ai-feature__title */}
                  <h3 className="font-bold text-foreground-light text-2xl leading-tight mb-3 lg:text-3xl">
                    {feature.title}
                  </h3>

                  {/* ai-feature__description */}
                  <p className="text-[0.9375rem] leading-relaxed text-muted-foreground-light mb-6">
                    {feature.description}
                  </p>

                  {/* ai-feature__tags */}
                  <div className="flex flex-wrap gap-2">
                    {feature.tags.map((tag, tagIdx) => (
                      // ai-feature__tag-item
                      <span
                        key={tagIdx}
                        className="rounded-sm border border-border-light bg-background-light px-3 py-1 text-sm font-medium text-foreground-light transition-all duration-300 hover:bg-foreground-light hover:text-background-light"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* ai-feature__image (flex: 1, width: 100%, order: 2) */}
                <div className="flex-1 w-full order-2">
                  {/* ai-feature__image-placeholder */}
                  <div
                    className="relative flex w-full items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br from-gray-200 via-gray-300 to-gray-200 text-xl font-semibold text-gray-600 aspect-[4/3]"
                    // Note: SCSS의 ::before와 ::after를 직접 Tailwind에서 구현하기 어려우므로,
                    // 복잡한 효과는 Global CSS에 정의된 유틸리티 클래스(예: .ai-shimmer)를 사용하거나
                    // 간단한 Placeholder 효과만 남기는 것이 일반적입니다. 여기서는 Placeholder 기본 스타일만 유지합니다.
                  >
                    <div
                        className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-accent/20"
                        aria-hidden="true"
                    />
                    <div
                        className="absolute top-[-50%] left-[-50%] w-[200%] h-[200%] bg-gradient-to-br from-transparent via-white/10 to-transparent animate-spin-slow"
                        // animate-spin-slow는 임의의 Tailwind 애니메이션 확장 클래스를 가정한 것입니다.
                        aria-hidden="true"
                    />
                    AI 이미지 {idx + 1}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
    </div>
  );
}
