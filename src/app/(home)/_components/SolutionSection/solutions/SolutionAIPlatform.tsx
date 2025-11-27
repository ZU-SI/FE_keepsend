'use client'; // Framer Motion은 클라이언트 컴포넌트에서 동작합니다.

import { motion, Variants } from 'framer-motion';

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

// Animation Variants 정의
const fadeInUp = {
  hidden: { opacity: 0, y: 30 }, // 아래에서 시작 (위에서 떨어지게 하려면 y: -30)
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
} as Variants;

const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2 // 자식 요소들이 0.2초 간격으로 순차 실행
    }
  }
};

export default function SolutionAIPlatform() {
  return (
    <section className="s-section__content overflow-hidden">
        {/* Header Section: 순차적 등장 (Stagger) */}
        <motion.div
            className="s-section__header"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
        >
            <motion.h3 variants={fadeInUp} className="s-section__subtitle">
                AI 물류의 시대
            </motion.h3>
            <motion.h2 variants={fadeInUp} className="s-section__title">
              스마트 오퍼레이션의 시작, AI와 함께!
            </motion.h2>
            <motion.p variants={fadeInUp} className="s-section__description">
              AI 기반 채팅 어시스턴트와 재고관리 로봇이 결합된 지능형 물류 자동화 서비스를 준비 중입니다.
            </motion.p>
        </motion.div>

        <div className="flex flex-col gap-32">
          {aiFeatures.map((feature, idx) => {
            const isLeft = feature.imagePosition === "left";

            return (
              <motion.div
                key={idx}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }} // 요소의 30%가 보일 때 실행
                transition={{ duration: 0.8 }}
                variants={fadeInUp} // 전체 Row가 부드럽게 등장
                className={`flex flex-col gap-8 items-center
                  lg:flex-row lg:gap-16
                  ${isLeft ? 'lg:flex-row-reverse' : ''}
                `}
              >
                {/* ai-feature__content */}
                <div className="flex-1 order-1">
                  <motion.div variants={staggerContainer}> {/* 내부 컨텐츠도 순차 등장 */}
                      <motion.span variants={fadeInUp} className="inline-block rounded-sm bg-foreground-light px-3 py-1 text-xs font-semibold uppercase tracking-wider text-background-light mb-4">
                        {feature.tag}
                      </motion.span>

                      <motion.h3 variants={fadeInUp} className="font-bold text-foreground-light text-2xl leading-tight mb-3 lg:text-3xl">
                        {feature.title}
                      </motion.h3>

                      <motion.p variants={fadeInUp} className="text-[0.9375rem] leading-relaxed text-muted-foreground-light mb-6">
                        {feature.description}
                      </motion.p>

                      <motion.div variants={fadeInUp} className="flex flex-wrap gap-2">
                        {feature.tags.map((tag, tagIdx) => (
                          <span
                            key={tagIdx}
                            className="rounded-sm border border-border-light bg-background-light px-3 py-1 text-sm font-medium text-foreground-light transition-all duration-300 hover:bg-foreground-light hover:text-background-light"
                          >
                            {tag}
                          </span>
                        ))}
                      </motion.div>
                  </motion.div>
                </div>

                {/* ai-feature__image */}
                <motion.div
                    className="flex-1 w-full order-2"
                    variants={fadeInUp} // 이미지도 부드럽게 등장
                >
                  <div
                    className="relative flex w-full items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br from-gray-200 via-gray-300 to-gray-200 text-xl font-semibold text-gray-600 aspect-[4/3] shadow-lg"
                  >
                    <div
                        className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-accent/20"
                        aria-hidden="true"
                    />
                    <div
                        className="absolute top-[-50%] left-[-50%] w-[200%] h-[200%] bg-gradient-to-br from-transparent via-white/10 to-transparent animate-spin-slow"
                        aria-hidden="true"
                    />
                    {/* 이미지 로드 시 스케일 효과 추가 (선택 사항) */}
                    <motion.div
                        initial={{ scale: 1.1 }}
                        whileInView={{ scale: 1 }}
                        transition={{ duration: 1.5 }}
                        className="z-10"
                    >
                        AI 이미지 {idx + 1}
                    </motion.div>
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
        </div>
    </section>
  );
}
