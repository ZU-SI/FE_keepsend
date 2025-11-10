import styles from "../serviceSection.module.css";

interface Props {
  id: string;
  index: number;
}

export default function ServiceConsulting({ id, index }: Props) {
  return (
    <div className={styles["sv-section__content"]}>
      <div className={styles["sv-section__animation"]}>
        <div className={styles["sv-section__header"]}>
          <div className={styles["sv-section__title-group"]}>
            <h3 className={styles["sv-section__title"]}>컨설팅</h3>
            <p className={styles["sv-section__subtitle"]}>
              전문가 컨설팅과 맞춤 전략 (index: {index})
            </p>
          </div>
        </div>
        <p className={styles["sv-section__description"]}>
          비즈니스 혁신을 위한 맞춤형 컨설팅 서비스를 제공합니다.
        </p>
      </div>
    </div>
  );
}
