'use client';

import { useEffect, useRef, useState } from 'react';

interface Problem {
  title: string;
  description: string;
  relatedTalkIndices?: number[];
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
  "사업을 키우는데 시스템이 그걸 못 따라가네요.",
  "확장보다 유지가 더 버겁습니다.",
  "이슈 하나하나 터질 때마다 매번 새로 개발하고, 인력, 장비도 그만큼 비용도 만만치가 않네요.",
  "수요 예측이 안돼서 재고와 재고지 둘 다 리스크가 너무 심합니다.",
  "거래처마다 요청 방식이 달라 납기 일정 맞추려면 기존 시스템으로는 역부족이에요.",
  "응답이 제대로 왔는 건지 검증도 안되고, 엑셀로 확인하다 보면 오류가 너무 많이 발생해요.",
  "상품 위치가 파악이 안되니까 고객 문의 들어 올 때마다 창고랑 운송팀에 일일이 확인해야 해서 너무 힘듭니다.",
];

const defaultProblems: Problem[] = [
  {
    title: "확장, 예측의 한계",
    description: "멈춰버린 기업 성장, 꽉 막힌 인프라",
    relatedTalkIndices: [0,1]
  },
  {
    title: "관리 포인트 과총",
    description: "복잡한 구조, 낮은 효율, 비용 부담",
    relatedTalkIndices: [2,3]
  },
  {
    title: "미 검증, 정산",
    description: "불투명한 정산과 데이터",
    relatedTalkIndices: [4,5]
  },
  {
    title: "추적 및 보안 취약",
    description: "실시간 모니터링 부재, 정보 보안 리스크",
    relatedTalkIndices: [6,7]
  }
];

export default function ServiceB2bOne({
  id = "service-problem",
  problems = defaultProblems,
  talks = defaultTalks,
}: ProblemSectionProps) {
  const [visibleProblems, setVisibleProblems] = useState<boolean[]>(
    new Array(problems.length).fill(false)
  );
  const [allProblemsLoaded, setAllProblemsLoaded] = useState(false);
  const [currentLoadingProblem, setCurrentLoadingProblem] = useState<number>(-1);
  const [hoveredProblemIndex, setHoveredProblemIndex] = useState<number | null>(null);
  const [reorderedTalks, setReorderedTalks] = useState<Array<{text: string, originalIndex: number}>>([]);

  const problemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const chatMessagesRef = useRef<HTMLDivElement>(null);
  const chatBubbleRefs = useRef<(HTMLDivElement | null)[]>([]);
  const sectionRef = useRef<HTMLDivElement>(null);

  // Reorder talks based on problem sequence
  useEffect(() => {
    const ordered: Array<{text: string, originalIndex: number}> = [];
    const usedIndices = new Set<number>();

    // Add talks in problem order
    problems.forEach(problem => {
      if (problem.relatedTalkIndices) {
        problem.relatedTalkIndices.forEach(idx => {
          if (!usedIndices.has(idx) && idx < talks.length) {
            ordered.push({ text: talks[idx], originalIndex: idx });
            usedIndices.add(idx);
          }
        });
      }
    });

    // Add remaining talks
    talks.forEach((talk, idx) => {
      if (!usedIndices.has(idx)) {
        ordered.push({ text: talk, originalIndex: idx });
      }
    });

    setReorderedTalks(ordered);
  }, [problems, talks]);

  // Sequential problem loading with related chat highlighting
  useEffect(() => {
    if (!sectionRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && currentLoadingProblem === -1) {
            // Start sequential loading
            problems.forEach((_, idx) => {
              setTimeout(() => {
                setCurrentLoadingProblem(idx);
                setVisibleProblems((prev) => {
                  const newState = [...prev];
                  newState[idx] = true;
                  return newState;
                });

                // Check if all loaded
                if (idx === problems.length - 1) {
                  setTimeout(() => {
                    setAllProblemsLoaded(true);
                    setCurrentLoadingProblem(-1);
                  }, 1000);
                }
              }, idx * 1200);
            });
          }
        });
      },
      {
        threshold: 0.3
      }
    );

    observer.observe(sectionRef.current);

    return () => observer.disconnect();
  }, [problems.length, currentLoadingProblem]);

  // Scroll functions
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

  // Check if chat should be highlighted
  const isChatHighlighted = (originalIndex: number): boolean => {
    if (!allProblemsLoaded && currentLoadingProblem >= 0) {
      // During loading: highlight chats related to current problem
      return problems[currentLoadingProblem]?.relatedTalkIndices?.includes(originalIndex) || false;
    } else if (allProblemsLoaded && hoveredProblemIndex !== null) {
      // After loading: highlight on hover
      return problems[hoveredProblemIndex]?.relatedTalkIndices?.includes(originalIndex) || false;
    }
    return false;
  };

  // Check if chat should be visible (animated in)
  const isChatVisible = (originalIndex: number): boolean => {
    if (currentLoadingProblem === -1) return true;

    // Show chats up to current problem's related indices
    for (let i = 0; i <= currentLoadingProblem; i++) {
      if (problems[i]?.relatedTalkIndices?.includes(originalIndex)) {
        return true;
      }
    }
    return false;
  };

  return (
    <section className="s-section__content" ref={sectionRef} id={id}>
        {/* Header */}
        <div className="s-section__header">
          <div className="s-section__title-group">
            <h3 className="s-section__subtitle">물류 사업의 고충 및 문제점</h3>
            <h2 className="s-section__title">
              B2B 3PL 번거롭고 어려우신가요?
            </h2>
            <p className="s-section__description">
              여러가지 고충으로 지체되는 사업 확장의 목표를 KEEPSEND가 해결하고 성공까지 함께합니다.
            </p>
          </div>
        </div>
        {/* Main Content Grid */}
        <div className="service-problem__main-grid">
          {/* Problem List - Left on desktop, Top on mobile */}
          <div className="service-problem__problem-list">
            {problems.map((problem, idx) => (
              <div
                key={idx}
                ref={(el) => (problemRefs.current[idx] = el)}
                className={`service-problem__problem-item ${
                  visibleProblems[idx] ? 'service-problem__problem-item--visible' : ''
                }`}
                onMouseEnter={() => allProblemsLoaded ? setHoveredProblemIndex(idx) : null}
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

          {/* Center Divider - Responsive */}
          <div className="service-problem__divider">
            <span className="service-problem__divider-icon">🧐</span>
            <p className="service-problem__divider-text">우리가 해결하는 문제</p>
          </div>

          {/* Chat Box - Right on desktop, Bottom on mobile */}
          <div className="service-problem__chat-box">
            <div className="service-problem__chat-header">
              <div className="service-problem__chat-status"></div>
              <span className="service-problem__chat-title">
                실제 현장의 목소리
              </span>
            </div>
            <div className="service-problem__chat-messages" ref={chatMessagesRef}>
              {reorderedTalks.map((talk, idx) => {
                const isHighlighted = isChatHighlighted(talk.originalIndex);
                const isVisible = isChatVisible(talk.originalIndex);

                return (
                  <div
                    key={idx}
                    ref={(el) => (chatBubbleRefs.current[idx] = el)}
                    className={`service-problem__chat-bubble ${
                      isVisible ? 'service-problem__chat-bubble--visible' : ''
                    }${
                      isHighlighted ? 'service-problem__chat-bubble--highlighted' : ''
                    } ${idx % 2 === 1? 'service-problem__chat-bubble--left' : 'service-problem__chat-bubble--right'}`}
                  >
                    <div className="service-problem__bubble-content">
                      <p>{talk.text}</p>
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
        </div>
    </section>
  );
}
