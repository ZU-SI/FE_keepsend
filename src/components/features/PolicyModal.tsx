"use client";

import { getPolicyContent, getPolicyList, PolicyListItem } from "@/lib/notion.policy";
import type React from "react";
import { useEffect, useMemo, useState } from "react";

interface PolicyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function PolicyModal({ isOpen, onClose }: PolicyModalProps) {
  // State
  const [policyList, setPolicyList] = useState<PolicyListItem[]>([]);
  const [selectedPolicyId, setSelectedPolicyId] = useState<string>("");
  const [htmlContent, setHtmlContent] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // 1. 모달 열림 -> 목록 가져오기
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      fetchList();
    } else {
      document.body.style.overflow = "unset";
      setPolicyList([]);
      setHtmlContent("");
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // 2. 선택된 ID가 변경됨 -> 본문 가져오기
  useEffect(() => {
    if (selectedPolicyId) {
      fetchContent(selectedPolicyId);
    }
  }, [selectedPolicyId]);

  // 목록 Fetch 함수
  const fetchList = async () => {
    setIsLoading(true);
    try {
      const list = await getPolicyList();
      setPolicyList(list);

      if (list.length > 0) {
        setSelectedPolicyId(list[0].id);
      }
    } catch (error) {
      console.error("Failed to fetch policy list", error);
    }
  };

  // 본문 Fetch 함수
  const fetchContent = async (id: string) => {
    setIsLoading(true);
    try {
      const content = await getPolicyContent(id);
      setHtmlContent(content);
    } catch (error) {
      console.error("Failed to fetch policy content", error);
      setHtmlContent("<p>내용을 불러오는 데 실패했습니다.</p>");
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = (e: React.MouseEvent) => {
    e.stopPropagation();
    const target = e.target as HTMLElement;
    if (target.closest("#policy-content") && !target.closest('button[aria-label="Close"]')) {
      return;
    }
    onClose();
  };

  const currentPolicy = useMemo(() => policyList.find((p) => p.id === selectedPolicyId) || {
    title: "약관 불러오는 중...",
    date: "",
  }, [policyList, selectedPolicyId]);

  if (!isOpen) return null;

  return (
    <>
      <div
        className="fixed inset-0 z-navigation flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm transition-all"
        onClick={handleClose}
      >
        <div
          id="policy-content"
          className="flex flex-col w-full max-w-[95vw] md:max-w-screen-md h-[85vh] md:h-[768px] max-h-[90vh] overflow-hidden rounded-xl shadow-2xl transition-all"
        >
          {/* Header */}
          <div className="sticky top-0 z-10 flex h-14 md:h-[60px] items-center justify-between bg-background px-4 md:px-8 backdrop-blur shrink-0">
            <h2 className="text-lg md:text-[20px] font-bold text-foreground truncate max-w-[80%]">
              이용 약관
            </h2>
            <button
              type="button"
              onClick={onClose}
              className="rounded-full p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground active:bg-gray-100"
              aria-label="Close"
            >
              <svg className="h-5 w-5 md:h-6 md:w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Content Area */}
          <div className="flex flex-grow flex-col overflow-hidden bg-white p-4 md:p-8">

            {/* 시행일 선택 및 제목 */}
            <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-3 border-b border-gray-100 pb-4 mb-4 shrink-0">
              <h2 className="text-base md:text-lg font-bold text-gray-900 break-keep leading-tight">
                {currentPolicy.title}
              </h2>
              <div className="flex items-center justify-between md:justify-end gap-2 bg-gray-50 md:bg-transparent p-2 md:p-0 rounded-lg">
                <label htmlFor="policy-date-select" className="text-xs md:text-sm font-medium text-gray-500 shrink-0">
                  시행일 선택 :
                </label>
                <div className="relative flex-1 md:flex-none">
                  <select
                    id="policy-date-select"
                    value={selectedPolicyId}
                    onChange={(e) => setSelectedPolicyId(e.target.value)}
                    className="w-full md:w-auto appearance-none rounded-md border border-gray-300 bg-white py-1.5 pl-3 pr-8 text-xs md:text-sm font-bold text-primary focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary shadow-sm"
                    disabled={policyList.length === 0}
                  >
                    {policyList.length === 0 ? (
                      <option>목록 로딩 중...</option>
                    ) : (
                      policyList.map((policy) => (
                        <option key={policy.id} value={policy.id}>
                          {policy.date} (시행)
                        </option>
                      ))
                    )}
                  </select>
                  {/* Select 화살표 아이콘 커스텀 */}
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
                    <svg className="h-3.5 w-3.5 md:h-4 md:w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto pr-1 md:pr-2 scroll-smooth">
              {isLoading ? (
                <div className="flex h-full items-center justify-center flex-col gap-3 min-h-[200px]">
                  <div className="h-8 w-8 md:h-10 md:w-10 animate-spin rounded-full border-4 border-gray-100 border-t-primary"></div>
                  <p className="text-xs md:text-sm font-medium text-gray-500">약관 내용을 불러오고 있습니다...</p>
                </div>
              ) : (
                <div
                    className="policy-content-wrapper prose prose-sm md:prose-base max-w-none text-gray-700 leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: htmlContent }}
                />
              )}
            </div>
          </div>

          {/* Footer */}
          <div className="sticky flex justify-end bottom-0 bg-white p-4 border-t border-border-light shrink-0">
              <button
                type="button"
                onClick={onClose}
                className="w-full md:w-auto cursor-pointer rounded-full bg-primary px-8 py-3.5 text-sm md:text-base font-semibold text-primary-foreground transition-all duration-300 hover:-translate-y-0.5 hover:bg-primary-hover hover:shadow-lg active:translate-y-0 shadow-md shadow-primary/20"
              >
                확인
              </button>
          </div>
        </div>
      </div>
    </>
  );
}
