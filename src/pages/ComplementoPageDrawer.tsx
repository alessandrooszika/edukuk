import { useState } from "react";
import { useComplementosState } from "../hooks/useComplementosState";
import { FloatingOverlays } from "../components/floating-overlays";
import {
  categories,
  type CategoryId,
  renderOverviewSection,
  renderButtonsSection,
  renderInputsSection,
  renderLayoutSection,
  renderDisplaySection,
  renderThemeSection,
  renderIconsSection,
  renderOverlaysSection,
} from "../content/complementosContent";
import { Drawer } from "../components/drawer";
import { MenuIcon } from "../components/icons";
import { Button } from "../components/button/Button";
import { Typography } from "../components/typography";
import baseStyles from "../components/card/Card.module.css";
import styles from "./ComplementosPage.module.css";
import { Box } from "../components/box/Box";

interface ComplementoPageDrawerProps {
  defaultTab?: number;
  onTabChange?: (i: number) => void;
}

export const ComplementoPageDrawer = ({ defaultTab = 0, onTabChange }: ComplementoPageDrawerProps) => {
  const st = useComplementosState();
  const [navDrawerOpen, setNavDrawerOpen] = useState(false);
  const activeCategory: CategoryId = categories[defaultTab].id;

  const renderContent = () => {
    switch (activeCategory) {
      case "overview":       return renderOverviewSection();
      case "buttons":        return renderButtonsSection(baseStyles);
      case "inputs":         return renderInputsSection(st, baseStyles);
      case "layout":         return renderLayoutSection(styles, baseStyles);
      case "display":        return renderDisplaySection(st, baseStyles);
      case "theme":          return renderThemeSection(styles, baseStyles);
      case "icons":          return renderIconsSection(styles, baseStyles);
      case "overlays":       return renderOverlaysSection(st, baseStyles);
    }
  };

  return (
    <Box className={styles.page}>
      <Box className={styles.titleRow}>
        <Button iconOnly className={styles.menuBtn} onClick={() => setNavDrawerOpen(true)} aria-label="Abrir menú de categorías">
          <MenuIcon size={20} />
        </Button>
        <Typography variant="h2">Complementos</Typography>
      </Box>

      <Drawer isOpen={navDrawerOpen} onClose={() => setNavDrawerOpen(false)} position="left" size="sm" title="Categorías">
        <Box className={styles.navList}>
          {categories.map((cat, i) => (
            <Button key={cat.id} variant="ghost" className={`${styles.navItem} ${activeCategory === cat.id ? styles.navItemActive : ""}`}
              onClick={() => { onTabChange?.(i); setNavDrawerOpen(false); }}>
              {cat.label}
            </Button>
          ))}
        </Box>
      </Drawer>

      {renderContent()}

      <FloatingOverlays
        modalSmall={st.modalSmall} setModalSmall={st.setModalSmall}
        modalMedium={st.modalMedium} setModalMedium={st.setModalMedium}
        modalLarge={st.modalLarge} setModalLarge={st.setModalLarge}
        modalXl={st.modalXl} setModalXl={st.setModalXl}
        overlayOpen={st.overlayOpen} setOverlayOpen={st.setOverlayOpen}
        drawerOpen={st.drawerOpen} setDrawerOpen={st.setDrawerOpen}
        drawerPosition={st.drawerPosition}
        alert={st.alert}
        showAlert={st.showAlert}
        onCloseAlert={() => st.setAlert({ ...st.alert, open: false })}
      />
    </Box>
  );
};