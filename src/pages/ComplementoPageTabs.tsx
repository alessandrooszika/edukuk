import { useTranslation } from "react-i18next";
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
  const { t } = useTranslation();
  const st = useComplementosState();

  return (
    <Box className={styles.page}>
      <Typography variant="h2" className={styles.title}>{t("complementos.page_title")}</Typography>
      <Tabs
        defaultIndex={defaultTab}
        onChange={onTabChange}
        tabs={[
          { label: t("complementos.category_overview"),  content: renderOverviewSection(t) },
          { label: t("complementos.category_buttons"),   content: renderButtonsSection(t, baseStyles) },
          { label: t("complementos.category_inputs"),    content: renderInputsSection(t, st, baseStyles) },
          { label: t("complementos.category_layout"),    content: renderLayoutSection(t, styles, baseStyles) },
          { label: t("complementos.category_display"),   content: renderDisplaySection(t, st, baseStyles) },
          { label: t("complementos.category_theme"),     content: renderThemeSection(t, styles, baseStyles) },
          { label: t("complementos.category_icons"),     content: renderIconsSection(t, styles, baseStyles) },
          { label: t("complementos.category_overlays"),  content: renderOverlaysSection(t, st, baseStyles) },
          { label: t("complementos.category_business"),  content: renderBusinessSection(t, st, baseStyles) },
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