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
  const sectionRef = useRef<HTMLElement | null>(null);

  // 타임라인(왼쪽) 영역의 스크롤 진행도
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"] // 섹션이 뷰포트에 들어오고 나갈 때 전 범위를 캡처
  });

  // 트럭의 Y축 이동 (모바일/데스크탑 동일: 수직 이동)
  // progress 구간은 적절히 조정 가능
  const truckY = useTransform(scrollYProgress, [0.05, 0.95], ['0%', '100%']);
  const pathOpacity = useTransform(scrollYProgress, [0.05, 0.15, 0.85, 0.95], [0, 1, 1, 0]);

  // 각 step 노출 opacity (세로 스크롤에 따라 단계별 강조)
  const step1Opacity = useTransform(scrollYProgress, [0.05, 0.25], [0.3, 1]);
  const step2Opacity = useTransform(scrollYProgress, [0.25, 0.45], [0.3, 1]);
  const step3Opacity = useTransform(scrollYProgress, [0.45, 0.65], [0.3, 1]);
  const step4Opacity = useTransform(scrollYProgress, [0.65, 0.9], [0.3, 1]);

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
  ];

  // 오른쪽 카드 컨텐츠 매핑 (요구하신 내용 기반)
  const cardsByStep = [
    // step 1
    [
      {
        title: 'AI 챗봇',
        meta: '처리 시간 2.5초로 단축',
        description: '자동 접수 및 분류로 운영 비용과 시간 절감'
      },
      {
        title: '킵센드 3PL',
        meta: '통합 서비스 시작',
        description: '주문 접수부터 배송 완료까지 통합 운영'
      }
    ],
    // step 2
    [
      {
        title: '스마트 분류',
        meta: '수요 예측',
        description: 'AI 기반 수요 예측으로 재고 최적화'
      },
      {
        title: '비용 절감',
        meta: '물류 저장 비용 절감',
        description: '창고 운영 효율화로 비용 절감'
      }
    ],
    // step 3
    [
      {
        title: '배송 정확도 99%',
        meta: '자동 배차, 실시간 추적',
        description: '정확한 라우팅 및 실시간 모니터링 제공'
      }
    ],
    // step 4
    [
      {
        title: '킵센드 3PL',
        meta: '통합 서비스 완벽 케어',
        description: '끝까지 책임지는 통합 물류 서비스'
      }
    ]
  ];

  return (
    <div className="s-section__content">
      <div className="s-section__header">
        <div className="s-section__title-group">
          <h3 className="s-section__subtitle">KEEPSEND 특장점</h3>
          <h2 className="s-section__title">
            기업의 니즈를 읽는 전략적 물류 운영의 시작
          </h2>
          <p className="s-section__description">
            B2B 물류의 복잡함을 구조화하여,
            <br />
            비즈니스 유형 별 환경에 최적화된 맞춤형 물류 서비스를 제공합니다.
          </p>
        </div>
      </div>

      <section className="s-logistics" ref={sectionRef} aria-labelledby={id}>
        <div className="s-logistics__container">
          <div className="s-logistics__content">

            {/* Grid: left timeline + right cards */}
            <div className="s-logistics__grid">

              {/* LEFT: timeline + truck */}
              <div className="s-logistics__left">
                <div className="s-logistics__path" aria-hidden>
                  {/* Vertical path line */}
                  <motion.div
                    className="s-logistics__path-line"
                    style={{ opacity: pathOpacity }}
                  />

                  {/* Steps (aligned vertically) */}
                  <div className="s-logistics__steps">
                    {steps.map((step, idx) => {
                      const Icon = step.icon;
                      return (
                        <motion.div
                          key={idx}
                          className="s-logistics__step"
                          style={{ opacity: step.opacity }}
                        >
                          <div className={`s-logistics__step-icon ${step.colorClass}`}>
                            <Icon />
                          </div>
                          <h3 className="s-logistics__step-title">{step.label}</h3>
                          <p
                            className="s-logistics__step-description"
                            dangerouslySetInnerHTML={{ __html: step.sublabel }}
                          />
                        </motion.div>
                      );
                    })}
                  </div>

                  {/* Moving Truck - vertical motion */}
                  <motion.div
                    className="s-logistics__truck"
                    style={{ top: truckY }}
                    aria-hidden
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
              </div>

              {/* RIGHT: cards for each step */}
              <div className="s-logistics__right">
                {cardsByStep.map((cards, stepIndex) => (
                  <div key={stepIndex} className="s-logistics__point">
                    <div className="s-logistics__point-header">
                      <h4 className="s-logistics__point-title">{steps[stepIndex].label}</h4>
                    </div>

                    <div className="s-logistics__point-cards">
                      {cards.map((card, i) => (
                        <article key={i} className="s-logistics__card">
                          <h5 className="s-logistics__card-title">{card.title}</h5>
                          <p className="s-logistics__card-meta">{card.meta}</p>
                          <p className="s-logistics__card-desc">{card.description}</p>
                        </article>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

            </div> {/* /.s-logistics__grid */}

          </div>
        </div>
      </section>
    </div>
  );
}
