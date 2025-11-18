import React, { useEffect, useRef, useState } from 'react';

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
  const [visibleSteps, setVisibleSteps] = useState<number[]>([]);
  const [visibleLines, setVisibleLines] = useState<number[]>([]);
  const [isDesktop, setIsDesktop] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);

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

  // 화면 크기 감지
  useEffect(() => {
    const checkDesktop = () => {
      setIsDesktop(window.innerWidth >= 768);
    };

    checkDesktop();
    window.addEventListener('resize', checkDesktop);

    return () => window.removeEventListener('resize', checkDesktop);
  }, []);

  // 데스크탑: 섹션 진입 시 자동 순차 애니메이션
  useEffect(() => {
    if (!isDesktop) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          startAutoAnimation();
        }
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: 0.2,
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, [isDesktop]);

  // 모바일/태블릿: 각 스텝별 스크롤 기반 애니메이션
  useEffect(() => {
    if (isDesktop) return;

    const observers: IntersectionObserver[] = [];

    stepRefs.current.forEach((stepRef, idx) => {
      if (!stepRef) return;

      const observer = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            const stepId = processSteps[idx].id;
            setVisibleSteps((prev) => {
              if (!prev.includes(stepId)) {
                return [...prev, stepId];
              }
              return prev;
            });

            // 라인 애니메이션 (마지막 단계는 라인이 없음)
            if (idx < processSteps.length - 1) {
              setTimeout(() => {
                setVisibleLines((prev) => {
                  if (!prev.includes(stepId)) {
                    return [...prev, stepId];
                  }
                  return prev;
                });
              }, 300);
            }
          }
        },
        {
          root: null,
          rootMargin: '0px',
          threshold: 0.3,
        }
      );

      observer.observe(stepRef);
      observers.push(observer);
    });

    return () => {
      observers.forEach(observer => observer.disconnect());
    };
  }, [isDesktop]);

  // 데스크탑 자동 애니메이션 시작 함수
  const startAutoAnimation = () => {
    processSteps.forEach((step, idx) => {
      setTimeout(() => {
        setVisibleSteps((prev) => [...prev, step.id]);

        // 라인 애니메이션 (마지막 단계는 라인이 없음)
        if (idx < processSteps.length - 1) {
          setTimeout(() => {
            setVisibleLines((prev) => [...prev, step.id]);
          }, 300);
        }
      }, idx * 600);
    });
  };

  return (
    <section className="s-section__content" id={id} ref={sectionRef}>
        <div className="s-section__header">
          <span className="s-section__subtitle">KEEPSEND 프로세스</span>
          <h2 className="s-section__title">당신의 브랜드가 닿는 길, 그 안의 모든 과정</h2>
          <p className="s-section__description">단계마다 검증된 관리 체계로, 신뢰받는 B2B 파트너십을 완성합니다.</p>
        </div>
        <div className="service-process__flow">
          <div className="service-process__row service-process__row--first">
            {processSteps.slice(0, 4).map((step, idx) => (
              <React.Fragment key={step.id}>
                <div
                  ref={(el) => stepRefs.current[idx] = el}
                  className={`service-process__step ${visibleSteps.includes(step.id) ? 'visible' : ''}`}
                >
                  <div className="service-process__step-img">
                    img
                  <span className="service-process__step-num">
                    {step.id}
                  </span>
                  </div>
                  <div className="service-process__step-content">
                    <h3 className="service-process__step-title">{step.title}</h3>
                    <p className="service-process__step-description">{step.description}</p>
                  </div>
                </div>
                {idx < 3 && (
                  <div
                    className={`service-process__line service-process__line--horizontal ${visibleLines.includes(step.id) ? 'visible' : ''}`}
                  >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M12 5L19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>

          {/* 수직 연결선 (위쪽) - 4에서 5로 가는 화살표 */}
          <div
            className={`service-process__line service-process__line--vertical service-process__line--top ${visibleLines.includes(4) ? 'visible' : ''}`}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 19V5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M5 12L12 5L19 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>

          <div className="service-process__row service-process__row--second">
            {processSteps.slice(4, 8).reverse().map((step, idx) => {
              const originalIdx = processSteps.findIndex(s => s.id === step.id);
              return (
                <React.Fragment key={step.id}>
                  <div
                    ref={(el) => stepRefs.current[originalIdx] = el}
                    className={`service-process__step ${visibleSteps.includes(step.id) ? 'visible' : ''}`}
                  >
                    <div className="service-process__step-img">
                      img
                    <span className="service-process__step-num">
                      {step.id}
                    </span>
                    </div>
                    <div className="service-process__step-content">
                      <h3 className="service-process__step-title">{step.title}</h3>
                      <p className="service-process__step-description">{step.description}</p>
                    </div>
                  </div>
                  {idx < 3 && (
                    <div
                      className={`service-process__line service-process__line--horizontal service-process__line--reverse ${visibleLines.includes(step.id) ? 'visible' : ''}`}
                    >
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M19 12H5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M12 19L5 12L12 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                  )}
                </React.Fragment>
              );
            })}
          </div>
        </div>
    </section>
  );
};

export default ServiceProcess;
