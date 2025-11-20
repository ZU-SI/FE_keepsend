"use client";

import { Label, SelectWithCustom, TextField, Textarea } from "@/components/ui/form";
import { policyModalOpenAtom } from "@/store/global-modal.store";
import { useSetAtom } from "jotai";
import type React from "react";
import { useState } from "react";
import { PRODUCT_TYPE_OPTIONS, REGION_OPTIONS, SERVICE_TYPE_OPTIONS } from "./option.constants";

interface ContactFormData {
  // Section 1: 물류 정보
  serviceTypes: string[]; // 복수 선택
  productType: string;
  productTypeCustom: string;
  monthlyShipment: string;

  // Section 2: 담당자 정보
  companyName: string;
  contactPerson: string;
  phone: string;
  email: string;
  region: string;

  // Section 3: 문의 내용
  inquiryContent: string;

  // Privacy
  privacyAgreed: boolean;
}

const initialForm: ContactFormData = {
  serviceTypes: [],
  productType: "",
  productTypeCustom: "",
  monthlyShipment: "",
  companyName: "",
  contactPerson: "",
  phone: "",
  email: "",
  region: "",
  inquiryContent: "",
  privacyAgreed: false,
};

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const [formData, setFormData] = useState<ContactFormData>({ ...initialForm });
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  // UI
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const setPolicyModalOpen = useSetAtom(policyModalOpenAtom);



  // 섹션 토글 상태 관리
  const [sectionState, setSectionState] = useState({
    logisticsInfo: true, // 물류 정보
    contactInfo: true,   // 담당자 정보
    inquiryInfo: true,   // 문의 내용
  });

  const toggleSection = (section: keyof typeof sectionState) => {
    setSectionState((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const handleInputChange = (field: keyof ContactFormData, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
    setHasUnsavedChanges(true);
  };

  // 서비스 분류 토글 (Checkbox)
  const toggleServiceType = (type: string) => {
    setFormData((prev) => {
      const isSelected = prev.serviceTypes.includes(type);
      const newTypes = isSelected
        ? prev.serviceTypes.filter((t) => t !== type)
        : [...prev.serviceTypes, type];

      return { ...prev, serviceTypes: newTypes };
    });
    setHasUnsavedChanges(true);
  };

  const handleClose = (e: React.MouseEvent) => {
    e.stopPropagation();
    const target = e.target as HTMLElement;
    if (
      target.closest("#contact-form") &&
      !target.closest('button[aria-label="Close"]') &&
      !target.closest(".cancel-button")
    )
      return;

    if (hasUnsavedChanges) {
      setShowConfirmDialog(true);
    } else {
      onClose();
    }
  };

  const handleCancelClick = () => {
    if (hasUnsavedChanges) {
      setShowConfirmDialog(true);
    } else {
      onClose();
    }
  };

  const handleConfirmClose = () => {
    setShowConfirmDialog(false);
    setFormData({ ...initialForm });
    setHasUnsavedChanges(false);
    onClose();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (formData.serviceTypes.length === 0) {
        alert("서비스 분류를 하나 이상 선택해주세요.");
        return;
    }
    if (!formData.companyName.trim()) {
        alert("회사명을 입력해주세요.");
        return;
    }
    if (!formData.contactPerson.trim()) {
      alert("담당자명을 입력해주세요.");
      return;
    }
    if (!formData.phone.trim()) {
      alert("연락처를 입력해주세요.");
      return;
    }
    if (!formData.email.trim()) {
        alert("이메일을 입력해주세요.");
        return;
    }
    if (!formData.region) {
        alert("문의 지역을 선택해주세요.");
        return;
    }
    if (!formData.privacyAgreed) {
        alert("개인정보 수집 및 이용에 동의해주세요.");
        return;
    }

    const submittedData = {
      ...formData,
      productType:
        formData.productType === "직접 입력"
          ? formData.productTypeCustom
          : formData.productType,
    };

    console.log("[Form] Submitted:", submittedData);
    alert("문의가 접수되었습니다.");

    setFormData({ ...initialForm });
    setHasUnsavedChanges(false);
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
          id="contact-form"
          className="flex h-[768px] max-h-[90vh] w-[90vw] max-w-screen-md flex-col overflow-hidden rounded-xl bg-white shadow-2xl"
        >
          {/* Header */}
          <div className="sticky top-0 z-10 flex h-[60px] items-center justify-between border-b border-border bg-background/95 px-6 py-4 backdrop-blur md:px-8">
            <h2 className="text-[20px] font-bold text-foreground">견적 문의</h2>
            <button
              type="button"
              onClick={handleClose}
              className="rounded-sm p-1 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              aria-label="Close"
            >
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Form Content */}
          <form
            onSubmit={handleSubmit}
            className="flex flex-grow flex-col overflow-hidden bg-card-light"
          >
            <div className="flex flex-grow flex-col gap-6 overflow-y-auto p-6 md:p-8">

              {/* Section 1: 물류 정보 */}
              <div className="flex flex-col gap-6 rounded-md bg-gray-50 p-6">
                <div className="mb-1 flex cursor-pointer items-center justify-between" onClick={() => toggleSection("logisticsInfo")}>
                  <h3 className="m-0 p-0 text-lg font-bold text-foreground-light">
                    물류 정보
                  </h3>
                  <button
                    type="button"
                    className="flex h-6 w-6 items-center justify-center border-none bg-transparent p-0 text-gray-600"
                  >
                    <svg
                      className={`transform transition-transform duration-300 ${
                        sectionState.logisticsInfo ? "rotate-0" : "rotate-180"
                      }`}
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d={sectionState.logisticsInfo ? "M2 10L8 4L14 10" : "M2 6L8 12L14 6"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                </div>

                <div className={`overflow-hidden transition-all duration-300 ease-in-out ${sectionState.logisticsInfo ? "max-h-[2000px] opacity-100" : "max-h-0 opacity-70"}`}>
                  {sectionState.logisticsInfo && (
                    <div className="flex flex-col gap-6">
                        {/* 서비스 분류 (Checkbox Grid) */}
                        <div className="flex flex-col gap-2">
                            <div className="flex items-center justify-between">
                                <Label text="서비스 분류" />
                                <span className="text-xs text-primary">* 복수 선택</span>
                            </div>

                            {/* 변경 사항:
                                1. Grid Layout: grid-cols-3 (3열), 총 6개 항목이므로 자연스럽게 2행이 됨.
                                2. Element: button -> label + input[type=checkbox]
                            */}
                            <div className="grid grid-cols-3 gap-y-3 gap-x-2">
                                {SERVICE_TYPE_OPTIONS.map((option) => {
                                    const isSelected = formData.serviceTypes.includes(option);
                                    return (
                                    <label
                                        key={option}
                                        className="flex cursor-pointer items-center gap-2"
                                    >
                                        <input
                                            type="checkbox"
                                            checked={isSelected}
                                            onChange={() => toggleServiceType(option)}
                                            className="h-5 w-5 rounded border-gray-300 text-primary focus:ring-primary"
                                        />
                                        <span className="text-sm font-medium text-gray-700">
                                            {option}
                                        </span>
                                    </label>
                                    );
                                })}
                            </div>
                        </div>

                        {/* 상품 유형 & 월 출고량 */}
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6">
                            <div className="flex flex-col">
                                <Label text="상품 유형" htmlFor="productType" />
                                <SelectWithCustom
                                    options={PRODUCT_TYPE_OPTIONS}
                                    value={formData.productType}
                                    customValue={formData.productTypeCustom}
                                    onSelectChange={(v) => handleInputChange("productType", v)}
                                    onCustomChange={(v) => handleInputChange("productTypeCustom", v)}
                                    placeholder="선택해 주세요."
                                />
                            </div>
                            <div className="flex flex-col">
                                <Label text="월 출고량" htmlFor="monthlyShipment" />
                                <TextField
                                    id="monthlyShipment"
                                    type="text"
                                    value={formData.monthlyShipment}
                                    onChange={(v) => handleInputChange("monthlyShipment", v)}
                                    placeholder="입력해 주세요."
                                />
                            </div>
                        </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Section 2: 담당자 정보 (유지) */}
              <div className="flex flex-col gap-6 rounded-md bg-gray-50 p-6">
                <div className="mb-1 flex cursor-pointer items-center justify-between" onClick={() => toggleSection("contactInfo")}>
                  <h3 className="m-0 p-0 text-lg font-bold text-foreground-light">
                    담당자 정보
                  </h3>
                  <button
                    type="button"
                    className="flex h-6 w-6 items-center justify-center border-none bg-transparent p-0 text-gray-600"
                  >
                    <svg
                      className={`transform transition-transform duration-300 ${
                        sectionState.contactInfo ? "rotate-0" : "rotate-180"
                      }`}
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d={sectionState.contactInfo ? "M2 10L8 4L14 10" : "M2 6L8 12L14 6"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                </div>

                <div className={`overflow-hidden transition-all duration-300 ease-in-out ${sectionState.contactInfo ? "max-h-[2000px] opacity-100" : "max-h-0 opacity-70"}`}>
                  {sectionState.contactInfo && (
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6">
                         <div className="flex flex-col md:col-span-2">
                            <Label text="회사 명" required />
                            <TextField
                                type="text"
                                value={formData.companyName}
                                onChange={(v) => handleInputChange("companyName", v)}
                                placeholder="입력해 주세요."
                            />
                        </div>
                        <div className="flex flex-col">
                            <Label text="담당자 명" required />
                            <TextField
                                type="text"
                                value={formData.contactPerson}
                                onChange={(v) => handleInputChange("contactPerson", v)}
                                placeholder="입력해 주세요."
                            />
                        </div>
                        <div className="flex flex-col">
                            <Label text="연락처" required />
                            <TextField
                                type="tel"
                                value={formData.phone}
                                onChange={(v) => handleInputChange("phone", v)}
                                placeholder="입력해 주세요."
                            />
                        </div>
                        <div className="flex flex-col">
                            <Label text="이메일" required />
                            <TextField
                                type="email"
                                value={formData.email}
                                onChange={(v) => handleInputChange("email", v)}
                                placeholder="입력해 주세요."
                            />
                        </div>
                        <div className="flex flex-col">
                            <Label text="문의 지역" required />
                            <SelectWithCustom
                                options={REGION_OPTIONS}
                                value={formData.region}
                                onSelectChange={(v) => handleInputChange("region", v)}
                                placeholder="선택해 주세요."
                            />
                        </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Section 3: 문의 내용 (유지) */}
              <div className="flex flex-col gap-6 rounded-md bg-gray-50 p-6">
                <div className="mb-1 flex cursor-pointer items-center justify-between" onClick={() => toggleSection("inquiryInfo")}>
                  <h3 className="m-0 p-0 text-lg font-bold text-foreground-light">
                    문의 내용
                  </h3>
                  <button
                    type="button"
                    className="flex h-6 w-6 items-center justify-center border-none bg-transparent p-0 text-gray-600"
                  >
                    <svg
                      className={`transform transition-transform duration-300 ${
                        sectionState.inquiryInfo ? "rotate-0" : "rotate-180"
                      }`}
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d={sectionState.inquiryInfo ? "M2 10L8 4L14 10" : "M2 6L8 12L14 6"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                </div>
                <div className={`overflow-hidden transition-all duration-300 ease-in-out ${sectionState.inquiryInfo ? "max-h-[2000px] opacity-100" : "max-h-0 opacity-70"}`}>
                  {sectionState.inquiryInfo && (
                    <div className="flex flex-col">
                      <Textarea
                        value={formData.inquiryContent}
                        onChange={(v) => handleInputChange("inquiryContent", v)}
                        placeholder="문의 내용을 입력해 주세요."
                        rows={5}
                      />
                    </div>
                  )}
                </div>
              </div>

              {/* Privacy Checkbox (유지) */}
               <div className="flex items-center justify-between px-2">
                    <div className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            id="privacy-check"
                            className="h-5 w-5 cursor-pointer rounded border-gray-300 text-primary focus:ring-primary"
                            checked={formData.privacyAgreed}
                            onChange={(e) => handleInputChange("privacyAgreed", e.target.checked)}
                        />
                        <label htmlFor="privacy-check" className="cursor-pointer text-sm font-medium text-gray-700">
                            <span className="flex items-center gap-2">
                                개인정보 수집 및 이용에 동의합니다. <span className="text-primary">*</span>
                            </span>
                        </label>
                    </div>
                    <button type="button" onClick={() => setPolicyModalOpen(true)} className="text-sm font-medium text-primary underline underline-offset-4">
                        전문보기
                    </button>
                </div>

              {/* Submit Button */}
              <div className="flex flex-col gap-4 border-t border-border-light bg-white py-4 md:flex-row">
                <button
                  type="button"
                  onClick={handleCancelClick}
                  className="cancel-button flex-1 cursor-pointer rounded-full bg-gray-200 px-6 py-3 text-base font-semibold text-foreground-light transition-all duration-300 hover:bg-gray-300 active:bg-gray-400"
                >
                  취소
                </button>
                <button
                  type="submit"
                  className="flex-1 cursor-pointer rounded-full bg-primary px-6 py-3 text-base font-semibold text-primary-foreground transition-all duration-300 hover:-translate-y-0.5 hover:bg-primary-hover hover:shadow-button-hover active:translate-y-0"
                >
                  문의 하기
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>

      {/* Confirmation Dialog */}
      {showConfirmDialog && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80 p-6 backdrop-blur-xs">
          <div className="w-full max-w-sm rounded-lg border border-border-light bg-card-light p-6 shadow-2xl">
            <h3 className="mb-4 text-lg font-bold text-foreground-light">
              확인
            </h3>
            <p className="mb-6 text-sm leading-relaxed text-gray-600">
              작성 중입니다. 닫으시겠습니까?
            </p>
            <div className="flex flex-col gap-4 md:flex-row">
              <button
                onClick={() => setShowConfirmDialog(false)}
                className="flex-1 cursor-pointer rounded-md bg-gray-200 px-4 py-2 text-sm font-semibold text-foreground-light transition-all duration-300 hover:bg-gray-300 active:bg-gray-400"
              >
                취소
              </button>
              <button
                onClick={handleConfirmClose}
                className="flex-1 cursor-pointer rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-all duration-300 hover:-translate-y-px hover:bg-primary-hover active:translate-y-0"
              >
                닫기
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
