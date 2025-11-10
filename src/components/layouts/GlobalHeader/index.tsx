"use client";

import { MouseEvent, useState } from "react";
import styles from "./globalHeader.module.css";

interface Props {
  onClickService?: () => void;
  onClickSolution?: () => void;
  activePrimary?: "service" | "solution" | null;
}

export default function GlobalHeader({
  onClickService,
  onClickSolution,
  activePrimary = null,
}: Props) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleServiceClick = (e: MouseEvent) => {
    e.preventDefault();
    onClickService?.();
  };
  const handleSolutionClick = (e: MouseEvent) => {
    e.preventDefault();
    onClickSolution?.();
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
          <a
            href="#services"
            onClick={handleServiceClick}
            className={`${styles.navigation__link} ${
              activePrimary === "service"
                ? styles["navigation__link--active"]
                : ""
            }`}
          >
            물류 서비스
          </a>
          <a
            href="#solutions"
            onClick={handleSolutionClick}
            className={`${styles.navigation__link} ${
              activePrimary === "solution"
                ? styles["navigation__link--active"]
                : ""
            }`}
          >
            IT 솔루션
          </a>
          <a href="#news" className={styles.navigation__link}>
            소식
          </a>
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
          <a href="#news" className={styles["navigation__mobile-link"]}>
            소식
          </a>
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
