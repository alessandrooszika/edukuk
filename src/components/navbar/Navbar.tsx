import { useTranslation } from "react-i18next";
import { LogoWatermark } from "../logo-watermark/LogoWatermark";
import { ThemeToggle } from "../theme-toggle/ThemeToggle";
import { LanguageSwitcher } from "../language-switcher";
import { Tooltip } from "../tooltip/Tooltip";
import { Button } from "../button/Button";
import { Progress } from "../progress/Progress";
import { useScrollProgress } from "../../hooks/useScrollProgress";
import styles from "./Navbar.module.css";
import { Box } from "../box/Box";

interface NavbarProps {
  currentPage: string;
  onNavigate: (page: "home" | "complementos") => void;
}

export const Navbar = ({ currentPage, onNavigate }: NavbarProps) => {
  const { t } = useTranslation();
  const scrollProgress = useScrollProgress();

  return (
    <nav className={styles.nav} aria-label={t("navbar.aria_label")}>
      <Box className={styles.inner}>
        <Tooltip content={t("navbar.home_tooltip")} position="bottom">
          <Button iconOnly className={styles.brand} onClick={() => onNavigate("home")}>
            <LogoWatermark size={48} />
          </Button>
        </Tooltip>
        <ul className={styles.list}>
          <li>
            <Tooltip content={t("navbar.complementos_tooltip")} position="bottom">
              <Button variant="ghost" className={`${styles.link} ${currentPage === "complementos" ? styles.active : ""}`}
                onClick={() => onNavigate("complementos")}
                aria-current={currentPage === "complementos" ? "page" : undefined}
              >
                {t("navbar.complementos_link")}
              </Button>
            </Tooltip>
          </li>
          <li>
            <LanguageSwitcher />
          </li>
          <li>
            <Tooltip content={t("navbar.theme_tooltip")} position="bottom">
              <ThemeToggle />
            </Tooltip>
          </li>
        </ul>
      </Box>
      <Progress value={scrollProgress} size="sm" className={styles.scrollProgress} />
    </nav>
  );
};