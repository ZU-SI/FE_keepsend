'use client'

import { motion, MotionValue, useScroll, useTransform } from 'framer-motion';
import { CheckCircle, Package, Truck, Warehouse } from 'lucide-react';
import { useRef } from 'react';

interface ServiceB2BTwoProps {
  id: string;
  index: number;
  scrollProgress?: MotionValue<number>;
}

export default function ServiceB2BTwo({ id, index, scrollProgress }: ServiceB2BTwoProps) {
  const ref = useRef(null)

  // target 요소의 스크롤 진행도 생성
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  })

  const truckX = useTransform(scrollYProgress, [0.3, 0.6], ['0%', '100%'])
  const pathOpacity = useTransform(scrollYProgress, [0.1, 0.3, 0.7, 0.9], [0, 1, 1, 0])

  const step1Opacity = useTransform(scrollYProgress, [0.2, 0.35], [0.3, 1])
  const step2Opacity = useTransform(scrollYProgress, [0.35, 0.5], [0.3, 1])
  const step3Opacity = useTransform(scrollYProgress, [0.5, 0.65], [0.3, 1])
  const step4Opacity = useTransform(scrollYProgress, [0.65, 0.8], [0.3, 1])


  const steps = [
    {
      icon: Package,
      label: '주문 접수',
      sublabel: 'AI 챗봇 <br/> AI 자동 분류',
      opacity: step1Opacity,
      colorClass: 's-logistics__step-icon--cyan'
    },
    {
      icon: Warehouse,
      label: '창고 처리',
      sublabel: '수요 예측 <br/> 스마트 분류',
      opacity: step2Opacity,
      colorClass: 's-logistics__step-icon--blue'
    },
    {
      icon: Truck,
      label: '배송',
      sublabel: '정확도 99% <br/> 실시간 추적 <br /> 자동 배차',
      opacity: step3Opacity,
      colorClass: 's-logistics__step-icon--purple'
    },
    {
      icon: CheckCircle,
      label: '배송 완료',
      sublabel: 'AI 최적화 <br/> 킵센드 3PL',
      opacity: step4Opacity,
      colorClass: 's-logistics__step-icon--green'
    }
  ]

  return (
    <div className="s-section__content">
      <div className="s-section__animation">
        <div className="service-process__header">
          <span className="service-process__label">KEEPSEND 특장점</span>
          <h2 className="service-process__title">기업의 니즈를 읽는 전략적 물류 운영의 시작</h2>
          <p className="service-process__description">
            B2B 물류의 복잡함을 구조화하여,
              <br />
            비즈니스 유형 별 환경에 최적화된 맞춤형 물류 서비스를 제공합니다.
          </p>
        </div>
        <section className="s-logistics" ref={ref}>
          <div className="s-logistics__container">
            <div className="s-logistics__content">

          <div className="s-logistics__path">
            {/* Path Line */}
            <motion.div
              className="s-logistics__path-line"
              style={{ opacity: pathOpacity }}
            />

            {/* Steps */}
            <div className="s-logistics__steps">
              {steps.map((step, index) => (
                <motion.div
                  key={index}
                  className="s-logistics__step"
                  style={{ opacity: step.opacity }}
                >
                  <div className={`s-logistics__step-icon ${step.colorClass}`}>
                    <step.icon />
                  </div>
                  <h3 className="s-logistics__step-title">{step.label}</h3>
                  <p className="s-logistics__step-description" dangerouslySetInnerHTML={{__html: step.sublabel}} />
                </motion.div>
              ))}
            </div>

            {/* Moving Truck */}
            <motion.div
              className="s-logistics__truck"
              style={{ left: truckX }}
            >
              <div className="s-logistics__truck-wrapper">
                <div className="s-logistics__truck-glow" />
                <div className="s-logistics__truck-icon">
                  <Truck />
                </div>
                <div className="s-logistics__truck-trail" />
              </div>
            </motion.div>
          </div>

          {/* Stats */}
          <motion.div
            className="s-logistics__stats"
            style={{ opacity: pathOpacity }}
          >
            <div className="s-logistics__stats-card">
              <h4 className="s-logistics__stats-label">처리 시간</h4>
              <p className="s-logistics__stats-value">2.5초</p>
              <p className="s-logistics__stats-description">AI 챗봇 접수 <br/> AI 자동 분류</p>
            </div>
            <div className="s-logistics__stats-card">
              <h4 className="s-logistics__stats-label">정확도</h4>
              <p className="s-logistics__stats-value">99%</p>
              <p className="s-logistics__stats-description">배송 정확도</p>
            </div>
            <div className="s-logistics__stats-card">
              <h4 className="s-logistics__stats-label">비용 절감</h4>
              <p className="s-logistics__stats-value">-35%</p>
              <p className="s-logistics__stats-description">물류 비용</p>
            </div>
          </motion.div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
