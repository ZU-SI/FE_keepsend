import { useEffect, useRef, useState } from "react";

interface SectionObserverOptions {
  sectionSelector: string;
  idAttribute: string;
  menuGroups?: { id: string; sectionIds: string[] }[];
  excludeId?: string;
  onComeIn?: (menuId: string) => void;
  onGoOut?: () => void;
  firstSectionRef: React.RefObject<HTMLDivElement | null>;
  lastSectionRef: React.RefObject<HTMLDivElement|null>;
}

export function useSectionObserver(options: SectionObserverOptions) {
  const [showMenu, setShowMenu] = useState(false);
  const [activeMenuId, setActiveMenuId] = useState<string>("");
  const sectionRefs = useRef<HTMLElement[]>([]);
  const lastActiveMenuIdRef = useRef<string | null>(null);

  /**
   * 메뉴 노출 여부 & 섹션 하이라이트
   */
  useEffect(() => {
    sectionRefs.current = Array.from(
      document.querySelectorAll<HTMLElement>(options.sectionSelector)
    );

    const firstEl = options.firstSectionRef.current;
    const lastEl = options.lastSectionRef.current;
    if (!firstEl || !lastEl) return;

    const sectionIdToMenuId = options.menuGroups
      ? Object.fromEntries(
          options.menuGroups.flatMap((g) =>
            g.sectionIds.map((sid) => [sid, g.id])
          )
        )
      : undefined;

    const getScrollY = () => window.scrollY || window.pageYOffset;

    const findActiveSection = () => {
      const viewportCenter = getScrollY() + window.innerHeight / 2;
      let bestId: string | undefined;
      let bestDist = Infinity;

      sectionRefs.current.forEach((el) => {
        const rect = el.getBoundingClientRect();
        const top = rect.top + getScrollY();
        const middle = top + rect.height / 2;
        const dist = Math.abs(middle - viewportCenter);

        if (dist < bestDist) {
          bestDist = dist;
          bestId = el.getAttribute(options.idAttribute) || bestId;
        }
      });
      return bestId;
    };

    const handleScroll = () => {
      const scrollY = getScrollY();
      
      // 첫 섹션 50% 지점 계산
      const firstRect = firstEl.getBoundingClientRect();
      const firstTop = firstRect.top + scrollY;
      const first50PercentY = firstTop + firstRect.height * 0.5;
      
      // 마지막 섹션 50% 지점 계산
      const lastRect = lastEl.getBoundingClientRect();
      const lastTop = lastRect.top + scrollY;
      const last50PercentY = lastTop + lastRect.height * 0.5;
      
      // 현재 스크롤 위치가 첫 섹션 50%와 마지막 섹션 50% 사이에 있는지 확인
      const viewportTop = scrollY;
      const shouldShowMenu = viewportTop >= first50PercentY && viewportTop < last50PercentY;
      
      if (shouldShowMenu !== showMenu) {
        setShowMenu(shouldShowMenu);
        if (shouldShowMenu) {
          options.onComeIn?.("service");
        } else {
          options.onGoOut?.();
        }
      }

      // 활성 섹션 하이라이트
      if (shouldShowMenu) {
        const id = findActiveSection();
        if (id && id !== options.excludeId) {
          const menuId = sectionIdToMenuId ? sectionIdToMenuId[id] || id : id;
          
          if (activeMenuId !== menuId) {
            setActiveMenuId(menuId);
            lastActiveMenuIdRef.current = menuId;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [showMenu, activeMenuId, options.sectionSelector, options.idAttribute, options.excludeId, options.menuGroups]);

  return { showMenu, activeMenuId, sectionRefs };
}
