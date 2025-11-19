import React, { useRef } from 'react';
import { motion, useScroll } from 'framer-motion';

interface ServiceProcessProps {
  id: string;
  index: number;
}

interface ProcessStep {
  id: number;
  title: string;
  description: string;
}

const ServiceProcess: React.FC<ServiceProcessProps> = ({ id, index }) => {
  const containerRef = useRef<HTMLElement>(null);

  const processSteps: ProcessStep[] = [
    {
      id: 1,
      title: '수요 분석 및 계약 체결',
      description: '비즈니스 모델 기반 최적화된 물류 설계 시작!'
    },
    {
      id: 2,
      title: '입고 예약 및 상품 등록',
      description: '입고부터 출고까지 정확한 입고서비스 운영'
    },
    {
      id: 3,
      title: '보관 및 재고 운영 관리',
      description: '안전하고 안정적인 최적화된 보관 환경 제공'
    },
    {
      id: 4,
      title: '주문 접수 및 출고 계획 수립',
      description: '데이터 기반의 출고 다중 출고 방식 적용'
    },
    {
      id: 5,
      title: '피킹 및 출고 준비',
      description: '데이터 지면화 출고 대응 출고 시스템 적용'
    },
    {
      id: 6,
      title: '배송 및 물품 관리',
      description: '신속하고 투명한 배송추적 즉각 신뢰 관리'
    },
    {
      id: 7,
      title: '회수 및 반품 처리',
      description: '원스탑형 역물류체계 WAB 업무 및 보관'
    },
    {
      id: 8,
      title: '성과 분석 및 CS 관리',
      description: '정확한 데이터 관리로 신뢰 성과 향상'
    }
  ];

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });

  return (
    <section
      className="s-section__content"
      id={id}
      ref={containerRef}
      style={{ position: "relative", paddingBottom: "150px" }}
    >
      <div className="s-section__header">
        <span className="s-section__subtitle">KEEPSEND 프로세스</span>
        <h2 className="s-section__title">당신의 브랜드가 닿는 길, 그 안의 모든 과정</h2>
        <p className="s-section__description">단계마다 검증된 관리 체계로, 신뢰받는 B2B 파트너십을 완성합니다.</p>
      </div>

      <div style={{ position: "relative", maxWidth: "1200px", margin: "0 auto" }}>
        {/* 1. 배경 라인 (회색 점선) */}
        <div
          style={{
            position: "absolute", left: "50%", top: 0, bottom: 0, width: "2px",
            background: "#e5e7eb", transform: "translateX(-50%)", zIndex: 0
          }}
        />

        {/* 2. 진행 라인 (파란색 실선 - 스크롤에 따라 늘어남) */}
        <motion.div
          style={{
            position: "absolute",
            left: "50%",
            top: 0,
            width: "4px",
            background: "#3b82f6", // 브랜드 컬러
            transform: "translateX(-50%)",
            originY: 0, // 위에서부터 자라남
            scaleY: scrollYProgress, // 스크롤에 매핑
            height: "100%",
            zIndex: 1,
          }}
        />

        {/* 3. 각 단계별 아이템 */}
        <div style={{ display: "flex", flexDirection: "column", gap: "80px", position: "relative", zIndex: 2 }}>
          {processSteps.map((step, idx) => (
            <ProcessStepItem key={step.id} step={step} index={idx} />
          ))}

          {/* 4. Final Step: Keepsend 통합 솔루션 */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
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
              style={{
                width: "180px",
                height: "180px",
                borderRadius: "50%",
                background: "linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)", // Blue gradient
                boxShadow: "0 10px 25px rgba(59, 130, 246, 0.4)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
                color: "white",
                fontWeight: "bold",
                fontSize: "1.25rem",
                lineHeight: "1.4",
                zIndex: 10,
                border: "4px solid white"
              }}
            >
              keepsend
              <br />
              통합 솔루션
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// 개별 단계 컴포넌트
function ProcessStepItem({ step, index }: { step: ProcessStep; index: number }) {
  // 지그재그 배치를 위한 로직 (짝수: 왼쪽 / 홀수: 오른쪽)
  // index 0: isEven=true -> flex-end (Right side)
  // index 1: isEven=false -> flex-start (Left side)
  const isEven = index % 2 === 0;
  const isRightSide = isEven;

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
      {/* 중앙 노드 (원형 점) */}
      <div
        style={{
          position: "absolute",
          left: "50%",
          transform: "translateX(-50%)",
          width: "20px",
          height: "20px",
          background: "#fff",
          border: "4px solid #3b82f6",
          borderRadius: "50%",
          zIndex: 10
        }}
      />

      {/* 텍스트 카드 (기존 UI 컴포넌트 재사용) */}
      <div
        className="service-process__item-wrapper"
        style={{
          // Spacing from center rail
          marginRight: isRightSide ? "0" : "80px",
          marginLeft: isRightSide ? "80px" : "0"
        }}
      >
        <div
          className="service-process__step visible"
          style={{
            width: '100%',
            // Right side: Image Left (Row)
            // Left side: Image Right (Row Reverse)
            flexDirection: isRightSide ? 'row' : 'row-reverse',
            alignItems: 'center',
            textAlign: isRightSide ? 'left' : 'right'
          }}
        >
          <div className="service-process__step-img" style={{ margin: 0, flexShrink: 0 }}>
            img
            <span className="service-process__step-num">
              {step.id}
            </span>
          </div>
          <div className="service-process__step-content" style={{ textAlign: isRightSide ? 'left' : 'right' }}>
            <h3 className="service-process__step-title">{step.title}</h3>
            <p className="service-process__step-description">{step.description}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default ServiceProcess;
