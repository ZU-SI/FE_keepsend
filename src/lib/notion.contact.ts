"use server";

import { Client } from "@notionhq/client";

// UI에서 넘어오는 데이터 타입 정의
export interface ContactSubmitData {
  serviceTypes: string[];
  productType: string; // '직접 입력'일 경우 이미 처리된 값이 들어옴
  monthlyShipment: string;
  companyName: string;
  contactPerson: string;
  phone: string;
  email: string;
  region: string;
  inquiryContent: string;
  privacyAgreed: boolean;
}

export async function submitContactForm(data: ContactSubmitData) {
  const apiKey = process.env.NOTION_API_KEY;
  const databaseId = process.env.NOTION_DB_CONTACT_ID;

  if (!apiKey || !databaseId) {
    console.error("Notion 환경변수가 설정되지 않았습니다.");
    return { success: false, message: "Server Configuration Error" };
  }

  const notion = new Client({ auth: apiKey });

  try {
    // 1. 본문(Body)에 들어갈 블록 생성 함수
    const createSectionHeading = (text: string) => ({
      object: "block",
      type: "heading_2",
      heading_2: { rich_text: [{ text: { content: text } }] },
    });

    const createBulletItem = (label: string, value: string) => ({
      object: "block",
      type: "bulleted_list_item",
      bulleted_list_item: {
        rich_text: [
          {
            type: "text",
            text: { content: `${label}: `, link: null },
            annotations: { bold: true },
          },
          {
            type: "text",
            text: { content: value || "-", link: null },
          },
        ],
      },
    });

    // 2. Notion Page 생성 요청
    await notion.pages.create({
      parent: { database_id: databaseId },
      // A. 속성(Properties) 매핑 - 검색/필터용 핵심 데이터
      // Notion DB에 해당 컬럼들이 미리 생성되어 있어야 합니다.
      properties: {
        "회사명": { // Title Property
          title: [{ text: { content: data.companyName } }],
        },
        "담당자명": {
          rich_text: [{ text: { content: data.contactPerson } }],
        },
        "연락처": {
          rich_text: [{ text: { content: data.phone } }],
        },
        "이메일": {
          email: data.email,
        },
        "지역": {
          select: { name: data.region },
        },
        "서비스분류": { // Multi-select
          multi_select: data.serviceTypes.map((type) => ({ name: type })),
        },
        "상태": { // 기본 상태값
          select: { name: "접수대기" },
        },
        "신청일": {
            date: { start: new Date().toISOString() }
        }
      },
      // B. 본문(Content) 매핑 - 모든 상세 정보
      children: [
        // Section 1: 물류 정보
        createSectionHeading("📦 물류 정보"),
        createBulletItem("서비스 분류", data.serviceTypes.join(", ")),
        createBulletItem("상품 유형", data.productType),
        createBulletItem("월 출고량", data.monthlyShipment),

        // 빈 줄 추가
        { object: "block", type: "paragraph", paragraph: { rich_text: [] } },

        // Section 2: 담당자 정보
        createSectionHeading("👤 담당자 정보"),
        createBulletItem("회사명", data.companyName),
        createBulletItem("담당자명", data.contactPerson),
        createBulletItem("연락처", data.phone),
        createBulletItem("이메일", data.email),
        createBulletItem("문의 지역", data.region),

        // 빈 줄 추가
        { object: "block", type: "paragraph", paragraph: { rich_text: [] } },

        // Section 3: 문의 내용
        createSectionHeading("📝 문의 내용"),
        {
          object: "block",
          type: "paragraph",
          paragraph: {
            rich_text: [{ text: { content: data.inquiryContent } }],
          },
        },
      ],
    } as any); // as any: Notion SDK 타입 정의가 복잡하여 일부 bypass

    return { success: true };
  } catch (error) {
    console.error("Notion API Error:", error);
    return { success: false, message: "견적 접수 중 오류가 발생했습니다." };
  }
}
