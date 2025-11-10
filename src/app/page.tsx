"use client";

import GlobalHeader from "@/components/layouts/GlobalHeader";
import BannerSection from "@/components/sections/BannerSection";
import gsap from "gsap";
import ScrollToPlugin from "gsap/ScrollToPlugin";
import { useEffect, useRef } from "react";

gsap.registerPlugin(ScrollToPlugin);

export default function Home() {
  const containerRef = useRef<HTMLElement | null>(null);
  const stateRef = useRef({
    isAnimating: false,
    currentIndex: 0,
  });

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

      // recompute current index from scroll position to stay in sync with variable heights
      const offsetsForIndex = getSectionOffsets();
      const containerTop = getContainerTop();
      let currentIndex = 0;
      for (let i = 0; i < offsetsForIndex.length; i++) {
        if (scrollY >= containerTop + offsetsForIndex[i] - 2) {
          currentIndex = i;
        } else {
          break;
        }
      }
      state.currentIndex = currentIndex;

      const nextIndex = clampIndex(currentIndex + direction, total - 1);
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

      // compute target for snapping
      const sectionOffsets = getSectionOffsets();
      const targetY = getContainerTop() + sectionOffsets[nextIndex];

      // release beyond edges but snap to edge if not aligned
      if (currentIndex === 0 && direction < 0) return;
      if (currentIndex === total - 1 && direction > 0) return;

      if (nextIndex === state.currentIndex) {
        e.preventDefault();
        return;
      }

      e.preventDefault();
      state.isAnimating = true;
      state.currentIndex = nextIndex;
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

    const handleResize = () => {
      const sections = getSections();
      if (sections.length === 0) return;
      const offsets = getSectionOffsets();
      const target = getContainerTop() + offsets[stateRef.current.currentIndex];
      gsap.set(window, { scrollTo: target });
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <main ref={containerRef}>
      <GlobalHeader />
      <BannerSection startIdx={0} />
      <div
        style={{ width: "100%", height: "250vh" }}
        data-scroll-section
        data-section-index={3}
      >
        COMMON1
      </div>
      <div
        style={{ width: "100%", height: "100vh" }}
        data-scroll-section
        data-section-index={4}
      >
        COMMON2
      </div>
    </main>
  );
}
