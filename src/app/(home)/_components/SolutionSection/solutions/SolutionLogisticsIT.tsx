'use client';

import { motion, useScroll, useTransform, Variants } from 'framer-motion';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

const logisticsCards = [
  // ... (데이터 동일)
  {
    title: "전 과정의 통합 관리",
    description: "자체 개발 OMS·WMS·TMS 간의 데이터 연동으로 실시간 통합 제어",
    image: '/image/solution-it-01-t.png'
  },
  {
    title: "실시간 가시성 확보",
    description: "재고, 주문, 운송 현황을 실시간 모니터링 및 빠른 대응",
    image: '/image/solution-it-02-t.png'
  },
  {
    title: "운영 효율성과 확장성 강화",
    description: "업무 자동화로 인력 리소스 최소화 및 유연한 확장, 개방형 구조",
    image: '/image/solution-it-03-t.png'
  },
];

const msCards = [
  // ... (데이터 동일)
  {
    image: "/image/solution-tms-01.webp",
    title: "주문의 시작부터 정확하게!",
    description: ["고객 주문·상품·재고 정보를 한 흐름으로 연결해 실시간으로 수요를 파악하고, 오류 없는 주문 처리를 지원합니다.", "수요 변동 대응, 주문 오류 감소, 서비스 품질 향상에 강점을 가집니다."],
    tags: ["OMS", "#주문리스트"],
  },
  {
    image: "/image/solution-tms-02.webp",
    title: "창고 운영의 자동화•표준화",
    description: ["현재 가상 재고를 통해 주문·예약·입출고 예정 수량을 반영해 실제 출고 가능한 재고를 실시간으로 예측하여 현황을 파악합니다.", "전 과정을 시스템으로 표준화하여 가시성 및 운영의 최적화 환경을 확보합니다."],
    tags: ["WMS", "#재고현황", "#현재가상재고"],
  },
  {
    image: "/image/solution-tms-03.webp",
    title: "지능형 배차•배송 관리",
    description: ["배송기사 지정 배송을 통해 기사 별 경로, 물량, 제약 조건을 분석힌 최적의 배차를 지정하고 현장을 실시간으로 제어합니다.", "계획·배차·추적·정산을 통합해 배송 품질을 높이고 운송 비용을 절감합니다."],
    tags: ["TMS", "#배송관리", "#기사지정배송"],
  },
];

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" }
  }
};

const staggerContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } }
};

export default function SolutionLogisticsIT() {
  const containerRef = useRef<HTMLDivElement>(null);
  const horizontalTrackRef = useRef<HTMLDivElement>(null);
  const [scrollRange, setScrollRange] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      if (horizontalTrackRef.current) {
        const totalWidth = horizontalTrackRef.current.scrollWidth;
        const viewportWidth = window.innerWidth;
        setScrollRange(totalWidth - viewportWidth + 100);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const logisticsOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);
  const logisticsScale = useTransform(scrollYProgress, [0, 0.15], [1, 0.95]);
  const logisticsPointerEvents = useTransform(scrollYProgress, (v) => v > 0.15 ? 'none' : 'auto');

  const msOpacity = useTransform(scrollYProgress, [0.15, 0.25], [0, 1]);
  const msX = useTransform(scrollYProgress, [0.25, 1], ["0px", `-${scrollRange}px`]);

  return (
    <section ref={containerRef} className="relative h-[500vh]">

      <div className="sticky top-0 flex h-screen w-full flex-col items-center justify-center overflow-hidden px-4 lg:px-8">

        {/* ================= Layer 1: Logistics Grid ================= */}
        <motion.div
          className="absolute inset-0 s-section__content z-10 mx-auto"
          style={{
            opacity: logisticsOpacity,
            scale: logisticsScale,
            pointerEvents: logisticsPointerEvents
          }}
        >
          {/* Header */}
          <motion.div
              className="s-section__header"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
          >
              <motion.h3 variants={fadeInUp} className="s-section__subtitle">
                  통합 물류 솔루션
              </motion.h3>
              <motion.h2 variants={fadeInUp} className="s-section__title">
                하나로 연결되는 물류 통합 운영의 혁신
              </motion.h2>
              <motion.p variants={fadeInUp} className="s-section__description mx-auto max-w-3xl">
                OMS, WMS, TMS를 통합한 원스톱 물류 솔루션으로 물류 전 과정을 민첩하게 유기적으로 관리합니다.
              </motion.p>
          </motion.div>

          {/* Cards Grid */}
          <motion.div
              className="grid w-full gap-4 lg:grid-cols-3 lg:gap-8"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
          >
            {logisticsCards.map((card, idx) => (
              <motion.div
                key={idx}
                variants={fadeInUp}
                className="group flex items-center gap-4 overflow-hidden rounded-xl border border-border-light bg-card-light transition-all duration-300 hover:shadow-lg hover:border-primary/50 lg:flex-col lg:items-center lg:text-center p-4 lg:p-6"
              >
                  <motion.div
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      transition={{ delay: 0.2, duration: 0.5 }}
                      className='w-[60px] h-[60px] lg:mb-10 lg:w-[160px] lg:h-[160px]'
                  >
                    <Image width={160} height={160} src={card.image} alt={card.title} className='rounded-xl max-w-full max-h-full'/>
                  </motion.div>
                <div className="flex-1">
                  <h4 className="mb-2 text-lg font-bold text-foreground-light lg:text-2xl">
                    {card.title}
                  </h4>
                  <p className="text-sm lg:text-lg leading-relaxed text-muted-foreground-light break-keep">
                    {card.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>


        {/* ================= Layer 2: MS Horizontal Slider ================= */}
        <motion.div
          className="absolute inset-0 z-20 flex items-center h-full w-full"
          style={{ opacity: msOpacity }}
        >
           <div className="w-full h-auto">
             <motion.div
                ref={horizontalTrackRef}
                style={{ x: msX }}
                className="flex gap-8 pl-[10vw] pr-[10vw] w-max items-center"
             >
                {/* Header Card */}
                <div className="flex w-[30vw] min-w-[300px] flex-col justify-center px-4">
                  {/* [Mod] text-gray-900 -> text-foreground-light */}
                  <h3 className="text-3xl font-bold leading-tight text-foreground-light lg:text-4xl">
                    올인원 물류<br/>물류 시스템
                  </h3>
                  {/* [Mod] text-gray-600 -> text-muted-foreground-light */}
                  <p className="mt-4 text-muted-foreground-light">
                    주문부터 배송, 재고관리까지,<br/>각 단계별 전문 솔루션을 확인하세요.
                  </p>
                </div>

                {/* MS Cards */}
                {msCards.map((card, idx) => (
                  <div
                    key={`ms-${idx}`}
                    // [Mod] bg-white -> bg-card-light
                    className="group relative flex w-[85vw] flex-col gap-6 rounded-3xl border border-border-light bg-card-light p-6 shadow-2xl lg:w-[45vw] lg:p-10"
                  >
                     <div className="flex h-full flex-col  custom-scrollbar">

                        {/* Tags */}
                        <div className="mb-4 flex flex-wrap items-center gap-2">
                          {card.tags.map((tag, tIdx) => {
                            const isPrimary = tIdx === 0;
                            return (
                              <span
                                key={tIdx}
                                // [Mod] bg-white -> bg-card-light
                                className={`inline-flex items-center justify-center rounded-full px-3 py-1 text-sm font-bold transition-colors duration-300
                                  ${isPrimary ? 'bg-primary text-white' : 'bg-card-light border border-primary/30 text-primary'}
                                `}
                              >
                                {tag}
                              </span>
                            );
                          })}
                        </div>

                        {/* Image - [Mod] bg-gray-50 -> bg-muted-light */}
                          <div className="relative h-[30vh] mb-6 flex-shrink-0 overflow-hidden rounded-2xl border border-border-light bg-muted-light shadow-inner">
                            <Image
                              src={card.image}
                              alt={card.title}
                              fill
                              className="object-cover"
                              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            />
                          </div>

                        {/* Content */}
                        <div className="flex flex-col gap-3">
                          {/* [Mod] text-gray-900 -> text-foreground-light */}
                          <h3 className="text-xl font-bold text-foreground-light lg:text-2xl">
                            {card.title}
                          </h3>
                          <ul className="flex flex-col gap-2">
                            {card.description.map((desc, dIdx) => (
                              // [Mod] text-gray-600 -> text-muted-foreground-light
                              <li key={dIdx} className="flex items-start gap-2 text-[0.9375rem] leading-relaxed text-muted-foreground-light">
                                <svg className="mt-1 h-4 w-4 min-w-[1rem] text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                </svg>
                                <span className="break-keep">{desc}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                     </div>
                  </div>
                ))}
             </motion.div>
           </div>
        </motion.div>

      </div>
    </section>
  );
}
