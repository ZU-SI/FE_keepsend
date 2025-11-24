'use client';

import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion';
import { forwardRef, useEffect, useRef, useState } from 'react';

// --- Interfaces ---
interface Problem {
  title: string;
  description: string;
  relatedTalkIndices?: number[];
}

interface ProblemSectionProps {
  id?: string;
  problems?: Problem[];
  talks?: string[];
}

// --- Default Data ---
const defaultTalks: string[] = [
  "사업을 키우는데 시스템이 그걸 못 따라가네요.",
  "확장보다 유지가 더 버겁습니다.",
  "창고 하나 늘릴 때마다 매번 새로 세팅하고, 인력 교육도 해야하고 그만큼 비용도 만만치가 않네요.",
  "수요 예측이 안돼서 재고까지 남는 달은 리스크가 너무 심합니다.",
  "거래처마다 요청 방식이 달라 납기 일정 맞추려면 기존 시스템으로는 역부족이에요.",
  "운임이 제대로 맞는 건지 검증도 안되고, 엑셀로 확인하다 보면 오류가 너무 많아 힘들어요",
  "상품 위치가 파악이 안되니까 고객 문의 들어 올 때마다 창고랑 운송팀에 일일이 확인해야 해서 너무 힘듭니다.",
];

const defaultProblems: Problem[] = [
  {
    title: "관리 포인트 고충",
    description: "복잡한 구조, 낮은 효율, 비용 부담",
    relatedTalkIndices: [2, 3]
  },
  {
    title: "확장, 예측의 한계",
    description: "멈춰버린 기업 성장, 꽉 막힌 인프라",
    relatedTalkIndices: [0, 1]
  },
  {
    title: "미 검증 운임, 정산",
    description: "불투명한 정산과 데이터",
    relatedTalkIndices: [4, 5]
  },
  {
    title: "추적 및 보안 취약",
    description: "실시간 모니터링 부재, 정보 보안 리스크",
    relatedTalkIndices: [6, 7]
  }
];

// --- Sub Components ---

// [ChatBubble] 모션 유연성 복구 및 플래시 효과 처리
const ChatBubble = forwardRef<HTMLDivElement, {
  text: string;
  isHighlighted: boolean;
  isRightSide: boolean;
  isDimmed: boolean;
}>(({ text, isHighlighted, isRightSide, isDimmed }, ref) => {
  const [isFlashed, setIsFlashed] = useState(true);

  // 마운트 시 잠깐 강조 효과 (0.8초 후 해제 - 모션과 타이밍 맞춤)
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsFlashed(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  const isActive = isHighlighted || isFlashed;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30, scale: 0.8 }} // 시작 위치를 조금 더 아래로 두어 등장감 강화
      animate={{
        opacity: isDimmed ? 0.3 : 1,
        y: 0,
        scale: isActive ? 1.02 : 1
      }}
      // [수정: 모션 유연성] stiffness를 낮추고 damping을 조절하여 부드러운 탄성 부여
      transition={{
        type: "spring",
        stiffness: 260,
        damping: 20,
        mass: 1
      }}
      layout
      className={`flex gap-2 mb-3 last:mb-0 ${isRightSide ? 'justify-end' : ''}`}
    >
      <div
        className={`w-[85%] rounded-lg border p-2 shadow-sm transition-all duration-500 lg:p-3 lg:px-4
          ${isActive
            ? 'bg-purple-50 border-primary shadow-md'
            : 'bg-white border-border-light'
          }
        `}
      >
        <p className="m-0 text-[0.8125rem] leading-snug text-foreground-light lg:text-sm lg:leading-relaxed">
          {text}
        </p>
      </div>
    </motion.div>
  );
});
ChatBubble.displayName = 'ChatBubble';

function ScrollButton({ direction, onClick }: { direction: 'top' | 'bottom', onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-white shadow-md transition-all duration-300 hover:scale-110 hover:bg-primary-hover hover:shadow-lg active:scale-95 lg:h-10 lg:w-10 cursor-pointer"
      aria-label={`Scroll to ${direction}`}
    >
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className='h-4 w-4 lg:h-5 lg:w-5'>
        {direction === 'top' ? (
          <path d="M12 19V5M12 5L5 12M12 5L19 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        ) : (
          <path d="M12 5V19M12 19L5 12M12 19L19 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        )}
      </svg>
    </button>
  );
}

// --- Main Component ---
export default function ServiceB2bOne({
  id = "service-problem",
  problems = defaultProblems,
  talks = defaultTalks,
}: ProblemSectionProps) {
  // State
  const [currentStep, setCurrentStep] = useState(0);
  const [hoveredProblemIndex, setHoveredProblemIndex] = useState<number | null>(null);

  // Refs
  const containerRef = useRef<HTMLDivElement>(null);
  const chatMessagesRef = useRef<HTMLDivElement>(null);
  const chatBubbleRefs = useRef<(HTMLDivElement | null)[]>([]);

  // 1. Scroll Logic
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // 스크롤 감도 조절 유지 (Trigger 구간 계산)
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const totalSteps = problems.length;
    const triggerStart = 0.1;

    if (latest < triggerStart) {
      setCurrentStep(0);
    } else {
      const progress = (latest - triggerStart) / (1 - triggerStart);
      const step = Math.min(Math.floor(progress * totalSteps) + 1, totalSteps);
      setCurrentStep(step);
    }
  });

  // Data Memoization
  const reorderedTalks = useMemo(() => {
    const ordered: Array<{ text: string, originalIndex: number }> = [];
    const usedIndices = new Set<number>();

    problems.forEach(problem => {
      problem.relatedTalkIndices?.forEach(idx => {
        if (!usedIndices.has(idx) && idx < talks.length) {
          ordered.push({ text: talks[idx], originalIndex: idx });
          usedIndices.add(idx);
        }
      });
    });

    talks.forEach((talk, idx) => {
      if (!usedIndices.has(idx)) {
        ordered.push({ text: talk, originalIndex: idx });
      }
    });

    return ordered;
  }, [problems, talks]);

  // [수정: Scroll Interaction] scrollIntoView 대신 좌표 계산으로 변경하여 전체 페이지 흔들림 방지
  useEffect(() => {
    if (hoveredProblemIndex !== null && problems[hoveredProblemIndex].relatedTalkIndices?.length) {
      const relatedIndices = problems[hoveredProblemIndex].relatedTalkIndices;
      // 현재 리스트에서의 인덱스 찾기
      const targetBubbleIndex = reorderedTalks.findIndex(t => t.originalIndex === relatedIndices![0]);

      const container = chatMessagesRef.current;
      const targetBubble = chatBubbleRefs.current[targetBubbleIndex];

      if (container && targetBubble) {
        // 컨테이너 내에서의 상대 위치 계산 (offsetTop은 relative 부모 기준)
        // chatMessagesRef에 relative가 있어야 정확하지만, flex item인 경우에도 offsetTop은 작동함
        const containerHeight = container.clientHeight;
        const bubbleOffset = targetBubble.offsetTop;
        const bubbleHeight = targetBubble.offsetHeight;

        // 중앙 정렬을 위한 스크롤 위치 계산
        const targetScrollTop = bubbleOffset - (containerHeight / 2) + (bubbleHeight / 2);

        container.scrollTo({
          top: targetScrollTop,
          behavior: 'smooth'
        });
      }
    }
  }, [hoveredProblemIndex, problems, reorderedTalks]);

  // Step 변경 시 오토 스크롤 (호버 중이 아닐 때만)
  useEffect(() => {
    if (chatMessagesRef.current && hoveredProblemIndex === null) {
      // DOM 렌더링 확보를 위한 약간의 딜레이
      const timer = setTimeout(() => {
        if (chatMessagesRef.current) {
           chatMessagesRef.current.scrollTo({
            top: chatMessagesRef.current.scrollHeight,
            behavior: 'smooth'
          });
        }
      }, 150);
      return () => clearTimeout(timer);
    }
  }, [currentStep, hoveredProblemIndex]);

  const handleScroll = (direction: 'top' | 'bottom') => {
    if (chatMessagesRef.current) {
      chatMessagesRef.current.scrollTo({
        top: direction === 'top' ? 0 : chatMessagesRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  };

  const getBubbleState = (originalIndex: number) => {
    const isLoaded = problems.some((p, pIdx) =>
        pIdx < currentStep && p.relatedTalkIndices?.includes(originalIndex)
    );
    if (!isLoaded) return 'hidden';

    const isAllLoaded = currentStep === problems.length;
    if (isAllLoaded && hoveredProblemIndex !== null) {
        const isRelated = problems[hoveredProblemIndex].relatedTalkIndices?.includes(originalIndex);
        return isRelated ? 'highlighted' : 'dimmed';
    }
    return 'visible';
  };

  return (
    <section ref={containerRef} id={id} className="relative w-full h-[700vh]">
      <div className="sticky top-0 h-screen w-full flex flex-col justify-center overflow-hidden bg-foreground">
        <div className="s-section__content h-full flex flex-col justify-center max-w-screen-xl mx-auto  w-full">
          {/* Header */}
          <div className="s-section__header">
            <h3 className="s-section__subtitle">물류 사업의 고충 및 문제점</h3>
            <h2 className="s-section__title">B2B 3PL 번거롭고 어려우신가요?</h2>
            <p className="s-section__description">
              여러가지 고충으로 지체되는 사업 확장의 목표를 KEEPSEND가 해결하고 성공까지 함께합니다.
            </p>
          </div>
          {/* Content Grid */}
          <div className="flex flex-col gap-4 lg:grid lg:grid-cols-[1fr_auto_1fr] lg:gap-8 lg:items-stretch min-h-0 flex-1 lg:h-[60vh] w-full">
            {/* Left: Problem List */}
            <div className="relative flex flex-col justify-center order-3 lg:order-1 lg:h-[50vh]">
              <div className="absolute left-[1.25rem] top-6 bottom-6 w-0.5 bg-border-light hidden lg:block z-0" />
              <motion.div
                className="absolute left-[1.25rem] top-6 w-0.5 bg-primary hidden lg:block z-0"
                animate={{ height: `${(currentStep / problems.length) * 85}%` }}
                transition={{ type: "spring", stiffness: 50, damping: 20 }}
              />

              <div className="grid grid-cols-2 gap-4 lg:grid-cols-1 lg:gap-6 z-10">
                {problems.map((problem, idx) => {
                  const isVisible = idx < currentStep;
                  const isActive = (idx === currentStep - 1) || (currentStep === problems.length && hoveredProblemIndex === idx);
                  const isDimmed = currentStep === problems.length && hoveredProblemIndex !== null && hoveredProblemIndex !== idx;

                  return (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{
                        opacity: isVisible ? (isDimmed ? 0.4 : 1) : 0,
                        x: isVisible ? 0 : -20,
                        y: isVisible ? 0 : 20,
                        scale: isActive ? 1.02 : 1
                      }}
                      // [수정] Problem 리스트도 동일한 부드러운 Spring 적용
                      transition={{ type: "spring", stiffness: 260, damping: 20 }}
                      className={`flex cursor-pointer gap-4 rounded-lg border p-4 shadow-sm lg:gap-6 lg:p-6
                        ${isActive ? 'border-primary shadow-lg' : 'border-border-light'}
                        bg-white
                      `}
                      onMouseEnter={() => currentStep === problems.length && setHoveredProblemIndex(idx)}
                      onMouseLeave={() => setHoveredProblemIndex(null)}
                    >
                      <div
                        className={`hidden h-8 w-8 flex-shrink-0 items-center justify-center rounded-full text-sm font-bold transition-colors duration-300 lg:flex lg:h-10 lg:w-10 lg:text-base
                          ${isActive ? 'bg-primary text-white' : 'bg-muted-light text-primary'}
                        `}
                      >
                        {String(idx + 1).padStart(2, '0')}
                      </div>

                      <div className="flex flex-1 flex-col gap-1">
                        <h3 className={`text-[0.8125rem] font-bold leading-tight lg:text-[0.9375rem] transition-colors ${isActive ? 'text-primary' : 'text-foreground-light'}`}>
                          {problem.title}
                        </h3>
                        <p className="text-xs leading-snug text-muted-foreground-light lg:text-[0.8125rem]">
                          {problem.description}
                        </p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* Center: Divider */}
            <div className="order-2 flex flex-shrink-0 items-center justify-center gap-2 lg:flex-col lg:gap-3 lg:h-[50vh] lg:px-2">
              <motion.span
                className="text-2xl lg:text-4xl"
                animate={{ y: [0, -10, 0] }}
                transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              >
                🧐
              </motion.span>
              <p className="m-0 text-base font-semibold text-primary lg:text-lg lg:whitespace-nowrap">우리가 해결하는 문제</p>
            </div>

            {/* Right: Chat Box */}
            <div className="relative order-1 flex h-[25vh] flex-col rounded-lg border border-border-light bg-card-light shadow-xl lg:order-3 lg:h-[50vh]">
              <div className="flex flex-shrink-0 items-center gap-2 border-b border-border-light bg-muted-light py-1 px-4 lg:px-6 lg:py-3">
                <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></div>
                <span className="text-xs font-semibold text-foreground-light lg:text-[0.9375rem]">실제 현장의 목소리</span>
              </div>

              <div
                // [수정] offsetTop 계산 정확도를 위해 relative 추가
                className="relative min-h-0 flex-1 flex flex-col overflow-x-hidden overflow-y-auto bg-gradient-to-b from-gray-50 to-white p-4 lg:p-6"
                ref={chatMessagesRef}
              >
                <AnimatePresence initial={false}>
                  {reorderedTalks.map((talk, idx) => {
                    const bubbleState = getBubbleState(talk.originalIndex);
                    if (bubbleState === 'hidden') return null;

                    const isRightSide = idx % 2 === 1;
                    const isHighlighted = bubbleState === 'highlighted';
                    const isDimmed = bubbleState === 'dimmed';

                    return (
                      <ChatBubble
                        key={idx}
                        ref={(el) => { chatBubbleRefs.current[idx] = el; }}
                        text={talk.text}
                        isHighlighted={isHighlighted}
                        isRightSide={isRightSide}
                        isDimmed={isDimmed}
                      />
                    );
                  })}
                </AnimatePresence>
              </div>

              {/* Scroll Controls */}
              <div className="absolute bottom-4 right-4 z-20 flex flex-col gap-2 lg:bottom-6 lg:right-6">
                <ScrollButton direction="top" onClick={() => handleScroll('top')} />
                <ScrollButton direction="bottom" onClick={() => handleScroll('bottom')} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
