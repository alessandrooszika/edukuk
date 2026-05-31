import { Button } from "../components/button/Button";
import { LogoWatermark } from "../components/logo-watermark/LogoWatermark";
import styles from "./HomePage.module.css";
import { Box } from "../components/box/Box";

interface HomePageProps {
  onNavigate: (page: "complementos") => void;
}

export const HomePage = ({ onNavigate }: HomePageProps) => {
  return (
    <Box className={styles.hero}>
      <h1 className={styles.title}>
        <LogoWatermark size={160} />
      </h1>
      <p className={styles.description}>
        Espacio de aprendizaje donde exploramos tecnologías web modernas.
        Aquí encontrarás recursos, ejemplos y herramientas para
        complementar tu formación como desarrollador.
      </p>
      <Button onClick={() => onNavigate("complementos")}>
        Ver Complementos &rarr;
      </Button>
    </Box>
  );
};