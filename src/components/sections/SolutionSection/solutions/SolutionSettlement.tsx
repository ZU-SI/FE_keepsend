import styles from "../../ServiceSection/serviceSection.module.css";

interface Props {
  id: string;
  index: number;
}

export default function SolutionSettlement({ id, index }: Props) {
  return (
    <div className={styles["sv-section__content"]}>
      <div className={styles["sv-section__animation"]}>
        <div className={styles["sv-section__header"]}>
          <div className={styles["sv-section__title-group"]}>
            <h3 className={styles["sv-section__title"]}>정산 시스템</h3>
            <p className={styles["sv-section__subtitle"]}>
              Settlement System (index: {index})
            </p>
          </div>
        </div>
        <p className={styles["sv-section__description"]}>
          투명하고 정확한 자동 정산 시스템: 실시간 수익 분석과 자동화된 보고.
        </p>
      </div>
    </div>
  );
}

