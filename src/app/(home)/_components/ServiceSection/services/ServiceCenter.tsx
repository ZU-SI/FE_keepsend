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

  return (
    <section className="service-center" id={id}>
      <div className="service-center__container">
        <div className="service-center__header">
          <span className="service-center__label">물류 센터</span>
          <h2 className="service-center__title">전국을 잇는 네트워크, 효율이 시작되는 곳</h2>
          <p className="service-center__description">
            전국 주요 지점에 구축된 물류센터를 통해 다양한 B2B 기계 교육에 대응합니다.
            <br />
            정확한 운영 시스템과 효율적 관리 프로세스로 기업과 어떤 환경에 상관없이 지원을 다합니다.
          </p>
        </div>

        <div className="service-center__content">
          <div className="service-center__map-container">
            <div className="service-center__map">
              {/* 지도 이미지 */}
              <img
                src="/images/korea-map.png"
                alt="전국 물류센터 지도"
                className="service-center__map-image"
              />
            </div>
          </div>

          <div className="service-center__list-container">
            <div className="service-center__filter">
              {regions.map((region) => (
                <button
                  key={region.id}
                  className={`service-center__filter-btn ${activeRegion === region.name ? 'active' : ''}`}
                  onClick={() => {
                    setActiveRegion(region.name);
                    setCurrentPage(1);
                  }}
                >
                  {region.name}
                </button>
              ))}
            </div>

            <div className="service-center__list">
              {currentCenters.map((center, idx) => (
                idx % 2 === 0 && idx < currentCenters.length - 1 ? (
                  <div className="service-center__list-row" key={center.id}>
                    <div className="service-center__list-item">
                      <div className="service-center__center-icon">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M12 2C8.13 2 5 5.13 5 9C5 14.25 12 22 12 22C12 22 19 14.25 19 9C19 5.13 15.87 2 12 2ZM12 11.5C10.62 11.5 9.5 10.38 9.5 9C9.5 7.62 10.62 6.5 12 6.5C13.38 6.5 14.5 7.62 14.5 9C14.5 10.38 13.38 11.5 12 11.5Z" fill="#333"/>
                        </svg>
                      </div>
                      <div className="service-center__center-info">
                        <h3 className="service-center__center-name">{center.name}</h3>
                        <p className="service-center__center-address">{center.address}</p>
                        <p className="service-center__center-phone">{center.phone}</p>
                      </div>
                    </div>
                    <div className="service-center__list-item">
                      <div className="service-center__center-icon">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M12 2C8.13 2 5 5.13 5 9C5 14.25 12 22 12 22C12 22 19 14.25 19 9C19 5.13 15.87 2 12 2ZM12 11.5C10.62 11.5 9.5 10.38 9.5 9C9.5 7.62 10.62 6.5 12 6.5C13.38 6.5 14.5 7.62 14.5 9C14.5 10.38 13.38 11.5 12 11.5Z" fill="#333"/>
                        </svg>
                      </div>
                      <div className="service-center__center-info">
                        <h3 className="service-center__center-name">{currentCenters[idx + 1].name}</h3>
                        <p className="service-center__center-address">{currentCenters[idx + 1].address}</p>
                        <p className="service-center__center-phone">{currentCenters[idx + 1].phone}</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  idx % 2 === 0 && (
                    <div className="service-center__list-row" key={center.id}>
                      <div className="service-center__list-item">
                        <div className="service-center__center-icon">
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 2C8.13 2 5 5.13 5 9C5 14.25 12 22 12 22C12 22 19 14.25 19 9C19 5.13 15.87 2 12 2ZM12 11.5C10.62 11.5 9.5 10.38 9.5 9C9.5 7.62 10.62 6.5 12 6.5C13.38 6.5 14.5 7.62 14.5 9C14.5 10.38 13.38 11.5 12 11.5Z" fill="#333"/>
                          </svg>
                        </div>
                        <div className="service-center__center-info">
                          <h3 className="service-center__center-name">{center.name}</h3>
                          <p className="service-center__center-address">{center.address}</p>
                          <p className="service-center__center-phone">{center.phone}</p>
                        </div>
                      </div>
                    </div>
                  )
                )
              ))}
            </div>

            <div className="service-center__pagination">
              <button
                className="service-center__pagination-arrow"
                disabled={currentPage === 1}
                onClick={() => handlePageChange(currentPage - 1)}
              >
                &lt;&lt;
              </button>
              {pageNumbers.map(number => (
                <button
                  key={number}
                  className={`service-center__pagination-btn ${currentPage === number ? 'active' : ''}`}
                  onClick={() => handlePageChange(number)}
                >
                  {number}
                </button>
              ))}
              <button
                className="service-center__pagination-arrow"
                disabled={currentPage === totalPages}
                onClick={() => handlePageChange(currentPage + 1)}
              >
                &gt;&gt;
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServiceCenter;
