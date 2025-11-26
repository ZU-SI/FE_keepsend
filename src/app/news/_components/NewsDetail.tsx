"use client";

import { fetchPageBlocks, NoticeItem, NotionBlock } from "@/lib/notion.news";
import { useEffect, useState } from "react";

interface NewsDetailProps {
  article: NoticeItem;
  onClose: () => void;
}

export default function NewsDetail({ article, onClose }: NewsDetailProps) {
  const [blocks, setBlocks] = useState<NotionBlock[]>([]);
  const [loading, setLoading] = useState(true);

  // 모달 오픈 시 본문(Block) 데이터 Fetch
  useEffect(() => {
    const loadContent = async () => {
      try {
        const data = await fetchPageBlocks(article.id);
        setBlocks(data);
      } catch (e) {
        console.error("본문 로딩 실패", e);
      } finally {
        setLoading(false);
      }
    };
    loadContent();
  }, [article.id]);

  return (
    <div
      className="fixed inset-0 w-screen h-screen bg-black/30 backdrop-blur-xs z-50 overflow-y-auto flex items-center justify-center p-4"
      onClick={(e) => {
        if ((e.target as HTMLElement).closest("#news-details")) return;
        onClose();
      }}
      onKeyDown={(e) => e.key === "Escape" && onClose()}
    >
      {/* Modal Container */}
      <div
        className="w-full max-w-[768px] rounded-xl overflow-hidden max-h-[90vh] h-[768px] flex flex-col bg-white shadow-2xl"
        id="news-details"
      >
        {/* Header (Sticky) */}
        <div className="flex-shrink-0 h-[60px] bg-white/95 backdrop-blur border-b border-gray-200 px-6 py-4 flex items-center justify-between sticky top-0 z-10">
          <button
            onClick={onClose}
            className="flex items-center gap-2 text-gray-500 bg-transparent border-none cursor-pointer text-sm transition-colors duration-300 hover:text-black"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Go back
          </button>
        </div>

        {/* Content - Scrollable */}
        <div className="flex-1 overflow-y-auto bg-white">
          <div className="p-6 md:p-12">
            {/* Meta */}
            <div className="mb-6 flex items-center gap-4">
              <span
                className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                  article.category === "뉴스"
                    ? "bg-blue-100 text-blue-600"
                    : "bg-purple-100 text-purple-600"
                }`}
              >
                {article.category || "일반"}
              </span>
              <span className="text-sm text-gray-500">{article.date}</span>
            </div>

            {/* Title */}
            <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              {article.title}
            </h1>

            {/* Summary (Description) */}
            <p className="text-lg text-gray-600 mb-8 leading-relaxed font-medium">
              {article.description}
            </p>

            {/* Main Image */}
            {article.thumbnail ? (
               // eslint-disable-next-line @next/next/no-img-element
              <img
                src={article.thumbnail}
                alt={article.title}
                className="w-full h-auto max-h-96 object-cover rounded-lg mb-8"
              />
            ) : (
              <div className="w-full h-96 bg-gray-100 rounded-lg mb-8 flex items-center justify-center">
                <span className="text-gray-400 text-base">이미지 없음</span>
              </div>
            )}

            {/* Content Sections (Blocks) */}
            <div className="flex flex-col gap-4">
              {loading ? (
                <div className="py-10 text-center text-gray-500">본문을 불러오는 중...</div>
              ) : (
                blocks.map((block) => {
                  // 간단한 블록 렌더러 예시 (실제로는 더 정교한 매퍼 필요)
                  if (block.type === "paragraph") {
                    return (
                      <p key={block.id} className="text-gray-700 leading-relaxed text-base">
                        {block.paragraph.rich_text[0]?.plain_text || ""}
                      </p>
                    );
                  }
                  if (block.type === "heading_1" || block.type === "heading_2" || block.type === "heading_3") {
                    const text = block[block.type].rich_text[0]?.plain_text;
                    return <h2 key={block.id} className="text-2xl font-bold mt-4 mb-2">{text}</h2>;
                  }
                  // 이미지 등 다른 타입 추가 가능
                  return null;
                })
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
