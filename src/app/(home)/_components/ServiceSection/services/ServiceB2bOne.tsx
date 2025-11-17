'use client';

import { useEffect, useRef, useState } from 'react';

interface Problem {
  title: string;
  description: string;
  relatedTalkIndices?: number[]; // Indices of related talk items
}

interface ProblemSectionProps {
  id?: string;
  index?: number;
  problems?: Problem[];
  talks?: string[];
  centerImageSrc?: string;
  centerImageAlt?: string;
}

const defaultTalks: string[] = [
  "상품 위치가 파악이 안되니까 고객 문의 들어 올 때마다 창고랑 운송팀에 일일이 확인해야 해서 너무 힘듭니다.",
  "이슈 하나하나 터질 때마다 매번 새로 개발하고, 인력, 장비도 그만큼 비용도 만만치가 않네요.",
  "수요 예측이 안돼서 재고와 재고지 둘 다 리스크가 너무 심합니다.",
  "거래처마다 요청 방식이 달라 납기 일정 맞추려면 기존 시스템으로는 역부족이에요.",
  "응답이 제대로 왔는 건지 검증도 안되고, 엑셀로 확인하다 보면 오류가 너무 많이 발생해요.",
  "사업을 키우는데 시스템이 그걸 못 따라가네요.",
  "확장보다 유지가 더 버겁습니다."
];

const defaultProblems: Problem[] = [
  {
    title: "확장, 예측의 한계",
    description: "멈춰버린 기업 성장, 꽉 막힌 인프라",
    relatedTalkIndices: [2, 5, 6]
  },
  {
    title: "관리 포인트 과총",
    description: "복잡한 구조, 낮은 효율, 비용 부담",
    relatedTalkIndices: [0, 1]
  },
  {
    title: "미 검증, 정산",
    description: "불투명한 정산과 데이터",
    relatedTalkIndices: [4]
  },
  {
    title: "추적 및 보안 취약",
    description: "실시간 모니터링 부재, 정보 보안 리스크",
    relatedTalkIndices: [0, 3]
  }
];

export default function ServiceB2bOne({
  id = "service-problem",
  index = 0,
  problems = defaultProblems,
  talks = defaultTalks,
  centerImageSrc,
  centerImageAlt = "Problem solution"
}: ProblemSectionProps) {
  const [visibleProblems, setVisibleProblems] = useState<boolean[]>(
    new Array(problems.length).fill(false)
  );
  const [visibleTalks, setVisibleTalks] = useState<number>(0);
  const [hoveredProblemIndex, setHoveredProblemIndex] = useState<number | null>(null);
  const problemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const chatRef = useRef<HTMLDivElement>(null);
  const chatMessagesRef = useRef<HTMLDivElement>(null);
  const chatBubbleRefs = useRef<(HTMLDivElement | null)[]>([]);
  const sectionRef = useRef<HTMLDivElement>(null);

  // Intersection Observer for problem items (scroll animation)
  useEffect(() => {
    const observers = problemRefs.current.map((ref, idx) => {
      if (!ref) return null;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setTimeout(() => {
                setVisibleProblems((prev) => {
                  const newState = [...prev];
                  newState[idx] = true;
                  return newState;
                });
              }, idx * 200);
            }
          });
        },
        {
          threshold: 0.2,
          rootMargin: '0px 0px -10% 0px'
        }
      );

      observer.observe(ref);
      return observer;
    });

    return () => {
      observers.forEach((observer) => observer?.disconnect());
    };
  }, [problems.length]);

  // Sequential chat bubble animation with smooth scroll
  useEffect(() => {
    if (!chatRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && visibleTalks === 0) {
            talks.forEach((_, idx) => {
              setTimeout(() => {
                setVisibleTalks((prev) => Math.max(prev, idx + 1));

                // Smooth scroll to new item
                if (chatMessagesRef.current && chatBubbleRefs.current[idx]) {
                  const container = chatMessagesRef.current;
                  const newBubble = chatBubbleRefs.current[idx];

                  if (newBubble) {
                    setTimeout(() => {
                      container.scrollTo({
                        top: container.scrollHeight,
                        behavior: 'smooth'
                      });
                    }, 100);
                  }
                }
              }, idx * 600);
            });
          }
        });
      },
      {
        threshold: 0.3
      }
    );

    observer.observe(chatRef.current);

    return () => observer.disconnect();
  }, [talks.length, visibleTalks]);

  // Scroll to first highlighted chat bubble when hovering problem
  useEffect(() => {
    if (hoveredProblemIndex !== null) {
      const relatedIndices = problems[hoveredProblemIndex]?.relatedTalkIndices;
      if (relatedIndices && relatedIndices.length > 0) {
        const firstRelatedIndex = relatedIndices[0];
        const firstBubble = chatBubbleRefs.current[firstRelatedIndex];

        // if (firstBubble) {
        //   firstBubble.scrollIntoView({
        //     behavior: 'smooth',
        //     block: 'center'
        //   });
        // }
      }
    }
  }, [hoveredProblemIndex, problems]);

  // Scroll functions for chat box
  const scrollToTop = () => {
    if (chatMessagesRef.current) {
      chatMessagesRef.current.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  };

  const scrollToBottom = () => {
    if (chatMessagesRef.current) {
      chatMessagesRef.current.scrollTo({
        top: chatMessagesRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section className="service-problem" ref={sectionRef} id={id}>
      <div className="service-problem__container">
        {/* Header - Updated structure */}
        <div className="service-problem__header">
          <div className="service-problem__title-group">
            <h3 className="service-problem__subtitle">Pain Points</h3>
            <h2 className="service-problem__title">
              B2B 3PL 비즈니스, 이런 불편함 겪고 계신가요?
            </h2>
          </div>
        </div>
        <p className="service-problem__description">
          실제 현장에서 마주하는 문제들을 우리가 해결합니다
        </p>

        {/* Content Grid */}
        <div className="service-problem__content">
          {/* Chat Box - Left on desktop, Top on mobile */}
          <div className="service-problem__chat-box" ref={chatRef}>
            <div className="service-problem__chat-header">
              <div className="service-problem__chat-status"></div>
              <span className="service-problem__chat-title">
                실제 현장의 목소리
              </span>
            </div>
            <div className="service-problem__chat-messages" ref={chatMessagesRef}>
              {talks.map((talk, idx) => {
                const isHighlighted = hoveredProblemIndex !== null &&
                  problems[hoveredProblemIndex]?.relatedTalkIndices?.includes(idx);

                return (
                  <div
                    key={idx}
                    ref={(el) => (chatBubbleRefs.current[idx] = el)}
                    className={`service-problem__chat-bubble ${
                      idx < visibleTalks ? 'service-problem__chat-bubble--visible' : ''
                    } ${
                      idx % 2 === 0 ? 'service-problem__chat-bubble--left' : 'service-problem__chat-bubble--right'
                    } ${
                      isHighlighted ? 'service-problem__chat-bubble--highlighted' : ''
                    }`}
                    style={{
                      transitionDelay: `${idx * 0.1}s`
                    }}
                  >
                    <div className="service-problem__bubble-content">
                      <p>{talk}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Scroll Buttons */}
            <div className="service-problem__scroll-buttons">
              <button
                className="service-problem__scroll-button service-problem__scroll-button--up"
                onClick={scrollToTop}
                aria-label="Scroll to top"
              >
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M12 19V5M12 5L5 12M12 5L19 12"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
              <button
                className="service-problem__scroll-button service-problem__scroll-button--down"
                onClick={scrollToBottom}
                aria-label="Scroll to bottom"
              >
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M12 5V19M12 19L5 12M12 19L19 12"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
          </div>

          {/* Center Arrow + Image - Desktop only */}
          <div className="service-problem__center-divider">
            <div className="service-problem__arrow-wrapper">
              <p className="service-problem__arrow-text">우리가 해결하는 문제</p>
              <svg
                className="service-problem__arrow-icon"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M5 12H19M19 12L12 5M19 12L12 19"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            {centerImageSrc && (
              <div className="service-problem__center-image">
                <img src={centerImageSrc} alt={centerImageAlt} />
              </div>
            )}
          </div>

          {/* Arrow - Mobile/Tablet only */}
          <div className="service-problem__mobile-arrow">
            <svg
              className="service-problem__mobile-arrow-icon"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 5V19M12 19L5 12M12 19L19 12"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <p className="service-problem__mobile-arrow-text">우리가 해결하는 문제</p>
          </div>

          {/* Problem List - Right on desktop, Bottom on mobile */}
          <div className="service-problem__problem-list">
            {problems.map((problem, idx) => (
              <div
                key={idx}
                ref={(el) => (problemRefs.current[idx] = el)}
                className={`service-problem__problem-item ${
                  visibleProblems[idx] ? 'service-problem__problem-item--visible' : ''
                }`}
                onMouseEnter={() => setHoveredProblemIndex(idx)}
                onMouseLeave={() => setHoveredProblemIndex(null)}
              >
                <div className="service-problem__problem-number">
                  {String(idx + 1).padStart(2, '0')}
                </div>
                <div className="service-problem__problem-content">
                  <h3 className="service-problem__problem-title">
                    {problem.title}
                  </h3>
                  <p className="service-problem__problem-description">
                    {problem.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
