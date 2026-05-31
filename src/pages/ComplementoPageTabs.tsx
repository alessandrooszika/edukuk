import { useComplementosState } from "../hooks/useComplementosState";
import { FloatingOverlays } from "../components/floating-overlays";
import {
  renderOverviewSection,
  renderButtonsSection,
  renderInputsSection,
  renderLayoutSection,
  renderDisplaySection,
  renderThemeSection,
  renderIconsSection,
  renderOverlaysSection,
  renderBusinessSection,
} from "../content/complementosContent";
import { Tabs } from "../components/tabs";
import { Typography } from "../components/typography";
import baseStyles from "../components/card/Card.module.css";
import styles from "./ComplementosPage.module.css";
import { Box } from "../components/box/Box";

interface ComplementoPageTabsProps {
  defaultTab?: number;
  onTabChange?: (i: number) => void;
}

export const ComplementoPageTabs = ({ defaultTab, onTabChange }: ComplementoPageTabsProps) => {
  const st = useComplementosState();

  return (
    <Box className={styles.page}>
      <Typography variant="h2" className={styles.title}>Complementos</Typography>
      <Tabs
        defaultIndex={defaultTab}
        onChange={onTabChange}
        tabs={[
          { label: "Overview",       content: renderOverviewSection() },
          { label: "Buttons",        content: renderButtonsSection(baseStyles) },
          { label: "Inputs",         content: renderInputsSection(st, baseStyles) },
          { label: "Layout",         content: renderLayoutSection(styles, baseStyles) },
          { label: "Display",        content: renderDisplaySection(st, baseStyles) },
          { label: "Theme",          content: renderThemeSection(styles, baseStyles) },
          { label: "Icons",          content: renderIconsSection(styles, baseStyles) },
          { label: "Overlays",       content: renderOverlaysSection(st, baseStyles) },
          { label: "Business",       content: renderBusinessSection(st, baseStyles) },
        ]}
      />
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