'use client';

import { motion, Variants } from 'framer-motion';
import Image from 'next/image';

const aiFeatures = [
  {
    tag: "AI Assistant",
    title: "현장을 이해하고 즉시 응답하는 AI 비서",
    description:
      "음성·챗 기반의 AI 어시스턴트가 작업자의 질문에 즉시 응답하고, SOP 안내·업무 지시 생성·장비 상태 조회 등 운영자의 의사결정을 보조합니다. 사람과 시스템을 연결하는 ‘지능형 인터페이스’로서, 누구나 전문 운영자처럼 현장을 이해하고 빠르게 대응할 수 있도록 지원합니다.",
    tags: ["음성 인식", "운영 지식 제공", "업무 지시 생성"],
    image: '/image/solution-ai-01.png',
    imagePosition: "right" as const,
  },
  {
    tag: "AI Automation",
    title: "AI·로봇이 스스로 판단하고 움직이는 자동화 물류",
    description:
    "AI는 재고 흐름·수요 패턴·현장 데이터를 분석해 최적 경로와 작업 우선순위를 계산하고, 로봇은 이를 바탕으로 이동·적재·정렬까지 자동 수행합니다. 운영자는 전략과 모니터링에 집중하고, 반복 작업과 현장 실행은 시스템이 알아서 처리하는 완전한 자동화 환경을 제공합니다.",
    tags: ["로봇 제어", "자동 경로 최적화", "실시간 작업 자동화"],
    image: '/image/solution-ai-02.png',
    imagePosition: "left" as const,
  },
];


const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
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
      staggerChildren: 0.2
    }
  }
};

export default function SolutionAIPlatform() {
  return (
    <section className="s-section__content overflow-hidden">
        {/* Header Section */}
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
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.8 }}
                variants={fadeInUp}
                className={`flex flex-col gap-8 items-center
                  lg:flex-row lg:gap-16
                  ${isLeft ? 'lg:flex-row-reverse' : ''}
                `}
              >
                {/* Content */}
                <div className="flex-1 order-1">
                  <motion.div variants={staggerContainer}>
                      {/* [Mod] bg-foreground-light -> bg-primary (브랜드 컬러 강조) */}
                      <motion.span variants={fadeInUp} className="inline-block rounded-sm bg-primary/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-primary mb-4 border border-primary/20">
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
                            // [Mod] hover colors: primary brand matching
                            className="rounded-sm border border-border-light bg-card-light px-3 py-1 text-sm font-medium text-muted-foreground-light transition-all duration-300 hover:border-primary hover:text-primary hover:bg-primary/5"
                          >
                            {tag}
                          </span>
                        ))}
                      </motion.div>
                  </motion.div>
                </div>

                {/* Image */}
                <motion.div
                    className="flex-1 w-full order-2"
                    variants={fadeInUp}
                >
                <div
                  // [Mod] Gray Gradient -> Cool Tone Gradient (Brand Fit)
                  className="relative overflow-hidden rounded-xl bg-gradient-to-br from-slate-50 via-blue-50/50 to-slate-100 shadow-lg aspect-[4/3] border border-border-light"
                >
                  <motion.div
                      initial={{ scale: 1.1 }}
                      whileInView={{ scale: 1 }}
                      transition={{ duration: 1.5 }}
                      className="z-10 h-full w-full"
                  >
                      <Image
                          src={feature.image}
                          alt={feature.title}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
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
