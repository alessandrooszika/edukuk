import { Box } from "../../components/box";
import { Typography } from "../../components/typography";
import { Card, CardHeader, CardBody, CardFooter } from "../../components/card";
import { ThemeToggle } from "../../components/theme-toggle";
import { LogoWatermark } from "../../components/logo-watermark";
import type { T } from "./categories";

const colorTokens = [
  { v: "--accent", light: "#aa3bff", dark: "#c084fc" },
  { v: "--accent-bg", light: "rgba(170,59,255,0.1)", dark: "rgba(192,132,252,0.15)" },
  { v: "--accent-border", light: "rgba(170,59,255,0.5)", dark: "rgba(192,132,252,0.5)" },
  { v: "--info", light: "#3b82f6", dark: "#60a5fa" },
  { v: "--info-bg", light: "rgba(59,130,246,0.12)", dark: "rgba(96,165,250,0.15)" },
  { v: "--success", light: "#22c55e", dark: "#4ade80" },
  { v: "--success-bg", light: "rgba(34,197,94,0.12)", dark: "rgba(74,222,128,0.15)" },
  { v: "--warning", light: "#eab308", dark: "#fde047" },
  { v: "--warning-bg", light: "rgba(234,179,8,0.15)", dark: "rgba(253,224,71,0.15)" },
  { v: "--danger", light: "#ef4444", dark: "#f87171" },
  { v: "--danger-bg", light: "rgba(239,68,68,0.12)", dark: "rgba(248,113,113,0.15)" },
  { v: "--text", light: "#6b6375", dark: "#9ca3af" },
  { v: "--text-h", light: "#08060d", dark: "#f3f4f6" },
  { v: "--bg", light: "#ffffff", dark: "#16171d" },
  { v: "--card-bg", light: "#ffffff", dark: "#1f2028" },
  { v: "--border", light: "#e5e4e7", dark: "#2e303a" },
  { v: "--code-bg", light: "#f4f3ec", dark: "#1f2028" },
  { v: "--meter-bg", light: "#e5e7eb", dark: "#2e303a" },
  { v: "--meter-value", light: "#2563eb", dark: "#60a5fa" },
  { v: "--gradient-end", light: "#f472b6", dark: "#a855f7" },
];

export function renderThemeSection(t: T, s: Record<string, string>, bs: Record<string, string>) {
  return (
    <Box display="grid" gridTemplateColumns="1fr" gap="1.5rem" alignItems="start" width="100%" textAlign="left">
      <Card>
        <CardHeader>
          <Typography variant="h3" gutterBottom>{t("complementos.section_theme")}</Typography>
        </CardHeader>
        <CardBody>
          <ThemeToggle />
        </CardBody>
        <CardFooter>
          <figure className={bs.figure}>
            <Typography variant="caption" component="figcaption" className={bs.figcaption}>
              {t("complementos.figcaption.theme_toggle")}
            </Typography>
          </figure>
        </CardFooter>
      </Card>
      <Card>
        <CardHeader>
          <Typography variant="h3" gutterBottom>{t("complementos.section_logo")}</Typography>
        </CardHeader>
        <CardBody>
          <LogoWatermark size={48} />
        </CardBody>
        <CardFooter>
          <figure className={bs.figure}>
            <Typography variant="caption" component="figcaption" className={bs.figcaption}>
              {t("complementos.figcaption.logo")}
            </Typography>
          </figure>
        </CardFooter>
      </Card>
      <Card>
        <CardHeader>
          <Typography variant="h3" gutterBottom>{t("complementos.section_tokens_colors")}</Typography>
        </CardHeader>
        <CardBody>
          <Box display="flex" gap="0.75rem" flexWrap="wrap">
            {colorTokens.map((ct) => (
              <Box key={ct.v} display="flex" flexDirection="column" alignItems="center" gap="0.25rem">
                <Box className={s.swatchColor} style={{ background: `var(${ct.v})` }} />
                <span className={s.swatchLabel}>{ct.v}</span>
              </Box>
            ))}
          </Box>
        </CardBody>
        <CardFooter>
          <figure className={bs.figure}>
            <Typography variant="caption" component="figcaption" className={bs.figcaption}>
              {t("complementos.figcaption.tokens_colors")}
            </Typography>
          </figure>
        </CardFooter>
      </Card>
      <Card>
        <CardHeader>
          <Typography variant="h3" gutterBottom>{t("complementos.section_tokens_typography")}</Typography>
        </CardHeader>
        <CardBody>
          <Box display="flex" flexDirection="column" gap="0.5rem">
            <Box><code>--sans</code>: <span style={{ fontFamily: "var(--sans)" }}>Inter, system-ui</span> — cuerpo general</Box>
            <Box><code>--heading</code>: <span style={{ fontFamily: "var(--heading)", fontWeight: 600 }}>Inter</span> — títulos</Box>
            <Box><code>--mono</code>: <span style={{ fontFamily: "var(--mono)" }}>ui-monospace, Consolas</span> — código</Box>
          </Box>
          <Typography variant="caption" style={{ marginTop: "1rem" }}>
            Body: 18px (16px en &le;1024px). H1: 56px, H2: 24px.{" "}
            Inter weights cargados: 400, 500, 600, 700 via @fontsource/inter.
          </Typography>
        </CardBody>
        <CardFooter>
          <figure className={bs.figure}>
            <Typography variant="caption" component="figcaption" className={bs.figcaption}>
              {t("complementos.figcaption.tokens_typography")}
            </Typography>
          </figure>
        </CardFooter>
      </Card>
      <Card>
        <CardHeader>
          <Typography variant="h3" gutterBottom>{t("complementos.section_tokens_sizes")}</Typography>
        </CardHeader>
        <CardBody>
          <Box display="flex" flexDirection="column" gap="0.5rem">
            <Box><strong>Tipo Size</strong>: <code>"sm" | "md" | "lg"</code> — usado en Inputs, Switch, Select, Progress, etc.</Box>
            <Box><strong>Breakpoints</strong>: sm=640, md=768, lg=1024, xl=1280px</Box>
            <Box><strong>Gap system</strong>: 0.5rem (flexRow), 1rem (flexRowLg), 1.5rem (grid)</Box>
            <Box><strong>Border radius</strong>: 16px (cards/box), 12px (imágenes, inputs), 8px (varios), 9999px (chips/badges)</Box>
            <Box><strong>Z-index ladder</strong>: Navbar 100, Tooltip 100, Select 150, Drawer overlay 250, Drawer 260, Modal overlay 200, Alert 300, LoaderOverlay 1000</Box>
          </Box>
        </CardBody>
        <CardFooter>
          <figure className={bs.figure}>
            <Typography variant="caption" component="figcaption" className={bs.figcaption}>
              {t("complementos.figcaption.tokens_sizes")}
            </Typography>
          </figure>
        </CardFooter>
      </Card>
    </Box>
  );
}
