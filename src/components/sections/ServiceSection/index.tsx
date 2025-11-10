"use client";

import { useEffect, useRef, useState } from "react";
import ServiceB2bOne from "./services/ServiceB2bOne";
import ServiceB2bThree from "./services/ServiceB2bThree";
import ServiceB2bTwo from "./services/ServiceB2bTwo";
import ServiceCenter from "./services/ServiceCenter";
import ServiceConsulting from "./services/ServiceConsulting";
import ServiceIntro from "./services/ServiceIntro";
import ServicePartner from "./services/ServicePartner";
import ServiceProcess from "./services/ServiceProcess";
import styles from "./serviceSection.module.css";

// explicit section ordering and ids
const sectionOrder = [
  "intro",
  "b2b-1",
  "b2b-2",
  "b2b-3",
  "process",
  "center",
  "partner",
  "consulting",
];

interface ServiceSectionProps {
  startIdx: number;
}

export default function ServiceSection({ startIdx }: ServiceSectionProps) {
  const [activeMenuId, setActiveMenuId] = useState<string>("b2b");
  const [showMenu, setShowMenu] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const sectionRefs = useRef<HTMLElement[]>([]);
  // Define menu groups → can map one menu to multiple sections
  const menuGroups = [
    { id: "b2b", titleKo: "B2B", sectionIds: ["b2b-1", "b2b-2", "b2b-3"] },
    { id: "process", titleKo: "프로세스", sectionIds: ["process"] },
    { id: "center", titleKo: "물류센터", sectionIds: ["center"] },
    { id: "partner", titleKo: "파트너", sectionIds: ["partner"] },
    { id: "consulting", titleKo: "컨설팅", sectionIds: ["consulting"] },
  ];
  const sectionIdToMenuId = Object.fromEntries(
    menuGroups.flatMap((g) => g.sectionIds.map((sid) => [sid, g.id]))
  );

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    // collect section elements within this component
    sectionRefs.current = Array.from(
      container.querySelectorAll<HTMLElement>(
        "[data-scroll-section][data-service-id]"
      )
    );

    const getScrollY = () => window.scrollY || window.pageYOffset || 0;
    const getViewportTop = () => getScrollY();
    const getViewportBottom = () => getViewportTop() + window.innerHeight;

    const getContainerBounds = () => {
      const rect = container.getBoundingClientRect();
      const top = rect.top + getScrollY();
      const bottom = top + rect.height;
      return { top, bottom };
    };

    const findActiveService = () => {
      // pick section whose middle is nearest to viewport center
      const viewportCenter = getViewportTop() + window.innerHeight / 2;
      let bestId: string | undefined = undefined;
      let bestDist = Number.POSITIVE_INFINITY;
      sectionRefs.current.forEach((el) => {
        const rect = el.getBoundingClientRect();
        const top = rect.top + getScrollY();
        const middle = top + rect.height / 2;
        const dist = Math.abs(middle - viewportCenter);
        if (dist < bestDist) {
          bestDist = dist;
          bestId = el.dataset.serviceId || bestId;
        }
      });
      return bestId;
    };

    const handleScroll = () => {
      const { top, bottom } = getContainerBounds();
      const vpTop = getViewportTop();
      const vpBottom = getViewportBottom();
      const overlaps = !(vpBottom <= top || vpTop >= bottom);
      setShowMenu(overlaps);

      if (overlaps) {
        const id = findActiveService();
        if (id) {
          const menuId = sectionIdToMenuId[id] || id;
          setActiveMenuId(menuId);
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
  }, [sectionIdToMenuId]);

  // activeMenuId validity ensured by scroll handler; no extra effect needed

  const handleMenuClick = (menuId: string) => {
    // find the first section mapped to this menu
    const targetSectionId =
      menuGroups.find((g) => g.id === menuId)?.sectionIds[0] ?? menuId;
    const el = sectionRefs.current.find(
      (e) => e.dataset.serviceId === targetSectionId
    );
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
