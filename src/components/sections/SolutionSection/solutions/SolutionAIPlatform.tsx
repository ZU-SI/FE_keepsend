import styles from "../../ServiceSection/serviceSection.module.css";

interface Props {
  id: string;
  index: number;
}

export default function SolutionAIPlatform({ id, index }: Props) {
  return (
    <div className={styles["sv-section__content"]}>
      <div className={styles["sv-section__animation"]}>
        <div className={styles["sv-section__header"]}>
          <div className={styles["sv-section__title-group"]}>
            <h3 className={styles["sv-section__title"]}>AI 플랫폼</h3>
            <p className={styles["sv-section__subtitle"]}>
              AI Platform (index: {index})
            </p>
          </div>
        </div>
        <p className={styles["sv-section__description"]}>
          머신러닝 기반 최적화 엔진: 예측 분석, 자동화된 라우팅, 지능형
          의사결정.
        </p>
      </div>
    </div>
  );
}

