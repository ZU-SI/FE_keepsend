import { useEffect, useRef, useState } from "react";

interface StickySectionMenuOptions {
  sectionSelector: string;
  idAttribute: string;
  menuGroups?: { id: string; sectionIds: string[] }[];
  excludeId?: string;
}

interface SectionObserverOptions {
  sectionSelector: string;
  idAttribute: string;
  menuGroups?: { id: string; sectionIds: string[] }[];
  excludeId?: string;
  onComeIn?: (menuId: string) => void;
  onGoOut?: () => void;
}

/**
 * @deprecated useSectionObserver를 사용하세요
 */
export function useStickySectionMenu<T extends HTMLElement>(
  containerRef: React.RefObject<T>,
  options: StickySectionMenuOptions
) {
  const [showMenu, setShowMenu] = useState(false);
  const [activeMenuId, setActiveMenuId] = useState<string>("");
  const sectionRefs = useRef<HTMLElement[]>([]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    sectionRefs.current = Array.from(
      container.querySelectorAll<HTMLElement>(options.sectionSelector)
    );

    // IntersectionObserver로 메뉴 노출 제어
    const observer = new window.IntersectionObserver(
      ([entry]) => {
        setShowMenu(entry.isIntersecting);
      },
      {
        root: null,
        threshold: 0.1,
      }
    );
    observer.observe(container);

    // 메뉴 그룹 매핑
    const sectionIdToMenuId = options.menuGroups
      ? Object.fromEntries(
          options.menuGroups.flatMap((g) =>
            g.sectionIds.map((sid) => [sid, g.id])
          )
        )
      : undefined;

    const getScrollY = () => window.scrollY || window.pageYOffset || 0;
    const findActiveSection = () => {
      const viewportCenter = getScrollY() + window.innerHeight / 2;
      let bestId: string | undefined = undefined;
      let bestDist = Number.POSITIVE_INFINITY;
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
      if (showMenu) {
        const id = findActiveSection();
        if (id && id !== options.excludeId) {
          if (sectionIdToMenuId) {
            setActiveMenuId(sectionIdToMenuId[id] || id);
          } else {
            setActiveMenuId(id);
          }
        }
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);
    handleScroll();
    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [options.menuGroups, options.excludeId, showMenu]);

  return { showMenu, activeMenuId, sectionRefs };
}

/**
 * 섹션 진입/이탈 감지 및 스크롤 위치 추적 hook
 * IntersectionObserver와 스크롤 이벤트를 사용하여 섹션 감지
 */
export function useSectionObserver<T extends HTMLElement>(
  containerRef: React.RefObject<T>,
  options: SectionObserverOptions
) {
  const [showMenu, setShowMenu] = useState(false);
  const [activeMenuId, setActiveMenuId] = useState<string>("");
  const sectionRefs = useRef<HTMLElement[]>([]);
  const lastActiveMenuIdRef = useRef<string | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    sectionRefs.current = Array.from(
      container.querySelectorAll<HTMLElement>(options.sectionSelector)
    );

    // IntersectionObserver로 메뉴 노출 제어
    const observer = new window.IntersectionObserver(
      ([entry]) => {
        const isIntersecting = entry.isIntersecting;
        setShowMenu(isIntersecting);

        if (!isIntersecting && lastActiveMenuIdRef.current) {
          // 섹션 이탈
          options.onGoOut?.();
          lastActiveMenuIdRef.current = null;
        }
      },
      {
        root: null,
        threshold: 0.1,
      }
    );
    observer.observe(container);

    // 메뉴 그룹 매핑
    const sectionIdToMenuId = options.menuGroups
      ? Object.fromEntries(
          options.menuGroups.flatMap((g) =>
            g.sectionIds.map((sid) => [sid, g.id])
          )
        )
      : undefined;

    const getScrollY = () => window.scrollY || window.pageYOffset || 0;
    const findActiveSection = () => {
      const viewportCenter = getScrollY() + window.innerHeight / 2;
      let bestId: string | undefined = undefined;
      let bestDist = Number.POSITIVE_INFINITY;
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
      if (showMenu) {
        const id = findActiveSection();
        if (id && id !== options.excludeId) {
          const menuId = sectionIdToMenuId ? sectionIdToMenuId[id] || id : id;
          setActiveMenuId(menuId);

          // 메뉴 진입 감지
          if (lastActiveMenuIdRef.current !== menuId) {
            options.onComeIn?.(menuId);
            lastActiveMenuIdRef.current = menuId;
          }
        }
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);
    handleScroll();
    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [options.menuGroups, options.excludeId, showMenu]);

  return { showMenu, activeMenuId, sectionRefs };
}
