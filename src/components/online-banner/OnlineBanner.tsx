import { useTranslation } from "react-i18next";
import { useOnlineStatus } from "../../hooks/useOnlineStatus";
import { WarningIcon } from "../icons";
import styles from "./OnlineBanner.module.css";

export function OnlineBanner() {
  const { t } = useTranslation();
  const isOnline = useOnlineStatus();

  if (isOnline) return null;

  return (
    <div className={styles.banner} role="alert">
      <span className={styles.icon}><WarningIcon /></span>
      <span>{t("online_banner.message")}</span>
    </div>
  );
}
