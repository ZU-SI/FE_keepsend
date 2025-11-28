"use client";

import { contactModalOpenAtom } from "@/store/global-modal.store";
import { clsx } from "clsx";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { useSetAtom } from "jotai";
import { useRef, useState } from "react";

// --- Types ---
interface Banner {
  id: number;
  title: string;
  description: string;
  videoUrl: string;
  posterUrl?: string;
  buttonText?: string;
  buttonLink?: string;
}

const banners: Banner[] = [
  {
    id: 1,
    title: "AI로 완성되는<br/>새로운 맞춤 물류의 시작<br/>KEEPSEND",
    description: "킵센드는 풍부한 물류 경험 노하우와 AI 기술력을 결합하여 저비용, 고효율 그 이상의 가치를 제공합니다.",
    videoUrl: "/video/banner-01.mp4",
    buttonText: "문의하기",
  },
  {
    id: 2,
    title: "기업의 니즈에 맞춘<br/>물류 유형별<br />KEEPSEND의 해답",
    description: "B2B 거래 특성에 최적화된 유연한 프로세스로 정확한 납기, 투명한 재고, 효율적인 출고를 실현합니다.",
    videoUrl: "/video/banner-02.mp4",
    buttonText: "바로 가기",
    buttonLink: "#service-intro"
  },
  {
    id: 3,
    title: "물류 운영 중심에<br/>IT를 통합하다",
    description: "주문, 재고, 출고 데이터를 하나의 흐름으로 연결해 비즈니스 효율을 극대화하는 스마트 플랫폼.",
    videoUrl: "/video/banner-04.mp4",
    buttonText: "바로 가기",
    buttonLink: "#service-intro"
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
    const totalSlides = banners.length;
    const step = 1 / totalSlides;
    let idx = Math.floor(latest / step);

    if (idx >= totalSlides) {
      idx = totalSlides - 1;
    }

    if (idx !== currentIndex) {
      setCurrentIndex(idx);
    }
  });

  return (
    // [Mod] bg-black -> bg-background (Theme color #0a0f1a)
    // [Mod] font-sans 추가 (Theme font 적용)
    <section ref={containerRef} className="relative h-[500vh] bg-background font-sans text-foreground">

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
          {/* Overlay: 브랜드 딥블루 톤 유지를 위해 순수 black보다는 background 컬러 기반 오버레이 권장 */}
          <div className="absolute inset-0 bg-background/40 z-10" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/30 z-10" />

          {/* Noise Texture */}
          <div className="absolute inset-0 opacity-[0.03] z-10 pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
        </div>

        {/* --- Content Layer --- */}
        <div className="relative z-20 h-full flex flex-col justify-center max-w-container mx-auto
          px-6 md:px-12
          pb-20 md:pb-0"
        >
           {/* HUD Grid Lines: 브랜드 컬러 border 활용 */}
           <div className="absolute top-0 left-6 md:left-12 w-[1px] h-full bg-border/30 hidden md:block"></div>
           <div className="absolute top-0 right-6 md:right-12 w-[1px] h-full bg-border/30 hidden md:block"></div>

           <AnimatePresence mode="wait">
            <ContentSlide
              key={currentIndex}
              data={banners[currentIndex]}
              onContact={() => setContactModalOpen(true)}
            />
           </AnimatePresence>

          {/* --- Responsive Navigation / HUD Indicators --- */}
          <div className="absolute z-30 transition-all duration-500
            bottom-0 left-0 w-full px-6 py-6 bg-gradient-to-t from-background/90 to-transparent
            md:bottom-12 md:right-12 md:left-auto md:w-auto md:bg-none md:p-0"
          >
            <div className="flex items-end justify-between md:flex-col md:items-end md:gap-2">

              {/* Counter: 데이터/숫자이므로 font-mono 사용, 색상은 accent */}
              <div className="flex items-baseline order-2 md:order-none font-mono">
                {/* [Mod] text-cyan-400 -> text-accent */}
                <span className="text-accent font-bold text-lg md:text-4xl transition-all duration-300">
                  0{currentIndex + 1}
                </span>
                <span className="text-muted-foreground mx-2 text-sm md:text-2xl transition-all duration-300">/</span>
                <span className="text-muted-foreground text-sm md:text-2xl transition-all duration-300">
                  0{banners.length}
                </span>
              </div>

              {/* Progress Bar Container */}
              <div className="absolute top-0 left-0 w-full h-[1px] bg-white/10
                md:relative md:w-32 md:top-[-10px] md:left-auto md:right-0"
              >
                {/* [Mod] bg-cyan-400 -> bg-accent, box-shadow 수정 */}
                <motion.div
                  className="h-full bg-accent"
                  style={{ boxShadow: "0 0 10px rgba(6, 182, 212, 0.6)" }} // accent color glow
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
      transition={{ duration: 1.2, ease: "easeInOut" }}
    >
      {/* [Mod] 임의의 bg-slate/gray 대신 bg-muted 사용 */}
      <div className={clsx("w-full h-full object-cover bg-muted")}>
        <video
          className="w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          poster={posterUrl}
        >
             <source src={videoUrl} type="video/mp4" />
        </video>
      </div>
    </motion.div>
  );
}

function ContentSlide({ data, onContact }: { data: Banner; onContact: () => void }) {
  const titleLines = data.title.split("<br/>");

  return (
    <div className="flex flex-col items-start max-w-4xl">
      {/* 2. Title */}
      <div className="mb-8 space-y-2"> {/* space-y-1 -> 2로 변경하여 줄 사이 간격 추가 확보 */}
        {titleLines.map((line, i) => (
          // [Mod] 폰트 줄간격이 넓어지면서 overflow-hidden에 글자 하단(descender)이 잘릴 수 있어 pb-2 추가
          <div key={i} className="overflow-hidden pb-2">
            <motion.h1
              initial={{ y: "110%", rotateX: 20 }}
              animate={{ y: 0, rotateX: 0 }}
              exit={{ y: "-110%", opacity: 0 }}
              transition={{
                duration: 0.8,
                delay: i * 0.1,
                ease: [0.16, 1, 0.3, 1]
              }}
              // [Mod] 사이즈 축소: text-5xl/7xl -> text-4xl/md:text-6xl (Config 6xl=60px)
              // [Mod] 줄간격 확대: leading-tight -> leading-snug
              className="text-4xl md:text-6xl font-bold text-foreground leading-snug tracking-tight origin-bottom"
              dangerouslySetInnerHTML={{ __html: line }}
            />
          </div>
        ))}
      </div>

      {/* 3. Description */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 0.8, y: 0 }}
        exit={{ opacity: 0, y: 10 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        // [Mod] border-white/20 -> border-border, text-white -> text-muted-foreground
        className="text-lg text-muted-foreground leading-relaxed max-w-xl mb-12 border-l border-border pl-6"
        dangerouslySetInnerHTML={{ __html: data.description }}
      />

      {/* 4. Action Button */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ delay: 0.5, duration: 0.8 }}
      >
        <button
          onClick={onContact}
          // [Mod] rounded-3xl -> rounded-full (테마에 맞는 Pill shape)
          // [Mod] hover:border-cyan-500 -> hover:border-accent
          // [Mod] hover:shadow-button-hover 추가 (Config 정의된 쉐도우)
          className="group relative px-8 py-3 overflow-hidden rounded-full border border-border hover:border-accent/50 transition-all duration-300 backdrop-blur-sm hover:shadow-button-hover"
        >
          {/* [Mod] group-hover:text-cyan-400 -> group-hover:text-accent */}
          <span className="relative z-10 text-foreground group-hover:text-accent transition-colors uppercase tracking-widest text-sm flex items-center gap-3 font-medium">
             빠른 문의
             <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg" className="transform group-hover:translate-x-1 transition-transform">
                <path d="M1 6H11" stroke="currentColor" strokeLinecap="round"/>
                <path d="M6 1L11 6L6 11" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/>
             </svg>
          </span>
          {/* [Mod] bg-cyan-950 -> bg-secondary (Brand Secondary Color) */}
          <div className="absolute inset-0 bg-secondary/80 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out"></div>
        </button>
      </motion.div>
    </div>
  );
}
