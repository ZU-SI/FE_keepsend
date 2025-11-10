import styles from "../../ServiceSection/serviceSection.module.css";

interface Props {
  id: string;
  index: number;
}

export default function SolutionLogisticsIT({ id, index }: Props) {
  return (
    <div className={styles["sv-section__content"]}>
      <div className={styles["sv-section__animation"]}>
        <div className={styles["sv-section__header"]}>
          <div className={styles["sv-section__title-group"]}>
            <h3 className={styles["sv-section__title"]}>물류 IT</h3>
            <p className={styles["sv-section__subtitle"]}>
              Logistics IT (index: {index})
            </p>
          </div>
        </div>
        <p className={styles["sv-section__description"]}>
          통합 물류 관리 시스템: 실시간 추적, 자동화된 프로세스, 데이터 기반
          의사결정.
        </p>
      </div>
    </div>
  );
}

