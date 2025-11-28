'use client';

import { motion, Variants } from 'framer-motion';
import Image from 'next/image';

// --- Animation Variants ---
const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

const staggerContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } }
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 60 },
  visible: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
      delay: index * 0.15
    }
  })
};

const iconVariants: Variants = {
  hidden: { scale: 1, opacity: 1 },
  visible: (index: number) => ({
    scale: [0, 1.2, 1],
    opacity: 1,
    transition: {
      duration: 0.6,
      times: [0, 0.6, 1],
      ease: "backOut",
      delay: (index * 0.15) + 0.2
    }
  })
};

// --- Types ---
interface StrategyItem {
  id: string;
  step: string;
  title: string;
  description: string;
  imageColor: string;
  image: string;
}

const strategies: StrategyItem[] = [
  {
    id: '01',
    step: '데이터 중심',
    title: '숨겨진 마진 찾기',
    description: '실시간 데이터 분석으로 새는 비용을 막고, 수익이 극대화되는 구간을 찾아냅니다.',
    // [Mod] bg-blue-100 -> bg-primary/10 (Brand Consistency)
    imageColor: 'bg-primary/10',
    image: '/image/service-b2bTwo-01.png'
  },
  {
    id: '02',
    step: '현장 중심',
    title: '현장 프로세스 최적화',
    description: '현장의 병목과 중복 업무를 제거하여 물류 처리 속도를 획기적으로 높입니다.',
    // [Mod] bg-indigo-100 -> bg-secondary/10
    imageColor: 'bg-secondary/10',
    image: '/image/service-b2bTwo-02.png'
  },
  {
    id: '03',
    step: '자동화 구축',
    title: '스스로 일하는 물류',
    description: 'AI와 로봇 기술을 도입하여 인력 의존도는 낮추고 운영 정확도는 높입니다.',
    // [Mod] bg-cyan-100 -> bg-accent/10
    imageColor: 'bg-accent/10',
    image: '/image/service-b2bTwo-03.png'
  },
  {
    id: '04',
    step: 'ROI',
    title: '숫자로 증명하는 성과',
    description: '투자 대비 효과(ROI)를 명확히 산출하여, 비용 절감과 매출 성장을 증명합니다.',
    // [Mod] bg-slate-200 -> bg-muted-light
    imageColor: 'bg-muted-light',
    image: '/image/service-b2bTwo-04.png'
  }
];

function StrategyCard({ item, index }: { item: StrategyItem; index: number }) {
  return (
    // [Mod] bg-white -> bg-card-light (명시적 Light Card)
    <motion.div
      className="relative h-[420px] rounded-2xl overflow-hidden shadow-card group bg-card-light"
      custom={index}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      variants={cardVariants}
    >
      {/* 1. Background Image Area */}
      <div className={`absolute inset-0 w-full h-full ${item.imageColor} transition-transform duration-700`}>
        <div className="absolute inset-0 flex items-start justify-center pt-[10%] md:pt-[15%] lg:pt-[10%]">
          <motion.div
            custom={index}
            variants={iconVariants}
          >
            <Image
              width={160}
              height={160}
              src={item.image}
              alt={item.title}
              className="drop-shadow-md"
            />
          </motion.div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-white/40 via-transparent to-transparent opacity-50" />
      </div>

      {/* 2. Content Box */}
      <div className="absolute bottom-0 left-0 w-full p-4">
        {/* [Mod] border-white/50 -> border-border-light */}
        <div
          className="bg-white/90 backdrop-blur-md rounded-xl p-5 shadow-lg border border-border-light"
        >
          {/* Header: Keyword */}
          <div className="flex justify-between items-center mb-2">
            {/* [Mod] bg-cyan-50 -> bg-accent/10, text-cyan-700 -> text-accent-dark (or similar) */}
            <span className="inline-block px-2 py-1 bg-accent/10 text-accent font-bold text-[11px] tracking-widest rounded border border-accent/20">
              {item.step}
            </span>
          </div>

          {/* Title - [Mod] text-slate-900 -> text-foreground-light */}
          <h3 className="text-xl font-bold text-foreground-light mb-3 leading-tight">
            {item.title}
          </h3>

          {/* Description - [Mod] text-slate-600 -> text-muted-foreground-light */}
          <p className="text-muted-foreground-light text-sm leading-relaxed border-t border-border-light pt-3">
            {item.description}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

export default function ServiceB2bTwo() {
  return (
    <section className="s-section__content">
        <motion.div
            className="s-section__header"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
        >
            <motion.h3 variants={fadeInUp} className="s-section__subtitle">
                하이퍼(Hyper) 물류 컨설팅
            </motion.h3>
            <motion.h2 variants={fadeInUp} className="s-section__title">
               물류, 비용이 아닌 <br className="md:hidden"/>
               {/* [Mod] bg-gradient-to-r... -> bg-gradient-cyan (Config Defined) */}
               <span className="text-transparent bg-clip-text bg-gradient-cyan">경쟁력이 되다</span>
            </motion.h2>
            <motion.p variants={fadeInUp} className="s-section__description">
                비용 절감 · 운영 최적화 · 확장성 강화 <br /> 데이터와 기술로 비즈니스의 속도를 바꿉니다.
            </motion.p>
        </motion.div>

      <div className="container w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
          {strategies.map((item, idx) => (
            <StrategyCard key={item.id} item={item} index={idx} />
          ))}
        </div>
      </div>
    </section>
  );
}
