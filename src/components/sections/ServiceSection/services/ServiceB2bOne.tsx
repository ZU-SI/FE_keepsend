import styles from "../serviceSection.module.css";

interface Props {
  id: string;
  index: number;
}

export default function ServiceB2bOne({ id, index }: Props) {
  return (
    <div className={styles["sv-section__content"]}>
      <div className={styles["sv-section__animation"]}>
        <div className={styles["sv-section__header"]}>
          <div className={styles["sv-section__title-group"]}>
            <h3 className={styles["sv-section__title"]}>B2B 섹션 1</h3>
            <p className={styles["sv-section__subtitle"]}>
              규모형 비즈니스 솔루션 (index: {index})
            </p>
          </div>
        </div>
        <p className={styles["sv-section__description"]}>
          대규모 운영에 최적화된 플랫폼 기능을 소개합니다.
        </p>
      </div>
    </div>
  );
}
