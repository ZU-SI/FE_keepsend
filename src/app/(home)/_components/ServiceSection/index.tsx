"use client";

import { activeMenuAtom } from "@/store/menu.store";
import { useSetAtom } from "jotai";
import { useRef } from "react";
import { useSectionObserver } from "../../_utils/useSectionObserver";
import ServiceB2bOne from "./services/ServiceB2bOne";
import ServiceB2bThree from "./services/ServiceB2bThree";
import ServiceCenter from "./services/ServiceCenter";
import ServiceConsulting from "./services/ServiceConsulting";
import ServiceIntro from "./services/ServiceIntro";
import ServicePartner from "./services/ServicePartner";
import ServiceProcess from "./services/ServiceProcess";

interface ServiceSectionProps {
  startIdx: number;
}

export default function ServiceSection({ startIdx }: ServiceSectionProps) {
const firstSectionRef = useRef<HTMLDivElement>(null);
const lastSectionRef = useRef<HTMLDivElement>(null);

  const setActiveMenu = useSetAtom(activeMenuAtom);

  const menuGroups = [
    { id: "b2b", titleKo: "B2B", sectionIds: ["b2b-1", "b2b-2", "b2b-3"] },
    { id: "process", titleKo: "프로세스", sectionIds: ["process"] },
    { id: "center", titleKo: "물류센터", sectionIds: ["center"] },
    { id: "partner", titleKo: "파트너", sectionIds: ["partner"] },
    { id: "consulting", titleKo: "컨설팅", sectionIds: ["consulting"] },
  ];

  const { showMenu, activeMenuId, sectionRefs } = useSectionObserver({
    sectionSelector: "[data-scroll-section][data-service-id]",
    idAttribute: "data-service-id",
    menuGroups,
    firstSectionRef,
    lastSectionRef,
    onComeIn: () => {
      setActiveMenu("service");
    },
    onGoOut: () => {
      setActiveMenu(null);
    },
  });

  const handleMenuClick = (menuId: string) => {
    const targetSectionId =
      menuGroups.find((g) => g.id === menuId)?.sectionIds[0] ?? menuId;

    const el = sectionRefs.current.find(
      (e) => e.getAttribute("data-service-id") === targetSectionId
    );
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const targetY = rect.top + (window.scrollY || window.pageYOffset);

    window.scrollTo({ top: targetY, behavior: "smooth" });
  };

  return (
    <>
      {/* sentinel: 메뉴 ON 트리거 */}
      {showMenu && (
        <div className="s-section__menu-wrapper">
          <div className="s-section__menu">
            <h2 className="s-section__menu-header">
              <span className="s-section__menu-title">Services</span>
            </h2>
            <nav className="s-section__menu-nav">
              {menuGroups.map((group) => (
                <button
                  key={group.id}
                  onClick={() => handleMenuClick(group.id)}
                  className={`s-section__menu-button ${
                    activeMenuId === group.id
                      ? "s-section__menu-button--active"
                      : "s-section__menu-button--inactive"
                  }`}
                >
                  {group.titleKo}
                </button>
              ))}
            </nav>
          </div>
        </div>
      )}
      {/* Intro (60vh) */}
      <div
        key="service-intro"
        data-scroll-section
        data-section-index={startIdx}
        data-service-id={"intro"}
        className="s-section service-intro"
        style={{ height: "60vh" }}
        ref={firstSectionRef}
        id="service-intro"
      >
        <ServiceIntro id="service-intro"  index={startIdx} />
      </div>
      {/* B2B section 1 */}
      <div
        data-scroll-section
        data-section-index={startIdx + 1}
        data-service-id={"b2b-1"}
        className="s-section light service-problem"
        style={{ height: "100vh" }}
      >
        <ServiceB2bOne id="b2b-1" index={startIdx + 1} />
      </div>
      {/* B2B section 2 */}
      <div
        data-scroll-section
        data-section-index={startIdx + 2}
        data-service-id={"b2b-2"}
        className="s-section"
        style={{ height: "fit-content" }}
      >
        {/* <ServiceB2bTwo id="b2b-2" index={startIdx + 2} /> */}
      </div>
      {/* B2B section 3 */}
      <div
        data-scroll-section
        data-section-index={startIdx + 3}
        data-service-id={"b2b-3"}
        className="s-section"
        style={{ height: "100vh" }}
      >
        <ServiceB2bThree id="b2b-3" index={startIdx + 3} />
      </div>

      {/* Process */}
      <div
        data-scroll-section
        data-section-index={startIdx + 4}
        data-service-id={"process"}
        className="s-section"
        style={{ height: "auto" }}
      >
        <ServiceProcess id="process" index={startIdx + 4} />
      </div>

      {/* Center */}
      <div
        data-scroll-section
        data-section-index={startIdx + 5}
        data-service-id={"center"}
        className="s-section service-center"
        style={{ height: "fit-content" }}
      >
        <ServiceCenter id="center" index={startIdx + 5} />
      </div>

      {/* Partner */}
      <div
        data-scroll-section
        data-section-index={startIdx + 6}
        data-service-id={"partner"}
        className="s-section service-partner"
        style={{ height: "fit-content" }}
      >
        <ServicePartner id="partner" index={startIdx + 6} />
      </div>

      {/* Consulting */}
      <div
        data-scroll-section
        data-section-index={startIdx + 7}
        data-service-id={"consulting"}
        className="s-section light service-cs"
        style={{ height: "100vh" }}
        ref={lastSectionRef}
      >
        <ServiceConsulting id="consulting" index={startIdx + 7} />
      </div>
    </>
  );
}
