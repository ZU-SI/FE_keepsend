import styles from "../serviceSection.module.css";

interface Props {
  id: string;
  index: number;
}

export default function ServiceCenter({ id, index }: Props) {
  return (
    <div className={styles["sv-section__content"]}>
      <div className={styles["sv-section__animation"]}>
        <div className={styles["sv-section__header"]}>
          <div className={styles["sv-section__title-group"]}>
            <h3 className={styles["sv-section__title"]}>물류센터</h3>
            <p className={styles["sv-section__subtitle"]}>
              실시간 모니터링과 최적화 (index: {index})
            </p>
          </div>
        </div>
        <p className={styles["sv-section__description"]}>
          첨단 물류센터 운영과 지능형 관리 기능을 제공합니다.
        </p>
      </div>
    </div>
  );
}
