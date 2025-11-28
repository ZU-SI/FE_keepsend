"use client";

import { contactModalOpenAtom } from "@/store/global-modal.store";
import { activeMenuAtom } from "@/store/menu.store";
import gsap from "gsap";
import ScrollToPlugin from "gsap/ScrollToPlugin";
import { useAtomValue, useSetAtom } from "jotai";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MouseEvent, useEffect, useRef, useState } from "react";
import TypoLogo from "../ui/logo/TypoLogo";

gsap.registerPlugin(ScrollToPlugin);

const SCROLL_THRESHOLD = 10;

export default function GlobalHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const activePrimary = useAtomValue(activeMenuAtom);
  const setContactModalOpen = useSetAtom(contactModalOpenAtom);
  const [isHidden, setIsHidden] = useState(false);
  const lastScrollY = useRef(0);
  const ticking = useRef(false);

  const handleMenuClick = (link: string) => (e: MouseEvent) => {
    e.preventDefault();
    if (!window) return;
    window.location.href = `${window.location.origin}/${link}`;
    setIsMenuOpen(false);
  };

  const handleContactClick = (e: MouseEvent) => {
    e.preventDefault();
    setContactModalOpen(true);
    setIsMenuOpen(false);
  };

  useEffect(() => {
    if (pathname.length > 1) {
      return;
    }

    const handleScroll = () => {
      if (!ticking.current) {
        window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;
          const scrollDiff = currentScrollY - lastScrollY.current;

          if (Math.abs(scrollDiff) > SCROLL_THRESHOLD) {
            // 스크롤을 내릴 때 숨김 (단, 최상단 100px 이내는 유지)
            if (scrollDiff > 0 && currentScrollY > 100) {
              setIsHidden(true);
            } else {
              setIsHidden(false);
            }
            lastScrollY.current = currentScrollY;
          }

          ticking.current = false;
        });
        ticking.current = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [pathname]);

  // 공통 링크 스타일
  const linkBaseClass = "text-sm  font-medium transition-colors duration-200 hover:text-accent";
  const linkActiveClass = "text-accent font-bold";
  const linkInactiveClass = "text-white";

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-navigation border-b border-border/40 bg-background/80 backdrop-blur-md transition-transform duration-300 ease-in-out`}
      style={{
        transform: isHidden ? "translateY(-100%)" : "translateY(0)",
      }}
    >
      <div className="mx-auto flex h-16 max-w-[1280px] items-center justify-between px-[20px]">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <TypoLogo />
        </Link>

        {/* Desktop Menu */}
        <div className="hidden items-center gap-8 md:flex">
          <button
            type="button"
            onClick={handleMenuClick("#service-intro")}
            className={`${linkBaseClass} ${
              activePrimary === "service" ? linkActiveClass : linkInactiveClass
            }`}
          >
            물류 서비스
          </button>
          <button
            type="button"
            onClick={handleMenuClick("#solution-intro")}
            className={`${linkBaseClass} ${
              activePrimary === "solution" ? linkActiveClass : linkInactiveClass
            }`}
          >
            IT 솔루션
          </button>
          <button
            type="button"
            onClick={handleMenuClick("news")}
            className={`${linkBaseClass} ${
              pathname === "/news" ? linkActiveClass : linkInactiveClass
            }`}
          >
            소식
          </button>
        </div>

        {/* Desktop CTA */}
        <div className="hidden md:block">
          <button
            className="rounded-full bg-primary px-6 py-2 text-sm font-medium text-white transition-all hover:bg-primary-hover hover:shadow-button-hover"
            onClick={handleContactClick}
          >
            견적 문의
          </button>
        </div>

        {/* Mobile Hamburger */}
        <button
          className="p-2 text-foreground md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="메뉴 열기"
        >
          <svg
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
            />
          </svg>
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMenuOpen && (
        <div className="absolute left-0 top-16 w-full border-b border-border bg-background px-4 py-6 shadow-lg md:hidden">
          <div className="flex flex-col gap-4">
            <button
              type="button"
              onClick={handleMenuClick("#service-intro")}
              className={`text-left text-lg font-medium ${
                activePrimary === "service" ? "text-primary" : "text-foreground"
              }`}
            >
              물류 서비스
            </button>
            <button
              type="button"
              onClick={handleMenuClick("#solution-intro")}
              className={`text-left text-lg font-medium ${
                activePrimary === "solution" ? "text-primary" : "text-foreground"
              }`}
            >
              IT 솔루션
            </button>
            <button
              type="button"
              onClick={handleMenuClick("news")}
              className={`text-left text-lg font-medium ${
                pathname === "/news" ? "text-primary" : "text-foreground"
              }`}
            >
              소식
            </button>
            <div className="pt-4">
              <button
                type="button"
                onClick={handleContactClick}
                className="w-full rounded-lg bg-primary py-3 text-center font-bold text-white transition-colors hover:bg-primary-hover"
              >
                견적 문의
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
