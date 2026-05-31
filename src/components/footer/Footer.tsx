import { Button } from "../button/Button";
import { LogoWatermark } from "../logo-watermark/LogoWatermark";
import { ThemeToggle } from "../theme-toggle/ThemeToggle";
import { Tooltip } from "../tooltip/Tooltip";
import { Typography } from "../typography";
import { GitHubIcon, TwitterIcon, YouTubeIcon, LinkedInIcon } from "../icons";
import styles from "./Footer.module.css";
import { Box } from "../box/Box";

interface FooterProps {
  onNavigate: (page: "home" | "complementos") => void;
}

const socials = [
  {
    label: "GitHub",
    url: "https://github.com",
    icon: <GitHubIcon />,
  },
  {
    label: "X",
    url: "https://x.com",
    icon: <TwitterIcon />,
  },
  {
    label: "YouTube",
    url: "https://youtube.com",
    icon: <YouTubeIcon />,
  },
  {
    label: "LinkedIn",
    url: "https://linkedin.com",
    icon: <LinkedInIcon />,
  },
] as const;

const navLinks = [
  { label: "Inicio", page: "home" as const },
  { label: "Complementos", page: "complementos" as const },
];

export const Footer = ({ onNavigate }: FooterProps) => {
  return (
    <footer className={styles.footer}>
      <Box className={styles.inner}>
        <Box className={styles.grid}>
          <Box className={`${styles.col} ${styles.colBrand}`}>
            <Typography variant="h3" className={styles.brand}>
              <LogoWatermark size={56} />
            </Typography>
            <Typography variant="body2">
              Espacio de aprendizaje donde exploramos tecnologías web modernas.
              Recursos, ejemplos y herramientas para complementar tu formación
              como desarrollador.
            </Typography>
          </Box>
          <Box className={styles.col}>
            <Typography variant="h6" className={styles.heading} component="h4">Navegación</Typography>
            <nav className={styles.nav}>
              {navLinks.map((link) => (
                <Tooltip
                  key={link.page}
                  content={
                    link.page === "home" ? "Ir al inicio" : "Ver complementos"
                  }
                >
                  <Button onClick={() => onNavigate(link.page)}>
                    {link.label}
                  </Button>
                </Tooltip>
              ))}
            </nav>
          </Box>
          <Box className={styles.col}>
            <h4 className={styles.heading}>Redes</h4>
            <Box className={styles.socials}>
              {socials.map((s) => (
                <Tooltip key={s.label} content={s.label}>
                  <a
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.socialLink}
                    aria-label={s.label}
                  >
                    {s.icon}
                  </a>
                </Tooltip>
              ))}
            </Box>
          </Box>
          <Box className={styles.col}>
            <h4 className={styles.heading}>Contacto</h4>
            <Box className={styles.contactGroup}>
              <Typography variant="body2" align="left">
                ¿Ideas, sugerencias o colaboración? Escríbenos y te
                responderemos a la brevedad.
              </Typography>
              <Tooltip content="Enviar correo">
                <a href="mailto:hola@edukuk.dev" className={styles.email}>
                  hola@edukuk.dev
                </a>
              </Tooltip>
            </Box>
            <Tooltip content="Cambiar tema">
              <ThemeToggle />
            </Tooltip>
          </Box>
        </Box>
      </Box>
      <Box className={styles.bottom}>
        <Typography variant="caption" component="p">
          &copy; {new Date().getFullYear()} edukuk &mdash; Hecho con
          dedicaci&oacute;n para la comunidad dev.
        </Typography>
      </Box>
    </footer>
  );
};