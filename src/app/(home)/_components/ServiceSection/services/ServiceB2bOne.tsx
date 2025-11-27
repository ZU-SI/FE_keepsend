'use client';

import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion';
import { useRef, useState } from 'react';

// --- Interfaces & Data ---
interface Problem {
  title: string;
  description: string;
  keyword: string; // 인포그래픽용 짧은 키워드
  relatedTalks: string[];
}

const problemsData: Problem[] = [
  {
    title: "통합 관리 시스템",
    keyword: "관리 포인트 고충",
    description: "복잡한 구조와 낮은 효율을 한 번에 해결하는 원스톱 솔루션",
    relatedTalks: ["사업은 커지는데 시스템이 못 따라가요", "거래처마다 요청방식이 달라 맞추기 힘들어요"]
  },
  {
    title: "유연한 인프라 확장",
    keyword: "확장의 한계",
    description: "성장에 맞춰 즉시 확장 가능한 물류 인프라 제공",
    relatedTalks: ["창고 늘릴 때마다 교육하기 벅차요", "수요 예측이 안돼서 재고만 쌓여요", "확장보다 유지가 버거워요"]
  },
  {
    title: "투명한 정산 데이터",
    keyword: "미검증 운임&정산",
    description: "검증된 운임과 투명한 정산 프로세스 확립",
    relatedTalks: ["운임이 이게 맞나요?", "엑셀로 정산하다가 오류나면 끝장이에요"]
  },
  {
    title: "실시간 보안&추적",
    keyword: "취약한 추적, 보안",
    description: "화물 위치 실시간 추적 및 철저한 보안 모니터링",
    relatedTalks: ["고객이 물건 어디있냐고 할 때마다 식은땀나요", "상품 분실 걱정 없이 자고 싶어요"]
  }
];


/** * 말풍선 컴포넌트 */
function ChatBubble({ text, positionIdx }: { text: string; positionIdx: number }) {
  const positions = [
    { top: '15%', left: '20%' },
    { bottom: '10%', right: '10%' }, // 약간 아래
    { bottom: '20%', left: '10%' }, // 우측 상단
  ];

  const pos = positions[positionIdx % positions.length];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5, y: 10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.8, transition: { duration: 0.2 } }}
      transition={{ type: "spring", stiffness: 300, damping: 20, delay: positionIdx * 0.1 }}
      className="absolute z-20 max-w-[160px] md:max-w-[200px] rounded-lg"
      style={{...pos}}
    >
      <div className="relative bg-white border border-slate-200 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.1)] rounded-2xl rounded-tl-sm px-4 py-3">
        <p className="text-xs md:text-sm text-slate-600 font-medium leading-snug break-keep">
          "{text}"
        </p>
        <div className="absolute -top-[1px] -left-[1px] w-4 h-4 bg-white border-t border-l border-slate-200 transform -rotate-45 origin-top-left"></div>
      </div>
    </motion.div>
  );
}

/**
 * 솔루션 카드 (Cell)
 * - [수정 1] 태블릿(md)에서는 호버 효과 제거 (CSS Group Hover 및 lg: prefix 사용)
 * - [수정 2] 태블릿(md) 레이아웃 최적화 (Padding, Font Size 축소)
 */
function SolutionCell({
  problem,
  index,
  activeState // 'idle' | 'talking' | 'solved'
}: {
  problem: Problem;
  index: number;
  activeState: 'idle' | 'talking' | 'solved';
}) {

  // 말풍선 노출 조건: talking 상태이거나, solved 상태(배경에 깔아둠, 데스크탑 호버시 노출됨)
  const showBubbles = activeState === 'talking' || activeState === 'solved';

  return (
    <div className="relative w-full h-full md:aspect-[16/10] md:max-h-[calc(30vh_-_20px)]">

      {/* 1. Placeholder (Always Visible Background) */}
      {
        activeState !== 'solved' &&
        <div className="absolute inset-0 border-2 border-dashed border-slate-200 rounded-xl bg-slate-50/50 flex flex-col justify-between p-5 md:p-6 lg:p-8">
        <div className="flex justify-between items-start">
           <span className="font-mono text-2xl md:text-3xl font-bold text-slate-200">0{index + 1}</span>
           <div className="w-2 h-2 bg-slate-200 rounded-full"></div>
        </div>
      </div>
      }

      {/* 2. Chat Bubbles Layer */}
      <AnimatePresence>
        {showBubbles && (
          <div className="absolute inset-0 z-10 overflow-hidden pointer-events-none">
             {problem.relatedTalks.map((talk, i) => (
               <ChatBubble key={i} text={talk} positionIdx={i} />
             ))}
          </div>
        )}
      </AnimatePresence>

      {/* 3. Solution Card (Solved State - Mask Reveal) */}
      <motion.div
        initial={{ clipPath: "inset(100% 0% 0% 0%)" }}
        animate={{
          clipPath: activeState === 'solved' ? "inset(0% 0% 0% 0%)" : "inset(100% 0% 0% 0%)",
        }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        // [수정 핵심]
        // 1. opacity-100: 기본 불투명
        // 2. lg:hover:opacity-5: 데스크탑(lg)에서만 호버 시 투명해짐 (말풍선 보임)
        // 3. 태블릿(md) 이하는 hover 효과 없음 (opacity 유지)
        className="absolute inset-0 z-30 bg-white border border-slate-200 rounded-lg flex flex-col overflow-hidden
                   transition-opacity duration-300 opacity-100 lg:hover:opacity-5
                   p-5 md:p-6 lg:p-8 group cursor-default lg:cursor-pointer"
      >
        {/* Decorative Top Bar */}
        <div className="absolute top-0 left-0 w-full h-1 bg-cyan-500"></div>

        {/* Header */}
        <div className="flex justify-between items-start mb-auto gap-2">
          <div className='flex flex-col items-start'>
            <span className="inline-block px-1.5 py-1 bg-cyan-50 text-cyan-600 font-mono text-[10px] md:text-[11px] lg:text-xs font-bold tracking-wider rounded mb-1.5 md:mb-2">
              {problem.keyword}
            </span>
            {/* [수정] 태블릿 폰트 사이즈 조정 (text-xl) */}
            <h3 className="text-lg md:text-xl lg:text-2xl font-bold text-slate-900 group-hover:text-cyan-600 transition-colors break-keep">
              {problem.title}
            </h3>
          </div>
          <span className="font-mono text-base md:text-lg lg:text-xl text-slate-300 font-bold group-hover:text-cyan-200 transition-colors shrink-0">
            0{index + 1}
          </span>
        </div>

        {/* Content */}
        {/* [수정] 태블릿 폰트 및 마진 조정 */}
        <p className="hidden md:block text-slate-500 text-xs md:text-sm lg:text-base leading-relaxed mt-3 md:mt-2 lg:mt-0 break-keep">
          {problem.description}
        </p>
      </motion.div>
    </div>
  );
}

// --- Main Component ---
export default function ServiceB2bMotion() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentStep, setCurrentStep] = useState(0);

  // 스크롤 로직
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const totalSteps = problemsData.length * 2 + 1;
    const step = Math.floor(latest * totalSteps);
    if (step !== currentStep) {
      setCurrentStep(step);
    }
  });

  return (
    <section ref={containerRef} className="relative h-[600vh]">
      <div className="sticky top-0 s-section__content overflow-hidden h-screen">
        {/* Header Section */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className='s-section__header'
          >
             <span className="s-section__subtitle">
               물류 사업의 고충 솔루션
             </span>
             <h2 className="s-section__title">
               현장의 문제,<br className="md:hidden"/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-600">시스템으로 전환하다</span>
             </h2>
          </motion.div>

        {/* Grid Content Area */}
        {/* h-[60vh] 고정으로 그리드 영역 확보 */}
        <div className="relative w-full h-[60vh]">
          <div className="size-full grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
            {problemsData.map((problem, idx) => {
              // 상태 결정 로직
              let activeState: 'idle' | 'talking' | 'solved' = 'idle';

              const talkTrigger = idx * 2 + 1;
              const solveTrigger = idx * 2 + 2;

              if (currentStep === talkTrigger) {
                activeState = 'talking';
              } else if (currentStep >= solveTrigger) {
                activeState = 'solved';
              }

              return (
                <SolutionCell
                  key={idx}
                  index={idx}
                  problem={problem}
                  activeState={activeState}
                />
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
