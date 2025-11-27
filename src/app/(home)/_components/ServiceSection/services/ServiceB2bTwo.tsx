'use client';

import { motion, Variants } from 'framer-motion';
import { useState } from 'react';

// --- Animation Variants (참고 파일과 동일한 모션 적용) ---
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

// --- Types ---
interface StrategyItem {
  id: string;
  step: string; // Keyword
  title: string;
  description: string;
  imageColor: string; // 이미지 Placeholder 색상
}

const strategies: StrategyItem[] = [
  {
    id: '01',
    step: '데이터 분석',
    title: '숨겨진 마진 찾기',
    description: '실시간 데이터 분석으로 새는 비용을 막고, 수익이 극대화되는 구간을 찾아냅니다.',
    imageColor: 'bg-blue-100',
  },
  {
    id: '02',
    step: '현장 중심',
    title: '군더더기 없는 흐름',
    description: '현장의 병목과 중복 업무를 제거하여 물류 처리 속도를 획기적으로 높입니다.',
    imageColor: 'bg-indigo-100',
  },
  {
    id: '03',
    step: '자동화 구축',
    title: '스스로 일하는 물류',
    description: 'AI와 로봇 기술을 도입하여 인력 의존도는 낮추고 운영 정확도는 높입니다.',
    imageColor: 'bg-cyan-100',

  },
  {
    id: '04',
    step: 'ROI',
    title: '숫자로 증명하는 성과',
    description: '투자 대비 효과(ROI)를 명확히 산출하여, 비용 절감과 매출 성장을 증명합니다.',
    imageColor: 'bg-slate-200',
  }
];

function StrategyCard({ item, index }: { item: StrategyItem; index: number }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="relative h-[420px] rounded-lg overflow-hidden cursor-pointer shadow-lg group"
      // 카드 개별 등장 애니메이션 (헤더와 타이밍을 맞추기 위해 delay 조정)
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      variants={{
        hidden: { opacity: 0, y: 50 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.6, ease: "easeOut", delay: index * 0.1 }
        }
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* 1. Background Image Area (Full Height) */}
      <div className={`absolute inset-0 w-full h-full ${item.imageColor} transition-transform duration-700 ease-out group-hover:scale-105`}>
        {/* Placeholder for Real Image */}
        <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-slate-400/30 font-bold text-5xl rotate-[-10deg]">IMAGE</span>
        </div>

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />
      </div>

      {/* 2. Content Box (Sliding Up) */}
      <div className="absolute bottom-0 left-0 w-full p-4">

        {/* White Panel mimicking a card sitting at the bottom */}
        <motion.div
          className="bg-white/95 backdrop-blur-md rounded-2xl p-4 shadow-xl overflow-hidden relative"
          initial={false}
          animate={{
            height: isHovered ? "auto" : "110px",
            y: 0
          }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
          {/* Header: Keyword & Indicator */}
          <div className="flex justify-between items-start mb-3">
            <span className="inline-block px-2 py-1 bg-cyan-50 text-cyan-600 text-[10px] font-bold tracking-widest rounded border border-cyan-100">
              {item.step}
            </span>

            {/* [더보기] Indicator UI */}
            <motion.div
              className="w-4 h-4 rounded-full border border-slate-300 text-slate-300 flex items-center justify-center"
              animate={{ opacity: isHovered ? 0 : 1 }}
            > +
            </motion.div>
          </div>

          {/* Title */}
          <h3 className="text-lg  font-bold text-slate-900 mb-4 leading-tight">
            {item.title}
          </h3>

          {/* Description (Reveal on Hover) */}
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{
              opacity: isHovered ? 1 : 0,
              height: isHovered ? "auto" : 0
            }}
            transition={{ duration: 0.3 }}
          >
            <p className="text-slate-500 text-sm leading-relaxed border-t border-slate-100 pt-4">
              {item.description}
            </p>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default function ServiceB2bTwo() {
  return (
    <section className="s-section__content">
        {/* Header Section (Refactored) */}
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
               물류, 비용이 아닌 <br className="md:hidden"/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-600">경쟁력이 되다</span>
            </motion.h2>
            <motion.p variants={fadeInUp} className="s-section__description">
                더 이상 물류 때문에 성장을 망설이지 마세요. <br className="hidden md:block" /> 데이터와 기술로 비즈니스의 속도를 바꿉니다.
            </motion.p>
        </motion.div>
      <div className="container w-full">
        {/* Grid Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
          {strategies.map((item, idx) => (
            <StrategyCard key={item.id} item={item} index={idx} />
          ))}
        </div>
      </div>
    </section>
  );
}
