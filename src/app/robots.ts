import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = 'https://www.keepsend.co.kr'; // @todo 도메인명 연동

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      // disallow: '/admin/' // 추후 관리자 페이지 등이 생기면 추가
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}
