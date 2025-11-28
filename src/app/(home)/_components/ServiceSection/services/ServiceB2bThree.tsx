import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import { useMemo, useRef } from 'react';
import { AICustomerSupport } from '../../icons/AICustomerSupport';
import { AutomatedDispatch } from '../../icons/AutomatedDispatch';
import { DemandForecasting } from '../../icons/DemandForecasting';
import { IntegratedSystem } from '../../icons/IntegratedSystem';
import { LogisticsInfrastructure } from '../../icons/LogisticsInfrastructure';
import { PrecisionTracking } from '../../icons/PrecisionTracking';

// --- Data ---
const logisticsCards = [
  {
    id: 'card-tl',
    positionClass: 'lg:top-[15%] lg:left-[10%] lg:translate-x-0',
    title: "실시간 가시성 & 추적",
    descriptions: ["모든 프로세스 실시간 모니터링", "재고·위치·운송 현황 파악", "리스크 즉시 대응"],
    solutions: ['WMS', 'TMS']
  },
  {
    id: 'card-bl',
    positionClass: 'lg:bottom-[15%] lg:left-[10%] lg:translate-x-0',
    title: "예측형 운영 최적화",
    descriptions: ["수요와 재고를 자동 분석", "안정적 공급망 운영 실현"],
    solutions: ['OMS', 'TMS']
  },
  {
    id: 'card-tr',
    positionClass: 'lg:top-[15%] lg:right-[10%] lg:left-auto lg:translate-x-0',
    title: "정확한 정산 관리",
    descriptions: ["거래 별 운임·비용 자동 집계", "투명한 정산 구현"],
    solutions: ['OMS', 'WMS']
  },
  {
    id: 'card-br',
    positionClass: 'lg:bottom-[15%] lg:right-[10%] lg:left-auto lg:translate-x-0',
    title: "유연한 인프라 확장",
    descriptions: ["성장 단계에 맞춘 거점 확장", "시스템 확장 구조"],
    solutions: ['OMS', 'WMS', 'TMS']
  },
];

// [Mod] Colors matched to Brand Chart Colors
const introSatellites = [
  { id: 'sat-1', text: '정밀\n운송 추적', size: 130, color: '#3b82f6', icon: <PrecisionTracking /> }, // Primary
  { id: 'sat-2', text: '물류\n인프라', size: 150, color: '#1e3a8a', icon: <LogisticsInfrastructure /> }, // Secondary
  { id: 'sat-3', text: '수요 예측', size: 120, color: '#06b6d4', icon: <DemandForecasting /> }, // Accent
  { id: 'sat-4', text: 'AI\n고객지원', size: 140, color: '#f472b6', icon: <AICustomerSupport/> }, // Chart-3 (Pink)
  { id: 'sat-5', text: '통합\n시스템', size: 130, color: '#10b981', icon: <IntegratedSystem /> }, // Success/Green
  { id: 'sat-6', text: '자동 배차', size: 120, color: '#22d3ee', icon: <AutomatedDispatch/>}, // Cyan-400
];

export default function ServiceB2bThree() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const smoothScroll = useSpring(scrollYProgress, { stiffness: 45, damping: 20 });

  // --- Motions ---
  // [Mod] Updated Hex codes to match tailwind.config.ts variables
  // Dark (#0a0f1a) -> Light (#f8fafc)
  const backgroundColor = useTransform(smoothScroll, [0.65, 0.8], ["#0a0f1a", "#f8fafc"]);
  const headerTextColor = useTransform(smoothScroll, [0.65, 0.8], ["#ffffff", "#0f172a"]);
  const descTextColor = useTransform(smoothScroll, [0.65, 0.8], ["#94a3b8", "#64748b"]);

  const introPointerEvents = useTransform(smoothScroll, (v) => v > 0.75 ? 'none' : 'auto');
  const introCenterOpacity = useTransform(smoothScroll, [0.6, 0.75], [1, 0]);
  const introSatellitesOpacity = useTransform(smoothScroll, [0.7, 0.85], [1, 0]);
  const headerOpacity = useTransform(smoothScroll, [0, 0.1, 0.6, 0.7], [0, 1, 1, 0]);
  const diagramOpacity = useTransform(smoothScroll, [0.75, 0.9], [0, 1]);
  const cardAppearOpacity = useTransform(smoothScroll, [0.8, 0.95], [0, 1]);
  const cardY = useTransform(smoothScroll, [0.8, 0.95], [30, 0]);

  return (
    <section className="relative w-full" >
      <div ref={containerRef} className="relative w-full h-[600vh]">
        <motion.div
          className="sticky top-0 h-screen w-full overflow-hidden block transition-colors duration-700"
          style={{ backgroundColor }}
        >
          {/* Header Layer */}
          <motion.div
            className="absolute top-0 left-0 w-full z-50 text-center pt-24 px-4 pointer-events-none lg:pt-32"
            style={{ opacity: headerOpacity }}
          >
            <motion.h3 className="s-section__subtitle">KEEPSEND 특장점</motion.h3>
            <motion.h2 className="s-section__title" style={{ color: headerTextColor }}>
              기업의 니즈를 읽는 전략적 물류 운영
            </motion.h2>
            <motion.p className="s-section__description" style={{ color: descTextColor }}>
              비즈니스 유형 별 환경에 최적화된<br />맞춤형 물류 서비스를 제공합니다.
            </motion.p>
          </motion.div>

          {/* Stage Layer */}
          <div className="absolute inset-0 z-10 flex items-center justify-center w-full h-full">

            {/* === [LAYER A] Intro (Big Bang) === */}
            <motion.div
              className="absolute inset-0 flex items-center justify-center z-30"
              style={{ pointerEvents: introPointerEvents }}
            >
              {/* Center Core */}
              <motion.div
                // [Mod] border-indigo -> border-primary/secondary
                className="absolute z-40 flex items-center justify-center w-[160px] h-[160px] rounded-full border border-secondary/30 backdrop-blur-xl shadow-[0_0_60px_rgba(59,130,246,0.3)]"
                style={{
                  opacity: introCenterOpacity,
                  // [Mod] Custom Gradient matched to Primary
                  background: "radial-gradient(circle at 30% 30%, rgba(59, 130, 246, 0.2), rgba(10, 15, 26, 0.95))"
                }}
              >
                <div className="absolute inset-[-4px] rounded-full border border-primary/20 blur-sm"></div>
                <div className="absolute inset-0 rounded-full bg-gradient-to-b from-white/10 to-transparent pointer-events-none"></div>
                <span className="relative z-10 text-white font-bold text-2xl text-center leading-tight drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                  킵센드<br/>3PL
                </span>
              </motion.div>

              {/* Satellites */}
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
               <div className="relative w-full h-full flex flex-col items-center justify-center">

                 {/* 1. Core System & Orbit */}
                 <div className="relative flex-none top-[100px] lg:absolute lg:top-1/2 lg:left-1/2 lg:-translate-x-1/2 lg:-translate-y-1/2 z-10 mb-8 lg:mb-0 transition-all duration-500 scale-90 lg:scale-100">

                    {/* Center Node */}
                    <div className="relative z-20 flex flex-col items-center justify-center w-[200px] h-[200px] rounded-full text-white shadow-[0_0_50px_rgba(59,130,246,0.3)] border border-primary/30 backdrop-blur-md overflow-hidden">
                       <div className="absolute inset-0 bg-background/90"></div>
                       {/* Gradient Overlay - [Mod] indigo -> primary */}
                       <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20"></div>

                       <div className="relative z-10 text-center">
                        <span className="block text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-300">통합 운영 관리</span>
                        <div className="w-10 h-[1px] bg-primary mx-auto my-2"></div>
                        <span className="block text-xs text-muted-foreground font-medium leading-relaxed">
                          단일 플랫폼<br />리소스 절감
                        </span>
                       </div>
                    </div>

                    {/* Orbit Ring - [Mod] indigo -> primary */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px] h-[320px] pointer-events-none">
                      <div className="absolute inset-0 border border-dashed border-primary/30 rounded-full opacity-60"></div>
                      <div className="w-full h-full animate-[spin_60s_linear_infinite]">
                        {['OMS', 'WMS', 'TMS'].map((solution) => (
                          <PlanetNode key={solution} solution={solution} />
                        ))}
                      </div>
                    </div>
                 </div>

                 {/* 2. Description Cards */}
                 <div className="w-full s-section__content !min-h-0 lg:!min-h-[100vh] lg:absolute lg:inset-0 pointer-events-none">
                    <div className="grid grid-cols-2 gap-4 w-full">
                    {logisticsCards.map((card) => (
                      <motion.div
                        key={card.id}
                        style={{ opacity: cardAppearOpacity, y: cardY }}
                        // [Mod] bg-white/80 -> bg-card-light/80, shadow-indigo -> shadow-primary
                        className={`
                          relative lg:absolute
                          bg-card-light/80 backdrop-blur-md rounded-xl border border-border-light shadow-xl shadow-primary/10
                          p-5 z-10
                          w-full lg:w-[25%]
                          flex flex-col justify-center overflow-hidden group
                          ${card.positionClass}
                        `}
                      >
                        {/* Decorative Gradient Bar - [Mod] indigo -> primary */}
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-accent to-primary opacity-80"></div>

                        {/* [Mod] text-slate-800 -> text-foreground-light */}
                        <h4 className="font-bold mb-3 text-sm lg:text-lg text-foreground-light flex items-center gap-2">
                           {/* [Mod] bg-cyan-500 -> bg-accent */}
                           <span className="w-2 h-2 rounded-full bg-accent"></span>
                           {card.title}
                        </h4>
                        <ul className='flex flex-col gap-1.5 pl-4'>
                          {card.descriptions.map((item, idx) => (
                            // [Mod] text-slate-600 -> text-muted-foreground-light
                            <li key={idx} className="text-muted-foreground-light text-xs lg:text-sm pl-0 relative leading-snug break-keep flex items-start gap-1.5">
                              {/* [Mod] text-indigo-400 -> text-primary */}
                              <span className='text-primary text-[8px]'>●</span> {item}
                            </li>
                          ))}
                        </ul>
                      </motion.div>
                    ))}
                    </div>
                 </div>

               </div>
            </motion.div>

          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ... (Sub Components: IntroSatellite, PlanetNode also updated similarly with primary/accent/background colors in the full code below) ...
// (Functionality preserved, color variables substituted)

function IntroSatellite({ data, index, total, scrollProgress }: any) {
    const randomPosition = useMemo(() => {
      const angle = (index / total) * 360;
      const radius = 450 + Math.random() * 200;
      const radian = (angle * Math.PI) / 180;
      return {
        x: Math.cos(radian) * radius,
        y: Math.sin(radian) * radius,
      };
    }, [index, total]);

    const x = useTransform(scrollProgress, [0, 0.8], [0, randomPosition.x]);
    const y = useTransform(scrollProgress, [0, 0.8], [0, randomPosition.y]);
    const scale = useTransform(scrollProgress, [0, 0.1], [0, 1]);

    return (
      <motion.div
        className="absolute flex items-center justify-center rounded-full shadow-lg z-20 group backdrop-blur-2xl border border-white/10 overflow-hidden"
        style={{
          width: data.size * 1.25,
          height: data.size * 1.25,
          // [Mod] Using data.color which is now brand-aligned
          background: `linear-gradient(135deg, ${data.color}44, rgba(10, 15, 26, 0.6))`,
          x, y, scale,
        }}
      >
        <span className="relative z-10 text-white font-bold text-center leading-tight whitespace-pre-line drop-shadow-lg px-3 pointer-events-none">
          {data.text}
        </span>
        <div className="absolute inset-0 flex items-center justify-center opacity-70 scale-110">
          <div className="w-[60%] h-[60%] text-white">
            {/* [Check] Ensure SVG icons accept currentColor or are styled */}
            {data.icon}
          </div>
        </div>
      </motion.div>
    );
  }

  function PlanetNode({ solution }: any) {
    const rotationDeg = solution === 'OMS' ? 0 : solution === 'WMS' ? 120 : 240;

    return (
      <div
        className="absolute top-1/2 left-1/2 w-[100px] h-[100px] -ml-[50px] -mt-[50px]"
        style={{
          transform: `rotate(${rotationDeg}deg) translate(155px) rotate(-${rotationDeg}deg)`
        }}
      >
        <div
          // [Mod] shadow-blue -> shadow-primary
          className={`w-full h-full rounded-full  flex flex-col items-center justify-center shadow-lg transition-transform duration-300 hover:scale-110 animate-[spin_60s_linear_infinite_reverse]`}
          style={{
               // [Mod] Dark background matched
               background: `linear-gradient(145deg, rgba(10, 15, 26, 0.9), rgba(59, 130, 246, 0.3))`,
               boxShadow: '0 0 20px rgba(59, 130, 246, 0.2)'
          }}
        >
          <span className="text-xl font-bold text-white ">{solution}</span>
          <div className="absolute top-0 left-0 w-full h-full rounded-full bg-gradient-to-b from-white/10 to-transparent pointer-events-none"></div>
        </div>
      </div>
    );
  }
