"use client";

import type React from "react";
import { useState } from "react";

const SERVICE_OPTIONS = [
  "선택해주세요",
  "물류",
  "정산",
  "AI",
  "기타",
  "직접 입력",
];
const PRODUCT_TYPE_OPTIONS = [
  "선택해주세요",
  "일반화물",
  "위험물",
  "냉동",
  "기타",
  "직접 입력",
];
const ITEM_TYPE_OPTIONS = [
  "선택해주세요",
  "전자제품",
  "의류",
  "식음료",
  "기타",
  "직접 입력",
];

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

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// SelectWithCustom Component
interface SelectWithCustomProps {
  label: string;
  field: string;
  customField: string;
  options: string[];
  value: string;
  customValue: string;
  required?: boolean;
  onChange: (field: string, value: string) => void;
}

function SelectWithCustom({
  label,
  field,
  customField,
  options,
  value,
  customValue,
  required = false,
  onChange,
}: SelectWithCustomProps) {
  const showCustomInput = value === "직접 입력";

  return (
    <div className="contact__field">
      <label className="contact__label">
        {label} {required && <span className="contact__required">*</span>}
      </label>
      <div className="contact__select-group">
        <select
          value={value}
          onChange={(e) => onChange(field, e.target.value)}
          className="contact__select"
        >
          {options.map((opt) => (
            <option key={opt} value={opt === "선택해주세요" ? "" : opt}>
              {opt}
            </option>
          ))}
        </select>
        {showCustomInput && (
          <input
            type="text"
            value={customValue}
            onChange={(e) => onChange(customField, e.target.value)}
            placeholder="입력"
            className="contact__input"
          />
        )}
      </div>
    </div>
  );
}

export default function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const [formData, setFormData] = useState<ContactFormData>({
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
  });

  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
    setHasUnsavedChanges(true);
  };

  const handleClose = () => {
    if (hasUnsavedChanges) {
      setShowConfirmDialog(true);
    } else {
      onClose();
    }
  };

  const handleConfirmClose = () => {
    setShowConfirmDialog(false);
    setFormData({
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
    });
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
    setFormData({
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
    });
    setHasUnsavedChanges(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Modal Overlay */}
      <div className="contact" onClick={handleClose}>
        <div className="contact__wrapper" onClick={(e) => e.stopPropagation()}>
          <div className="contact__container">
            {/* Header */}
            <div className="contact__header">
              <h2 className="contact__title">견적 문의</h2>
              <button
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
              {/* Section 1: 견적 정보 */}
              <div className="contact__section">
                <h3 className="contact__section-title">견적 정보</h3>
                <div className="contact__grid">
                  <SelectWithCustom
                    label="서비스 분류"
                    field="serviceType"
                    customField="serviceTypeCustom"
                    options={SERVICE_OPTIONS}
                    value={formData.serviceType}
                    customValue={formData.serviceTypeCustom}
                    onChange={handleInputChange}
                  />

                  <SelectWithCustom
                    label="상품 유형"
                    field="productType"
                    customField="productTypeCustom"
                    options={PRODUCT_TYPE_OPTIONS}
                    value={formData.productType}
                    customValue={formData.productTypeCustom}
                    onChange={handleInputChange}
                  />

                  <SelectWithCustom
                    label="취급 품목"
                    field="itemType"
                    customField="itemTypeCustom"
                    options={ITEM_TYPE_OPTIONS}
                    value={formData.itemType}
                    customValue={formData.itemTypeCustom}
                    onChange={handleInputChange}
                  />

                  {/* 수량 */}
                  <div className="contact__field">
                    <label className="contact__label--light">수량</label>
                    <input
                      type="text"
                      value={formData.quantity}
                      onChange={(e) =>
                        handleInputChange("quantity", e.target.value)
                      }
                      placeholder="입력"
                      className="contact__input--light"
                    />
                  </div>

                  {/* 출고량 */}
                  <div className="contact__field">
                    <label className="contact__label--light">출고량</label>
                    <input
                      type="text"
                      value={formData.shipment}
                      onChange={(e) =>
                        handleInputChange("shipment", e.target.value)
                      }
                      placeholder="입력"
                      className="contact__input--light"
                    />
                  </div>

                  {/* 크기 */}
                  <div className="contact__field">
                    <label className="contact__label--light">크기</label>
                    <input
                      type="text"
                      value={formData.size}
                      onChange={(e) =>
                        handleInputChange("size", e.target.value)
                      }
                      placeholder="입력"
                      className="contact__input--light"
                    />
                  </div>

                  {/* 처리방식 */}
                  <div className={`$"contact__field" $"contact__field--full"`}>
                    <label className="contact__label--light">처리방식</label>
                    <textarea
                      value={formData.processingMethod}
                      onChange={(e) =>
                        handleInputChange("processingMethod", e.target.value)
                      }
                      placeholder="입력"
                      rows={3}
                      className="contact__textarea--light"
                    />
                  </div>
                </div>
              </div>

              {/* Section 2: 회사 정보 */}
              <div className="contact__section">
                <h3 className="contact__section-title">회사 정보</h3>
                <div className="contact__grid">
                  {/* 회사명 */}
                  <div className="contact__field">
                    <label className="contact__label--light">회사명</label>
                    <input
                      type="text"
                      value={formData.companyName}
                      onChange={(e) =>
                        handleInputChange("companyName", e.target.value)
                      }
                      placeholder="입력"
                      className="contact__input--light"
                    />
                  </div>

                  {/* 담당자명 */}
                  <div className="contact__field">
                    <label className="contact__label--light">
                      담당자명 <span className="contact__required">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.contactPerson}
                      onChange={(e) =>
                        handleInputChange("contactPerson", e.target.value)
                      }
                      placeholder="입력"
                      className="contact__input--light"
                    />
                  </div>

                  {/* 연락처 */}
                  <div className="contact__field">
                    <label className="contact__label--light">
                      연락처 <span className="contact__required">*</span>
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) =>
                        handleInputChange("phone", e.target.value)
                      }
                      placeholder="입력"
                      className="contact__input--light"
                    />
                  </div>

                  {/* 이메일 */}
                  <div className="contact__field">
                    <label className="contact__label--light">이메일</label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) =>
                        handleInputChange("email", e.target.value)
                      }
                      placeholder="입력"
                      className="contact__input--light"
                    />
                  </div>

                  {/* 문의지역 */}
                  <div className={`$"contact__field" $"contact__field--full"`}>
                    <label className="contact__label--light">문의지역</label>
                    <input
                      type="text"
                      value={formData.region}
                      onChange={(e) =>
                        handleInputChange("region", e.target.value)
                      }
                      placeholder="입력"
                      className="contact__input--light"
                    />
                  </div>
                </div>
              </div>

              {/* Section 3: 문의/기타 */}
              <div className="contact__section">
                <h3 className="contact__section-title">문의/기타</h3>
                <label className="contact__label">상세 문의</label>
                <textarea
                  value={formData.inquiry}
                  onChange={(e) => handleInputChange("inquiry", e.target.value)}
                  placeholder="입력"
                  rows={5}
                  className="contact__textarea"
                />
              </div>

              {/* Info Text */}
              <div className="contact__info">
                <p className="contact__info-text">
                  전화 상담 가능 &amp; 빠른 답변 예정
                </p>
              </div>

              {/* Submit Button */}
              <div className="contact__actions">
                <button
                  type="button"
                  onClick={handleClose}
                  className={`$"contact__button" $"contact__button--secondary"`}
                >
                  취소
                </button>
                <button
                  type="submit"
                  className={`$"contact__button" $"contact__button--primary"`}
                >
                  문의 전송
                </button>
              </div>
            </form>
          </div>
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
                className={`$"confirm__button" $"confirm__button--secondary"`}
              >
                취소
              </button>
              <button
                onClick={handleConfirmClose}
                className={`$"confirm__button" $"confirm__button--primary"`}
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
