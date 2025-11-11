"use client";

import { Label, SelectWithCustom, TextField, Textarea } from "@/components/ui/form";
import type React from "react";
import { useState } from "react";
import { ITEM_TYPE_OPTIONS, PRODUCT_TYPE_OPTIONS, SERVICE_OPTIONS } from "./option.constants";

interface ContactFormData {
  // Section 1: 견적 정보
  serviceType: string;
  serviceTypeCustom: string;
  productType: string;
  productTypeCustom: string;
  itemType: string;
  itemTypeCustom: string;
  quantity: string;
  shipment: string;
  size: string;
  processingMethod: string;
  // Section 2: 회사 정보
  companyName: string;
  contactPerson: string;
  phone: string;
  email: string;
  region: string;
  // Section 3: 문의/기타
  inquiry: string;
}

const initialForm: ContactFormData = {
    serviceType: "",
    serviceTypeCustom: "",
    productType: "",
    productTypeCustom: "",
    itemType: "",
    itemTypeCustom: "",
    quantity: "",
    shipment: "",
    size: "",
    processingMethod: "",
    companyName: "",
    contactPerson: "",
    phone: "",
    email: "",
    region: "",
    inquiry: "",
}

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const [formData, setFormData] = useState<ContactFormData>({...initialForm});
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  
  // 섹션 토글 상태 관리
  const [sectionState, setSectionState] = useState({
    companyInfo: true,    // 회사 정보: 기본적으로 열림
    quoteInfo: false,     // 견적 정보: 기본적으로 닫힘
    inquiryInfo: true     // 상담 문의: 기본적으로 열림
  });

  const toggleSection = (section: keyof typeof sectionState) => {
    setSectionState(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
    setHasUnsavedChanges(true);
  };

  const handleClose = (e: React.MouseEvent) => {
    e.stopPropagation();

    if((e.target as HTMLElement).closest('#contact-form') && 
       !(e.target as HTMLElement).closest('.contact__close-button') && 
       !(e.target as HTMLElement).closest('.contact__button--secondary')) return;

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
    setFormData({...initialForm});
    setHasUnsavedChanges(false);
    onClose();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validation: Required fields
    if (!formData.contactPerson.trim()) {
      alert("담당자명을 입력해주세요.");
      return;
    }

    if (!formData.phone.trim()) {
      alert("연락처를 입력해주세요.");
      return;
    }

    const submittedData = {
      ...formData,
      // Include custom values if selected
      serviceType:
        formData.serviceType === "직접 입력"
          ? formData.serviceTypeCustom
          : formData.serviceType,
      productType:
        formData.productType === "직접 입력"
          ? formData.productTypeCustom
          : formData.productType,
      itemType:
        formData.itemType === "직접 입력"
          ? formData.itemTypeCustom
          : formData.itemType,
    };

    console.log("[v0] Form submitted:", submittedData);
    alert("문의가 접수되었습니다. 빠른 답변 예정입니다.");

    // Reset form
    setFormData({...initialForm});
    setHasUnsavedChanges(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Modal Overlay */}
      <div className="contact" onClick={handleClose}>
          <div className="contact__container" id="contact-form">
            {/* Header */}
            <div className="contact__header">
              <h2 className="contact__title">견적 문의</h2>
              <button
                type="button"
                onClick={handleClose}
                className="contact__close-button"
                aria-label="Close"
              >
                <svg
                  className="contact__close-icon"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            {/* Form Content */}
            <form onSubmit={handleSubmit} className="contact__form">
              <div className="contents">
              {/* Section 1: 회사 정보 */}
                <div className="contact__section">
                  <div className="contact__section-header">
                    <h3 className="contact__section-title">회사 정보</h3>
                    <button 
                      type="button"
                      onClick={() => toggleSection('companyInfo')}
                      className="contact__toggle-button"
                      aria-label={sectionState.companyInfo ? "접기" : "펼치기"}
                    >
                      <svg 
                        className={`contact__toggle-icon ${sectionState.companyInfo ? 'contact__toggle-icon--open' : 'contact__toggle-icon--closed'}`}
                        width="16" 
                        height="16" 
                        viewBox="0 0 16 16" 
                        fill="none" 
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d={sectionState.companyInfo ? "M2 10L8 4L14 10" : "M2 6L8 12L14 6"} 
                          strokeWidth="2" 
                          strokeLinecap="round" 
                          strokeLinejoin="round"
                        />
                      </svg>
                    </button>
                  </div>
                  <div className={`contact__section-content ${!sectionState.companyInfo ? 'contact__section-content--collapsed' : ''}`}>
                    <div className="contact__grid">
                      {/* prettier-ignore */}
                      {sectionState.companyInfo && [
                        { id: "companyName", label: "회사명", type: "text", value: formData.companyName, required: false, placeholder: "입력", fullWidth: false },
                        { id: "contactPerson", label: "담당자명", type: "text", value: formData.contactPerson, required: true, placeholder: "입력", fullWidth: false },
                        { id: "phone", label: "연락처", type: "tel", value: formData.phone, required: true, placeholder: "입력", fullWidth: false },
                        { id: "email", label: "이메일", type: "email", value: formData.email, required: false, placeholder: "입력", fullWidth: false },
                        { id: "region", label: "문의지역", type: "text", value: formData.region, required: false, placeholder: "입력", fullWidth: true }
                      ].map((field) => (
                        <div 
                          key={field.id} 
                          className={`contact__field ${field.fullWidth ? 'contact__field--full' : ''}`}
                        >
                          <Label text={field.label} htmlFor={field.id} required={field.required} />
                          <TextField
                            id={field.id}
                            type={field.type as ('text')}
                            value={field.value}
                            onChange={(v) => handleInputChange(field.id, v)}
                            placeholder={field.placeholder}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Section 2: 견적 정보 */}
                <div className="contact__section">
                  <div className="contact__section-header">
                    <h3 className="contact__section-title">견적 정보</h3>
                    <button 
                      type="button"
                      onClick={() => toggleSection('quoteInfo')}
                      className="contact__toggle-button"
                      aria-label={sectionState.quoteInfo ? "접기" : "펼치기"}
                    >
                      <svg 
                        className={`contact__toggle-icon ${sectionState.quoteInfo ? 'contact__toggle-icon--open' : 'contact__toggle-icon--closed'}`}
                        width="16" 
                        height="16" 
                        viewBox="0 0 16 16" 
                        fill="none" 
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d={sectionState.quoteInfo ? "M2 10L8 4L14 10" : "M2 6L8 12L14 6"} 
                          strokeWidth="2" 
                          strokeLinecap="round" 
                          strokeLinejoin="round"
                        />
                      </svg>
                    </button>
                  </div>
                  <div className={`contact__section-content ${!sectionState.quoteInfo ? 'contact__section-content--collapsed' : ''}`}>
                    {sectionState.quoteInfo && (
                      <div className="contact__grid">
                        <div className="contact__field contact__field--full">
                          <Label text="서비스 분류" htmlFor="serviceType" />
                          <SelectWithCustom
                            options={SERVICE_OPTIONS}
                            value={formData.serviceType}
                            customValue={formData.serviceTypeCustom}
                            onSelectChange={v => handleInputChange('serviceType', v)}
                            onCustomChange={v => handleInputChange('serviceTypeCustom', v)}
                          />
                        </div>
                        <div className="contact__field contact__field--full">
                          <Label text="상품 유형" htmlFor="productType" />
                          <SelectWithCustom
                            options={PRODUCT_TYPE_OPTIONS}
                            value={formData.productType}
                            customValue={formData.productTypeCustom}
                            onSelectChange={v => handleInputChange('productType', v)}
                            onCustomChange={v => handleInputChange('productTypeCustom', v)}
                          />
                        </div>
                        <div className="contact__field contact__field--full">
                          <Label text="취급 품목" htmlFor="itemType" />
                          <SelectWithCustom
                            options={ITEM_TYPE_OPTIONS}
                            value={formData.itemType}
                            customValue={formData.itemTypeCustom}
                            onSelectChange={v => handleInputChange('itemType', v)}
                            onCustomChange={v => handleInputChange('itemTypeCustom', v)}
                          />
                        </div>
                        {/* prettier-ignore */}
                        {[
                          { id: "quantity", label: "수량(SKU)", type: "text", value: formData.quantity, required: false, placeholder: "입력", fullWidth: false },
                          { id: "shipment", label: "출고량", type: "text", value: formData.shipment, required: false, placeholder: "입력", fullWidth: false },
                          { id: "size", label: "크기", type: "text", value: formData.size, required: false, placeholder: "입력", fullWidth: false },
                          { id: "processingMethod", label: "처리방식", type: "text", value: formData.processingMethod, required: false, placeholder: "입력", fullWidth: false }
                        ].map((field) => (
                          <div 
                            key={field.id} 
                            className="contact__field"
                          >
                            <Label text={field.label} htmlFor={field.id} required={field.required} />
                            <TextField
                              id={field.id}
                              type={"text"}
                              value={field.value}
                              onChange={(v) => handleInputChange(field.id, v)}
                              placeholder={field.placeholder}
                            />
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Section 3: 문의/기타 */}
                <div className="contact__section">
                  <div className="contact__section-header">
                    <h3 className="contact__section-title">문의/기타</h3>
                    <button 
                      type="button"
                      onClick={() => toggleSection('inquiryInfo')}
                      className="contact__toggle-button"
                      aria-label={sectionState.inquiryInfo ? "접기" : "펼치기"}
                    >
                      <svg 
                        className={`contact__toggle-icon ${sectionState.inquiryInfo ? 'contact__toggle-icon--open' : 'contact__toggle-icon--closed'}`}
                        width="16" 
                        height="16" 
                        viewBox="0 0 16 16" 
                        fill="none" 
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d={sectionState.inquiryInfo ? "M2 10L8 4L14 10" : "M2 6L8 12L14 6"} 
                          strokeWidth="2" 
                          strokeLinecap="round" 
                          strokeLinejoin="round"
                        />
                      </svg>
                    </button>
                  </div>
                  <div className={`contact__section-content ${!sectionState.inquiryInfo ? 'contact__section-content--collapsed' : ''}`}>
                    {sectionState.inquiryInfo && (
                      <div className="contact__grid">
                        <div className="contact__field contact__field--full">
                          <Label text="상세 문의" />
                          <Textarea
                            value={formData.inquiry}
                            onChange={(v) => handleInputChange("inquiry", v)}
                            placeholder="입력"
                            rows={5}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Info Text */}
                <div className="contact__info">
                  <p className="contact__info-text">
                    빠르게 답변 드리겠습니다.
                    <br />
                    *긴급한 문의는 전화로 주세요 ~ (24시 전화 상담)
                  </p>
                </div>

                {/* Submit Button */}
                <div className="contact__actions">
                  <button
                    type="button"
                    onClick={handleCancelClick}
                    className={`contact__button contact__button--secondary`}
                  >
                    취소
                  </button>
                  <button
                    type="submit"
                    className={`contact__button contact__button--primary`}
                  >
                    문의 전송
                  </button>
                </div>
              </div>
            </form>
          </div>
      </div>

      {/* Confirmation Dialog */}
      {showConfirmDialog && (
        <div className="confirm">
          <div className="confirm__container">
            <h3 className="confirm__title">확인</h3>
            <p className="confirm__message">작성 중입니다. 닫으시겠습니까?</p>
            <div className="confirm__actions">
              <button
                onClick={() => setShowConfirmDialog(false)}
                className={`confirm__button confirm__button--secondary`}
              >
                취소
              </button>
              <button
                onClick={handleConfirmClose}
                className={`confirm__button confirm__button--primary`}
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