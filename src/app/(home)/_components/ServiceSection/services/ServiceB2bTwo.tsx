"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
// import styles from './ProcessFlow.module.scss'; // SCSS 사용 시

const steps = [
  { id: 1, title: "주문 수집 (Order)", desc: "다양한 채널의 주문을 실시간으로 통합 수집합니다.", icon: "🛒" },
  { id: 2, title: "입고 관리 (Inbound)", desc: "바코드 스캔으로 빠르고 정확하게 입고를 처리합니다.", icon: "📥" },
  { id: 3, title: "창고 관리 (WMS)", desc: "적재 위치 최적화 및 로케이션 관리를 자동화합니다.", icon: "🏭" },
  { id: 4, title: "재고 관리 (Inventory)", desc: "실시간 재고 동기화로 품절 및 과재고를 방지합니다.", icon: "📦" },
  { id: 5, title: "배송 처리 (Delivery)", desc: "최적의 운송사를 배정하고 운송장을 출력합니다.", icon: "🚚" },
  { id: 6, title: "정산 관리 (Settlement)", desc: "배송 완료 건에 대한 운임 및 정산 내역을 확정합니다.", icon: "💰" },
];

export default function ServiceB2bTwo() {
  const containerRef = useRef<HTMLDivElement>(null);

  // 스크롤 진행률 감지 (0 ~ 1)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"], // 요소의 시작이 화면 중앙에 올 때 ~ 끝이 화면 중앙에 올 때
  });

  return (
    <section
      ref={containerRef}
      style={{ padding: "100px 20px", maxWidth: "800px", margin: "0 auto", position: "relative" }}
    >
      <div style={{ textAlign: "center", marginBottom: "80px" }}>
        <h2 style={{ fontSize: "2rem", fontWeight: "bold", marginBottom: "16px" }}>
          One-Stop Logistics Process
        </h2>
        <p style={{ color: "#666" }}>
          주문부터 정산까지, 물류의 모든 흐름이 끊김 없이 연결됩니다.
        </p>
      </div>

      <div style={{ position: "relative" }}>
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
          {steps.map((step, index) => (
            <ProcessStep
              key={step.id}
              step={step}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

// 개별 단계 컴포넌트
function ProcessStep({ step, index }: { step: any; index: number }) {
  // 지그재그 배치를 위한 로직 (짝수: 왼쪽 / 홀수: 오른쪽)
  const isEven = index % 2 === 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, margin: "-100px" }} // 화면에 들어올 때 애니메이션
      transition={{ duration: 0.5, delay: 0.1 }}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: isEven ? "flex-end" : "flex-start",
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

      {/* 텍스트 카드 */}
      <div
        style={{
          width: "40%",
          padding: "20px",
          background: "#f8fafc",
          borderRadius: "12px",
          boxShadow: "0 4px 6px rgba(0,0,0,0.05)",
          textAlign: isEven ? "right" : "left",
          marginRight: isEven ? "40px" : "0",
          marginLeft: isEven ? "0" : "40px"
        }}
      >
        <div style={{ fontSize: "2rem", marginBottom: "10px" }}>{step.icon}</div>
        <h3 style={{ fontSize: "1.2rem", fontWeight: "bold", color: "#1e293b", marginBottom: "8px" }}>
          {step.title}
        </h3>
        <p style={{ fontSize: "0.9rem", color: "#64748b", lineHeight: "1.5" }}>
          {step.desc}
        </p>
      </div>
    </motion.div>
  );
}