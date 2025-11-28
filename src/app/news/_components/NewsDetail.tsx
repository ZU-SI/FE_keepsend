"use client";

import { fetchPageBlocks, NoticeItem, NotionBlock } from "@/lib/notion.news";
import { useEffect, useState } from "react";

interface NewsDetailProps {
  article: NoticeItem;
  onClose: () => void;
}

// 1. Rich Text(볼드, 이탤릭, 색상 등)를 렌더링하는 헬퍼 함수
const renderRichText = (richTextArray: any[]) => {
  if (!richTextArray || richTextArray.length === 0) return null;

  return richTextArray.map((text: any, index: number) => {
    const { annotations } = text;
    const style: React.CSSProperties = {
      fontWeight: annotations.bold ? "bold" : "normal",
      fontStyle: annotations.italic ? "italic" : "normal",
      textDecoration: [
        annotations.strikethrough ? "line-through" : "",
        annotations.underline ? "underline" : "",
      ]
        .filter(Boolean)
        .join(" "),
      color: annotations.color !== "default" ? annotations.color : "inherit",
    };

    if (text.href) {
      return (
        <a
          key={index}
          href={text.href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 underline"
          style={style}
        >
          {text.plain_text}
        </a>
      );
    }

    return (
      <span key={index} style={style} className={annotations.code ? "bg-gray-100 px-1 rounded font-mono text-sm text-red-500" : ""}>
        {text.plain_text}
      </span>
    );
  });
};

// 2. 블록 타입별로 분기 처리하는 컴포넌트
const BlockRenderer = ({ block }: { block: NotionBlock }) => {
  const { type, id } = block;
  // @ts-ignore : NotionBlock 타입 정의에 따라 동적 접근 시 타입 에러가 날 수 있어 무시 처리 (실제 타입에 맞춰 수정 권장)
  const value = block[type];

  switch (type) {
    case "heading_1":
      return <h1 className="text-3xl font-bold mt-8 mb-4 text-gray-900">{renderRichText(value.rich_text)}</h1>;
    case "heading_2":
      return <h2 className="text-2xl font-bold mt-6 mb-3 text-gray-800 border-b pb-2">{renderRichText(value.rich_text)}</h2>;
    case "heading_3":
      return <h3 className="text-xl font-bold mt-4 mb-2 text-gray-800">{renderRichText(value.rich_text)}</h3>;

    case "paragraph":
      return <p className="text-gray-700 leading-relaxed mb-4 min-h-[24px]">{renderRichText(value.rich_text)}</p>;

    case "bulleted_list_item":
      return (
        <div className="flex items-start gap-2 mb-2 ml-4">
          <span className="text-gray-400 mt-1.5 text-xs">●</span>
          <div className="text-gray-700 leading-relaxed">{renderRichText(value.rich_text)}</div>
        </div>
      );

    case "numbered_list_item":
      return (
        <div className="flex items-start gap-2 mb-2 ml-4">
          {/* 순서를 정확히 매기려면 부모에서 그룹핑해야 하지만, 약식으로 처리 */}
          <span className="text-gray-500 font-medium min-w-[20px] text-right select-none">-</span>
          <div className="text-gray-700 leading-relaxed">{renderRichText(value.rich_text)}</div>
        </div>
      );

    case "quote":
      return (
        <div className="border-l-4 border-gray-300 pl-4 py-1 my-4 bg-gray-50 italic text-gray-600 rounded-r">
          {renderRichText(value.rich_text)}
        </div>
      );

    case "callout":
      return (
        <div className="flex gap-3 p-4 my-4 bg-gray-50 rounded-lg border border-gray-100 items-start">
          <div className="text-xl select-none">{value.icon?.emoji || "💡"}</div>
          <div className="text-gray-700 flex-1">{renderRichText(value.rich_text)}</div>
        </div>
      );

    case "image":
      const src = value.type === "external" ? value.external.url : value.file.url;
      const caption = value.caption?.[0]?.plain_text || "";
      return (
        <figure className="my-6">
           {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={src} alt={caption || "news content"} className="w-full rounded-lg shadow-sm border border-gray-100" />
          {caption && <figcaption className="text-center text-gray-400 text-sm mt-2">{caption}</figcaption>}
        </figure>
      );

    case "divider":
      return <hr className="my-8 border-gray-200" />;

    default:
      // 지원하지 않는 블록은 디버깅을 위해 타입을 표시하거나 숨김
      // return <div className="text-red-400 text-xs">Unsupported block: {type}</div>;
      return null;
  }
};

export default function NewsDetail({ article, onClose }: NewsDetailProps) {
  const [blocks, setBlocks] = useState<NotionBlock[]>([]);
  const [loading, setLoading] = useState(true);

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
      <div
        className="w-full max-w-[768px] rounded-xl overflow-hidden max-h-[90vh] h-[768px] flex flex-col bg-white shadow-2xl"
        id="news-details"
      >
        {/* Header */}
        <div className="flex-shrink-0 h-[60px] bg-white/95 backdrop-blur border-b border-gray-200 px-6 py-4 flex items-center justify-between sticky top-0 z-10">
          <button
            onClick={onClose}
            className="flex items-center gap-2 text-gray-500 hover:text-black transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            목록 보기
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto bg-white">
          <div className="p-6 md:p-12">
            {/* Meta */}
            <div className="mb-6 flex items-center gap-4">
              <span
                className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                  article.category === "뉴스" ? "bg-blue-100 text-blue-600" : "bg-purple-100 text-purple-600"
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

            {/* Description */}
            <p className="text-lg text-gray-600 mb-8 leading-relaxed font-medium">
              {article.description}
            </p>

            {/* Thumbnail */}
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

            {/* Blocks Rendering Area */}
            <div className="flex flex-col">
              {loading ? (
                <div className="py-10 text-center text-gray-500">본문을 불러오는 중...</div>
              ) : (
                blocks.map((block) => <BlockRenderer key={block.id} block={block} />)
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
