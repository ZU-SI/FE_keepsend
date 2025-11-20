"use client";

import type React from "react";
import { useEffect, useState } from "react";

interface PolicyData {
  title: string;
  content: string;
  date: string;
}

// 첨부된 이미지 내용을 기반으로 작성된 정적 데이터
const policyData: PolicyData[] = [
  {
    title: "개인정보처리방침",
    date: "2025-00-00",
    content: `
      <div class="space-y-6 text-sm text-gray-700 leading-relaxed">
        <p>
          회사명(이하 '회사'라 한다)는 개인정보 보호법 제30조에 따라 정보 주체의 개인정보를 보호하고 이와 관련한 고충을 신속하고 원활하게 처리할 수 있도록 하기 위하여 다음과 같이 개인정보 처리지침을 수립, 공개합니다.
        </p>

        <div>
          <h4 class="font-bold text-gray-900 mb-2">제1조 (개인정보의 처리목적)</h4>
          <p class="mb-2">회사는 다음의 목적을 위하여 개인정보를 처리합니다. 처리하고 있는 개인정보는 다음의 목적 이외의 용도로는 이용되지 않으며, 이용 목적이 변경되는 경우에는 개인정보보호법 제18조에 따라 별도의 동의를 받는 등 필요한 조치를 이행할 예정입니다.</p>
          <ol class="list-decimal pl-5 space-y-1">
            <li>
              <strong>홈페이지 회원 가입 및 관리</strong><br/>
              회원 가입 의사 확인, 회원제 서비스 제공에 따른 본인 식별·인증, 회원자격 유지·관리, 제한적 본인확인제 시행에 따른 본인확인, 서비스 부정이용 방지, 만 14세 미만 아동의 개인정보처리 시 법정대리인의 동의 여부 확인, 각종 고지·통지, 고충 처리 등을 목적으로 개인정보를 처리합니다.
            </li>
            <li>
              <strong>재화 또는 서비스 제공</strong><br/>
              물품 배송, 서비스 제공, 계약서 및 청구서 발송, 콘텐츠 제공, 맞춤서비스 제공, 본인인증, 연령인증, 요금 결제 및 정산, 채권추심 등을 목적으로 개인정보를 처리합니다.
            </li>
            <li>
              <strong>고충 처리</strong><br/>
              민원인의 신원 확인, 민원사항 확인, 사실조사를 위한 연락·통지, 처리 결과 통보 등의 목적으로 개인정보를 처리합니다.
            </li>
          </ol>
        </div>

        <div>
          <h4 class="font-bold text-gray-900 mb-2">제2조 (개인정보의 처리 및 보유기간)</h4>
          <p class="mb-2">① 회사는 법령에 따른 개인정보 보유, 이용 기간 또는 정보주체로부터 개인정보를 수집 시에 동의 받은 개인정보 보유, 이용 기간 내에서 개인정보를 처리, 보유합니다.</p>
          <p class="mb-2">② 각각의 개인정보 처리 및 보유 기간은 다음과 같습니다.</p>
          <ol class="list-decimal pl-5 space-y-2">
            <li>
              <strong>홈페이지 회원 가입 및 관리 : 사업자/단체 홈페이지 탈퇴 시까지</strong><br/>
              다만, 다음의 사유에 해당하는 경우에는 해당 사유 종료 시까지
              <ul class="list-disc pl-4 mt-1 text-xs text-gray-500">
                <li>관계 법령 위반에 따른 수사, 조사 등이 진행 중인 경우에는 해당 수사, 조사 종료 시까지</li>
                <li>홈페이지 이용에 따른 채권 및 채무관계 잔존 시에는 해당 채권, 채무 관계 정산 시까지</li>
              </ul>
            </li>
            <li>
              <strong>재화 또는 서비스 제공 : 재화·서비스 공급완료 및 요금결제·정산 완료 시까지</strong><br/>
              다만, 다음의 사유에 해당하는 경우에는 해당 기간 종료 시까지
              <ul class="list-disc pl-4 mt-1 text-xs text-gray-500">
                <li>
                  「전자상거래 등에서의 소비자 보호에 관한 법률」에 따른 표시·광고, 계약내용 및 이행 등 거래에 관한 기록
                  <br/>- 표시·광고에 관한 기록 : 6월
                  <br/>- 계약 또는 청약 철회, 대금결제, 재화 등의 공급기록 : 5년
                  <br/>- 소비자 불만 또는 분쟁 처리에 관한 기록 : 3년
                </li>
                <li>
                  「통신비밀보호법」 제41조에 따른 통신사실확인자료 보관
                  <br/>- 가입자 전기통신일시, 개시·종료 시간, 상대방 가입자 번호, 사용도수, 발신기지국 위치추적자료 : 1년
                  <br/>- 컴퓨터 통신, 인터넷 로그 기록자료, 접속지 추적자료 : 3개월
                </li>
              </ul>
            </li>
          </ol>
        </div>

        <div>
           <h4 class="font-bold text-gray-900 mb-2">제3조 (개인정보의 제3자 제공)</h4>
           <p>① 회사는 정보주체의 개인정보를 제1조(개인정보의 처리목적)에서 명시한 범위 내에서만 처리하며, 정보주체의 동의, 법률의 특별한 규정 등 개인정보 보호법 제17조 및 제18조에 해당하는 경우에만 개인정보를 제3자에게 제공하고 그 외에는 정보주체의 개인정보를 제3자에게 제공하지 않습니다.</p>
        </div>
      </div>
    `
  }
];

interface PolicyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function PolicyModal({ isOpen, onClose }: PolicyModalProps) {
  const [currentPolicy, setCurrentPolicy] = useState<PolicyData>(policyData[0]);

  // 모달이 열릴 때 스크롤 방지 등의 처리가 필요하다면 useEffect 사용 (ContactModal과 동일한 UX 가정)
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const handleClose = (e: React.MouseEvent) => {
    e.stopPropagation();
    const target = e.target as HTMLElement;
    // 모달 내부 컨텐츠 클릭 시 닫기 방지
    if (target.closest("#policy-content") && !target.closest('button[aria-label="Close"]')) {
      return;
    }
    onClose();
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Modal Overlay */}
      <div
        className="fixed inset-0 z-navigation flex items-center justify-center bg-black/30 backdrop-blur-xs"
        onClick={handleClose}
      >
        {/* Modal Container */}
        <div
          id="policy-content"
          className="flex h-[768px] max-h-[90vh] w-[90vw] max-w-screen-md flex-col overflow-hidden rounded-xl bg-white shadow-2xl"
        >
          {/* Header */}
          <div className="sticky top-0 z-10 flex h-[60px] items-center justify-between border-b border-border bg-background/95 px-6 py-4 backdrop-blur md:px-8">
            <h2 className="text-[20px] font-bold text-foreground">{currentPolicy.title}</h2>
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
          <div className="flex flex-grow flex-col overflow-y-auto bg-card-light p-6 md:p-8">
            {/* 시행일 표시 (이미지의 Select Box 형태를 텍스트로 단순화하거나, 필요 시 Select UI 추가 가능) */}
            <div className="mb-6 flex items-center justify-end border-b border-gray-200 pb-4">
               <span className="text-sm font-medium text-gray-500 mr-2">[현행] 시행일 :</span>
               <span className="text-sm font-bold text-primary">{currentPolicy.date}</span>
            </div>

            {/* HTML Content Rendering */}
            <div
                className="policy-content-wrapper"
                dangerouslySetInnerHTML={{ __html: currentPolicy.content }}
            />
          </div>

          {/* Footer (Close Button only) */}
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
