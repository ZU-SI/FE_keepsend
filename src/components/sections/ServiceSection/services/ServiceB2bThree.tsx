import styles from "../serviceSection.module.css";

interface Props {
  id: string;
  index: number;
}

export default function ServiceB2bThree({ id, index }: Props) {
  return (
    <div className={styles["sv-section__content"]}>
      <div className={styles["sv-section__animation"]}>
        <div className={styles["sv-section__header"]}>
          <div className={styles["sv-section__title-group"]}>
            <h3 className={styles["sv-section__title"]}>B2B 섹션 3</h3>
            <p className={styles["sv-section__subtitle"]}>
              자동화된 의사결정과 추적 (index: {index})
            </p>
          </div>
        </div>
        <p className={styles["sv-section__description"]}>
          AI 기반 자동화와 실시간 추적으로 운영 효율을 극대화합니다.
        </p>
      </div>
    </div>
  );
}
