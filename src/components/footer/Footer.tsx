import { useTranslation } from "react-i18next";
import { Button } from "../button/Button";
import { LogoWatermark } from "../logo-watermark/LogoWatermark";
import { ThemeToggle } from "../theme-toggle/ThemeToggle";
import { LanguageSwitcher } from "../language-switcher";
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
    url: "https://github.com/alessandrooszika/edukuk",
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

export const Footer = ({ onNavigate }: FooterProps) => {
  const { t } = useTranslation();

  const navLinks = [
    { label: t("footer.home_link"), page: "home" as const },
    { label: t("footer.complementos_link"), page: "complementos" as const },
  ];

  return (
    <footer className={styles.footer}>
      <Box className={styles.inner}>
        <Box className={styles.grid}>
          <Box className={`${styles.col} ${styles.colBrand}`}>
            <Typography variant="body1" component="div" className={styles.brand}>
              <LogoWatermark size={56} />
            </Typography>
            <Typography variant="body2">
              {t("footer.description")}
            </Typography>
          </Box>
          <Box className={styles.col}>
            <Typography variant="h6" className={styles.heading} component="h4">
              {t("footer.nav_heading")}
            </Typography>
            <nav className={styles.nav}>
              {navLinks.map((link) => (
                <Tooltip
                  key={link.page}
                  content={
                    link.page === "home" ? t("footer.home_tooltip") : t("footer.complementos_tooltip")
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
            <Typography variant="h6" className={styles.heading} component="h4">
              {t("footer.social_heading")}
            </Typography>
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
            <Typography variant="h6" className={styles.heading} component="h4">
              {t("footer.contact_heading")}
            </Typography>
            <Box className={styles.contactGroup}>
              <Typography variant="body2" align="left">
                {t("footer.contact_text")}
              </Typography>
              <Tooltip content={t("footer.contact_tooltip")}>
                <a href="mailto:hola@edukuk.dev" className={styles.email}>
                  hola@edukuk.dev
                </a>
              </Tooltip>
            </Box>
            <Box display="flex" gap="0.5rem" alignItems="center">
              <LanguageSwitcher />
              <Tooltip content={t("footer.theme_tooltip")}>
                <ThemeToggle />
              </Tooltip>
            </Box>
          </Box>
        </Box>
      </Box>
      <Box className={styles.bottom}>
        <Typography variant="caption" component="p">
          {t("footer.copyright", { year: new Date().getFullYear() })}
        </Typography>
      </Box>
    </footer>
  );
};
