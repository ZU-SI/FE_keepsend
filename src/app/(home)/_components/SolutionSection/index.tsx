"use client";

import { activeMenuAtom } from "@/store/menu.store";
import { useSetAtom } from "jotai";
import { useRef } from "react";
import { useSectionObserver } from "../../_utils/useSectionObserver";

import SolutionAIPlatform from "./solutions/SolutionAIPlatform";
import SolutionIntro from "./solutions/SolutionIntro";
import SolutionLogisticsIT from "./solutions/SolutionLogisticsIT";
import SolutionSettlement from "./solutions/SolutionSettlement";

interface SolutionSectionProps {
  startIdx: number;
}

export default function SolutionSection({ startIdx }: SolutionSectionProps) {
const firstSectionRef = useRef<HTMLDivElement>(null);
const lastSectionRef = useRef<HTMLDivElement>(null);
  const setActiveMenu = useSetAtom(activeMenuAtom);

  const menuGroups = [
    { id: "logistics-it", titleKo: "물류 IT", sectionIds: ["logistics-it"] },
    { id: "settlement", titleKo: "정산 시스템", sectionIds: ["settlement"] },
    { id: "ai-platform", titleKo: "AI 플랫폼", sectionIds: ["ai-platform"] },
  ];

  const { showMenu, activeMenuId, sectionRefs } = useSectionObserver({
    sectionSelector: "[data-scroll-section][data-solution-id]",
    idAttribute: "data-solution-id",
    menuGroups,
    firstSectionRef,
    lastSectionRef,
    onComeIn: () => {
      setActiveMenu("solution");
    },
    onGoOut: () => {
      setActiveMenu(null);
    },
  });

  const handleMenuClick = (id: string) => {
    const el = sectionRefs.current.find(
      (e) => e.getAttribute("data-solution-id") === id
    );

    if (!el) return;

    const rect = el.getBoundingClientRect();
    const targetY = rect.top + (window.scrollY || window.pageYOffset);

    window.scrollTo({ top: targetY, behavior: "smooth" });
  };

  return (
    <>
      {showMenu && (
        <div className="s-section__menu-wrapper">
          <div className="s-section__menu">
            <h2 className="s-section__menu-header">
              <span className="s-section__menu-title">Solutions</span>
            </h2>
            <nav className="s-section__menu-nav">
              {menuGroups.map((m) => (
                <button
                  key={m.id}
                  onClick={() => handleMenuClick(m.id)}
                  className={`s-section__menu-button ${
                    activeMenuId === m.id
                      ? "s-section__menu-button--active"
                      : "s-section__menu-button--inactive"
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
        className="s-section bg-white"
        ref={firstSectionRef}
        id="solution-intro"
      >
        <SolutionIntro />
      </div>

      {/* Logistics IT */}
      <div
        data-scroll-section
        data-section-index={startIdx + 1}
        data-solution-id={"logistics-it"}
        className="s-section solution-logistics light"
      >
        <SolutionLogisticsIT id="logistics-it" index={startIdx + 1} />
      </div>

      {/* Settlement */}
      <div
        data-scroll-section
        data-section-index={startIdx + 2}
        data-solution-id={"settlement"}
        className="s-section solution-stm"
      >
        <SolutionSettlement id="settlement" index={startIdx + 2} />
      </div>

      {/* AI Platform */}
      <div
        data-scroll-section
        data-section-index={startIdx + 3}
        data-solution-id={"ai-platform"}
        className="s-section light solution-ai"
        ref={lastSectionRef}
      >
        <SolutionAIPlatform id="ai-platform" index={startIdx + 3} />
      </div>
    </>
  );
}
