"use client";

import BannerSection from "@/app/(home)/_components/BannerSection";
import ServiceSection from "@/app/(home)/_components/ServiceSection";
import SolutionSection from "@/app/(home)/_components/SolutionSection";
import GlobalHeader from "@/components/layouts/GlobalHeader";
import { contactModalOpenAtom } from "@/store/contact.store";
import gsap from "gsap";
import ScrollToPlugin from "gsap/ScrollToPlugin";
import { useAtomValue } from "jotai";
import React, { useEffect, useRef } from "react";

gsap.registerPlugin(ScrollToPlugin);

export default function Home() {
  const containerRef = useRef<HTMLElement | null>(null);
  const stateRef = useRef({
    isAnimating: false,
    currentIndex: 0,
    wheelAccumPx: 0,
    lastSnapTs: 0,
  });
  const activePrimaryRef = useRef<"service" | "solution" | null>(null);
  const [, /* unused local to trigger re-render */ _setTick] = (function () {
    // lightweight rerender trigger without importing useState twice
    // eslint-disable-next-line react-hooks/rules-of-hooks
    return React.useState?.(0) ?? [0, () => {}];
  })();
  const isModalOpen = useAtomValue(contactModalOpenAtom);

  // 이벤트 핸들러 참조 저장을 위한 ref 추가
  const eventHandlersRef = useRef<{
    handleWheel: ((e: WheelEvent) => void) | null;
    handleResize: (() => void) | null;
    updateActivePrimary: (() => void) | null;
  }>({
    handleWheel: null,
    handleResize: null,
    updateActivePrimary: null,
  });

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // 모바일에서는 fullpage 스크롤 비활성화 (자연스러운 스크롤)
    const isMobile = () => window.innerWidth < 1024;
    if (isMobile()) {
      return;
    }

    const getScrollY = () => window.scrollY || window.pageYOffset || 0;
    const getContainerTop = () => {
      const rect = container.getBoundingClientRect();
      return rect.top + getScrollY();
    };

    const getSections = () =>
      Array.from(
        container.querySelectorAll<HTMLElement>("[data-scroll-section]")
      );

    const getSectionOffsets = () => {
      const sections = getSections();
      const containerTop = getContainerTop();
      return sections.map(
        (el) => el.getBoundingClientRect().top + getScrollY() - containerTop
      );
    };

    const getBounds = () => {
      const sections = getSections();
      const containerTop = getContainerTop();
      if (sections.length === 0) {
        return { top: containerTop, bottom: containerTop };
      }
      const offsets = getSectionOffsets();
      const last = sections[sections.length - 1];
      const lastHeight = last.getBoundingClientRect().height;
      const bottom = containerTop + offsets[offsets.length - 1] + lastHeight;
      return { top: containerTop, bottom };
    };

    const clampIndex = (index: number, max: number) =>
      Math.max(0, Math.min(index, max));

    const handleWheel = (e: WheelEvent) => {
      // 모달이 열려 있으면 스크롤 제어를 하지 않음
      if (isModalOpen) {
        const modalElement = document.querySelector('.contact__form');
        if (modalElement && modalElement.contains(e.target as Node)) {
          return; // 모달 내부에서의 스크롤은 자연스럽게 처리
        }
      }

      const state = stateRef.current;
      if (state.isAnimating) {
        e.preventDefault();
        return;
      }

      const sections = getSections();
      const total = sections.length;
      if (total === 0) return;

      const scrollY = getScrollY();
      const viewportTop = scrollY;
      const viewportBottom = scrollY + window.innerHeight;
      const bounds = getBounds();

      // Footer 영역에 진입했으면 스크롤 제어 하지 않음
      if (viewportTop >= bounds.bottom) {
        return;
      }

      // viewport가 container 위쪽에 있으면 제어 안함
      if (viewportBottom <= bounds.top) return;

      const direction = e.deltaY > 0 ? 1 : -1;

      // 현재 섹션 인덱스 계산: viewport top에 가장 가까운 섹션
      const offsetsForIndex = getSectionOffsets();
      const containerTop = getContainerTop();
      let currentIndex = 0;
      let bestDist = Number.POSITIVE_INFINITY;
      for (let i = 0; i < offsetsForIndex.length; i++) {
        const topI = containerTop + offsetsForIndex[i];
        const dist = Math.abs(topI - viewportTop);
        if (dist < bestDist) {
          bestDist = dist;
          currentIndex = i;
        }
      }
      state.currentIndex = currentIndex;

      const currentTop = containerTop + offsetsForIndex[currentIndex];
      const currentEl = sections[currentIndex];
      const currentHeight = currentEl.getBoundingClientRect().height;
      const currentBottom = currentTop + currentHeight;

      // 섹션 내부 스크롤 허용
      const threshold = 20; // px tolerance near edges
      if (direction > 0) {
        // 아래로 스크롤
        const distanceToBottom = currentBottom - viewportBottom;
        
        // 마지막 섹션에서 아래로 스크롤하고 섹션의 끝에 도달했으면 footer로 자연스럽게
        if (currentIndex === total - 1 && distanceToBottom <= threshold) {
          return;
        }
        
        // 큰 섹션 내부에서 아래로 스크롤할 여지가 있으면 자연스럽게
        if (distanceToBottom > threshold && currentHeight > window.innerHeight) {
          return;
        }
      } else {
        // 위로 스크롤
        const distanceFromTop = viewportTop - currentTop;
        
        // 큰 섹션 내부에서 위로 스크롤할 여지가 있으면 자연스럽게
        if (distanceFromTop > threshold && currentHeight > window.innerHeight) {
          return;
        }
      }

      // Normalize wheel bursts to a single-step snap
      const deltaModeScale =
        e.deltaMode === 1 ? 16 : e.deltaMode === 2 ? window.innerHeight : 1;
      state.wheelAccumPx += e.deltaY * deltaModeScale;
      const snapThresholdPx = Math.max(0.22 * window.innerHeight, 140);
      const now = Date.now();
      const minSnapIntervalMs = 180;
      if (
        now - state.lastSnapTs < minSnapIntervalMs &&
        Math.abs(state.wheelAccumPx) < snapThresholdPx
      ) {
        e.preventDefault();
        return;
      }
      if (Math.abs(state.wheelAccumPx) < snapThresholdPx) {
        e.preventDefault();
        return;
      }
      const stepDir = state.wheelAccumPx > 0 ? 1 : -1;
      state.wheelAccumPx = 0;
      const snapToIndex = clampIndex(currentIndex + stepDir, total - 1);

      // compute target for snapping
      const sectionOffsets = getSectionOffsets();
      const targetY = getContainerTop() + sectionOffsets[snapToIndex];

      if (snapToIndex === state.currentIndex) {
        e.preventDefault();
        return;
      }

      e.preventDefault();
      state.isAnimating = true;
      state.currentIndex = snapToIndex;
      state.lastSnapTs = now;
      gsap.to(window, {
        scrollTo: targetY,
        duration: 0.9,
        ease: "power2.inOut",
        onComplete: () => {
          setTimeout(() => {
            state.isAnimating = false;
          }, 120);
        },
      });
    };

    const updateActivePrimary = () => {
      // 모달이 열려 있으면 활성화 업데이트를 건너뛰기
      if (isModalOpen) return;

      const sections = getSections();
      if (sections.length === 0) return;
      const scrollY = getScrollY();
      const containerTop = getContainerTop();
      const viewportCenter = scrollY + window.innerHeight / 2;
      let bestIndex = 0;
      let bestDist = Number.POSITIVE_INFINITY;
      sections.forEach((el, i) => {
        const top = containerTop + getSectionOffsets()[i];
        const mid = top + el.getBoundingClientRect().height / 2;
        const d = Math.abs(mid - viewportCenter);
        if (d < bestDist) {
          bestDist = d;
          bestIndex = i;
        }
      });
      const el = sections[bestIndex];
      const isService = el.hasAttribute("data-service-id");
      const isSolution = el.hasAttribute("data-solution-id");
      const nextActive: "service" | "solution" | null = isService
        ? "service"
        : isSolution
        ? "solution"
        : null;
      if (activePrimaryRef.current !== nextActive) {
        activePrimaryRef.current = nextActive;
        _setTick((v: number) => v + 1);
      }
    };

    const handleResize = () => {
      // 모달이 열려 있으면 크기 조정 시 스크롤 재설정을 건너뛰기
      if (isModalOpen) return;
      
      // 모바일에서는 리사이즈 시 스냅 안함
      if (isMobile()) return;

      const sections = getSections();
      if (sections.length === 0) return;
      const offsets = getSectionOffsets();
      const target = getContainerTop() + offsets[stateRef.current.currentIndex];
      gsap.set(window, { scrollTo: target });
      updateActivePrimary();
    };

    // 이벤트 핸들러를 ref에 저장
    eventHandlersRef.current = {
      handleWheel,
      handleResize,
      updateActivePrimary,
    };

    // 이벤트 리스너 등록
    const attachEventListeners = () => {
      if (!isModalOpen) {
        window.addEventListener("wheel", handleWheel, { passive: false });
        window.addEventListener("resize", handleResize);
        window.addEventListener("scroll", updateActivePrimary, { passive: true });
      }
    };

    // 초기 이벤트 리스너 등록
    attachEventListeners();

    // 초기 활성 상태 업데이트
    updateActivePrimary();

    return () => {
      // 이벤트 리스너 정리
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", updateActivePrimary);
    };
  }, []); // 의존성 배열에서 isModalOpen 제거

  // 모달 상태에 따라 이벤트 리스너를 추가/제거하는 별도의 useEffect
  useEffect(() => {
    const { handleWheel, handleResize, updateActivePrimary } = eventHandlersRef.current;

    if (!handleWheel || !handleResize || !updateActivePrimary) return;

    if (isModalOpen) {
      // 모달이 열리면 이벤트 리스너를 제거
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", updateActivePrimary);
    } else {
      // 모달이 닫히면 이벤트 리스너를 다시 등록
      window.addEventListener("wheel", handleWheel, { passive: false });
      window.addEventListener("resize", handleResize);
      window.addEventListener("scroll", updateActivePrimary, { passive: true });
    }
  }, [isModalOpen]); // 모달 상태가 변경될 때만 실행

  return (
    <main id="main" ref={containerRef}>
      <GlobalHeader />
      <BannerSection startIdx={0} />
      <ServiceSection startIdx={3} />
      <SolutionSection startIdx={11} />
    </main>
  );
}
