import { motion, useScroll } from 'framer-motion';
import { useRef } from 'react';

interface ServiceProcessProps {
  id: string;
}

interface ProcessStep {
  id: number;
  title: string;
  description: string;
  icon: string;
  image: string;
}

const processSteps: ProcessStep[] = [
  {
    id: 1,
    title: '수요 분석 및 계약 체결',
    description: '비즈니스 모델 기반 최적화된 물류 설계 시작!',
    icon: 'https://img.icons8.com/3d-fluency/94/business-report.png',
    image: '/image/service-process-01.png'
  },
  {
    id: 2,
    title: '입고 예약 및 상품 등록',
    description: '입고부터 출고까지 정확한 입고서비스 운영',
    icon: 'https://img.icons8.com/3d-fluency/94/move-stock.png',
    image: '/image/service-process-02.png'
  },
  {
    id: 3,
    title: '보관 및 재고 운영 관리',
    description: '안전하고 안정적인 최적화된 보관 환경 제공',
    icon: 'https://img.icons8.com/3d-fluency/94/module.png',
    image: '/image/service-process-03.png'
  },
  {
    id: 4,
    title: '주문 접수 및 출고 계획 수립',
    description: '데이터 기반의 출고 다중 출고 방식 적용',
    icon: 'https://img.icons8.com/3d-fluency/94/scan-stock.png',
    image: '/image/service-process-04.png'
  },
  {
    id: 5,
    title: '피킹 및 출고 준비',
    description: '데이터 지면화 출고 대응 출고 시스템 적용',
    icon: 'https://img.icons8.com/3d-fluency/94/robot.png',
    image: '/image/service-process-05.png'
  },
  {
    id: 6,
    title: '배송 및 물품 관리',
    description: '신속하고 투명한 배송추적 즉각 신뢰 관리',
    icon: 'https://img.icons8.com/glassmorphism/96/drone.png',
    image: '/image/service-process-06.png'
  },
  {
    id: 7,
    title: '회수 및 반품 처리',
    description: '원스탑형 역물류체계 WAB 업무 및 보관',
    icon: 'https://img.icons8.com/3d-fluency/94/refresh.png',
    image: '/image/service-process-07.png'
  },
  {
    id: 8,
    title: '성과 분석 및 CS 관리',
    description: '정확한 데이터 관리로 신뢰 성과 향상',
    icon: 'https://img.icons8.com/3d-fluency/94/total-sales.png',
    image: '/image/service-process-08.png'
  }
];

export default function ServiceProcess ({ id } : ServiceProcessProps) {
  const containerRef = useRef<HTMLElement>(null);


  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });

  return (
    <section
      className="s-section__content"
      id={id}
      ref={containerRef}
      style={{ position: "relative", paddingBottom: "300px" }}
    >
      <div className="s-section__header">
        <span className="s-section__subtitle">KEEPSEND 프로세스</span>
        <h2 className="s-section__title">당신의 브랜드가 닿는 길, 그 안의 모든 과정</h2>
        <p className="s-section__description">단계마다 검증된 관리 체계로, 신뢰받는 B2B 파트너십을 완성합니다.</p>
      </div>

      <div style={{ position: "relative", maxWidth: "1200px", margin: "0 auto" }}>
        {/* 1. 배경 라인 (회색 점선) */}
        <div
          className='absolute top-0 bottom-0 left-[20px] md:left-[50%] w-[2px] h-[calc(100%_-_10px)]'
          style={{
            background: "#e5e7eb", transform: "translateX(-50%)", zIndex: 0
          }}
        />
        {/* 2. 진행 라인 (파란색 실선 - 스크롤에 따라 늘어남) */}
        <motion.div
          className='absolute top-0 w-[4px] left-[18px] md:left-[calc(50%_-_2px)]'
          style={{
            background: "#3b82f6", // 브랜드 컬러
            transform: "translateX(-50%)",
            originY: 0, // 위에서부터 자라남
            scaleY: scrollYProgress, // 스크롤에 매핑
            height: "100%",
            zIndex: 1,
          }}
        />
        {/* 3. 각 단계별 아이템 */}
        <div className='flex flex-col gap-[230px] md:gap-[170px] relative z-[2]'>
          {processSteps.map((step, idx) => (
            <ProcessStepItem key={step.id} step={step} index={idx} />
          ))}

          {/* 4. Final Step: Keepsend 통합 솔루션 */}
          {/* <motion.div
            initial={{ opacity: 1, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "-100px" }}
            transition={{ duration: 0.5, delay: 0.1 }}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              position: "relative",
              marginTop: "40px"
            }}
          >
            <div
              className="w-[180px] h-[180px] rounded-full  flex items-center justify-center  z-10 bg-gradient-to-br from-primary to-secondary  shadow-lg shadow-primary/30"
            >
              <TypoLogo />
            </div>
          </motion.div> */}
        </div>
      </div>
    </section>
  );
};


// 개별 단계 컴포넌트
function ProcessStepItem({ step, index }: { step: ProcessStep; index: number }) {
  // 지그재그 배치를 위한 로직 (짝수: 오른쪽 / 홀수: 왼쪽)
  // const isRightSide = index % 2 === 0;
  const isRightSide = true;

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, margin: "-100px" }}
      transition={{ duration: 0.5, delay: 0.1 }}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: isRightSide ? "flex-end" : "flex-start",
        position: "relative",
      }}
    >
      {/* 텍스트 카드 */}
      <div
        className="w-[90vw] lg:w-[800px] ml-[18px] md:ml-[50%]"
      >
        <div
          // service-process__step
          className="flex items-center w-full gap-4 opacity-100 translate-y-0"
        >
          {/* service-process__step-img */}
          <div className="relative z-20 flex h-[50px] w-[50px] flex-shrink-0 items-center justify-center rounded-full">
            <span className={`absolute top-[-20px] left-[-34px] flex p-3 items-center justify-center rounded-full bg-gradient-to-br from-primary to-secondary text-md font-bold text-white shadow-lg shadow-primary/30`}>
                <img width="50" height="50" src={step.icon} alt="total-sales" className='relative z-22'/>
            </span>
          </div>
          {/* service-process__step-content */}
          <div className="max-w-none" style={{ textAlign: isRightSide ? 'left' : 'right' }}>
            {/* service-process__step-title */}
            <h3 className="mb-1.5 text-2xl font-semibold leading-tight text-foreground">{step.title}</h3>
            {/* service-process__step-description */}
            <p className="text-sm leading-relaxed text-foreground">{step.description}</p>
            <div className="rounded-md absolute top-20 left-20  md:scale-100 md:top-0 md:left-[-85%] overflow-hidden bg-gray-900">
              <img width="280" height="210" src={step.image} />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
