import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.keepsend.co.kr'; // @todo 도메인명 연동

  return [
    {
      url: baseUrl, // 메인 페이지
      lastModified: new Date(),
      changeFrequency: 'daily', // 검색엔진 매일 확인 요청
      priority: 1, // 중요도 최우선
    },
    {
      url: `${baseUrl}/news`, // 뉴스 목록 페이지
      lastModified: new Date(),
      changeFrequency: 'daily', // 검색엔진 매일 확인 요청
      priority: 0.8,
    },
  ]
}
