import styles from "../serviceSection.module.css";

interface Props {
  id: string;
  index: number;
}

export default function ServicePartner({ id, index }: Props) {
  return (
    <div className={styles["sv-section__content"]}>
      <div className={styles["sv-section__animation"]}>
        <div className={styles["sv-section__header"]}>
          <div className={styles["sv-section__title-group"]}>
            <h3 className={styles["sv-section__title"]}>파트너</h3>
            <p className={styles["sv-section__subtitle"]}>
              파트너십과 공동 성장 (index: {index})
            </p>
          </div>
        </div>
        <p className={styles["sv-section__description"]}>
          KEEPSEND와 함께 성장하는 파트너 네트워크를 소개합니다.
        </p>
      </div>
    </div>
  );
}
