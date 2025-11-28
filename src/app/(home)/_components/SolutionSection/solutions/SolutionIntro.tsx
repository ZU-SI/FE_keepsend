"use client";

import { motion, MotionValue, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function ServiceIntro() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // 1. 배경색 변환 로직
  // [Mod] #020617 (Slate-950) -> #0a0f1a (Brand Background)
  const backgroundColor = useTransform(
    scrollYProgress,
    [0.4, 0.6],
    ["#0a0f1a", "#f8fafc"]
  );

  // 2. 텍스트 색상 변환
  // [Mod] #f8fafc -> #ffffff (Brand Foreground), #0f172a (Brand Foreground Light)
  const textColor = useTransform(
    scrollYProgress,
    [0.4, 0.6],
    ["#ffffff", "#0f172a"]
  );

  const glowOpacity = useTransform(scrollYProgress, [0.3, 0.5], [0.5, 0]);
  const lineScale = useTransform(scrollYProgress, [0.6, 0.8], [0, 1]);

  return (
    <motion.section
      ref={containerRef}
      style={{ backgroundColor }}
      className="relative w-full min-h-[50vh] flex flex-col items-center justify-center overflow-hidden py-24 transition-colors duration-200 ease-linear"
    >
      {/* Background Glow */}
      <motion.div
        style={{ opacity: glowOpacity }}
        // [Mod] bg-cyan-600 -> bg-accent
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[30vh] bg-accent blur-[120px] rounded-full pointer-events-none"
      />

      {/* Text Container */}
      <div className="relative z-10 flex flex-col items-center text-center gap-6 md:gap-8 px-4 mb-12">
        <ScrollRevealLine progress={scrollYProgress} range={[0.2, 0.4]} textColor={textColor}>
         입고, 출고, 재고, 운송을<br className="md:hidden" />실시간으로 연결하고
        </ScrollRevealLine>

        <ScrollRevealLine progress={scrollYProgress} range={[0.3, 0.5]} textColor={textColor}>
          AI 기반 IT 솔루션으로<br className="md:hidden" /> 기업물류를 스마트하게 관리하는
        </ScrollRevealLine>

        <ScrollRevealLine progress={scrollYProgress} range={[0.4, 0.6]} textColor={textColor} isAccent>
          B2B 전문 물류 서비스
        </ScrollRevealLine>
      </div>

      {/* Connecting Line */}
      <motion.div
        style={{ scaleY: lineScale, originY: 0 }}
        // [Mod] bg-gradient... -> bg-gradient-cyan (Config Defined)
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[2px] h-24 md:h-32 bg-gradient-cyan"
      />
    </motion.section>
  );
}

// --- Sub Component ---
interface ScrollRevealLineProps {
  children: React.ReactNode;
  progress: MotionValue<number>;
  range: [number, number];
  textColor: MotionValue<string>;
  isAccent?: boolean;
}

function ScrollRevealLine({ children, progress, range, textColor, isAccent = false }: ScrollRevealLineProps) {
  const opacity = useTransform(progress, range, [0, 1]);
  const blur = useTransform(progress, range, ["10px", "0px"]);
  const y = useTransform(progress, range, [30, 0]);

  return (
    <motion.h2
      style={{
        opacity,
        filter: blur,
        y,
        color: isAccent ? undefined : textColor
      }}
      className={`
        text-2xl md:text-3xl lg:text-4xl font-bold
        leading-snug md:leading-normal
        ${isAccent
          ? "bg-gradient-cyan bg-clip-text text-transparent pb-2"
          : ""
        }
      `}
    >
      {children}
    </motion.h2>
  );
}
