"use client";

import { NoticeItem } from "@/lib/notion.news";
import clsx from "clsx";
import { motion } from "framer-motion";
import gsap from "gsap";
import { useEffect, useRef, useState } from "react";
import NewsDetail from "./NewsDetail";



interface NewsListProps {
  initialData: NoticeItem[];
}

export default function NewsList({ initialData }: NewsListProps) {
  // State
  const [displayedCards, setDisplayedCards] = useState(6);
  const [selectedFilter, setSelectedFilter] = useState("전체");
  const [selectedArticle, setSelectedArticle] = useState<NoticeItem | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);

  // Filtering Logic
  // Notion 데이터의 'category' 등을 활용. 없을 경우 대비해 기본값 처리
  const filteredNews = initialData
    .filter((item) => selectedFilter === "전체" || item.category === selectedFilter);

  // GSAP Animation
  useEffect(() => {
    if (containerRef.current) {
      const cards = containerRef.current.querySelectorAll(".n-section__card");
      if (cards.length > 0) {
        gsap.fromTo(
          cards,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.5, stagger: 0.05, ease: "power2.out" }
        );
      }
    }
  }, [displayedCards, selectedFilter]); // 의존성 배열 유지

  const handleLoadMore = () => {
    setDisplayedCards((prev) => prev + 6);
  };

  return (
    <>
      <section className="min-h-screen bg-gray-50">
        {/* Banner */}
          <motion.div
            className="relative w-full mx-auto py-32 px-5 text-center bg-gray-900 md:py-48 text-white"
            initial={{ opacity: 0}}
            animate={{ opacity:  1  }}
            transition={{  ease: "easeInOut" }}
          >
            {/* [Mod] 임의의 bg-slate/gray 대신 bg-muted 사용 */}
            <div className={clsx("z-[10] absolute top-0 left-0 w-full h-full")}>
              <video
                className="w-full h-full object-cover"
                autoPlay
                muted
                loop
                playsInline
              >
                <source src={"/video/news-01.mp4"} type="video/mp4" />
              </video>
            </div>
          {/* Overlay: 브랜드 딥블루 톤 유지를 위해 순수 black보다는 background 컬러 기반 오버레이 권장 */}
          <div className="absolute inset-0 bg-background/40 z-10" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/30 z-10" />
            <h1 className="relative z-[11] text-4xl font-bold mb-4 md:text-6xl">NEWS & BLOG</h1>
            <p className="relative z-[12] text-base text-gray-400 md:text-lg">최신 물류 및 IT 소식을 전합니다</p>
          </motion.div>

        {/* Filter Bar */}
        <div className="sticky top-[60px] z-40 bg-white/95 backdrop-blur py-2 border-b border-gray-200 mb-0 md:py-4">
          <div className="s-section__content !h-auto !py-0 !items-start !min-h-0 px-5">
              {/* Filter Pills */}
              <div className="flex gap-3">
                {["전체", "뉴스", "블로그"].map((filter) => (
                  <button
                    key={filter}
                    onClick={() => {
                      setSelectedFilter(filter);
                      setDisplayedCards(6);
                    }}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                      selectedFilter === filter
                        ? "bg-blue-600 text-white"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                  >
                    {filter}
                  </button>
                ))}
              </div>
          </div>
        </div>

        {/* News Grid */}
        <div className="s-section__content !min-h-[100vh] justify-start items-start light mb-12 py-12 px-5">
          <div ref={containerRef} className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredNews.slice(0, displayedCards).map((item) => (
              <div
                key={item.id}
                className="n-section__card cursor-pointer group bg-white rounded-lg overflow-hidden border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                onClick={() => setSelectedArticle(item)}
              >
                {/* Thumbnail */}
                <div className="w-full h-48 bg-gray-100 flex items-center justify-center relative overflow-hidden">
                  {item.thumbnail ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={item.thumbnail} alt={item.title} className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-gray-400 text-sm">No Image</span>
                  )}
                </div>

                {/* Content */}
                <div className="p-5">
                  <div className="mb-3">
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                        item.category === "뉴스"
                          ? "bg-blue-100 text-blue-600"
                          : "bg-purple-100 text-purple-600"
                      }`}
                    >
                      {item.category || "일반"}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-blue-600">
                    {item.title}
                  </h3>
                  <p className="text-xs text-gray-500 mb-2">{item.date}</p>
                  <p className="text-sm text-gray-600 line-clamp-2">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Load More */}
        {displayedCards < filteredNews.length && (
          <div className="flex justify-center pb-12 bg-gray-50">
            <button
              onClick={handleLoadMore}
              className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-full hover:bg-blue-700 transition-all"
            >
              더보기
            </button>
          </div>
        )}
      </section>

      {/* Detail Modal */}
      {selectedArticle && (
        <NewsDetail
          article={selectedArticle}
          onClose={() => setSelectedArticle(null)}
        />
      )}
    </>
  );
}
