import React, { useState } from 'react';

interface ServiceCenterProps {
  id: string;
  index: number;
}

interface Center {
  id: number;
  name: string;
  address: string;
  phone: string;
  region: '전체' | '서울/경기' | '강원도' | '충청도' | '경상도' | '전라도';
}

const ServiceCenter: React.FC<ServiceCenterProps> = ({ id, index }) => {
  const [activeRegion, setActiveRegion] = useState<string>('전체');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const centersPerPage = 10;

  const regions = [
    { id: 'all', name: '전체' },
    { id: 'seoul', name: '서울/경기' },
    { id: 'gangwon', name: '강원도' },
    { id: 'chungcheong', name: '충청도' },
    { id: 'gyeongsang', name: '경상도' },
    { id: 'jeolla', name: '전라도' },
  ];

  // 서비스 센터 더미 데이터
  const centers: Center[] = [
    { id: 1, name: '중구 1 캠프', address: '서울 중구 세종대로 67', phone: '02-1234-5678', region: '서울/경기' },
    { id: 2, name: '중구 1 캠프', address: '서울 중구 세종대로 67', phone: '02-1234-5678', region: '서울/경기' },
    { id: 3, name: '중구 1 캠프', address: '서울 중구 세종대로 67', phone: '02-1234-5678', region: '서울/경기' },
    { id: 4, name: '중구 1 캠프', address: '서울 중구 세종대로 67', phone: '02-1234-5678', region: '서울/경기' },
    { id: 5, name: '중구 1 캠프', address: '서울 중구 세종대로 67', phone: '02-1234-5678', region: '서울/경기' },
    { id: 6, name: '중구 1 캠프', address: '서울 중구 세종대로 67', phone: '02-1234-5678', region: '서울/경기' },
    { id: 7, name: '중구 1 캠프', address: '서울 중구 세종대로 67', phone: '02-1234-5678', region: '서울/경기' },
    { id: 8, name: '중구 1 캠프', address: '서울 중구 세종대로 67', phone: '02-1234-5678', region: '서울/경기' },
    { id: 9, name: '중구 1 캠프', address: '서울 중구 세종대로 67', phone: '02-1234-5678', region: '서울/경기' },
    { id: 10, name: '중구 1 캠프', address: '서울 중구 세종대로 67', phone: '02-1234-5678', region: '서울/경기' },
    { id: 11, name: '중구 1 캠프', address: '서울 중구 세종대로 67', phone: '02-1234-5678', region: '서울/경기' },
    { id: 12, name: '강릉 센터', address: '강원 강릉시 경강로 2111', phone: '033-1234-5678', region: '강원도' },
    { id: 13, name: '대전 센터', address: '대전 중구 대종로 373', phone: '042-1234-5678', region: '충청도' },
    { id: 14, name: '부산 센터', address: '부산 중구 광복로 97', phone: '051-1234-5678', region: '경상도' },
    { id: 15, name: '광주 센터', address: '광주 동구 충장로 93', phone: '062-1234-5678', region: '전라도' },
  ];

  // 지역별 필터링
  const filteredCenters = activeRegion === '전체'
    ? centers
    : centers.filter(center => center.region === activeRegion);

  // 현재 페이지의 센터 목록
  const indexOfLastCenter = currentPage * centersPerPage;
  const indexOfFirstCenter = indexOfLastCenter - centersPerPage;
  const currentCenters = filteredCenters.slice(indexOfFirstCenter, indexOfLastCenter);

  // 페이지네이션
  const totalPages = Math.ceil(filteredCenters.length / centersPerPage);
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  // 페이지 변경 핸들러
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  // Pagination Base Class (공통 스타일 재정의)
  const paginationBaseClass = "w-[30px] h-[30px] flex items-center justify-center rounded-sm border border-border-light bg-card-light text-muted-foreground-light cursor-pointer transition-all duration-300 hover:bg-muted-light lg:w-9 lg:h-9";


  return (
    <section className="s-section__content" id={id}>
        <div className="s-section__header">
          <span className="s-section__subtitle">물류 센터</span>
          <h2 className="s-section__title">전국을 잇는 네트워크, 효율이 시작되는 곳</h2>
          <p className="s-section__description">
            전국 주요 지점에 구축된 물류센터를 통해 다양한 B2B 기계 교육에 대응합니다.
            <br />
            정확한 운영 시스템과 효율적 관리 프로세스로 기업과 어떤 환경에 상관없이 지원을 다합니다.
          </p>
        </div>

        {/* service-center__content: grid mobile, 2-col desktop, fixed height */}
        <div className="grid gap-4 lg:grid-cols-2 lg:gap-8 lg:h-[50vh]">

          {/* service-center__map-container */}
          <div className="relative overflow-hidden rounded shadow-lg shadow-black/10 border border-border-light bg-card-light h-full min-h-[30vh]">
            {/* service-center__map */}
            <div className="w-full h-full relative">
              {/* service-center__map-image */}
              <img
                src="/images/korea-map.png"
                alt="전국 물류센터 지도"
                className="w-full h-full object-cover object-center"
              />
            </div>
          </div>

          {/* service-center__list-container */}
          <div className="grid grid-rows-[auto_1fr_auto] gap-4 lg:gap-6 h-full overflow-hidden lg:max-h-[50vh]">

            {/* service-center__filter */}
            <div className="flex flex-wrap justify-center gap-2 lg:justify-start">
              {regions.map((region) => (
                <button
                  key={region.id}
                  // service-center__filter-btn
                  className={`rounded-full border border-border-light bg-card-light px-3 py-1 text-xs font-medium text-muted-foreground-light transition-all duration-300 cursor-pointer hover:bg-muted-light lg:text-sm lg:px-4 lg:py-1
                    ${activeRegion === region.name ? 'active !bg-primary !text-white !border-primary' : ''}`}
                  onClick={() => {
                    setActiveRegion(region.name);
                    setCurrentPage(1);
                  }}
                >
                  {region.name}
                </button>
              ))}
            </div>

            {/* service-center__list */}
            <div className="flex flex-col gap-2 overflow-y-auto p-1 lg:gap-4">
              {/* Logic for displaying items in rows of 2 on desktop */}
              {currentCenters.map((center, idx) => {
                if (idx % 2 === 0) {
                  const center2 = currentCenters[idx + 1];
                  return (
                    // service-center__list-row
                    <div className="grid gap-2 lg:grid-cols-2 lg:gap-4" key={center.id}>
                      {[center, center2].filter(c => c).map(c => (
                        // service-center__list-item
                        <div
                          className="group flex gap-3 rounded border border-border-light bg-card-light p-2 shadow-sm transition-all duration-300 hover:translate-y-[-4px] hover:border-primary/30 hover:shadow-md lg:p-4"
                          key={c.id}
                        >
                          {/* service-center__center-icon */}
                          <div className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-primary-hover transition-colors duration-300 group-hover:bg-primary lg:h-11 lg:w-11">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M12 2C8.13 2 5 5.13 5 9C5 14.25 12 22 12 22C12 22 19 14.25 19 9C19 5.13 15.87 2 12 2ZM12 11.5C10.62 11.5 9.5 10.38 9.5 9C9.5 7.62 10.62 6.5 12 6.5C13.38 6.5 14.5 7.62 14.5 9C14.5 10.38 13.38 11.5 12 11.5Z" fill="#fff"/>
                            </svg>
                          </div>
                          {/* service-center__center-info */}
                          <div className="flex flex-col gap-0 lg:gap-1">
                            {/* service-center__center-name */}
                            <h3 className="text-[0.9375rem] font-semibold text-foreground-light lg:text-[1.0625rem]">{c.name}</h3>
                            {/* service-center__center-address */}
                            <p className="text-[0.8125rem] leading-snug text-muted-foreground-light lg:text-sm">{c.address}</p>
                            {/* service-center__center-phone */}
                            <p className="text-[0.8125rem] font-medium text-primary lg:text-sm">{c.phone}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  );
                }
                return null;
              })}
            </div>

            {/* service-center__pagination */}
            <div className="mt-6 flex items-center justify-center gap-2">

              {/* service-center__pagination-arrow */}
              <button
                className={`${paginationBaseClass} text-xs disabled:cursor-not-allowed disabled:opacity-50`}
                disabled={currentPage === 1}
                onClick={() => handlePageChange(currentPage - 1)}
              >
                &lt;&lt;
              </button>

              {/* service-center__pagination-btn */}
              {pageNumbers.map(number => (
                <button
                  key={number}
                  className={`${paginationBaseClass} text-[0.8125rem] lg:text-sm
                    ${currentPage === number ? '!bg-primary !text-white !border-primary' : ''}`}
                  onClick={() => handlePageChange(number)}
                >
                  {number}
                </button>
              ))}

              {/* service-center__pagination-arrow */}
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
    </section>
  );
};

export default ServiceCenter;
