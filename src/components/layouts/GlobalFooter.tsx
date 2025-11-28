"use client";

import { contactModalOpenAtom, policyModalOpenAtom } from "@/store/global-modal.store";
import { useSetAtom } from "jotai";
import { MouseEvent } from "react";

export default function GlobalFooter() {
  const setContactModalOpen = useSetAtom(contactModalOpenAtom);
  const setPolicyModalOpen = useSetAtom(policyModalOpenAtom);

  const handleMenuClick = (link: string) => (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!window) return;
    window.location.href = `${window.location.origin}/${link}`;
  };

  const handleContactClick = () => {
    setContactModalOpen(true);
  };

  // 공통 스타일
  const colTitleClass = "mb-4 text-sm font-bold uppercase tracking-wider text-foreground";
  const linkClass = "text-sm text-muted-foreground transition-colors hover:text-primary";
  const socialIconClass = "h-5 w-5 text-muted-foreground transition-colors group-hover:text-primary";

  return (
    <footer className="border-t border-border bg-background pt-16 pb-8">
      <div className="mx-auto max-w-[1280px] px-2">
        {/* Main Grid */}
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-8">

          {/* Left Section: Company Info (Span 4) */}
          <div className="lg:col-span-4">
            <div className="mb-4 text-2xl font-bold tracking-tight text-foreground">
              KEEPSEND
            </div>
            <p className="mb-2 text-sm font-semibold text-primary">
              AI 기반 B2B 물류 플랫폼
            </p>
            <p className="mb-6 max-w-xs text-sm leading-relaxed text-muted-foreground">
              혁신적인 기술과 신뢰할 수 있는 서비스로<br/> 글로벌 물류의 미래를 만들어갑니다.
            </p>
            <button
              onClick={handleContactClick}
              className="rounded-full bg-primary px-6 py-2.5 text-sm font-bold text-white transition-all hover:bg-primary-hover hover:shadow-button-hover"
            >
              문의하기
            </button>
          </div>

          {/* Right Section: Links Columns (Span 8) */}
          <div className="grid grid-cols-2 gap-8 md:grid-cols-3 lg:col-span-8">

            {/* Column 1: Menu */}
            <div>
              <h4 className={colTitleClass}>메뉴</h4>
              <ul className="flex flex-col gap-3">
                <li>
                  <button type="button" onClick={handleMenuClick("#service-intro")} className={linkClass}>
                    물류 서비스
                  </button>
                </li>
                <li>
                  <button type="button" onClick={handleMenuClick("#solution-intro")} className={linkClass}>
                    IT 솔루션
                  </button>
                </li>
                <li>
                  <button type="button" onClick={handleMenuClick("news")} className={linkClass}>
                    소식
                  </button>
                </li>
              </ul>
            </div>

            {/* Column 2: SNS */}
            <div>
              <h4 className={colTitleClass}>SNS</h4>
              <ul className="flex flex-col gap-3">
                <li>
                  <a href="#instagram" className={`group flex items-center gap-2 ${linkClass}`}>
                    <svg className={socialIconClass} fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.015-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zM5.838 12a6.162 6.162 0 1 1 12.324 0 6.162 6.162 0 0 1-12.324 0zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm4.965-10.322a1.44 1.44 0 1 1 2.881.001 1.44 1.44 0 0 1-2.881-.001z" />
                    </svg>
                    <span>Instagram</span>
                  </a>
                </li>
                <li>
                  <a href="#facebook" className={`group flex items-center gap-2 ${linkClass}`}>
                    <svg className={socialIconClass} fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                    </svg>
                    <span>Facebook</span>
                  </a>
                </li>
                <li>
                  <a href="#youtube" className={`group flex items-center gap-2 ${linkClass}`}>
                    <svg className={socialIconClass} fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                    </svg>
                    <span>YouTube</span>
                  </a>
                </li>
              </ul>
            </div>

            {/* Column 3: Contact */}
            <div>
              <h4 className={colTitleClass}>연락처</h4>
              <ul className="flex flex-col gap-4 text-sm text-muted-foreground">
                <li>
                  <span className="block text-xs font-semibold text-foreground/50">Email</span>
                  <a href="mailto:contact@keepsend.com" className="transition-colors hover:text-primary">
                    manager@keepsend.com
                  </a>
                </li>
                <li>
                  <span className="block text-xs font-semibold text-foreground/50">Phone</span>
                  <a href="tel:0200000000" className="transition-colors hover:text-primary">
                    031-xxxx-xxxx
                  </a>
                </li>
                <li>
                  <span className="block text-xs font-semibold text-foreground/50">Address</span>
                  <span>경기도 하남시 미사강변한강로</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-12 border-t border-border pt-8 flex flex-col items-center justify-between gap-4 md:flex-row">
          <p className="text-xs text-muted-foreground/60">
            © 2025 KEEPSEND. All rights reserved.
          </p>
          <button
            type="button"
            onClick={() => {setPolicyModalOpen(true)}}
            className="text-xs text-muted-foreground transition-colors hover:text-foreground hover:underline"
          >
            개인정보처리방침
          </button>
        </div>
      </div>
    </footer>
  );
}
