import styles from "../serviceSection.module.css";

interface Props {
  id: string;
  index: number;
}

export default function ServiceB2bTwo({ id, index }: Props) {
  return (
    <div className={styles["sv-section__content"]}>
      <div className={styles["sv-section__animation"]}>
        <div className={styles["sv-section__header"]}>
          <div className={styles["sv-section__title-group"]}>
            <h3 className={styles["sv-section__title"]}>B2B 섹션 2</h3>
            <p className={styles["sv-section__subtitle"]}>
              유연한 프로세스와 데이터 가시성 (index: {index})
            </p>
          </div>
        </div>
        <p className={styles["sv-section__description"]}>
          주문부터 출고까지 데이터를 연결해 투명성과 효율을 제공합니다.
        </p>
      </div>
    </div>
  );
}
