import { getNoticeList } from "@/lib/notion.news";
import { Metadata } from "next";
import NewsList from "./_components/NewsList";

export const metadata: Metadata = {
  title: "소식",
  description: "KEEPSEND에서 로지스틱스 최근 동향을 알려 드립니다.",
};

export default async function News() {

  const notices = await getNoticeList();

  return (
    <main id="main">
      <NewsList initialData={notices} />
    </main>
  );
}
