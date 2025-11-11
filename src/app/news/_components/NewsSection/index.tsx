"use client";

import gsap from "gsap";
import { useEffect, useRef, useState } from "react";
import { newsList } from "../../_data/newsList";

export default function NewsSection() {
  const [displayedCards, setDisplayedCards] = useState(6);
  const [selectedFilter, setSelectedFilter] = useState("전체");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedArticle, setSelectedArticle] = useState<
    (typeof newsList)[0] | null
  >(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const filteredNews = newsList
    .filter((item) => selectedFilter === "전체" || item.type === selectedFilter)
    .filter(
      (item) =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
    );

  useEffect(() => {
    if (containerRef.current) {
      gsap.from(containerRef.current.querySelectorAll(`.n-section__card`), {
        opacity: 0,
        y: 20,
        duration: 0.5,
        stagger: 0.05,
        ease: "power2.out",
      });
    }
  }, [displayedCards, selectedFilter, searchQuery]);

  const handleLoadMore = () => {
    setDisplayedCards((prev) => prev + 6);
  };

  return (
    <>
      <section className="n-section">
        {/* Banner */}
        <div className="n-section__banner">
          <h1 className="n-section__title">NEWS & BLOG</h1>
          <p className="n-section__subtitle">최신 물류 및 IT 소식을 전합니다</p>
        </div>

        {/* Filter and Search */}
        <div className="n-section__filter-bar">
          <div className="n-section__filter-container">
            <div className="n-section__filter-content">
              {/* Filter Pills */}
              <div className="n-section__filters">
                {["전체", "뉴스", "블로그"].map((filter) => (
                  <button
                    key={filter}
                    onClick={() => {
                      setSelectedFilter(filter);
                      setDisplayedCards(6);
                    }}
                    className={`n-section__filter-button ${
                      selectedFilter === filter
                        ? "n-section__filter-button--active"
                        : "n-section__filter-button--inactive"
                    }`}
                  >
                    {filter}
                  </button>
                ))}
              </div>

              {/* Search Input */}
              <div className="n-section__search">
                <input
                  type="text"
                  placeholder="검색..."
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setDisplayedCards(6);
                  }}
                  className="n-section__search-input"
                />
                <svg
                  className="n-section__search-icon"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* News Grid */}
        <div className="n-section__grid-wrapper">
          <div ref={containerRef} className="n-section__grid">
            {filteredNews.slice(0, displayedCards).map((item) => (
              <div
                key={item.id}
                className="n-section__card"
                onClick={() => setSelectedArticle(item)}
              >
                <div className="n-section__card-inner">
                  {/* Placeholder Image */}
                  <div className="n-section__card-image">
                    <div className="n-section__card-image-pattern">
                      <svg
                        className="n-section__card-image-svg"
                        viewBox="0 0 400 300"
                        fill="none"
                      >
                        <circle
                          cx="100"
                          cy="100"
                          r="50"
                          stroke="currentColor"
                          strokeWidth="1"
                          className="n-section__card-image-circle-1"
                        />
                        <circle
                          cx="300"
                          cy="200"
                          r="40"
                          stroke="currentColor"
                          strokeWidth="1"
                          className="n-section__card-image-circle-2"
                        />
                        <rect
                          x="150"
                          y="150"
                          width="100"
                          height="100"
                          stroke="currentColor"
                          strokeWidth="1"
                          className="n-section__card-image-rect"
                        />
                      </svg>
                    </div>
                    <span className="n-section__card-image-text">이미지</span>
                  </div>

                  {/* Content */}
                  <div className="n-section__card-content">
                    {/* Category Badge */}
                    <div className="n-section__card-badge-wrapper">
                      <span
                        className={`n-section__card-badge ${
                          item.type === "뉴스"
                            ? "n-section__card-badge--news"
                            : "n-section__card-badge--blog"
                        }`}
                      >
                        {item.type}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="n-section__card-title">{item.title}</h3>

                    {/* Date and Excerpt */}
                    <p className="n-section__card-date">{item.date}</p>
                    <p className="n-section__card-excerpt">{item.excerpt}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Load More Button */}
        {displayedCards < filteredNews.length && (
          <div className="n-section__load-more">
            <button
              onClick={handleLoadMore}
              className="n-section__load-more-button"
            >
              더보기
            </button>
          </div>
        )}
      </section>

      {/* Detail Modal Overlay */}
      {selectedArticle && (
        <div
          className="n-modal"
          onClick={() => setSelectedArticle(null)}
          onKeyDown={(e) => e.key === "Escape" && setSelectedArticle(null)}
          // onClick={(e) => e.stopPropagation()}
        >
          
            <div className="n-modal__container">
              {/* Header */}
              <div className="n-modal__header">
                <button
                  onClick={() => setSelectedArticle(null)}
                  className="n-modal__back-button"
                >
                  <svg
                    className="n-modal__back-icon"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                  Go back
                </button>
              </div>

              {/* Content */}
              <div className="n-modal__content">
                <div className="contents">                  
                  {/* Meta */}
                  <div className="n-modal__meta">
                    <span
                      className={`n-modal__badge ${
                        selectedArticle.type === "뉴스"
                          ? "n-modal__badge--news"
                          : "n-modal__badge--blog"
                      }`}
                    >
                      {selectedArticle.type}
                    </span>
                    <span className="n-modal__date">{selectedArticle.date}</span>
                  </div>

                  {/* Title */}
                  <h1 className="n-modal__title">{selectedArticle.title}</h1>

                  {/* Summary */}
                  <p className="n-modal__summary">{selectedArticle.summary}</p>

                  {/* Main Image */}
                  <div className="n-modal__image">
                    <span className="n-modal__image-text">이미지</span>
                  </div>

                  {/* Content Sections */}
                  <div className="n-modal__sections">
                    {selectedArticle.content.map((section, idx) => (
                      <div key={idx} className="n-modal__section">
                        <h2 className="n-modal__section-heading">
                          {section.heading}
                        </h2>
                        <p className="n-modal__section-text">{section.text}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
        </div>
      )}
    </>
  );
}
