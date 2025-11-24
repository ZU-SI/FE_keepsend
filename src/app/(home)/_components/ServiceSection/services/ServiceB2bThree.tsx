import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import { useMemo, useRef } from 'react';

interface Props {
  id?: string;
}

// --- Data ---
const logisticsCards = [
  {
    id: 'card-tl',
    positionClass: 'top-[18%] left-1/2 -translate-x-[180%] lg:top-[25%] lg:left-[20%] lg:translate-x-0',
    title: "실시간 가시성 & 추적",
    descriptions: ["모든 프로세스 실시간 모니터링", "재고·위치·운송 현황을 한눈에 파악", "이상 상황 즉시 대응으로 리스크 최소화"],
    solutions: ['WMS', 'TMS']
  },
  {
    id: 'card-bl',
    positionClass: 'bottom-[18%] left-1/2 -translate-x-[180%] lg:bottom-[25%] lg:left-[20%] lg:translate-x-0',
    title: "예측형 운영 최적화",
    descriptions: ["수요와 재고를 자동 분석", " 안정적 공급망 운영 실현"],
    solutions: ['OMS', 'TMS']
  },
  {
    id: 'card-tr',
    positionClass: 'top-[18%] left-1/2 translate-x-[80%] lg:top-[25%] lg:right-[20%] lg:left-auto lg:translate-x-0',
    title: "정확한 정산 관리",
    descriptions: ["거래 별 운임·비용 자동 집계", "투명한 정산 구현"],
    solutions: ['OMS', 'WMS']
  },
  {
    id: 'card-br',
    positionClass: 'bottom-[18%] left-1/2 translate-x-[80%] lg:bottom-[25%] lg:right-[20%] lg:left-auto lg:translate-x-0',
    title: "유연한 인프라 확장",
    descriptions: ["성장 단계에 맞춘 거점 확장", "및 시스템 확장 구조"],
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
  const backgroundColor = useTransform(smoothScroll, [0.5, 0.6], ["#0f172a", "#ffffff"]);
  const headerTextColor = useTransform(smoothScroll, [0.5, 0.6], ["#ffffff", "#0f172a"]);
  const descTextColor = useTransform(smoothScroll, [0.5, 0.6], ["#94a3b8", "#64748b"]);

  // 2. Intro Layer (Big Bang)
  const introPointerEvents = useTransform(smoothScroll, (v) => v > 0.5 ? 'none' : 'auto');
  const introCenterOpacity = useTransform(smoothScroll, [0.4, 0.5], [1, 0]);
  const introSatellitesOpacity = useTransform(smoothScroll, [0.5, 0.6], [1, 0]);

  // 3. Header Opacity Logic
  // 0 ~ 0.2 : 나타남 (Fade In)
  // 0.2 ~ 0.6 : 유지 (Visible)
  // 0.6 ~ 0.8 : 사라짐 (Fade Out - 두번째 UI 등장 시점)
  const headerOpacity = useTransform(smoothScroll, [0, 0.1, 0.4, 0.5], [0, 1, 1, 0]);

  // 4. Main Diagram Layer
  const diagramOpacity = useTransform(smoothScroll, [0.5, 0.6], [0, 1]);

  // 5. 카드 등장 시점
  // 0.8 ~ 0.87 구간에서 "중앙 → 원 위치"로 이동
  const cardAppearOpacity = useTransform(smoothScroll, [0.5, 0.9], [0, 1]);
  const cardAppearScale = useTransform(smoothScroll, [0.6, 0.8], [0.2, 1]);


  return (
    <section className="relative w-full" id={id}>
      {/* Scroll Track (Height for Scroll Interaction) */}
      <div ref={containerRef} className="relative w-full h-[600vh]">
        {/* Sticky Viewport */}
        <motion.div
          className="sticky top-0 h-screen w-full overflow-hidden block"
          style={{ backgroundColor }}
        >
          {/* Header Layer */}
          <motion.div
            className="s-section__header absolute top-0 left-0 w-full z-50 text-center pt-24 px-4 pointer-events-none lg:pt-32"
            style={{ opacity: headerOpacity }}
          >
            <motion.h3 className="s-section__subtitle">KEEPSEND 특장점</motion.h3>
            <motion.h2
              className="s-section__title"
              style={{ color: headerTextColor }}
            >
              기업의 니즈를 읽는 전략적 물류 운영의 시작
            </motion.h2>
            <motion.p
              className="s-section__description"
              style={{ color: descTextColor }}
            >
              B2B 물류의 복잡함을 구조화하여,
                <br />
              비즈니스 유형 별 환경에 최적화된 맞춤형 물류 서비스를 제공합니다.
            </motion.p>
          </motion.div>
          {/* Stage Layer */}
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
                    <div className="relative z-20 flex flex-col items-center justify-center w-[180px] h-[180px] rounded-full bg-indigo-600 text-white shadow-[0_0_30px_rgba(79,70,229,0.4)] border-4 border-white text-center">
                      <span className="block text-lg font-bold">통합 운영 관리</span>
                      <span className="block text-xs opacity-80 mt-1">
                        ✓ 단일 플랫폼
                        <br />
                        ✓ 리소스 절감
                        <br />
                        ✓ 운영 효율 극대화
                      </span>
                    </div>

                    {/* 궤도 UI */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] h-[340px] pointer-events-none">
                      {/* 궤도 라인 UI */}
                      <div className="absolute inset-0 border border-dashed border-slate-300 rounded-full opacity-60"></div>
                      {/* OMS, WMS, TMS 항성 */}
                      <div className="w-full h-full animate-[spin_60s_linear_infinite]">
                        {['OMS', 'WMS', 'TMS'].map((solution) => (
                          <PlanetNode
                            key={solution}
                            solution={solution}
                          />
                        ))}
                      </div>
                    </div>
                 </div>
                 {/* 2.행성 설명 카드 */}
                 <div className="absolute inset-0 w-full h-full pointer-events-none">
                    {logisticsCards.map((card) => (
                      <motion.div
                        key={card.id}
                        style={{
                          opacity: cardAppearOpacity,
                          // scale: cardAppearScale,
                        }}
                      >
                        <div
                          className={`absolute w-[220px] p-5 bg-white/95 backdrop-blur-sm rounded-2xl border border-slate-200 shadow-lg transition-all duration-300
                            ${card.positionClass} z-10 origin-center
                          `}
                          // style={{
                          //   opacity: cardAppearOpacity,
                          //   scale: cardAppearScale,
                          // }}
                        >
                          <h4 className="font-bold mb-2 text-base text-center text-primary-hover">{card.title}</h4>
                          <ul className='flex flex-col gap-0.5 justify-start'>
                            {
                              card.descriptions.map((item, idx) => (
                                <li key={idx} className=" text-slate-500 text-sm pl-4 relative leading-snug break-keep"><span className='text-[8px]  absolute top-1 left-0'>✔️</span> {item}</li>
                              ))
                            }
                          </ul>
                        </div>
                      </motion.div>
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
function PlanetNode({ solution, highlighted }: any) {
  // Calculate initial rotation for triangular layout (0, 120, 240)
  const rotationDeg = solution === 'OMS' ? 0 : solution === 'WMS' ? 120 : 240;

  return (
    <div
      className="absolute top-1/2 left-1/2 w-[70px] h-[70px] -ml-[35px] -mt-[35px]"
      style={{
        transform: `rotate(${rotationDeg}deg) translate(170px) rotate(-${rotationDeg}deg)`
      }}
    >
      {/* Planet Circle (Counter-rotates to keep text upright) */}
      <div
        className={`w-full h-full rounded-full bg-white border-2 flex flex-col items-center justify-center shadow-sm transition-all duration-300 animate-[spin_60s_linear_infinite_reverse]
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
