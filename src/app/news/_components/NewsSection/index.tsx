"use client";

import { NoticeItem } from "@/lib/notion.news";
import gsap from "gsap";
import { useEffect, useMemo, useRef, useState } from "react";
import { newsList } from "../../_data/newsList";

export default function NewsSection({data}: {data: NoticeItem[]}) {
  const [displayedCards, setDisplayedCards] = useState(6);
  const [selectedFilter, setSelectedFilter] = useState("전체");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedArticle, setSelectedArticle] = useState<
    (typeof newsList)[0] | null
  >(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const filteredNews = useMemo(() => newsList
    .filter((item) => selectedFilter === "전체"? true : item.type === selectedFilter)
    .filter(
      (item) =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
    ), [selectedFilter]);

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
      {/* News Section */}
      <section className="min-h-screen bg-background-light">
        {/* Banner (Dark Theme) */}
        <div className="mx-auto py-32 px-5 text-center bg-background md:py-48">
          <h1 className="text-4xl font-bold text-foreground mb-4 md:text-6xl">
            NEWS & BLOG
          </h1>
          <p className="text-base text-muted-foreground md:text-lg">
            최신 물류 및 IT 소식을 전합니다
          </p>
        </div>

        {/* Filter Bar (Dark Theme, Sticky) */}
        <div className="sticky top-[60px] z-40 bg-background/95 backdrop-blur py-2 border-b border-border mb-0 md:py-4 md:h-[65px]">
          <div className="max-w-container mx-auto px-5">
            <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
              {/* Filter Pills */}
              <div className="flex gap-3">
                {["전체", "뉴스", "블로그"].map((filter) => (
                  <button
                    key={filter}
                    onClick={() => {
                      setSelectedFilter(filter);
                      setDisplayedCards(6);
                    }}
                    className={`
                      px-4 py-2 rounded-full text-sm font-medium
                      transition-all duration-300 cursor-pointer border-none
                      ${
                        selectedFilter === filter
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted text-muted-foreground hover:bg-gray-700"
                      }
                    `}
                  >
                    {filter}
                  </button>
                ))}
              </div>

              {/* Search Input */}
              <div className="relative w-full md:w-64">
                <input
                  type="text"
                  placeholder="검색..."
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setDisplayedCards(6);
                  }}
                  className="
                    w-full px-4 py-2 pr-10
                    bg-input border border-border rounded-sm
                    text-sm text-foreground
                    placeholder:text-muted-foreground
                    focus:outline-none focus:border-primary focus:ring-[3px] focus:ring-primary/20
                  "
                />
                <svg
                  className="absolute right-3 top-2.5 w-5 h-5 text-muted-foreground"
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

        {/* News Grid (Light Background) */}
        <div className="max-w-container mx-auto mb-12 py-12 px-5 bg-background-light">
          <div
            ref={containerRef}
            className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
          >
            {filteredNews.slice(0, displayedCards).map((item) => (
              <div
                key={item.id}
                className="n-section__card cursor-pointer group"
                onClick={() => setSelectedArticle(item)}
              >
                <div className="bg-card-light rounded-lg overflow-hidden border border-border-light transition-all duration-300 shadow-card group-hover:border-primary group-hover:-translate-y-2 group-hover:shadow-card-hover">
                  {/* Card Image */}
                  <div className="w-full h-48 bg-gradient-light flex items-center justify-center relative overflow-hidden">
                    <div className="absolute inset-0 opacity-40">
                      <svg
                        className="w-full h-full"
                        viewBox="0 0 400 300"
                        fill="none"
                      >
                        <circle
                          cx="100"
                          cy="100"
                          r="50"
                          stroke="currentColor"
                          strokeWidth="1"
                          className="text-primary"
                        />
                        <circle
                          cx="300"
                          cy="200"
                          r="40"
                          stroke="currentColor"
                          strokeWidth="1"
                          className="text-accent"
                        />
                        <rect
                          x="150"
                          y="150"
                          width="100"
                          height="100"
                          stroke="currentColor"
                          strokeWidth="1"
                          className="text-purple-500"
                        />
                      </svg>
                    </div>
                    <span className="text-gray-400 text-sm relative z-[1]">
                      이미지
                    </span>
                  </div>

                  {/* Card Content */}
                  <div className="p-5">
                    {/* Category Badge */}
                    <div className="mb-3">
                      <span
                        className={`
                          inline-block px-3 py-1 rounded-full text-xs font-semibold
                          ${
                            item.type === "뉴스"
                              ? "bg-primary/10 text-primary"
                              : "bg-purple-600/10 text-purple-600"
                          }
                        `}
                      >
                        {item.type}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-base font-bold text-foreground-light mb-3 line-clamp-2 transition-colors duration-300 group-hover:text-primary md:text-lg">
                      {item.title}
                    </h3>

                    {/* Date */}
                    <p className="text-xs text-gray-500 mb-2">{item.date}</p>

                    {/* Excerpt */}
                    <p className="text-sm text-gray-600 line-clamp-2">
                      {item.excerpt}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Load More Button */}
        {displayedCards < filteredNews.length && (
          <div className="flex justify-center pb-12 bg-background-light">
            <button
              onClick={handleLoadMore}
              className="
                px-8 py-3
                bg-primary text-primary-foreground font-semibold
                rounded-full border-none cursor-pointer
                text-base transition-all duration-300
                hover:bg-primary-hover hover:shadow-button-hover hover:-translate-y-0.5
              "
            >
              더보기
            </button>
          </div>
        )}
      </section>

      {/* Detail Modal Overlay */}
      {selectedArticle && (
        <div
          className="fixed inset-0 w-screen h-screen bg-black/30 backdrop-blur-xs z-navigation overflow-y-auto flex items-center justify-center p-4"
          onClick={(e) => {
            if ((e.target as HTMLElement).closest("#news-details")) return;
            setSelectedArticle(null);
          }}
          onKeyDown={(e) => e.key === "Escape" && setSelectedArticle(null)}
        >
          {/* Modal Container */}
          <div
            className="w-full max-w-[768px] rounded-xl overflow-hidden max-h-[90vh] h-[768px] flex flex-col"
            id="news-details"
          >
            {/* Header (Dark Theme, Sticky) */}
            <div className="flex-shrink-0 h-[60px] bg-background/95 backdrop-blur border-b border-border px-6 py-4 flex items-center justify-between">
              <button
                onClick={() => setSelectedArticle(null)}
                className="
                  flex items-center gap-2
                  text-muted-foreground bg-transparent border-none cursor-pointer
                  text-sm transition-colors duration-300
                  hover:text-primary
                "
              >
                <svg
                  className="w-5 h-5"
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

            {/* Content (Light Theme) - Scrollable */}
            <div className="flex-1 overflow-y-auto bg-card-light">
              <div className="p-6 md:p-12">
                {/* Meta */}
                <div className="mb-6 flex items-center gap-4">
                  <span
                    className={`
                      inline-block px-3 py-1 rounded-full text-xs font-semibold
                      ${
                        selectedArticle.type === "뉴스"
                          ? "bg-primary/10 text-primary"
                          : "bg-purple-600/10 text-purple-600"
                      }
                    `}
                  >
                    {selectedArticle.type}
                  </span>
                  <span className="text-sm text-gray-500">
                    {selectedArticle.date}
                  </span>
                </div>

                {/* Title */}
                <h1 className="text-4xl font-bold text-foreground-light mb-6 leading-tight md:text-5xl">
                  {selectedArticle.title}
                </h1>

                {/* Summary */}
                <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                  {selectedArticle.summary}
                </p>

                {/* Main Image */}
                <div className="w-full h-96 bg-gradient-light rounded-lg mb-8 flex items-center justify-center">
                  <span className="text-gray-400 text-base">이미지</span>
                </div>

                {/* Content Sections */}
                <div className="flex flex-col gap-8">
                  {selectedArticle.content.map((section, idx) => (
                    <div key={idx}>
                      <h2 className="text-2xl font-bold text-foreground-light mb-4">
                        {section.heading}
                      </h2>
                      <p className="text-gray-600 leading-relaxed text-base">
                        {section.text}
                      </p>
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
