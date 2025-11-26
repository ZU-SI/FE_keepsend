"use client";

import { getPolicyContent, getPolicyList, PolicyListItem } from "@/lib/notion.policy"; // [NEW] import
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
      // 초기화
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

      // 목록이 있으면 가장 최신(첫 번째) 약관 자동 선택
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

  // 현재 선택된 약관의 날짜와 제목 찾기
  const currentPolicy = useMemo(() => policyList.find((p) => p.id === selectedPolicyId) || {
    title: "약관 불러오는 중...",
    date: "",
  }, [policyList, selectedPolicyId]);

  if (!isOpen) return null;

  return (
    <>
      <div
        className="fixed inset-0 z-navigation flex items-center justify-center bg-black/30 backdrop-blur-xs"
        onClick={handleClose}
      >
        <div
          id="policy-content"
          className="flex h-[768px] max-h-[90vh] w-[90vw] max-w-screen-md flex-col overflow-hidden rounded-xl bg-white shadow-2xl"
        >
          {/* Header */}
          <div className="sticky top-0 z-10 flex h-[60px] items-center justify-between border-b border-border bg-background/95 px-6 py-4 backdrop-blur md:px-8">
            {/* 제목도 동적으로 표시 */}
            <h2 className="text-[20px] font-bold text-foreground truncate max-w-[80%]">
              약관
            </h2>
            <button
              type="button"
              onClick={onClose}
              className="rounded-sm p-1 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              aria-label="Close"
            >
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Content Area */}
          <div className="flex flex-grow flex-col overflow-hidden bg-card-light p-6 md:p-8">

            {/* [NEW] 시행일 선택 (Select Box) */}
            <div className="flex justify-between items-center gap-2 border-b border-gray-200 pb-4 mb-4">
              <h2 className="text-black">{currentPolicy.title}</h2>
              <div className="flex items-center gap-2">
                <label htmlFor="policy-date-select" className="text-sm font-medium text-gray-500">
                  시행일 선택 :
                </label>
                <div className="relative">
                  <select
                    id="policy-date-select"
                    value={selectedPolicyId}
                    onChange={(e) => setSelectedPolicyId(e.target.value)}
                    className="appearance-none rounded-md border border-gray-300 bg-white py-1.5 pl-3 pr-8 text-sm font-bold text-primary focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
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
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
              {isLoading ? (
                <div className="flex h-full items-center justify-center space-y-3 flex-col">
                  <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-200 border-t-primary"></div>
                  <p className="text-sm text-gray-500">약관 내용을 불러오고 있습니다...</p>
                </div>
              ) : (
                <div
                    className="policy-content-wrapper"
                    // Notion에서 변환된 HTML 주입
                    dangerouslySetInnerHTML={{ __html: htmlContent }}
                />
              )}
            </div>
          </div>

          {/* Footer */}
          <div className="flex flex-col gap-4 border-t border-border-light bg-white p-4 md:flex-row md:justify-end md:px-8 md:py-4">
            <button
              type="button"
              onClick={onClose}
              className="cursor-pointer rounded-full bg-primary px-8 py-3 text-base font-semibold text-primary-foreground transition-all duration-300 hover:-translate-y-0.5 hover:bg-primary-hover hover:shadow-button-hover active:translate-y-0"
            >
              확인
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
