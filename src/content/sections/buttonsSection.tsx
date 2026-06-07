import { Box } from "../../components/box";
import { Typography } from "../../components/typography";
import { Card, CardHeader, CardBody, CardFooter } from "../../components/card";
import { Button } from "../../components/button";
import { Tooltip } from "../../components/tooltip";
import { RevealCard } from "../../components/reveal-card";
import { Playground } from "../../components/playground";
import {
  MenuIcon, SearchIcon, ClearIcon, EyeIcon, EyeOffIcon, SunIcon, MoonIcon,
  ChevronUpIcon, ChevronDownIcon, CalendarIcon, UploadIcon, FileIcon, CheckIcon,
  InfoIcon, SuccessIcon, WarningIcon, ErrorIcon, GitHubIcon, TwitterIcon,
  YouTubeIcon, LinkedInIcon, ChevronRightIcon, ChevronLeftIcon, AddIcon,
  PackageIcon, BellIcon, CloseIcon,
} from "../../components/icons";
import type { T } from "./categories";
import type { FC, SVGProps } from "react";

const iconMap: Record<string, FC<SVGProps<SVGSVGElement> & { size?: number }> | undefined> = {
  None: undefined,
  Menu: MenuIcon,
  Search: SearchIcon,
  Clear: ClearIcon,
  Eye: EyeIcon,
  EyeOff: EyeOffIcon,
  Sun: SunIcon,
  Moon: MoonIcon,
  ChevronUp: ChevronUpIcon,
  ChevronDown: ChevronDownIcon,
  Calendar: CalendarIcon,
  Upload: UploadIcon,
  File: FileIcon,
  Check: CheckIcon,
  Info: InfoIcon,
  Success: SuccessIcon,
  Warning: WarningIcon,
  Error: ErrorIcon,
  GitHub: GitHubIcon,
  Twitter: TwitterIcon,
  YouTube: YouTubeIcon,
  LinkedIn: LinkedInIcon,
  ChevronRight: ChevronRightIcon,
  ChevronLeft: ChevronLeftIcon,
  Add: AddIcon,
  Package: PackageIcon,
  Bell: BellIcon,
  Close: CloseIcon,
};

const iconOptions = Object.keys(iconMap);

export function renderButtonsSection(t: T, bs: Record<string, string>) {
  return (
    <Box display="grid" gridTemplateColumns="1fr" gap="1.5rem" alignItems="start" width="100%" textAlign="left">
      <RevealCard><Card>
        <CardHeader>
          <Typography variant="h3" gutterBottom>{t("complementos.section_button")}</Typography>
        </CardHeader>
        <CardBody>
          <Box display="flex" gap="0.5rem" flexWrap="wrap">
            <Button variant="default">Default</Button>
            <Button variant="info">Info</Button>
            <Button variant="success">Success</Button>
            <Button variant="warning">Warning</Button>
            <Button variant="danger">Danger</Button>
          </Box>
        </CardBody>
        <CardFooter>
          <figure className={bs.figure}>
            <Typography variant="caption" component="figcaption" className={bs.figcaption}>
              {t("complementos.figcaption.button")}
            </Typography>
          </figure>
        </CardFooter>
      </Card></RevealCard>
      <RevealCard><Card>
        <CardHeader>
          <Typography variant="h3" gutterBottom>{t("complementos.section_button_playground")}</Typography>
        </CardHeader>
        <CardBody>
          <Playground
            controls={[
              { name: "label", type: "text", label: "Label" },
              { name: "icon", type: "select", label: "Icon", options: iconOptions },
              { name: "variant", type: "select", label: "Variant", options: ["default", "info", "success", "warning", "danger", "ghost"] },
              { name: "disabled", type: "boolean", label: "Disabled" },
            ]}
            defaultValues={{ label: t("complementos.button_playground_label"), icon: "None", variant: "default", disabled: false }}
          >
            {(p) => {
              const { icon, label, ...btnProps } = p as Record<string, string>;
              const IconComp = icon && icon !== "None" ? iconMap[icon] : null;
              return (
                <Button {...btnProps} iconOnly={!!IconComp && !label}>
                  {IconComp && <IconComp size={16} />}
                  {label}
                </Button>
              );
            }}
          </Playground>
        </CardBody>
        <CardFooter>
          <figure className={bs.figure}>
            <Typography variant="caption" component="figcaption" className={bs.figcaption}>
              {t("complementos.figcaption.button_playground")}
            </Typography>
          </figure>
        </CardFooter>
      </Card></RevealCard>
      <RevealCard><Card>
        <CardHeader>
          <Typography variant="h3" gutterBottom>{t("complementos.section_tooltip")}</Typography>
        </CardHeader>
        <CardBody>
          <Box display="flex" gap="1rem" alignItems="center" justifyContent="center">
            <Tooltip content="Hola, soy un tooltip">
              <Button variant="info">Hover me</Button>
            </Tooltip>
            <Tooltip content="CSS ::after con attr(data-tooltip)">
              <Typography variant="body2" component="span">&#x1f446; Pasa el mouse</Typography>
            </Tooltip>
          </Box>
        </CardBody>
        <CardFooter>
          <figure className={bs.figure}>
            <Typography variant="caption" component="figcaption" className={bs.figcaption}>
              {t("complementos.figcaption.tooltip")}
            </Typography>
          </figure>
        </CardFooter>
      </Card></RevealCard>
    </Box>
  );
}
