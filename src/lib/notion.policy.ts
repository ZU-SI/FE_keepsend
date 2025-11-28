"use server";

// 약관 목록 아이템 타입
export interface PolicyListItem {
  id: string;
  title: string;
  date: string;
}

// 공통 헤더 설정
const getHeaders = () => {
  const apiKey = process.env.NOTION_API_KEY;
  if (!apiKey) throw new Error("NOTION_API_KEY is missing");

  return {
    "Authorization": `Bearer ${apiKey}`,
    "Notion-Version": "2022-06-28", // API 버전 고정
    "Content-Type": "application/json",
  };
};

/**
 * 1. 약관 목록 조회 (Fetch API 사용)
 * - 상태가 '공개'인 것만 조회
 * - 시행일 기준 내림차순 정렬
 */
export const getPolicyList = async (): Promise<PolicyListItem[]> => {
  const databaseId = process.env.NOTION_DB_POLICY_ID;
  const apiKey = process.env.NOTION_API_KEY;

  if (!databaseId || !apiKey) {
    return [];
  }

  const url = `https://api.notion.com/v1/databases/${databaseId}/query`;

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Notion-Version": "2022-06-28", // API 버전 고정
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        sorts: [
          {
            property: "시행일", // Notion DB에 '시행일' 컬럼이 있어야 함
            direction: "descending",
          },
        ],
      }),
      next: { revalidate: 60 }, // 60초마다 데이터 갱신 (ISR)
    });

    console.log({response})

    if (!response.ok) {
      throw new Error(`Notion API Error: ${response.statusText}`);
    }

    const data = await response.json();

    // 데이터 매핑
     
    return data.results.map((page: any) => ({
      id: page.id,
      title: page.properties["약관명"]?.title[0]?.plain_text || "제목 없음",
      date: page.properties["시행일"]?.date?.start || "",
    }));
  } catch (error) {
    console.error("약관 목록 조회 실패:", error);
    return [];
  }
};

/**
 * 2. 특정 약관 본문 조회 및 HTML 변환 (Fetch API 사용)
 * - blocks 엔드포인트를 통해 블록 리스트를 가져와 HTML 문자열로 변환
 */
export const getPolicyContent = async (pageId: string): Promise<string> => {
  const url = `https://api.notion.com/v1/blocks/${pageId}/children?page_size=100`;

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: getHeaders(),
      next: { revalidate: 3600 }, // 약관 내용은 잘 안 바뀌므로 1시간 캐싱
    });

    if (!response.ok) {
      throw new Error(`Notion Block API Error: ${response.statusText}`);
    }

    const data = await response.json();
    let htmlContent = `<div class="space-y-4 text-sm text-gray-700 leading-relaxed">`;

    // 블록을 순회하며 HTML로 변환
     
    data.results.forEach((block: any) => {
      const type = block.type;

      // 해당 블록 타입의 데이터가 없으면 건너뜀 (구분선 등 예외 처리)
      if (!block[type] && type !== "divider") return;

      const value = block[type];
      // 텍스트 내용 추출 (rich_text가 있는 경우만)
      const text = value.rich_text
        ? value.rich_text.map((t: any) => t.plain_text).join("")
        : "";

      switch (type) {
        case "heading_1":
          htmlContent += `<h2 class="text-xl font-bold text-gray-900 mt-6 mb-3">${text}</h2>`;
          break;
        case "heading_2":
          htmlContent += `<h3 class="text-lg font-bold text-gray-900 mt-5 mb-2">${text}</h3>`;
          break;
        case "heading_3":
          htmlContent += `<h4 class="text-base font-bold text-gray-900 mt-4 mb-2">${text}</h4>`;
          break;
        case "paragraph":
          // 빈 문단은 여백으로 처리하거나 무시
          if (text.trim()) {
            htmlContent += `<p class="mb-2">${text.replace(/\n/g, "<br/>")}</p>`;
          } else {
             htmlContent += `<br/>`;
          }
          break;
        case "bulleted_list_item":
          htmlContent += `<li class="list-disc ml-5 mb-1">${text}</li>`;
          break;
        case "numbered_list_item":
          htmlContent += `<li class="list-decimal ml-5 mb-1">${text}</li>`;
          break;
        case "divider":
          htmlContent += `<hr class="my-6 border-gray-200" />`;
          break;
        case "quote":
          htmlContent += `<blockquote class="border-l-4 border-gray-300 pl-4 italic my-4">${text}</blockquote>`;
          break;
        default:
          break;
      }
    });

    htmlContent += `</div>`;
    return htmlContent;

  } catch (error) {
    console.error("약관 본문 조회 실패:", error);
    return "<p>약관 내용을 불러오지 못했습니다.</p>";
  }
};
