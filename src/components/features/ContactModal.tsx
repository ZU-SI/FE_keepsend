"use client";

import { Label, SelectWithCustom, TextField, Textarea } from "@/components/ui/form";
import { ContactSubmitData, submitContactForm } from "@/lib/notion.contact";
import { policyModalOpenAtom } from "@/store/global-modal.store";
import { useSetAtom } from "jotai";
import type React from "react";
import { useState } from "react";
import { PRODUCT_TYPE_OPTIONS, REGION_OPTIONS, SERVICE_TYPE_OPTIONS } from "./option.constants";

interface ContactFormData {
  serviceTypes: string[];
  productType: string;
  productTypeCustom: string;
  monthlyShipment: string;
  companyName: string;
  contactPerson: string;
  phone: string;
  email: string;
  region: string;
  inquiryContent: string;
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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const setPolicyModalOpen = useSetAtom(policyModalOpenAtom);

  const [sectionState, setSectionState] = useState({
    logisticsInfo: true,
    contactInfo: true,
    inquiryInfo: true,
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.serviceTypes.length === 0) {
      alert("서비스 분류를 하나 이상 선택해주세요.");
      return;
    }
    // ... (Validation logic remains same) ...
    if (!formData.companyName.trim()) { alert("회사명을 입력해주세요."); return; }
    if (!formData.contactPerson.trim()) { alert("담당자명을 입력해주세요."); return; }
    if (!formData.phone.trim()) { alert("연락처를 입력해주세요."); return; }
    if (!formData.email.trim()) { alert("이메일을 입력해주세요."); return; }
    if (!formData.region) { alert("문의 지역을 선택해주세요."); return; }
    if (!formData.privacyAgreed) { alert("개인정보 수집 및 이용에 동의해주세요."); return; }

    setIsSubmitting(true);

    const submittedData: ContactSubmitData = {
      ...formData,
      productType:
        formData.productType === "직접 입력"
          ? formData.productTypeCustom
          : formData.productType,
    };

    try {
      const result = await submitContactForm(submittedData);
      if (result.success) {
        alert("문의가 접수되었습니다. 담당자가 빠르게 연락드리겠습니다.");
        setFormData({ ...initialForm });
        setHasUnsavedChanges(false);
        onClose();
      } else {
        alert(`접수 실패: ${result.message}`);
      }
    } catch (error) {
      console.error("Submit Error:", error);
      alert("네트워크 오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <>
      <div
        className="fixed inset-0 z-navigation flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm transition-all"
        onClick={handleClose}
      >
        <div
          id="contact-form"
          // [Mod] bg-white -> bg-card-light (Light Theme Semantic)
          className="flex flex-col w-full max-w-[95vw] md:max-w-screen-md h-[85vh] md:h-[768px] max-h-[90vh] overflow-hidden rounded-xl shadow-2xl transition-all bg-card-light"
        >
          {/* Header */}
          {/* [Mod] bg-background -> bg-card-light (Match Modal) */}
          <div className="sticky top-0 z-10 flex h-14 md:h-[60px] items-center justify-between bg-card-light px-4 md:px-8 backdrop-blur shrink-0 border-b border-border-light/50">
            {/* [Mod] text-foreground -> text-foreground-light */}
            <h2 className="text-lg md:text-[20px] font-bold text-foreground-light">견적 문의</h2>
            <button
              type="button"
              onClick={handleClose}
              // [Mod] text-muted-foreground -> text-muted-foreground-light, hover:bg-muted -> hover:bg-muted-light
              className="rounded-full p-2 text-muted-foreground-light transition-colors hover:bg-muted-light hover:text-foreground-light active:bg-border-light"
              aria-label="Close"
            >
              <svg className="h-5 w-5 md:h-6 md:w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <form
            onSubmit={handleSubmit}
            // [Mod] bg-white -> bg-card-light
            className="flex flex-grow flex-col overflow-hidden bg-card-light relative"
          >
            <div className="flex flex-grow flex-col gap-4 md:gap-6 overflow-y-auto p-4 md:p-8 scroll-smooth">

              {/* Section 1: 물류 정보 */}
              {/* [Mod] bg-gray-50 -> bg-muted-light, border-gray-100 -> border-border-light */}
              <div className="flex flex-col gap-4 md:gap-6 rounded-lg bg-muted-light p-4 md:p-6 border border-border-light">
                <div
                  className="flex cursor-pointer items-center justify-between py-1"
                  onClick={() => toggleSection("logisticsInfo")}
                >
                  <h3 className="text-base md:text-lg font-bold text-foreground-light">
                    물류 정보
                  </h3>
                  <button
                    type="button"
                    // [Mod] text-gray-500 -> text-muted-foreground-light
                    className="flex h-8 w-8 items-center justify-center text-muted-foreground-light transition-colors hover:text-foreground-light"
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

                <div className={`overflow-hidden transition-all duration-300 ease-in-out ${sectionState.logisticsInfo ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-70"}`}>
                  <div className="flex flex-col gap-5 md:gap-6 pb-2">
                    <div className="flex flex-col gap-3">
                      <div className="flex items-center justify-between">
                        <Label text="서비스 분류" />
                        <span className="text-[11px] md:text-xs text-primary font-medium">* 복수 선택</span>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-3">
                        {SERVICE_TYPE_OPTIONS.map((option) => {
                          const isSelected = formData.serviceTypes.includes(option);
                          return (
                            <label
                              key={option}
                              className={`flex cursor-pointer items-center gap-2 rounded-md border p-2 transition-all ${
                                isSelected
                                  ? "border-primary/30 bg-primary/5"
                                  // [Mod] hover:bg-gray-100 -> hover:bg-white
                                  : "border-transparent hover:bg-card-light shadow-sm hover:shadow"
                              }`}
                            >
                              <input
                                type="checkbox"
                                checked={isSelected}
                                onChange={() => toggleServiceType(option)}
                                className="h-4 w-4 md:h-5 md:w-5 rounded border-border-light text-primary focus:ring-primary shrink-0"
                              />
                              {/* [Mod] text-gray-700 -> text-foreground-light */}
                              <span className="text-sm font-medium text-foreground-light break-keep">
                                {option}
                              </span>
                            </label>
                          );
                        })}
                      </div>
                    </div>

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
                </div>
              </div>

              {/* Section 2: 담당자 정보 */}
              <div className="flex flex-col gap-4 md:gap-6 rounded-lg bg-muted-light p-4 md:p-6 border border-border-light">
                <div
                  className="flex cursor-pointer items-center justify-between py-1"
                  onClick={() => toggleSection("contactInfo")}
                >
                  <h3 className="text-base md:text-lg font-bold text-foreground-light">
                    담당자 정보
                  </h3>
                  <button
                    type="button"
                    className="flex h-8 w-8 items-center justify-center text-muted-foreground-light transition-colors hover:text-foreground-light"
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

                <div className={`overflow-hidden transition-all duration-300 ease-in-out ${sectionState.contactInfo ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-70"}`}>
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 pb-2">
                    <div className="flex flex-col md:col-span-2">
                      <Label text="회사 명" required />
                      <TextField
                        type="text"
                        value={formData.companyName}
                        onChange={(v) => handleInputChange("companyName", v)}
                        placeholder="입력해 주세요."
                      />
                    </div>
                    {/* ... (TextFields should assume Light Theme styles or be transparent) ... */}
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
                </div>
              </div>

              {/* Section 3: 문의 내용 */}
              <div className="flex flex-col gap-4 md:gap-6 rounded-lg bg-muted-light p-4 md:p-6 border border-border-light">
                <div
                  className="flex cursor-pointer items-center justify-between py-1"
                  onClick={() => toggleSection("inquiryInfo")}
                >
                  <h3 className="text-base md:text-lg font-bold text-foreground-light">
                    문의 내용
                  </h3>
                  <button
                    type="button"
                    className="flex h-8 w-8 items-center justify-center text-muted-foreground-light transition-colors hover:text-foreground-light"
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
                <div className={`overflow-hidden transition-all duration-300 ease-in-out ${sectionState.inquiryInfo ? "max-h-[500px] opacity-100" : "max-h-0 opacity-70"}`}>
                  <div className="flex flex-col pb-2">
                    <Textarea
                      value={formData.inquiryContent}
                      onChange={(v) => handleInputChange("inquiryContent", v)}
                      placeholder="문의 내용을 입력해 주세요."
                      rows={5}
                    />
                  </div>
                </div>
              </div>

              {/* Privacy Check */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 px-1 md:px-2 pt-2">
                <div className="flex items-start md:items-center gap-2.5">
                  <input
                    type="checkbox"
                    id="privacy-check"
                    className="mt-0.5 md:mt-0 h-5 w-5 cursor-pointer rounded border-border-light text-primary focus:ring-primary shrink-0"
                    checked={formData.privacyAgreed}
                    onChange={(e) => handleInputChange("privacyAgreed", e.target.checked)}
                  />
                  {/* [Mod] text-gray-700 -> text-muted-foreground-light */}
                  <label htmlFor="privacy-check" className="cursor-pointer text-sm font-medium text-muted-foreground-light leading-tight">
                    개인정보 수집 및 이용에 동의합니다. <span className="text-primary">*</span>
                  </label>
                </div>
                <button
                  type="button"
                  onClick={() => setPolicyModalOpen(true)}
                  // [Mod] text-gray-500 -> text-muted-foreground-light
                  className="text-xs md:text-sm font-medium text-muted-foreground-light underline underline-offset-4 self-end md:self-auto hover:text-primary transition-colors"
                >
                  전문보기
                </button>
              </div>

            </div>
              {/* Submit Button Area */}
              {/* [Mod] bg-white -> bg-card-light, border-border-light */}
              <div className="sticky flex gap-3 bottom-0 bg-card-light p-4 border-t border-border-light mt-2 z-10">
                  <button
                    type="button"
                    onClick={handleCancelClick}
                    disabled={isSubmitting}
                    // [Mod] bg-gray-100 -> bg-muted-light, text-gray-600 -> text-muted-foreground-light
                    className="cancel-button flex-1 cursor-pointer rounded-full bg-muted-light border border-border-light px-6 py-3.5 text-sm md:text-base font-semibold text-muted-foreground-light transition-all duration-300 hover:bg-border-light active:bg-border-light disabled:opacity-50"
                  >
                    취소
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    // [Mod] bg-primary, text-primary-foreground (white)
                    className="flex-1 cursor-pointer rounded-full bg-primary px-6 py-3.5 text-sm md:text-base font-semibold text-primary-foreground transition-all duration-300 hover:-translate-y-0.5 hover:bg-primary-hover hover:shadow-lg active:translate-y-0 disabled:bg-muted-foreground-light disabled:hover:translate-y-0 disabled:cursor-not-allowed shadow-md shadow-primary/20"
                  >
                    {isSubmitting ? "전송 중..." : "문의 하기"}
                  </button>
              </div>
          </form>
        </div>
      </div>

      {/* Confirmation Dialog */}
      {showConfirmDialog && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 p-6 backdrop-blur-sm animate-in fade-in duration-200">
          {/* [Mod] bg-white -> bg-card-light */}
          <div className="w-full max-w-sm rounded-xl border border-border-light bg-card-light p-6 shadow-2xl">
            {/* [Mod] text-gray-900 -> text-foreground-light */}
            <h3 className="mb-3 text-lg font-bold text-foreground-light">
              안내
            </h3>
            {/* [Mod] text-gray-600 -> text-muted-foreground-light */}
            <p className="mb-6 text-sm leading-relaxed text-muted-foreground-light">
              작성 중인 내용이 있습니다. 정말 닫으시겠습니까?
            </p>
            <div className="flex flex-col gap-3 md:flex-row">
              <button
                onClick={() => setShowConfirmDialog(false)}
                // [Mod] bg-gray-100 -> bg-muted-light, text-gray-700 -> text-foreground-light
                className="flex-1 cursor-pointer rounded-lg bg-muted-light px-4 py-3 text-sm font-semibold text-foreground-light transition-colors hover:bg-border-light"
              >
                취소
              </button>
              <button
                onClick={handleConfirmClose}
                className="flex-1 cursor-pointer rounded-lg bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary-hover"
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
