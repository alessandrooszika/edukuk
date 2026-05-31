import { LogoWatermark } from "../logo-watermark/LogoWatermark";
import { ThemeToggle } from "../theme-toggle/ThemeToggle";
import { Tooltip } from "../tooltip/Tooltip";
import { Button } from "../button/Button";
import styles from "./Navbar.module.css";
import { Box } from "../box/Box";

interface NavbarProps {
  currentPage: string;
  onNavigate: (page: "home" | "complementos") => void;
}

export const Navbar = ({ currentPage, onNavigate }: NavbarProps) => {
  return (
    <nav className={styles.nav} aria-label="Navegación principal">
      <Box className={styles.inner}>
        <Tooltip content="Ir al inicio" position="bottom">
          <Button iconOnly className={styles.brand} onClick={() => onNavigate("home")}>
            <LogoWatermark size={48} />
          </Button>
        </Tooltip>
        <ul className={styles.list}>
          <li>
            <Tooltip content="Ver complementos" position="bottom">
              <Button variant="ghost" className={`${styles.link} ${currentPage === "complementos" ? styles.active : ""}`}
                onClick={() => onNavigate("complementos")}
                aria-current={currentPage === "complementos" ? "page" : undefined}
              >
                Complementos
              </Button>
            </Tooltip>
          </li>
          <li>
            <Tooltip content="Cambiar tema" position="bottom">
              <ThemeToggle />
            </Tooltip>
          </li>
        </ul>
      </Box>
    </nav>
  );
};