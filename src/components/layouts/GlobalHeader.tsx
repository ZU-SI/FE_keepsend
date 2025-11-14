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

// 5vh를 픽셀 단위로 계산
const VH_THRESHOLD = 5; // 5vh
const VH_ALWAYS_VISIBLE = 50; // 50vh

export default function GlobalHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const activePrimary = useAtomValue(activeMenuAtom);
  const setContactModalOpen = useSetAtom(contactModalOpenAtom);
  // SCROLL UI
  const [isHidden, setIsHidden] = useState(false);
  const lastScrollY = useRef(0);

  const handleMenuClick =  (link: string) => (e: MouseEvent)=> {
     e.preventDefault();
    if (!window) return;
    window.location.href = `${window.location.origin}/${link}`;
    setIsMenuOpen(false);
  }

  const handleContactClick = (e: MouseEvent) => {
    e.preventDefault();
    setContactModalOpen(true);
    setIsMenuOpen(false);
  }

  useEffect(() => {
    // 5vh와 50vh를 픽셀 단위로 변환
    const THRESHOLD_PX = (window.innerHeight * VH_THRESHOLD) / 100;
    const ALWAYS_VISIBLE_PX = (window.innerHeight * VH_ALWAYS_VISIBLE) / 100;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const isScrollingDown = currentScrollY > lastScrollY.current;

      // 1. 0 ~ 50vh 사이에는 항상 Visible 처리 (50vh = ALWAYS_VISIBLE_PX)
      if (currentScrollY <= ALWAYS_VISIBLE_PX) {
        setIsHidden(false);
      }
      // 2. 50vh 이상 스크롤된 경우
      else {
        // 2-1. 위로 스크롤 시 (스크롤 방향 감지) -> 항상 Visible
        if (!isScrollingDown) {
          setIsHidden(false);
        }
        // 2-2. 아래로 스크롤 시 -> 5vh(THRESHOLD_PX) 이상 내려가면 Hidden
        else if (currentScrollY > THRESHOLD_PX) {
          setIsHidden(true);
        }
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <nav className="header" style={{
      'visibility': isHidden? 'hidden' : 'visible'
    }}>
      <div className="header__container">
        {/* Logo */}
        <Link href="/" className="header__logo">
          <TypoLogo />
        </Link>

        {/* Desktop Menu */}
        <div className="header__menu">
          <button
            type="button"
            onClick={ handleMenuClick('#service')}
            className={`header__link ${
              activePrimary === "service" ? "header__link--active" : ""
            }`}
          >
            물류 서비스
          </button>
          <button
            type="button"
            onClick={ handleMenuClick('#solution')}
            className={`header__link ${
              activePrimary === "solution" ? "header__link--active" : ""
            }`}
          >
            IT 솔루션
          </button>
          <button
            type="button"
            onClick={ handleMenuClick('news')}
            className={`header__link ${
              pathname === "/news" ? "header__link--active" : ""
            }`}
          >
            소식
          </button>
        </div>

        {/* CTA Button */}
        <div className="header__cta">
          <button
            className="header__button"
            onClick={handleContactClick}
          >
            견적 문의
          </button>
        </div>

        {/* Mobile Menu Button */}
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

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="header__mobile">
          <button
            type="button"
            onClick={ handleMenuClick('#service')}
            className="header__mobile-link"
          >
            물류 서비스
          </button>
          <button
            type="button"
            onClick={ handleMenuClick('#solution')}
            className="header__mobile-link"
          >
            IT 솔루션
          </button>
          <button
            type="button"
            onClick={ handleMenuClick('news')}
            className="header__mobile-link"
          >
            소식
          </button>
          <button type="button" onClick={handleContactClick} className={`header__button header__button--mobile`}>
            견적 문의
          </button>
        </div>
      )}
    </nav>
  );
}
