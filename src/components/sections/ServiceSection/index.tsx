"use client";

import { useEffect, useState } from "react";
import styles from "./serviceSection.module.css";

interface Service {
  id: string;
  titleKo: string;
  titleEn: string;
  description: string;
  icon: string;
}

const services: Service[] = [
  {
    id: "intro",
    titleKo: "인트로",
    titleEn: "Introduction",
    description:
      "KEEPSEND의 비전과 미션을 소개합니다. 우리는 물류 산업을 AI 기술로 혁신합니다.",
    icon: "🎯",
  },
  {
    id: "b2b",
    titleKo: "B2B",
    titleEn: "Business Solutions",
    description:
      "기업 고객을 위한 맞춤형 물류 솔루션. 대규모 운영에 최적화된 플랫폼.",
    icon: "🏢",
  },
  {
    id: "process",
    titleKo: "프로세스",
    titleEn: "Process Automation",
    description:
      "자동화된 프로세스로 효율성 향상. AI 기반 의사결정 지원 시스템.",
    icon: "⚙️",
  },
  {
    id: "center",
    titleKo: "물류센터",
    titleEn: "Logistics Centers",
    description: "첨단 물류센터 운영. 실시간 모니터링과 최적화 기능.",
    icon: "📦",
  },
  {
    id: "partner",
    titleKo: "파트너",
    titleEn: "Partnership",
    description: "KEEPSEND와 함께 성장하는 파트너 네트워크. 상호 협력과 성공.",
    icon: "🤝",
  },
  {
    id: "consulting",
    titleKo: "컨설팅",
    titleEn: "Consulting Services",
    description: "전문가 컨설팅으로 디지털 혁신 지원. 맞춤형 전략 제시.",
    icon: "💡",
  },
];

export default function ServiceSection() {
  const [activeService, setActiveService] = useState<string>("intro");
  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const section4Start = 3 * windowHeight;

      setShowMenu(scrollY >= section4Start);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;

      // Sections 0-2 are hero, sections 3-8 are services
      const sectionIndex = Math.round(scrollY / windowHeight);

      if (sectionIndex >= 3 && sectionIndex <= 8) {
        const serviceIndex = sectionIndex - 3;
        const activeId = services[serviceIndex].id;
        setActiveService(activeId);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleMenuClick = (serviceId: string) => {
    const serviceIndex = services.findIndex((s) => s.id === serviceId);
    if (serviceIndex !== -1) {
      const sectionNumber = 3 + serviceIndex;
      const targetY = sectionNumber * window.innerHeight;
      window.scrollTo({ top: targetY, behavior: "smooth" });
    }
  };

  return (
    <section id="services" className={styles["services-section"]}>
      <div className={styles["services-section__container"]}>
        {showMenu && (
          <div className={styles["services-section__menu-wrapper"]}>
            <div className={styles["services-section__menu"]}>
              <h2 className={styles["services-section__menu-header"]}>
                <span className={styles["services-section__menu-title"]}>
                  Services
                </span>
              </h2>
              <nav className={styles["services-section__menu-nav"]}>
                {services.slice(1).map((service) => (
                  <button
                    key={service.id}
                    onClick={() => handleMenuClick(service.id)}
                    className={`${styles["services-section__menu-button"]} ${
                      activeService === service.id
                        ? styles["services-section__menu-button--active"]
                        : styles["services-section__menu-button--inactive"]
                    }`}
                  >
                    {service.titleKo}
                  </button>
                ))}
              </nav>
            </div>
          </div>
        )}

        {/* Service sections */}
        <div className={styles["services-section__sections"]}>
          {services.map((service, index) => (
            <div
              key={service.id}
              data-scroll-section
              data-section-index={3 + index}
              data-service-id={service.id}
              className={styles["services-section__section"]}
            >
              <div className={styles["services-section__content"]}>
                <div className={styles["services-section__animation"]}>
                  <div className={styles["services-section__header"]}>
                    <div className={styles["services-section__icon"]}>
                      {service.icon}
                    </div>
                    <div className={styles["services-section__title-group"]}>
                      <h3 className={styles["services-section__title"]}>
                        {service.titleKo}
                      </h3>
                      <p className={styles["services-section__subtitle"]}>
                        {service.titleEn}
                      </p>
                    </div>
                  </div>

                  <p className={styles["services-section__description"]}>
                    {service.description}
                  </p>

                  {/* Feature cards */}
                  <div className={styles["services-section__features"]}>
                    {[1, 2, 3, 4].map((i) => (
                      <div
                        key={i}
                        className={styles["services-section__feature-card"]}
                      >
                        <div
                          className={styles["services-section__feature-header"]}
                        >
                          <div
                            className={styles["services-section__feature-dot"]}
                          ></div>
                          <h4
                            className={
                              styles["services-section__feature-title"]
                            }
                          >
                            Feature {i}
                          </h4>
                        </div>
                        <p
                          className={
                            styles["services-section__feature-description"]
                          }
                        >
                          이 서비스의 핵심 기능입니다. 최고의 성능과 신뢰성을
                          제공합니다.
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* CTA Section */}
                  <div className={styles["services-section__cta"]}>
                    <h4 className={styles["services-section__cta-title"]}>
                      이 서비스에 관심이 있으신가요?
                    </h4>
                    <p className={styles["services-section__cta-description"]}>
                      KEEPSEND 팀에 문의하여 맞춤형 솔루션을 받아보세요.
                    </p>
                    <button className={styles["services-section__cta-button"]}>
                      지금 시작하기
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
