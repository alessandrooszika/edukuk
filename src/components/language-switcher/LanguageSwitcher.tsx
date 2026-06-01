import { useTranslation } from "react-i18next";
import { Button } from "../button/Button";
import { Tooltip } from "../tooltip/Tooltip";
import styles from "./LanguageSwitcher.module.css";

export const LanguageSwitcher = () => {
  const { i18n, t } = useTranslation();
  const current = i18n.language;
  const isEs = current === "es";
  const toggle = () => {
    const next = isEs ? "en" : "es";
    i18n.changeLanguage(next);
    localStorage.setItem("lang", next);
  };
  const tooltipKey = isEs ? "language.switch_to_en" : "language.switch_to_es";
  return (
    <Tooltip content={t(tooltipKey)} position="bottom">
      <Button onClick={toggle} variant="ghost" className={styles.switcher} aria-label={t(tooltipKey)}>
        {isEs ? "EN" : "ES"}
      </Button>
    </Tooltip>
  );
};
