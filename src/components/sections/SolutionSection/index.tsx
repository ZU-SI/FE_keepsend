"use client";

import { useEffect, useRef, useState } from "react";
import styles from "../ServiceSection/serviceSection.module.css";

import SolutionIntro from "./solutions/SolutionIntro";
import SolutionLogisticsIT from "./solutions/SolutionLogisticsIT";
import SolutionSettlement from "./solutions/SolutionSettlement";
import SolutionAIPlatform from "./solutions/SolutionAIPlatform";

interface SolutionSectionProps {
  startIdx: number;
}

const solutionMenu = [
  // Intro는 메뉴에서 제외 (소개는 버튼 없이 sticky 메뉴만 노출)
  { id: "logistics-it", titleKo: "물류 IT" },
  { id: "settlement", titleKo: "정산 시스템" },
  { id: "ai-platform", titleKo: "AI 플랫폼" },
];

export default function SolutionSection({ startIdx }: SolutionSectionProps) {
  const [showMenu, setShowMenu] = useState(false);
  const [activeMenuId, setActiveMenuId] = useState<string>("logistics-it");
  const containerRef = useRef<HTMLDivElement | null>(null);
  const sectionRefs = useRef<HTMLElement[]>([]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    sectionRefs.current = Array.from(
      container.querySelectorAll<HTMLElement>("[data-scroll-section][data-solution-id]")
    );

    const getScrollY = () => window.scrollY || window.pageYOffset || 0;
    const getViewportTop = () => getScrollY();
    const getViewportBottom = () => getViewportTop() + window.innerHeight;

    const getContainerBounds = () => {
      const first = sectionRefs.current[0];
      const last = sectionRefs.current[sectionRefs.current.length - 1];
      if (!first || !last) {
        const rect = container.getBoundingClientRect();
        const top = rect.top + getScrollY();
        const bottom = top + rect.height;
        return { top, bottom };
      }
      const firstRect = first.getBoundingClientRect();
      const lastRect = last.getBoundingClientRect();
      const top = firstRect.top + getScrollY();
      const bottom = lastRect.top + getScrollY() + lastRect.height;
      return { top, bottom };
    };

    const findActive = () => {
      const center = getViewportTop() + window.innerHeight / 2;
      let best: string | undefined;
      let bestDist = Number.POSITIVE_INFINITY;
      sectionRefs.current.forEach((el) => {
        const rect = el.getBoundingClientRect();
        const mid = rect.top + getScrollY() + rect.height / 2;
        const d = Math.abs(mid - center);
        if (d < bestDist) {
          bestDist = d;
          best = el.dataset.solutionId || best;
        }
      });
      return best;
    };

    const handleScroll = () => {
      const { top, bottom } = getContainerBounds();
      const vt = getViewportTop();
      const vb = getViewportBottom();
      const overlaps = !(vb <= top || vt >= bottom);
      setShowMenu(overlaps);
      if (overlaps) {
        const id = findActive();
        // 소개 섹션일 때는 하이라이트 변경 없이 유지
        if (id && id !== "solution-intro") {
          setActiveMenuId(id);
        }
      }
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  const handleMenuClick = (id: string) => {
    const el = sectionRefs.current.find((e) => e.dataset.solutionId === id);
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const targetY = rect.top + (window.scrollY || window.pageYOffset);
    window.scrollTo({ top: targetY, behavior: "smooth" });
  };

  return (
    <div ref={containerRef} className={styles["sv-section__container"]}>
      {showMenu && (
        <div className={styles["sv-section__menu-wrapper"]}>
          <div className={styles["sv-section__menu"]}>
            <h2 className={styles["sv-section__menu-header"]}>
              <span className={styles["sv-section__menu-title"]}>Solutions</span>
            </h2>
            <nav className={styles["sv-section__menu-nav"]}>
              {solutionMenu.map((m) => (
                <button
                  key={m.id}
                  onClick={() => handleMenuClick(m.id)}
                  className={`${styles["sv-section__menu-button"]} ${
                    activeMenuId === m.id
                      ? styles["sv-section__menu-button--active"]
                      : styles["sv-section__menu-button--inactive"]
                  }`}
                >
                  {m.titleKo}
                </button>
              ))}
            </nav>
          </div>
        </div>
      )}

      {/* Intro */}
      <div
        data-scroll-section
        data-section-index={startIdx}
        data-solution-id={"solution-intro"}
        className={styles["sv-section"]}
        style={{ height: "60vh" }}
      >
        <SolutionIntro id="solution-intro" index={startIdx} />
      </div>
      {/* Logistics IT */}
      <div
        data-scroll-section
        data-section-index={startIdx + 1}
        data-solution-id={"logistics-it"}
        className={styles["sv-section"]}
        style={{ height: "100vh" }}
      >
        <SolutionLogisticsIT id="logistics-it" index={startIdx + 1} />
      </div>
      {/* Settlement */}
      <div
        data-scroll-section
        data-section-index={startIdx + 2}
        data-solution-id={"settlement"}
        className={styles["sv-section"]}
        style={{ height: "100vh" }}
      >
        <SolutionSettlement id="settlement" index={startIdx + 2} />
      </div>
      {/* AI Platform */}
      <div
        data-scroll-section
        data-section-index={startIdx + 3}
        data-solution-id={"ai-platform"}
        className={styles["sv-section"]}
        style={{ height: "100vh" }}
      >
        <SolutionAIPlatform id="ai-platform" index={startIdx + 3} />
      </div>
    </div>
  );
}


