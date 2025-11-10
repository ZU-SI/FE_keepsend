import styles from "../serviceSection.module.css";

interface Props {
  id: string;
  index: number;
}

export default function ServiceIntro({ id, index }: Props) {
  return (
    <div className={styles["sv-section__content"]}>
      <div className={styles["sv-section__animation"]}>
        <div className={styles["sv-section__header"]}>
          <div className={styles["sv-section__title-group"]}>
            <h3 className={styles["sv-section__title"]}>서비스 인트로</h3>
            <p className={styles["sv-section__subtitle"]}>
              소개 및 개요 (index: {index})
            </p>
          </div>
        </div>
        <p className={styles["sv-section__description"]}>
          여기에는 서비스 전체에 대한 요약과 핵심 메시지가 들어갑니다.
        </p>
      </div>
    </div>
  );
}
