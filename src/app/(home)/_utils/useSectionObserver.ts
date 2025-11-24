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

  useEffect(() => {
    // 섹션 요소들 수집
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

    // [수정된 로직] 뷰포트 중앙선이 섹션 내부에 있는지 검사
    const findActiveSection = () => {
      const viewportCenter = window.innerHeight / 2;

      // 조건을 만족하는 섹션을 찾음 (find는 조건을 만족하는 첫 번째 요소를 반환)
      const activeEl = sectionRefs.current.find((el) => {
        const rect = el.getBoundingClientRect();

        // 1. 섹션의 top이 중앙선보다 위(작거나 같음)에 있고
        // 2. 섹션의 bottom이 중앙선보다 아래(크거나 같음)에 있어야 함
        return rect.top <= viewportCenter && rect.bottom >= viewportCenter;
      });

      return activeEl ? activeEl.getAttribute(options.idAttribute) : undefined;
    };

    const handleScroll = () => {
      const viewportCenter = window.innerHeight / 2;
      const firstRect = firstEl.getBoundingClientRect();
      const lastRect = lastEl.getBoundingClientRect();

      // 전체 메뉴 노출 여부 결정 (First Section ~ Last Section 범위 체크)
      const isAfterStart = firstRect.top <= viewportCenter;
      const isBeforeEnd = lastRect.bottom >= viewportCenter;
      const shouldShowMenu = isAfterStart && isBeforeEnd;

      if (shouldShowMenu !== showMenu) {
        setShowMenu(shouldShowMenu);
        if (shouldShowMenu) {
          options.onComeIn?.("service");
        } else {
          options.onGoOut?.();
        }
      }

      // [Active ID 설정] 메뉴가 노출된 상태일 때만 개별 섹션 체크
      if (shouldShowMenu) {
        const id = findActiveSection();

        // id가 발견되면 해당 id로 설정, 없으면 ""(해제)
        if (id && id !== options.excludeId) {
          const menuId = sectionIdToMenuId ? sectionIdToMenuId[id] || id : id;
          if (activeMenuId !== menuId) {
            setActiveMenuId(menuId);
            lastActiveMenuIdRef.current = menuId;
          }
        } else if (!id) {
          // 어떤 섹션에도 해당하지 않는 빈 공간(margin 등)에 50% 선이 위치하면 해제
          if (activeMenuId !== "") {
            setActiveMenuId("");
          }
        }
      } else {
        // 메뉴 자체가 꺼지면 Active ID도 초기화 (필요시)
        if (activeMenuId !== "") {
          setActiveMenuId("");
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
  }, [showMenu, activeMenuId, options.sectionSelector, options.idAttribute, options.excludeId, options.menuGroups, options.firstSectionRef, options.lastSectionRef]);

  return { showMenu, activeMenuId, sectionRefs };
}
