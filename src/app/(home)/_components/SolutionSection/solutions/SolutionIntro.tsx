"use client";

import { motion, MotionValue, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function SolutionIntro() {
  const containerRef = useRef<HTMLDivElement>(null);

  // 변경됨: ["start end", "end start"]
  // start end: 섹션의 머리(start)가 뷰포트의 끝(end)에 닿을 때 (등장 시작)
  // end start: 섹션의 바닥(end)이 뷰포트의 시작(start)에 닿을 때 (완전히 사라짐)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // 1. 배경색 변환 로직 (Pivot Point: 화면 중앙)
  // [0 ~ 0.4]: Dark 유지 (등장해서 화면 중앙에 올 때까지)
  // [0.4 ~ 0.6]: Dark -> Light 변환 (완전히 자리를 잡았을 때)
  // [0.6 ~ 1.0]: Light 유지 (위로 올라갈 때)
  const backgroundColor = useTransform(
    scrollYProgress,
    [0.4, 0.6],
    ["#020617", "#ffffff"]
  );

  // 2. 텍스트 색상 변환 (배경과 동일한 타이밍)
  const textColor = useTransform(
    scrollYProgress,
    [0.4, 0.6],
    ["#f8fafc", "#0f172a"]
  );

  // 3. 조명(Glow) 효과: 배경이 밝아지는 시점(0.4)에 맞춰 사라짐
  const glowOpacity = useTransform(scrollYProgress, [0.3, 0.5], [0.5, 0]);

  // 4. 하단 라인: 텍스트가 다 읽히고 배경이 밝아진 뒤(0.6)부터 그려짐
  const lineScale = useTransform(scrollYProgress, [0.6, 0.8], [0, 1]);

  return (
    <motion.section
      ref={containerRef}
      style={{ backgroundColor }}
      className="relative w-full min-h-[50vh] flex flex-col items-center justify-center overflow-hidden py-24 transition-colors duration-200 ease-linear"
    >
      {/* Background Glow (Dark Mode Only) */}
      <motion.div
        style={{ opacity: glowOpacity }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[30vh] bg-cyan-600 blur-[120px] rounded-full pointer-events-none"
      />

      {/* Text Container */}
      <div className="relative z-10 flex flex-col items-center text-center gap-6 md:gap-8 px-4 mb-12">

        {/* 각 텍스트 라인: 등장 시점(range)을 조금씩 뒤로 미룸 */}
        <ScrollRevealLine progress={scrollYProgress} range={[0.2, 0.4]} textColor={textColor}>
          AI 기반 IT 솔루션으로
        </ScrollRevealLine>

        <ScrollRevealLine progress={scrollYProgress} range={[0.3, 0.5]} textColor={textColor}>
          입고, 출고, 재고, 운송을 <br className="md:hidden" /> 실시간으로 연결하는
        </ScrollRevealLine>

        <ScrollRevealLine progress={scrollYProgress} range={[0.4, 0.6]} textColor={textColor} isAccent>
          스마트한 기업 물류 관리
        </ScrollRevealLine>

      </div>

      {/* Connecting Line */}
      <motion.div
        style={{ scaleY: lineScale, originY: 0 }}
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[2px] h-24 md:h-32 bg-gradient-to-b from-cyan-400 to-blue-600"
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
          ? "bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 bg-clip-text text-transparent pb-2"
          : ""
        }
      `}
    >
      {children}
    </motion.h2>
  );
}
