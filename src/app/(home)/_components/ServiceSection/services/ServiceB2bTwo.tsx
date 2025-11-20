'use client';

import { motion, MotionValue, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

interface Props {
  id?: string;
  index?: number;
}

const consultingCards = [
  {
    title: "데이터 기반의 인사이트 설계",
    descriptions: [
      "실시간 물류 데이터와 운영 지표 분석",
      "비효율 구간과 개선 우선순위 도출",
      "정량적 근거 기반의 실행 전략 설계",
    ],
  },
  {
    title: "운영 프로세스 단순화",
    descriptions: [
      "중복 업무와 병목 구간 제거",
      "현장 동선 및 배차 체계 전면 진단",
      "작업 표준화로 처리 속도 향상",
    ],
  },
  {
    title: "자동화 단계별 로드맵",
    descriptions: [
      "AI, 로봇, WMS 등 기술 인프라 적용",
      "단계별 자동화 전략 로드맵 제안",
      "현장 중심의 실행 가능한 DX 실현",
    ],
  },
  {
    title: "비용·성과 연동형 개선",
    descriptions: [
      "성과 기반 컨설팅 체계 운영",
      "ROI 산출 및 지속적 비용 효율 개선",
      "핵심 지표(KPI) 기반 성과 관리",
    ],
  },
];

export default function ServiceB2bTwo({ id, index }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  return (
    // [Theme Change] Dark(bg-background) -> Light(bg-slate-50)
    <section ref={containerRef} id={id} className="relative h-[450vh] bg-slate-50">
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col items-center justify-center py-8 lg:py-20">
        <div className="mx-auto flex h-full w-full max-w-container flex-col px-4">

          {/* Header: Light Theme Text Colors */}
          <div className="s-section__header">
            <h3 className="s-section__subtitle">
              하이퍼(Hyper) 물류 컨설팅
            </h3>
            <h2 className="s-section__title">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">
                최적화된 물류 전략
              </span>으로 완성
            </h2>
            <p className="mx-auto max-w-2xl text-sm text-slate-600 lg:text-base font-medium">
              데이터 분석과 현장 진단을 기반으로 비용 절감과 확장을 실현합니다.
            </p>
          </div>

          {/* Grid Container */}
          <div className="relative flex-1 w-full">
            <div className="grid h-full w-full grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-6">
              {consultingCards.map((card, idx) => (
                <CardItem
                  key={idx}
                  card={card}
                  index={idx}
                  progress={scrollYProgress}
                />
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

// --- Card Component ---

interface CardItemProps {
  card: {
    title: string;
    descriptions: string[];
  };
  index: number;
  progress: MotionValue<number>;
}

function CardItem({ card, index, progress }: CardItemProps) {
  // Grid Position Logic
  const isLeft = index % 2 === 0;
  const isTop = index < 2;

  // [Stacking Style Logic]
  // 카드마다 조금씩 다른 회전각도와 위치 오프셋을 주어 "자연스럽게 쌓인" 느낌 연출
  // Index별 Randomness 부여
  const randomRotate = [ -4, 3, -5, 4 ][index]; // 회전 각도 (deg)
  const randomJitterX = [ 2, -3, 4, -2 ][index]; // 미세한 좌우 어긋남 (%)
  const randomJitterY = [ -3, 2, -4, 3 ][index]; // 미세한 상하 어긋남 (%)

  // 중앙(Center) 위치 계산 (Grid Gap과 Card Size 고려하여 오프셋 설정)
  // '52%'는 그리드 중심에서 각 카드의 원래 위치까지의 대략적인 거리
  // 여기에 Jitter를 더해 "정확히 중앙이 아닌" 위치에서 시작하게 함
  const xStart = isLeft ? `calc(52% + ${randomJitterX}%)` : `calc(-52% + ${randomJitterX}%)`;
  const yStart = isTop ? `calc(52% + ${randomJitterY}%)` : `calc(-52% + ${randomJitterY}%)`;

  // --- Transforms ---

  // 1. Scale: 0 -> 1 (중앙에서 커지며 등장)
  const scale = useTransform(progress, [0, 0.25], [0, 1]);

  // 2. Opacity: 0 -> 1
  const opacity = useTransform(progress, [0, 0.15], [0, 1]);

  // 3. Position (Translate): Stacked Position -> Grid Position (0)
  // 스크롤 30%까지는 중앙(Start) 유지 -> 이후 원래 자리(0)로 이동
  const x = useTransform(progress, [0.25, 1], [xStart, "0%"]);
  const y = useTransform(progress, [0.25, 1], [yStart, "0%"]);

  // 4. Rotation: Random Angle -> 0 (Straight)
  // 중앙에 있을 땐 비틀어져 있다가, 제자리로 가면서 똑바로 정렬됨
  const rotate = useTransform(progress, [0.25, 0.8], [randomRotate, 0]);

  return (
    <motion.div
      style={{
        scale,
        opacity,
        x,
        y,
        rotate, // 회전 적용
        zIndex: 4 - index // 겹쳐질 때 순서 (위에서부터 아래로 쌓이거나 그 반대)
      }}
      className="group relative flex h-full w-full flex-col overflow-hidden rounded-2xl bg-white border border-slate-100 transition-colors hover:border-blue-400"
      // [Shadow] Light Theme에서 깊이감을 주기 위해 강한 그림자 적용
      // 중앙에 모였을 때 서로 구분되도록 함
    >
      {/* Static Shadow Wrapper (Motion transform에 shadow를 넣으면 성능 이슈가 있을 수 있어 클래스로 처리) */}
      <div className="absolute inset-0 rounded-2xl shadow-2xl opacity-80 pointer-events-none mix-blend-multiply" />

      {/* Image/Icon Area (Light Theme Background) */}
      <div className="relative flex flex-1 items-center justify-center bg-gradient-to-b from-slate-50 to-white min-h-[80px] lg:min-h-[100px]">
        {/* 3D Sphere Effect (Light Theme) */}
        <div className="relative flex h-16 w-16 items-center justify-center rounded-full bg-white shadow-[0_8px_30px_rgb(0,0,0,0.12)] ring-1 ring-slate-100 group-hover:scale-110 transition-transform duration-500 lg:h-20 lg:w-20">
          {/* Inner Gradient Sphere */}
          <div className="absolute h-[80%] w-[80%] rounded-full bg-gradient-to-br from-blue-500 to-cyan-400 opacity-90 shadow-inner" />
          <span className="relative z-10 font-mono text-2xl font-bold text-white drop-shadow-md">
            {index + 1}
          </span>
        </div>
      </div>

      {/* Text Content Area */}
      <div className="relative flex flex-[2] flex-col p-5 lg:p-6 bg-white z-10">
        <h4 className="mb-3 text-lg font-bold text-slate-900 lg:text-xl group-hover:text-blue-600 transition-colors">
          {card.title}
        </h4>

        <ul className="flex flex-col gap-2">
          {card.descriptions.map((desc, dIdx) => (
            <li key={dIdx} className="flex items-start gap-2">
              {/* Check Icon */}
              <span className="mt-1 flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
                  <path d="M10 3L4.5 8.5L2 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </span>
              <p className="text-xs text-slate-600 break-keep lg:text-sm leading-snug font-medium">
                {desc}
              </p>
            </li>
          ))}
        </ul>
      </div>

      {/* Bottom Highlight Line */}
      <div className="absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r from-blue-500 to-cyan-400 transition-all duration-500 group-hover:w-full z-20" />
    </motion.div>
  );
}
