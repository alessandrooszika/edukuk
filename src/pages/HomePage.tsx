import { useTranslation } from "react-i18next";
import { Button } from "../components/button/Button";
import { LogoWatermark } from "../components/logo-watermark/LogoWatermark";
import { Typography } from "../components/typography";
import styles from "./HomePage.module.css";
import { Box } from "../components/box/Box";

interface HomePageProps {
  onNavigate: (page: "complementos") => void;
}

export const HomePage = ({ onNavigate }: HomePageProps) => {
  const { t } = useTranslation();
  return (
    <Box className={styles.hero}>
      <Typography variant="h1" className={styles.title}>
        <LogoWatermark size={160} />
      </Typography>
      <Typography variant="body1" className={styles.description}>
        {t("home.description")}
      </Typography>
      <Button onClick={() => onNavigate("complementos")}>
        {t("home.cta")}
      </Button>
    </Box>
  );
};