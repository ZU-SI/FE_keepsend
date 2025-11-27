"use client";

import { contactModalOpenAtom } from "@/store/global-modal.store";
import { clsx } from "clsx";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { useSetAtom } from "jotai";
import { useRef, useState } from "react";

// --- Types ---
interface Banner {
  id: number;
  subtitle: string;
  title: string; // HTML string allowed for line breaks
  description: string;
  videoUrl: string; // 실제 비디오 경로 (public 폴더 등)
  posterUrl?: string; // 로딩 전 썸네일
}

const banners: Banner[] = [
  {
    id: 1,
    subtitle: "LOGISTICS INNOVATION",
    title: "AI로 완성되는<br/>새로운 맞춤 물류의 시작",
    description: "킵센드는 풍부한 물류 경험 노하우와 AI 기술력을 결합하여 저비용, 고효율 그 이상의 가치를 제공합니다.",
    videoUrl: "/videos/logistics-ai.mp4", // 예시 경로 (실제 파일 필요)
  },
  {
    id: 2,
    subtitle: "B2B SOLUTIONS",
    title: "기업의 니즈에 맞춘<br/>물류 유형별 해답",
    description: "B2B 거래 특성에 최적화된 유연한 프로세스로 정확한 납기, 투명한 재고, 효율적인 출고를 실현합니다.",
    videoUrl: "/videos/warehouse-b2b.mp4",
  },
  {
    id: 3,
    subtitle: "DIGITAL TRANSFORMATION",
    title: "물류 운영 중심에<br/>IT를 통합하다",
    description: "주문, 재고, 출고 데이터를 하나의 흐름으로 연결해 비즈니스 효율을 극대화하는 스마트 플랫폼.",
    videoUrl: "/videos/digital-platform.mp4",
  },
];

export default function CinematicHeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const setContactModalOpen = useSetAtom(contactModalOpenAtom);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Scroll Progress Logic
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

useMotionValueEvent(scrollYProgress, "change", (latest) => {
  // 전체 스크롤 구간을 슬라이드 개수로 나눕니다.
  const totalSlides = banners.length;
  const step = 1 / totalSlides;

  // 현재 스크롤 위치(latest)가 어느 구간에 속하는지 계산
  let idx = Math.floor(latest / step);

  // 마지막 구간(1.0) 도달 시 인덱스 초과 방지
  if (idx >= totalSlides) {
    idx = totalSlides - 1;
  }

  if (idx !== currentIndex) {
    setCurrentIndex(idx);
  }
});

  return (
    // 1. Layout: Pinned
    <section ref={containerRef} className="relative h-[500vh] bg-black">

      {/* 2. Sticky Viewport */}
      <div className="sticky top-0 h-screen w-full overflow-hidden">

        {/* --- Background Layer (Videos) --- */}
        <div className="absolute inset-0 z-0">
          {banners.map((banner, idx) => (
            <BackgroundVideo
              key={banner.id}
              isActive={currentIndex === idx}
              videoUrl={banner.videoUrl}
              posterUrl={banner.posterUrl}
            />
          ))}
          {/* Overlay: 영상 위 텍스트 가독성을 위한 Dimming & Texture */}
          <div className="absolute inset-0 bg-black/40 z-10" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 z-10" />
          {/* Noise Texture for High-tech film feel */}
          <div className="absolute inset-0 opacity-[0.03] z-10 pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
        </div>

        {/* --- Content Layer --- */}
        <div className="relative z-20 h-full flex flex-col justify-center max-w-[1200px] mx-auto
          px-6 md:px-12
          pb-20 md:pb-0" /* 모바일에서는 하단 네비게이션 공간만큼 패딩 추가 */
        >
           {/* HUD Grid Lines (Desktop Only) */}
           <div className="absolute top-0 left-6 md:left-12 w-[1px] h-full bg-white/10 hidden md:block"></div>
           <div className="absolute top-0 right-6 md:right-12 w-[1px] h-full bg-white/10 hidden md:block"></div>

           <AnimatePresence mode="wait">
            <ContentSlide
              key={currentIndex}
              data={banners[currentIndex]}
              onContact={() => setContactModalOpen(true)}
            />
           </AnimatePresence>
          {/* --- Responsive Navigation / HUD Indicators --- */}
          <div className="absolute z-30 transition-all duration-500
            bottom-0 left-0 w-full px-6 py-6 bg-gradient-to-t from-black/90 to-transparent
            md:bottom-12 md:right-12 md:left-auto md:w-auto md:bg-none md:p-0"
          >
            <div className="flex items-end justify-between md:flex-col md:items-end md:gap-2">
              {/* Counter (Responsive Text Size) */}
              <div className="font-mono flex items-baseline order-2 md:order-none">
                <span className="text-cyan-400 font-bold text-lg md:text-4xl transition-all duration-300">
                  0{currentIndex + 1}
                </span>
                <span className="text-white/30 mx-2 text-sm md:text-2xl transition-all duration-300">/</span>
                <span className="text-white/30 text-sm md:text-2xl transition-all duration-300">
                  0{banners.length}
                </span>
              </div>

              {/* Progress Bar Container */}
              {/* [Mobile]: 상단 경계선처럼 보이게 배치 (absolute top-0)
                  [Desktop]: 카운터 위에 장식요소로 배치 (relative -top-5)
              */}
              <div className="absolute top-0 left-0 w-full h-[1px] bg-white/10
                md:relative md:w-32 md:top-[-10px] md:left-auto md:right-0"
              >
                <motion.div
                  className="h-full bg-cyan-400 box-shadow-[0_0_10px_cyan]"
                  initial={{ width: "0%" }}
                  animate={{ width: `${((currentIndex + 1) / banners.length) * 100}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>
            </div>
          </div>
        </div>


      </div>
    </section>
  );
}

// --- Sub Components ---

function BackgroundVideo({ isActive, videoUrl, posterUrl }: { isActive: boolean; videoUrl: string; posterUrl?: string }) {
  return (
    <motion.div
      className="absolute inset-0 w-full h-full"
      initial={{ opacity: 0 }}
      animate={{ opacity: isActive ? 1 : 0 }}
      transition={{ duration: 1.2, ease: "easeInOut" }} // 부드러운 Cross-Dissolve
    >
      {/* 실제 구현시: <video> 태그 사용 */}
      {/* 지금은 비디오가 없으므로 대체 Placeholder (Gradient) 사용 */}
      <div className={clsx("w-full h-full object-cover",
          videoUrl.includes('logistics') ? "bg-slate-900" :
          videoUrl.includes('warehouse') ? "bg-gray-900" : "bg-neutral-900"
      )}>
        {/* Placeholder: 비디오 대신 느낌을 내는 그라디언트. 실제 비디오 태그로 교체하세요. */}
        <video
          className="w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          poster={posterUrl}
        >
             {/* <source src={videoUrl} type="video/mp4" /> */}
        </video>
        {/* 임시 배경 (비디오 없을 때 확인용) */}
         <div className={clsx(
            "absolute inset-0 bg-gradient-to-br",
            videoUrl.includes('logistics') ? "from-slate-800 to-black" :
            videoUrl.includes('warehouse') ? "from-gray-800 to-black" : "from-indigo-950 to-black"
         )} />
      </div>
    </motion.div>
  );
}

function ContentSlide({ data, onContact }: { data: Banner; onContact: () => void }) {
  // 텍스트 라인 분리 (줄바꿈 기준)
  const titleLines = data.title.split("<br/>");

  return (
    <div className="flex flex-col items-start max-w-4xl">
      {/* 1. Subtitle (Masking Reveal) */}
      <div className="overflow-hidden mb-6">
        <motion.p
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "-100%" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }} // Custom Ease for "Natural" feel
          className="text-cyan-400 font-mono tracking-[0.2em] text-sm uppercase flex items-center gap-2"
        >
          <span className="w-2 h-2 bg-cyan-400 rounded-full inline-block animate-pulse"></span>
          {data.subtitle}
        </motion.p>
      </div>

      {/* 2. Title (Staggered Masking Reveal) */}
      <div className="mb-8 space-y-1">
        {titleLines.map((line, i) => (
          <div key={i} className="overflow-hidden">
            <motion.h1
              initial={{ y: "110%", rotateX: 20 }} // 약간의 회전과 함께 등장
              animate={{ y: 0, rotateX: 0 }}
              exit={{ y: "-110%", opacity: 0 }}
              transition={{
                duration: 0.8,
                delay: i * 0.1,
                ease: [0.16, 1, 0.3, 1] // Apple style smooth easing
              }}
              className="text-5xl md:text-7xl font-bold text-white leading-tight tracking-tight origin-bottom"
              dangerouslySetInnerHTML={{ __html: line }}
            />
          </div>
        ))}
      </div>

      {/* 3. Description (Fade & Slide) */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 0.8, y: 0 }}
        exit={{ opacity: 0, y: 10 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="text-lg text-white font-light leading-relaxed max-w-xl mb-12 border-l border-white/20 pl-6"
        dangerouslySetInnerHTML={{ __html: data.description }}
      />

      {/* 4. Action Button (Minimal & High-tech) */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ delay: 0.5, duration: 0.8 }}
      >
        <button
          onClick={onContact}
          className="group relative px-8 py-4 overflow-hidden border border-white/20 hover:border-cyan-500/50 transition-colors duration-300 backdrop-blur-sm"
        >
          <span className="relative z-10 text-white group-hover:text-cyan-400 transition-colors font-mono uppercase tracking-widest text-sm flex items-center gap-3">
             Contact Us
             {/* Simple Arrow Icon */}
             <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg" className="transform group-hover:translate-x-1 transition-transform">
                <path d="M1 6H11" stroke="currentColor" strokeLinecap="round"/>
                <path d="M6 1L11 6L6 11" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/>
             </svg>
          </span>
          {/* Button Hover Fill Effect */}
          <div className="absolute inset-0 bg-cyan-950/30 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out"></div>
        </button>
      </motion.div>
    </div>
  );
}
