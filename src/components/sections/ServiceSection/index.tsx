"use client";

import { activeMenuAtom } from "@/store/atoms";
import { useSectionObserver } from "@/utils/interaction";
import { useSetAtom } from "jotai";
import { RefObject, useRef } from "react";
import ServiceB2bOne from "./services/ServiceB2bOne";
import ServiceB2bThree from "./services/ServiceB2bThree";
import ServiceB2bTwo from "./services/ServiceB2bTwo";
import ServiceCenter from "./services/ServiceCenter";
import ServiceConsulting from "./services/ServiceConsulting";
import ServiceIntro from "./services/ServiceIntro";
import ServicePartner from "./services/ServicePartner";
import ServiceProcess from "./services/ServiceProcess";
import styles from "./serviceSection.module.css";

interface ServiceSectionProps {
  startIdx: number;
}

export default function ServiceSection({ startIdx }: ServiceSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const setActiveMenu = useSetAtom(activeMenuAtom);
  const menuGroups = [
    { id: "b2b", titleKo: "B2B", sectionIds: ["b2b-1", "b2b-2", "b2b-3"] },
    { id: "process", titleKo: "프로세스", sectionIds: ["process"] },
    { id: "center", titleKo: "물류센터", sectionIds: ["center"] },
    { id: "partner", titleKo: "파트너", sectionIds: ["partner"] },
    { id: "consulting", titleKo: "컨설팅", sectionIds: ["consulting"] },
  ];
  const { showMenu, activeMenuId, sectionRefs } = useSectionObserver(
    containerRef as RefObject<HTMLElement>,
    {
      sectionSelector: "[data-scroll-section][data-service-id]",
      idAttribute: "data-service-id",
      menuGroups,
      onComeIn: () => {
        setActiveMenu("service");
      },
      onGoOut: () => {
        setActiveMenu(null);
      },
    }
  );

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
    <div
      id="service"
      ref={containerRef}
      className={styles["sv-section__container"]}
    >
      {showMenu && (
        <div className={styles["sv-section__menu-wrapper"]}>
          <div className={styles["sv-section__menu"]}>
            <h2 className={styles["sv-section__menu-header"]}>
              <span className={styles["sv-section__menu-title"]}>Services</span>
            </h2>
            <nav className={styles["sv-section__menu-nav"]}>
              {menuGroups.map((group) => (
                <button
                  key={group.id}
                  onClick={() => handleMenuClick(group.id)}
                  className={`${styles["sv-section__menu-button"]} ${
                    activeMenuId === group.id
                      ? styles["sv-section__menu-button--active"]
                      : styles["sv-section__menu-button--inactive"]
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
        className={styles["sv-section"]}
        style={{ height: "60vh" }}
      >
        <ServiceIntro id="intro" index={startIdx} />
      </div>
      {/* B2B (1) 100vh */}
      <div
        data-scroll-section
        data-section-index={startIdx + 1}
        data-service-id={"b2b-1"}
        className={styles["sv-section"]}
        style={{ height: "100vh" }}
      >
        <ServiceB2bOne id="b2b-1" index={startIdx + 1} />
      </div>
      {/* B2B (2) 100vh */}
      <div
        data-scroll-section
        data-section-index={startIdx + 2}
        data-service-id={"b2b-2"}
        className={styles["sv-section"]}
        style={{ height: "100vh" }}
      >
        <ServiceB2bTwo id="b2b-2" index={startIdx + 2} />
      </div>
      {/* B2B (3) 100vh */}
      <div
        data-scroll-section
        data-section-index={startIdx + 3}
        data-service-id={"b2b-3"}
        className={styles["sv-section"]}
        style={{ height: "100vh" }}
      >
        <ServiceB2bThree id="b2b-3" index={startIdx + 3} />
      </div>
      {/* Process (auto) */}
      <div
        data-scroll-section
        data-section-index={startIdx + 4}
        data-service-id={"process"}
        className={styles["sv-section"]}
        style={{ height: "auto" }}
      >
        <ServiceProcess id="process" index={startIdx + 4} />
      </div>
      {/* Center (100vh) */}
      <div
        data-scroll-section
        data-section-index={startIdx + 5}
        data-service-id={"center"}
        className={styles["sv-section"]}
        style={{ height: "100vh" }}
      >
        <ServiceCenter id="center" index={startIdx + 5} />
      </div>
      {/* Partner (100vh) */}
      <div
        data-scroll-section
        data-section-index={startIdx + 6}
        data-service-id={"partner"}
        className={styles["sv-section"]}
        style={{ height: "100vh" }}
      >
        <ServicePartner id="partner" index={startIdx + 6} />
      </div>
      {/* Consulting (100vh) */}
      <div
        data-scroll-section
        data-section-index={startIdx + 7}
        data-service-id={"consulting"}
        className={styles["sv-section"]}
        style={{ height: "100vh" }}
      >
        <ServiceConsulting id="consulting" index={startIdx + 7} />
      </div>
    </div>
  );
}
