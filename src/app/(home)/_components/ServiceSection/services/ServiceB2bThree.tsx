import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import { useMemo, useRef, useState } from 'react';

interface Props {
  id?: string;
}

// --- Data ---
const logisticsCards = [
  {
    id: 'card-tl',
    // Tailwind class for positioning
    positionClass: 'top-[18%] left-1/2 -translate-x-[180%] lg:top-[25%] lg:left-[20%] lg:translate-x-0',
    title: "실시간 가시성 & 추적",
    description: "재고·주문·운송 현황 리스크 최소화",
    solutions: ['WMS', 'TMS']
  },
  {
    id: 'card-bl',
    positionClass: 'bottom-[18%] left-1/2 -translate-x-[180%] lg:bottom-[25%] lg:left-[20%] lg:translate-x-0',
    title: "예측형 운영 최적화",
    description: "데이터 분석을 통한 수요 예측",
    solutions: ['OMS', 'TMS']
  },
  {
    id: 'card-tr',
    positionClass: 'top-[18%] left-1/2 translate-x-[80%] lg:top-[25%] lg:right-[20%] lg:left-auto lg:translate-x-0',
    title: "정확한 정산 관리",
    description: "거래 별 운임·비용 자동 집계",
    solutions: ['OMS', 'WMS']
  },
  {
    id: 'card-br',
    positionClass: 'bottom-[18%] left-1/2 translate-x-[80%] lg:bottom-[25%] lg:right-[20%] lg:left-auto lg:translate-x-0',
    title: "유연한 인프라 확장",
    description: "성장 단계에 맞춘 거점 확장",
    solutions: ['OMS', 'WMS', 'TMS']
  },
];

const introSatellites = [
  { id: 'sat-1', text: '정밀\n운송 추적', size: 130, color: '#0ea5e9' },
  { id: 'sat-2', text: '물류\n인프라', size: 150, color: '#6366f1' },
  { id: 'sat-3', text: '수요 예측', size: 120, color: '#3b82f6' },
  { id: 'sat-4', text: 'AI\n고객지원', size: 140, color: '#8b5cf6' },
  { id: 'sat-5', text: '통합\n시스템', size: 130, color: '#64748b' },
  { id: 'sat-6', text: '자동 배차', size: 120, color: '#06b6d4' },
];

export default function ServiceB2bThree({ id }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);

  // --- Scroll Hooks ---
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const smoothScroll = useSpring(scrollYProgress, { stiffness: 60, damping: 20 });

  // --- Motions ---
  // 1. Theme Transition
  const backgroundColor = useTransform(smoothScroll, [0.6, 0.8], ["#0f172a", "#ffffff"]);
  const headerTextColor = useTransform(smoothScroll, [0.6, 0.8], ["#ffffff", "#0f172a"]);
  const descTextColor = useTransform(smoothScroll, [0.6, 0.8], ["#94a3b8", "#64748b"]);

  // 2. Intro Layer (Big Bang)
  const introPointerEvents = useTransform(smoothScroll, (v) => v > 0.8 ? 'none' : 'auto');
  const introCenterOpacity = useTransform(smoothScroll, [0.7, 0.8], [1, 0]);
  const introSatellitesOpacity = useTransform(smoothScroll, [0.8, 0.9], [1, 0]);

  // 3. Header Opacity Logic
  // 0 ~ 0.2 : 나타남 (Fade In)
  // 0.2 ~ 0.6 : 유지 (Visible)
  // 0.6 ~ 0.8 : 사라짐 (Fade Out - 두번째 UI 등장 시점)
  const headerOpacity = useTransform(smoothScroll, [0, 0.2, 0.6, 0.8], [0, 1, 1, 0]);

  // 4. Main Diagram Layer
  const diagramOpacity = useTransform(smoothScroll, [0.7, 0.8], [0, 1]);

  // --- Interaction Logic ---
  const [hovered, setHovered] = useState<{ type: 'planet' | 'card'; id: string } | null>(null);

  const isPlanetHighlighted = (planetId: string) => {
    if (!hovered) return false;
    if (hovered.type === 'planet') return hovered.id === planetId;
    if (hovered.type === 'card') {
       const card = logisticsCards.find(c => c.id === hovered.id);
       return card?.solutions.includes(planetId);
    }
    return false;
  };

  const isCardHighlighted = (cardId: string, solutions: string[]) => {
    if (!hovered) return false;
    if (hovered.type === 'card') return hovered.id === cardId;
    if (hovered.type === 'planet') return solutions.includes(hovered.id);
    return false;
  };

  return (
    <section className="relative w-full" id={id}>
      {/* Scroll Track (Height for Scroll Interaction) */}
      <div ref={containerRef} className="relative w-full h-[400vh]">

        {/* Sticky Viewport */}
        <motion.div
          className="sticky top-0 h-screen w-full overflow-hidden block"
          style={{ backgroundColor }}
        >

          {/* 1. Header Layer
              - absolute로 띄워서 중앙 정렬 레이아웃에 영향을 주지 않음
              - z-index: 50
          */}
          <motion.div
            className="absolute top-0 left-0 w-full z-50 text-center pt-24 px-4 pointer-events-none lg:pt-32"
            style={{ opacity: headerOpacity }}
          >
            <motion.h3 className="text-indigo-500 font-semibold mb-2 text-lg md:text-xl">통합 물류 솔루션</motion.h3>
            <motion.h2
              className="text-3xl md:text-4xl font-bold mb-4 transition-colors duration-300"
              style={{ color: headerTextColor }}
            >
              하나로 연결되는 물류 통합 운영의 혁신
            </motion.h2>
            <motion.p
              className="max-w-2xl mx-auto text-lg transition-colors duration-300"
              style={{ color: descTextColor }}
            >
              OMS, WMS, TMS를 통합한 원스톱 솔루션으로 복잡한 물류 과정을 단순화합니다.
            </motion.p>
          </motion.div>

          {/* 2. Stage Layer (Perfect Center)
              - flex items-center justify-center로 내부 요소 정중앙 배치
          */}
          <div className="absolute inset-0 z-10 flex items-center justify-center w-full h-full">

            {/* === [LAYER A] Intro (Big Bang) === */}
            <motion.div
              className="absolute inset-0 flex items-center justify-center z-30 pointer-events-none"
              style={{ pointerEvents: introPointerEvents }}
            >
              {/* Center Planet (Intro) */}
              <motion.div
                className="absolute z-40 flex items-center justify-center w-[140px] h-[140px] rounded-full bg-gradient-to-br from-indigo-600 to-indigo-900 shadow-[0_0_50px_rgba(79,70,229,0.5)] text-white font-bold text-xl text-center leading-tight"
                style={{ opacity: introCenterOpacity }}
              >
                {/* Glow Effect */}
                <div className="absolute inset-[-10px] rounded-full bg-indigo-600 opacity-20 blur-xl"></div>
                <span className="relative z-10">킵센드<br/>3PL</span>
              </motion.div>

              {/* Satellites (Expanding) */}
              <motion.div
                style={{ opacity: introSatellitesOpacity }}
                className="absolute inset-0 flex items-center justify-center"
              >
                {introSatellites.map((sat, i) => (
                  <IntroSatellite key={sat.id} data={sat} index={i} total={introSatellites.length} scrollProgress={smoothScroll} />
                ))}
              </motion.div>
            </motion.div>


            {/* === [LAYER B] Main Diagram === */}
            <motion.div
              className="absolute inset-0 z-20 w-full h-full pointer-events-none"
              style={{ opacity: diagramOpacity }}
            >
               {/* Diagram Container (Relative to full screen) */}
               <div className="relative w-full h-full">

                 {/* 1. Core System (Overlap with Intro Center) */}
                 <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 flex items-center justify-center pointer-events-auto">

                    {/* Sun (Center Node) */}
                    <div className="relative z-20 flex flex-col items-center justify-center w-[140px] h-[140px] rounded-full bg-indigo-600 text-white shadow-[0_0_30px_rgba(79,70,229,0.4)] border-4 border-white text-center">
                      <span className="block text-lg font-bold">통합 운영</span>
                      <span className="block text-xs opacity-80 mt-1">단일 플랫폼</span>
                    </div>

                    {/* Orbit System */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] h-[340px] pointer-events-none">
                      {/* Dashed Ring */}
                      <div className="absolute inset-0 border border-dashed border-slate-300 rounded-full opacity-60"></div>

                      {/* Rotating Container (60s duration) */}
                      <div className="w-full h-full animate-[spin_60s_linear_infinite]">
                        {['OMS', 'WMS', 'TMS'].map((solution) => (
                          <PlanetNode
                            key={solution}
                            solution={solution}
                            highlighted={isPlanetHighlighted(solution)}
                            onHover={(id) => setHovered({ type: 'planet', id })}
                            onLeave={() => setHovered(null)}
                          />
                        ))}
                      </div>
                    </div>
                 </div>

                 {/* 2. Satellites (Cards) */}
                 <div className="absolute inset-0 w-full h-full pointer-events-none">
                    {logisticsCards.map((card) => (
                      <div
                        key={card.id}
                        // Apply tailwind position classes passed from data
                        className={`absolute w-[220px] p-5 bg-white/95 backdrop-blur-sm rounded-2xl border border-slate-200 shadow-lg text-center transition-all duration-300 pointer-events-auto cursor-default
                          ${card.positionClass}
                          ${isCardHighlighted(card.id, card.solutions) ? 'border-indigo-500 shadow-[0_10px_25px_rgba(99,102,241,0.2)] scale-105 z-20' : 'z-10'}
                        `}
                        onMouseEnter={() => setHovered({ type: 'card', id: card.id })}
                        onMouseLeave={() => setHovered(null)}
                      >
                        <h4 className="text-slate-800 font-bold mb-1 text-base">{card.title}</h4>
                        <p className="text-slate-500 text-sm leading-snug break-keep">{card.description}</p>
                      </div>
                    ))}
                 </div>

               </div>
            </motion.div>

          </div>
        </motion.div>
      </div>
    </section>
  );
}

// --- Sub Components ---

// 1. Expanding Satellite (Intro)
function IntroSatellite({ data, index, total, scrollProgress }: any) {
  const randomPosition = useMemo(() => {
    const angle = (index / total) * 360;
    const radius = 300 + Math.random() * 150;
    const radian = (angle * Math.PI) / 180;
    return {
      x: Math.cos(radian) * radius,
      y: Math.sin(radian) * radius,
    };
  }, [index, total]);

  const x = useTransform(scrollProgress, [0, 0.9], [0, randomPosition.x]);
  const y = useTransform(scrollProgress, [0, 0.9], [0, randomPosition.y]);
  const scale = useTransform(scrollProgress, [0, 0.2], [0, 1]);

  return (
    <motion.div
      className="absolute flex items-center justify-center rounded-full shadow-lg z-20"
      style={{
        width: data.size, height: data.size,
        background: `linear-gradient(135deg, ${data.color}, #1e293b)`,
        x, y, scale,
      }}
    >
      <span className="text-white font-bold text-center leading-tight whitespace-pre-line drop-shadow-md">
        {data.text}
      </span>
    </motion.div>
  );
}

// 2. Planet Node (Orbiting)
function PlanetNode({ solution, highlighted, onHover, onLeave }: any) {
  // Calculate initial rotation for triangular layout (0, 120, 240)
  const rotationDeg = solution === 'OMS' ? 0 : solution === 'WMS' ? 120 : 240;

  return (
    <div
      className="absolute top-1/2 left-1/2 w-[70px] h-[70px] -ml-[35px] -mt-[35px] pointer-events-auto"
      style={{
        // Position on the ring (Radius = 170px)
        transform: `rotate(${rotationDeg}deg) translate(170px) rotate(-${rotationDeg}deg)`
      }}
      onMouseEnter={() => onHover(solution)}
      onMouseLeave={onLeave}
    >
      {/* Planet Circle (Counter-rotates to keep text upright) */}
      <div
        className={`w-full h-full rounded-full bg-white border-2 flex flex-col items-center justify-center shadow-sm transition-all duration-300 cursor-pointer animate-[spin_60s_linear_infinite_reverse]
          ${highlighted
            ? 'border-indigo-500 bg-indigo-600 text-white scale-110 shadow-[0_0_20px_rgba(99,102,241,0.4)]'
            : 'border-indigo-500 text-slate-600 hover:scale-105'}
        `}
      >
        <span className="text-xl mb-0.5">{solution === 'OMS' ? '📦' : solution === 'WMS' ? '🏭' : '🚚'}</span>
        <span className={`text-xs font-bold ${highlighted ? 'text-white' : 'text-indigo-600'}`}>{solution}</span>
      </div>
    </div>
  );
}
