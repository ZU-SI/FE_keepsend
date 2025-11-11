"use client";

import { activeMenuAtom } from "@/store/atoms";
import gsap from "gsap";
import ScrollToPlugin from "gsap/ScrollToPlugin";
import { useAtomValue } from "jotai";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MouseEvent, useState } from "react";
import styles from "./globalHeader.module.css";

gsap.registerPlugin(ScrollToPlugin);

export default function GlobalHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const activePrimary = useAtomValue(activeMenuAtom);

  const handleServiceClick = (e: MouseEvent) => {
    e.preventDefault();
    if (!window) return;
    window.location.href = `${window.location.origin}/#service`;
  };

  const handleSolutionClick = (e: MouseEvent) => {
    e.preventDefault();
    if (!window) return;
    window.location.href = `${window.location.origin}/#solution`;
  };

  return (
    <nav className={styles.navigation}>
      <div className={styles.navigation__container}>
        {/* Logo */}
        <div className={styles.navigation__logo}>
          <span className={styles["navigation__logo-text"]}>KEEPSEND</span>
        </div>

        {/* Desktop Menu */}
        <div className={styles.navigation__menu}>
          <button
            type="button"
            onClick={handleServiceClick}
            className={`${styles.navigation__link} ${
              activePrimary === "service"
                ? styles["navigation__link--active"]
                : ""
            }`}
          >
            물류 서비스
          </button>
          <button
            type="button"
            onClick={handleSolutionClick}
            className={`${styles.navigation__link} ${
              activePrimary === "solution"
                ? styles["navigation__link--active"]
                : ""
            }`}
          >
            IT 솔루션
          </button>
          <Link
            href="/news"
            className={`${styles.navigation__link} ${
              pathname === "/news" ? styles["navigation__link--active"] : ""
            }`}
          >
            소식
          </Link>
        </div>

        {/* CTA Button */}
        <div className={styles.navigation__cta}>
          <button className={styles.navigation__button}>견적 문의</button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className={styles.navigation__hamburger}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="메뉴 열기"
        >
          <svg
            className={styles["navigation__hamburger-icon"]}
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
        <div className={styles.navigation__mobile}>
          <a
            href="#services"
            onClick={handleServiceClick}
            className={styles["navigation__mobile-link"]}
          >
            물류 서비스
          </a>
          <a
            href="#solutions"
            onClick={handleSolutionClick}
            className={styles["navigation__mobile-link"]}
          >
            IT 솔루션
          </a>
          <Link href="/news" className={styles["navigation__mobile-link"]}>
            소식
          </Link>
          <button
            className={`${styles.navigation__button} ${styles["navigation__button--mobile"]}`}
          >
            견적 문의
          </button>
        </div>
      )}
    </nav>
  );
}
