"use client";

import { contactModalOpenAtom } from "@/store/contact.store";
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

  return (
    <nav
      className="header"
      style={{
        transform: isHidden ? "translateY(-100%)" : "translateY(0)",
        transition: "transform 0.3s ease-in-out",
      }}
    >
      <div className="header__container">
        <Link href="/" className="header__logo">
          <TypoLogo />
        </Link>

        <div className="header__menu">
          <button
            type="button"
            onClick={handleMenuClick("#service-intro")}
            className={`header__link ${
              activePrimary === "service" ? "header__link--active" : ""
            }`}
          >
            물류 서비스
          </button>
          <button
            type="button"
            onClick={handleMenuClick("#solution-intro")}
            className={`header__link ${
              activePrimary === "solution" ? "header__link--active" : ""
            }`}
          >
            IT 솔루션
          </button>
          <button
            type="button"
            onClick={handleMenuClick("news")}
            className={`header__link ${
              pathname === "/news" ? "header__link--active" : ""
            }`}
          >
            소식
          </button>
        </div>

        <div className="header__cta">
          <button
            className="btn btn--primary btn--md"
            onClick={handleContactClick}
          >
            견적 문의
          </button>
        </div>

        <button
          className="header__hamburger"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="메뉴 열기"
        >
          <svg
            className="header__hamburger-icon"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>

      {isMenuOpen && (
        <div className="header__mobile">
          <button
            type="button"
            onClick={handleMenuClick("#service")}
            className="header__mobile-link"
          >
            물류 서비스
          </button>
          <button
            type="button"
            onClick={handleMenuClick("#solution")}
            className="header__mobile-link"
          >
            IT 솔루션
          </button>
          <button
            type="button"
            onClick={handleMenuClick("news")}
            className="header__mobile-link"
          >
            소식
          </button>
          <button
            type="button"
            onClick={handleContactClick}
            className="btn btn--primary btn--md btn--full"
          >
            견적 문의
          </button>
        </div>
      )}
    </nav>
  );
}
