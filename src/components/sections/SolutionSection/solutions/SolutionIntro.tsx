import styles from "../../ServiceSection/serviceSection.module.css";

interface Props {
  id: string;
  index: number;
}

export default function SolutionIntro({ id, index }: Props) {
  return (
    <div className={styles["sv-section__content"]}>
      <div className={styles["sv-section__animation"]}>
        <div className={styles["sv-section__header"]}>
          <div className={styles["sv-section__title-group"]}>
            <h3 className={styles["sv-section__title"]}>IT 솔루션 소개</h3>
            <p className={styles["sv-section__subtitle"]}>
              IT Solutions (index: {index})
            </p>
          </div>
        </div>
        <p className={styles["sv-section__description"]}>
          KEEPSEND의 혁신적인 IT 솔루션으로 물류 산업의 디지털 혁신을 시작하세요.
        </p>
      </div>
    </div>
  );
}

