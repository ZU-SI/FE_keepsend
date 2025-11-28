// lib/notion.ts
'use server'

// 공지사항 목록 데이터 정의
export interface NoticeItem {
  id: string;
  title: string;
  date: string;
  category?: string;
  status?: string;
  description?: string;
  thumbnail?: string;
}

// 2. 목록 조회 함수 (Fetch API 사용)
export const getNoticeList = async (): Promise<NoticeItem[]> => {
  const databaseId = process.env.NOTION_DB_NOTICE_ID;
  const apiKey = process.env.NOTION_API_KEY;

  if (!databaseId || !apiKey) {
    throw new Error("Notion 환경변수(API Key 또는 Database ID)가 설정되지 않았습니다.");
  }

  const url = `https://api.notion.com/v1/databases/${databaseId}/query`;

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Notion-Version": "2022-06-28", // 필수: Notion API 버전 명시
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        filter: {
          property: "status",
          select: {
            equals: "발행",
          },
        },
        sorts: [
          {
            property: "createdAt",
            direction: "descending",
          },
        ],
      }),
      next: { revalidate: 60 }, // Next.js ISR 설정 (60초 캐싱)
    });

    // 에러 상세 디버깅을 위한 코드
    if (!response.ok) {
      const errorBody = await response.text();
      console.error(`❌ Notion API Error: ${response.status} ${response.statusText}`);
      console.error(`❌ 상세 내용: ${errorBody}`);
      throw new Error(`Notion API 호출 실패: ${response.status}`);
    }

    const data = await response.json();

    // 3. 데이터 매핑 (Notion 구조 -> UI 구조)
     
    return data.results.map((page: any) => {

      return {
        id: page.id,
        // page.properties['속성명'] 부분은 실제 Notion DB 컬럼명과 일치
        title: page.properties["title"]?.title[0]?.plain_text || "제목 없음",
        description: page.properties["description"]?.rich_text[0]?.plain_text || "요약 내용 없음",
        createdAt: page.properties["createdAt"]?.date?.start || "",
        category: page.properties["category"]?.select?.name || "일반",
        thumbnail: page.properties['thumbnail']?.files[0].file.url || ""
      };
    });

  } catch (error) {
    console.error("Notion 데이터 조회 중 치명적 오류 발생:", error);
    return []; // 에러 발생 시 빈 배열 반환하여 UI 멈춤 방지
  }
};


// 공지사항 상세 데이터 정의
export interface NotionBlock {
  id: string;
  type: string;
  [key: string]: any; // paragraph, heading_1 등 다양한 타입 허용
}

// 3. 페이지 본문(블록 리스트) 조회 함수
export const getPageBlocks = async (pageId: string): Promise<NotionBlock[]> => {
  const apiKey = process.env.NOTION_API_KEY;

  if (!pageId) throw new Error("Page ID is missing");

  // 중요: 본문을 가져올 때는 'blocks' 엔드포인트를 사용합니다.
  const url = `https://api.notion.com/v1/blocks/${pageId}/children?page_size=100`;

  try {
    const response = await fetch(url, {
      method: "GET", // 본문 조회는 GET 입니다.
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Notion-Version": "2022-06-28",
        "Content-Type": "application/json",
      },
      next: { revalidate: 60 }, // 캐싱 설정
    });

    if (!response.ok) {
      throw new Error(`Notion Block 조회 실패: ${response.status}`);
    }

    const data = await response.json();
    return data.results as NotionBlock[];

  } catch (error) {
    console.error("본문 조회 중 오류:", error);
    return [];
  }
};


/**
 * [Server Action] 클라이언트에서 호출 가능한 본문 조회 함수
 */

export const fetchPageBlocks = async (pageId: string) => {
  return await getPageBlocks(pageId);
};
