// components/ServiceCenter.tsx
'use client';

import dynamic from 'next/dynamic';
import React, { useState } from 'react';
import { NavermapsProvider } from 'react-naver-maps';


// types/center.ts
export interface Center {
  id: number;
  name: string;
  region: string;
  code: [number, number]; // [latitude, longitude]
}

export interface Region {
  id: string;
  name: string;
}


export const regions: Region[] = [
  { id: 'all', name: '전체' },
  { id: 'seoul', name: '서울/경기' },
  { id: 'gangwon', name: '강원도' },
  { id: 'chungcheong', name: '충청도' },
  { id: 'gyeongsang', name: '경상도' },
  { id: 'jeolla', name: '전라도' },
];

interface StatItem {
  label: string;
  value: string;
  unit: string;
}

const stats: StatItem[] = [
    { label: '물류 센터', value: '0,000', unit: '개' },
    { label: '1일 투입 인원', value: '0,000', unit: '명' },
    { label: '일 평균 배송량', value: '0,000', unit: '건' },
  ];

export const centers: Center[] = [
  // 서울/경기
  { id: 1, name: '중구1캠프', region: '서울/경기', code: [37.5665, 126.9780] },
  { id: 2, name: '중구1 인터캠프', region: '서울/경기', code: [37.5502, 127.0285] },
  { id: 3, name: '동대문주(성동MB)', region: '서울/경기', code: [37.5388, 127.0839] },
  { id: 4, name: '구의2(성수동A)', region: '서울/경기', code: [37.5443, 127.0557] },
  { id: 5, name: '구의2(성수동C)', region: '서울/경기', code: [37.5443, 127.0557] },
  { id: 6, name: '양주1', region: '서울/경기', code: [37.7854, 127.0456] },
  { id: 7, name: '남양주2(아영)', region: '서울/경기', code: [37.6358, 127.2167] },
  { id: 8, name: '용인2', region: '서울/경기', code: [37.2636, 127.1089] },

  // 강원도
  { id: 9, name: '일산', region: '강원도', code: [37.6350, 126.7157] },
  { id: 10, name: '일산6', region: '강원도', code: [37.6350, 126.7157] },
  { id: 11, name: '일산8', region: '강원도', code: [37.6350, 126.7157] },
  { id: 12, name: '동탄1', region: '강원도', code: [37.2005, 127.0752] },
  { id: 13, name: 'M창동', region: '강원도', code: [37.6539, 127.0473] },
  { id: 14, name: 'M삼척', region: '강원도', code: [37.4498, 129.1656] },

  // 충청도
  { id: 15, name: '천안1(주안)', region: '충청도', code: [36.8151, 127.1139] },
  { id: 16, name: '천안1(아산)', region: '충청도', code: [36.8151, 127.1139] },
  { id: 17, name: '대전1(대흥동MB)', region: '충청도', code: [36.3273, 127.4264] },
  { id: 18, name: '대전3(대흥MB)', region: '충청도', code: [36.3504, 127.3845] },
  { id: 19, name: '대전3(성남동MB)', region: '충청도', code: [36.3504, 127.3845] },
  { id: 20, name: '청와1', region: '충청도', code: [36.6424, 127.4890] },

  // 경상도
  { id: 21, name: '고미1(광림)', region: '경상도', code: [35.1379, 128.0896] },
  { id: 22, name: '고미1(오천)', region: '경상도', code: [35.1379, 128.0896] },
  { id: 23, name: '대구3캠프', region: '경상도', code: [35.8714, 128.6014] },
  { id: 24, name: '대구1캠프', region: '경상도', code: [35.8714, 128.6014] },
  { id: 25, name: '대구3캠프(본관)', region: '경상도', code: [35.8714, 128.6014] },
  { id: 26, name: '대구3캠프(관평장)', region: '경상도', code: [35.8714, 128.6014] },
  { id: 27, name: '부산1', region: '경상도', code: [35.1796, 129.0756] },
  { id: 28, name: '부산4', region: '경상도', code: [35.1796, 129.0756] },
  { id: 29, name: 'M양주', region: '경상도', code: [35.6870, 127.9095] },
  { id: 30, name: 'M포항', region: '경상도', code: [36.0190, 129.3435] },
  { id: 31, name: 'M_평택1', region: '경상도', code: [36.9921, 127.1128] },
  { id: 32, name: 'M_평택2', region: '경상도', code: [36.9921, 127.1128] },

  // 전라도
  { id: 33, name: '전주1', region: '전라도', code: [35.8242, 127.1479] },
  { id: 34, name: '광주1', region: '전라도', code: [35.1595, 126.8526] },
  { id: 35, name: '목포1', region: '전라도', code: [34.8118, 126.3922] },
  { id: 36, name: '순천1', region: '전라도', code: [34.9506, 127.4872] },
];



// Dynamic import로 NaverMapComponent 불러오기
const NaverMapComponent = dynamic(() => import('../../../../../components/ui/map/NaverMap'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
        <p className="text-sm text-muted-foreground">지도를 불러오는 중...</p>
      </div>
    </div>
  ),
});

interface ServiceCenterProps {
  id: string;
  index: number;
}

const ServiceCenter: React.FC<ServiceCenterProps> = ({ id, index }) => {
  const [activeRegion, setActiveRegion] = useState<string>('전체');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [selectedCenter, setSelectedCenter] = useState<number | null>(null);
  const [mapCenter, setMapCenter] = useState<{ lat: number; lng: number }>({
    lat: 36.5,
    lng: 127.5,
  });
  const [mapZoom, setMapZoom] = useState<number>(7);

  const centersPerPage = 10;

  // 지역별 필터링
  const filteredCenters =
    activeRegion === '전체'
      ? centers
      : centers.filter((center) => center.region === activeRegion);

  // 현재 페이지의 센터 목록
  const indexOfLastCenter = currentPage * centersPerPage;
  const indexOfFirstCenter = indexOfLastCenter - centersPerPage;
  const currentCenters = filteredCenters.slice(indexOfFirstCenter, indexOfLastCenter);

  // 페이지네이션
  const totalPages = Math.ceil(filteredCenters.length / centersPerPage);
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  // Center 클릭 핸들러
  const handleCenterClick = (center: Center) => {
    setSelectedCenter(center.id);
    setMapCenter({ lat: center.code[0], lng: center.code[1] });
    setMapZoom(14);
  };

  // Marker 클릭 핸들러
  const handleMarkerClick = (center: Center) => {
    setSelectedCenter(center.id);

    // Center list로 스크롤
    setTimeout(() => {
      const centerElement = document.getElementById(`center-${center.id}`);
      if (centerElement) {
        centerElement.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    }, 100);

    // 해당 center가 현재 페이지에 없으면 페이지 이동
    const centerIndex = filteredCenters.findIndex((c) => c.id === center.id);
    if (centerIndex !== -1) {
      const targetPage = Math.floor(centerIndex / centersPerPage) + 1;
      if (targetPage !== currentPage) {
        setCurrentPage(targetPage);
      }
    }
  };

  // Region 변경 핸들러
  const handleRegionChange = (regionName: string) => {
    setActiveRegion(regionName);
    setCurrentPage(1);
    setSelectedCenter(null);

    // 해당 region의 centers로 중심 계산
    const regionCenters =
      regionName === '전체' ? centers : centers.filter((c) => c.region === regionName);

    if (regionCenters.length > 0) {
      // 모든 센터의 평균 위치 계산
      const avgLat =
        regionCenters.reduce((sum, c) => sum + c.code[0], 0) / regionCenters.length;
      const avgLng =
        regionCenters.reduce((sum, c) => sum + c.code[1], 0) / regionCenters.length;

      setMapCenter({ lat: avgLat, lng: avgLng });
      setMapZoom(regionName === '전체' ? 7 : 9);
    }
  };

  // 페이지 변경 핸들러
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    setSelectedCenter(null);
  };

  const paginationBaseClass =
    'w-[30px] h-[30px] flex items-center justify-center rounded-sm border border-border-light bg-card-light text-muted-foreground-light cursor-pointer transition-all duration-300 hover:bg-muted-light lg:w-9 lg:h-9';

  return (
    <section className="s-section__content" id={id}>
      <div className="s-section__header">
        <span className="s-section__subtitle">물류 센터</span>
        <h2 className="s-section__title">전국을 잇는 네트워크, 효율이 시작되는 곳</h2>
        <p className="s-section__description">
          전국 주요 지점에 구축된 물류센터를 통해 다양한 B2B 기계 교육에 대응합니다.
          <br />
          정확한 운영 시스템과 효율적 관리 프로세스로 기업과 어떤 환경에 상관없이 지원을
          다합니다.
        </p>
      </div>

      <div className="grid gap-4 lg:grid-cols-2 lg:gap-8 lg:h-[50vh]">
        {/* Map Container */}
        <div className="relative overflow-hidden rounded shadow-lg shadow-black/10 border border-border-light bg-card-light h-full min-h-[30vh]">
          <NavermapsProvider ncpClientId={process.env.NEXT_PUBLIC_NAVER_CLIENT_ID || ''}>
            <NaverMapComponent
              filteredCenters={filteredCenters}
              selectedCenter={selectedCenter}
              onMarkerClick={handleMarkerClick}
              mapCenter={mapCenter}
              mapZoom={mapZoom}
            />
          </NavermapsProvider>
        </div>

        {/* Center List */}
        <div className="grid grid-rows-[auto_1fr_auto] gap-4 lg:gap-6 h-full overflow-hidden lg:max-h-[50vh]">
          {/* Region Filter */}
          <div className="flex flex-wrap justify-center gap-2 lg:justify-start">
            {regions.map((region) => (
              <button
                key={region.id}
                className={`rounded-full border border-border-light bg-card-light px-3 py-1 text-xs font-medium text-muted-foreground-light transition-all duration-300 cursor-pointer hover:bg-muted-light lg:text-sm lg:px-4 lg:py-1
                  ${
                    activeRegion === region.name
                      ? 'active !bg-primary !text-white !border-primary'
                      : ''
                  }`}
                onClick={() => handleRegionChange(region.name)}
              >
                {region.name}
              </button>
            ))}
          </div>

          {/* Center List */}
          <div className="flex flex-col gap-2 overflow-y-auto p-1 lg:gap-4">
            {currentCenters.map((center, idx) => {
              if (idx % 2 === 0) {
                const center2 = currentCenters[idx + 1];
                return (
                  <div className="grid gap-2 lg:grid-cols-2 lg:gap-4" key={center.id}>
                    {[center, center2].filter((c) => c).map((c) => (
                      <div
                        id={`center-${c.id}`}
                        className={`group flex gap-3 rounded border bg-card-light p-2 shadow-sm transition-all duration-300 cursor-pointer lg:p-4
                          ${
                            selectedCenter === c.id
                              ? 'border-primary bg-primary/5 shadow-md translate-y-[-4px]'
                              : 'border-border-light hover:translate-y-[-4px] hover:border-primary/30 hover:shadow-md'
                          }`}
                        key={c.id}
                        onClick={() => handleCenterClick(c)}
                      >
                        <div
                          className={`flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full transition-colors duration-300 lg:h-11 lg:w-11
                          ${
                            selectedCenter === c.id
                              ? 'bg-primary'
                              : 'bg-primary-hover group-hover:bg-primary'
                          }`}
                        >
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path
                              d="M12 2C8.13 2 5 5.13 5 9C5 14.25 12 22 12 22C12 22 19 14.25 19 9C19 5.13 15.87 2 12 2ZM12 11.5C10.62 11.5 9.5 10.38 9.5 9C9.5 7.62 10.62 6.5 12 6.5C13.38 6.5 14.5 7.62 14.5 9C14.5 10.38 13.38 11.5 12 11.5Z"
                              fill="#fff"
                            />
                          </svg>
                        </div>
                        <div className="flex flex-col gap-0 lg:gap-1">
                          <h3
                            className={`text-[0.9375rem] font-semibold lg:text-[1.0625rem]
                            ${
                              selectedCenter === c.id
                                ? 'text-primary'
                                : 'text-foreground-light'
                            }`}
                          >
                            {c.name}
                          </h3>
                          <p className="text-xs text-muted-foreground-light lg:text-sm">
                            {c.region}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                );
              }
              return null;
            })}
          </div>

          {/* Pagination */}
          <div className="mt-6 flex items-center justify-center gap-2">
            <button
              className={`${paginationBaseClass} text-xs disabled:cursor-not-allowed disabled:opacity-50`}
              disabled={currentPage === 1}
              onClick={() => handlePageChange(currentPage - 1)}
            >
              &lt;&lt;
            </button>

            {pageNumbers.map((number) => (
              <button
                key={number}
                className={`${paginationBaseClass} text-[0.8125rem] lg:text-sm
                  ${
                    currentPage === number
                      ? '!bg-primary !text-white !border-primary'
                      : ''
                  }`}
                onClick={() => handlePageChange(number)}
              >
                {number}
              </button>
            ))}

            <button
              className={`${paginationBaseClass} text-xs disabled:cursor-not-allowed disabled:opacity-50`}
              disabled={currentPage === totalPages}
              onClick={() => handlePageChange(currentPage + 1)}
            >
              &gt;&gt;
            </button>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-4 mt-20">
          <div className="s-section__header">
              <h2 className="s-section__description text-xl">
                효율적인 인력 배치와 차량 운용으로 신속하고 정밀한 물류 서비스를 제공합니다.
              </h2>
          </div>
          {/* service-partner__stats: grid 2-col mobile, 4-col desktop */}
          <div className="grid grid-cols-3 gap-x-4 gap-y-6 ">
            {stats.map((stat, idx) => (
              <div className="flex flex-col gap-2 items-center text-center" key={idx}>
                  <span className="text-sm lg:text-2xl">⚙️</span>
                {/* service-partner__stat-label */}
                <span className="mb-px text-sm font-medium text-primary lg:mb-1">
                  {stat.label}
                </span>
                {/* service-partner__stat-value */}
                <div className="text-xl font-bold leading-none text-foreground-light lg:text-3xl">
                  {stat.value}
                  {/* service-partner__stat-unit */}
                  <span className="ml-2 text-base opacity-80 lg:text-lg">{stat.unit}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
    </section>
  );
};

export default ServiceCenter;
