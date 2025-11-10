"use client";

import GlobalHeader from "@/components/layouts/GlobalHeader";
import BannerSection from "@/components/sections/BannerSection";
import ServiceSection from "@/components/sections/ServiceSection";
import SolutionSection from "@/components/sections/SolutionSection";
import gsap from "gsap";
import ScrollToPlugin from "gsap/ScrollToPlugin";
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
    return (React as any).useState?.(0) ?? [0, () => {}];
  })();

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

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

      // ignore if viewport fully outside container
      if (viewportBottom <= bounds.top || viewportTop >= bounds.bottom) return;

      const direction = e.deltaY > 0 ? 1 : -1;

      // recompute current index using viewport center for robustness across mixed heights
      const offsetsForIndex = getSectionOffsets();
      const containerTop = getContainerTop();
      const viewportCenter = scrollY + window.innerHeight / 2;
      let currentIndex = 0;
      let bestDist = Number.POSITIVE_INFINITY;
      for (let i = 0; i < offsetsForIndex.length; i++) {
        const topI = containerTop + offsetsForIndex[i];
        const el = sections[i];
        const heightI = el.getBoundingClientRect().height;
        const midI = topI + heightI / 2;
        const dist = Math.abs(midI - viewportCenter);
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

      // allow natural scrolling inside tall sections
      const threshold = 12; // px tolerance near edges
      if (direction > 0) {
        // going down
        const distanceToBottom = currentBottom - (scrollY + window.innerHeight);
        if (
          distanceToBottom > threshold &&
          currentHeight > window.innerHeight
        ) {
          // still room to scroll inside this section: release
          return;
        }
      } else {
        // going up
        const distanceFromTop = scrollY - currentTop;
        if (distanceFromTop > threshold && currentHeight > window.innerHeight) {
          // scrolled away from top inside a tall section: release
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
      const sections = getSections();
      if (sections.length === 0) return;
      const offsets = getSectionOffsets();
      const target = getContainerTop() + offsets[stateRef.current.currentIndex];
      gsap.set(window, { scrollTo: target });
      updateActivePrimary();
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("resize", handleResize);
    window.addEventListener("scroll", updateActivePrimary, { passive: true });
    updateActivePrimary();
    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", updateActivePrimary);
    };
  }, []);

  const scrollToSectionIndex = (targetIndex: number) => {
    const container = containerRef.current;
    if (!container) return;
    const sections = Array.from(
      container.querySelectorAll<HTMLElement>("[data-scroll-section]")
    );
    if (targetIndex < 0 || targetIndex >= sections.length) return;
    const getScrollY = () => window.scrollY || window.pageYOffset || 0;
    const rect = sections[targetIndex].getBoundingClientRect();
    const targetY = rect.top + getScrollY();
    gsap.to(window, { scrollTo: targetY, duration: 0.8, ease: "power2.inOut" });
  };

  const handleNavService = () => {
    // find first service section by attribute
    const container = containerRef.current;
    if (!container) return;
    const sections = Array.from(
      container.querySelectorAll<HTMLElement>("[data-scroll-section]")
    );
    const idx = sections.findIndex((el) => el.hasAttribute("data-service-id"));
    if (idx >= 0) scrollToSectionIndex(idx);
  };

  const handleNavSolution = () => {
    const container = containerRef.current;
    if (!container) return;
    const sections = Array.from(
      container.querySelectorAll<HTMLElement>("[data-scroll-section]")
    );
    const idx = sections.findIndex((el) => el.hasAttribute("data-solution-id"));
    if (idx >= 0) scrollToSectionIndex(idx);
  };

  return (
    <main ref={containerRef}>
      <GlobalHeader
        onClickService={handleNavService}
        onClickSolution={handleNavSolution}
        activePrimary={activePrimaryRef.current}
      />
      <BannerSection startIdx={0} />
      <ServiceSection startIdx={3} />
      <SolutionSection startIdx={11} />
    </main>
  );
}
