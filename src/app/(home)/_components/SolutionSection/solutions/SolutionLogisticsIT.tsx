interface Props {
  id: string;
  index: number;
}

const logisticsCards = [
  {
    title: "전 과정의 통합 관리",
    description: "자체 개발 OMS·WMS·TMS 간의 데이터 연동으로 실시간 통합 제어",
  },
  {
    title: "실시간 가시성 확보",
    description: "재고, 주문, 운송 현황을 실시간 모니터링 및 빠른 대응",
  },
  {
    title: "운영 효율성과 확장성 강화",
    description: "업무 자동화로 인력 리소스 최소화 및 유연한 확장, 개방형 구조",
  },
];

export default function SolutionLogisticsIT({ id, index }: Props) {
  return (
    <div className="s-section__content">
        <div className="s-section__header">
            <h3 className="s-section__subtitle">통합 물류 솔루션</h3>
            <h2 className="s-section__title">
              하나로 연결되는 물류 통합 운영의 혁신
            </h2>
            <p className="s-section__description">
              OMS, WMS, TMS를 통합한 원스톱 물류 솔루션으로 물류 전 과정을 민첩하게 유기적으로 관리합니다.
            </p>
        </div>

        {/* logistics-cards: grid mobile, 3-column grid desktop */}
        <div className="grid gap-1 lg:grid-cols-3 lg:gap-8">
          {logisticsCards.map((card, idx) => (
            // logistics-card: flex row mobile, flex col desktop
            <div
              key={idx}
              className="group flex items-center overflow-hidden rounded-xl border border-border-light bg-card-light transition-all duration-300 hover:shadow-lg hover:border-primary/50 lg:flex-col"
            >

              {/* logistics-card__image: circle mobile, full-width placeholder desktop */}
              <div className="relative mx-3 my-2 flex h-[90px] min-w-[80px] w-[90px] items-center justify-center rounded-full bg-gray-100 lg:mx-auto lg:my-0 lg:mt-6 lg:mb-4 lg:aspect-square lg:h-auto lg:max-w-[160px] lg:w-full">

                {/* logistics-card__image::before: inner gradient circle */}
                <div
                    className="h-[80%] w-[80%] rounded-full bg-gradient-to-br from-gray-200 to-gray-300"
                    aria-hidden="true"
                />
              </div>

              {/* logistics-card__content: padding and alignment */}
              <div className="flex-1 p-4 lg:px-6 lg:pb-6 lg:pt-0 lg:text-center">

                {/* logistics-card__title: font size change on desktop */}
                <h4 className="mb-1 font-semibold text-foreground-light text-base lg:text-lg">
                  {card.title}
                </h4>

                {/* logistics-card__description: font size and line height */}
                <p className="text-sm leading-relaxed text-muted-foreground-light break-keep">
                  {card.description}
                </p>
              </div>
            </div>
          ))}
        </div>
    </div>
  );
}
