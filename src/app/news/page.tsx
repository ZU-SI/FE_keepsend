import { getNoticeList } from "@/lib/notion.news";
import NewsList from "./_components/NewsList";

export default async function News() {

  const notices = await getNoticeList();

  return (
    <main>
      <NewsList initialData={notices} />
    </main>
  );
}
