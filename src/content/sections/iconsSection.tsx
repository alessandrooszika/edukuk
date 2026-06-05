import { Box } from "../../components/box";
import { Typography } from "../../components/typography";
import { Card, CardHeader, CardBody, CardFooter } from "../../components/card";
import { RevealCard } from "../../components/reveal-card";
import {
  MenuIcon, SearchIcon, ClearIcon, EyeIcon, EyeOffIcon,
  SunIcon, MoonIcon, ChevronUpIcon, ChevronDownIcon,
  CalendarIcon, UploadIcon, FileIcon, CheckIcon,
  InfoIcon, SuccessIcon, WarningIcon, ErrorIcon,
  GitHubIcon, TwitterIcon, YouTubeIcon, LinkedInIcon, CloseIcon,
} from "../../components/icons";
import type { T } from "./categories";

const iconList = [
  { Icon: MenuIcon, name: "MenuIcon", size: 16, usedIn: "Drawer menú" },
  { Icon: SearchIcon, name: "SearchIcon", size: 14, usedIn: "SearchInput" },
  { Icon: ClearIcon, name: "ClearIcon", size: 10, usedIn: "SearchInput, Chip" },
  { Icon: EyeIcon, name: "EyeIcon", size: 16, usedIn: "PasswordInput" },
  { Icon: EyeOffIcon, name: "EyeOffIcon", size: 16, usedIn: "PasswordInput" },
  { Icon: SunIcon, name: "SunIcon", size: 12, usedIn: "ThemeToggle" },
  { Icon: MoonIcon, name: "MoonIcon", size: 12, usedIn: "ThemeToggle" },
  { Icon: ChevronUpIcon, name: "ChevronUpIcon", size: 8, usedIn: "NumberInput" },
  { Icon: ChevronDownIcon, name: "ChevronDownIcon", size: 8, usedIn: "NumberInput, Select" },
  { Icon: CalendarIcon, name: "CalendarIcon", size: 15, usedIn: "DateInput" },
  { Icon: UploadIcon, name: "UploadIcon", size: 20, usedIn: "FileInput" },
  { Icon: FileIcon, name: "FileIcon", size: 14, usedIn: "FileInput" },
  { Icon: CheckIcon, name: "CheckIcon", size: 12, usedIn: "Select" },
  { Icon: InfoIcon, name: "InfoIcon", size: 18, usedIn: "Alert" },
  { Icon: SuccessIcon, name: "SuccessIcon", size: 18, usedIn: "Alert" },
  { Icon: WarningIcon, name: "WarningIcon", size: 18, usedIn: "Alert" },
  { Icon: ErrorIcon, name: "ErrorIcon", size: 18, usedIn: "Alert" },
  { Icon: GitHubIcon, name: "GitHubIcon", size: 22, usedIn: "Footer" },
  { Icon: TwitterIcon, name: "TwitterIcon", size: 22, usedIn: "Footer" },
  { Icon: YouTubeIcon, name: "YouTubeIcon", size: 22, usedIn: "Footer" },
  { Icon: LinkedInIcon, name: "LinkedInIcon", size: 22, usedIn: "Footer" },
  { Icon: CloseIcon, name: "CloseIcon", size: 14, usedIn: "Modal, Drawer, Chip, Alert, FileInput" },
];

export function renderIconsSection(t: T, s: Record<string, string>, bs: Record<string, string>) {
  return (
    <Box display="grid" gridTemplateColumns="1fr" gap="1.5rem" alignItems="start" width="100%" textAlign="left">
      <RevealCard><Card>
        <CardHeader>
          <Typography variant="h3" gutterBottom>{t("complementos.icons_heading")}</Typography>
          <Typography variant="caption">
            {t("complementos.icons_import_text")}
          </Typography>
        </CardHeader>
        <CardBody>
          <Box display="grid" gridTemplateColumns="repeat(auto-fill, minmax(160px, 1fr))" gap="1rem">
            {iconList.map((item) => (
              <Box key={item.name} className={s.iconItem}>
                <item.Icon size={24} />
                <span className={s.iconName}>{item.name}</span>
                <span className={s.iconMeta}>{t("complementos.icons_meta_default", { size: item.size })}</span>
                <span className={s.iconMeta}>{t("complementos.icons_meta_usedin", { comp: item.usedIn })}</span>
                <code className={s.iconImport}>import {"{"}{item.name}{"}"} from "../icons"</code>
              </Box>
            ))}
          </Box>
        </CardBody>
        <CardFooter>
          <figure className={bs.figure}>
            <Typography variant="caption" component="figcaption" className={bs.figcaption}>
              {t("complementos.figcaption.icons")}
            </Typography>
          </figure>
        </CardFooter>
      </Card></RevealCard>
    </Box>
  );
}
