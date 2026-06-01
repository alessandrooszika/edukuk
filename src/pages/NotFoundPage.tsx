import { useTranslation } from "react-i18next";
import { VStack } from "../components/stack";
import { Box } from "../components/box/Box";
import { Button } from "../components/button/Button";
import { Badge } from "../components/badge/Badge";
import styles from "./NotFoundPage.module.css";

const messageKeys: Record<string, string> = {
  admin: "admin",
  secret: "secret",
  dashboard: "dashboard",
  login: "login",
  config: "config",
  api: "api",
  db: "db",
  settings: "settings",
  profile: "profile",
  logout: "logout",
  upload: "upload",
  register: "register",
  payment: "payment",
  download: "download",
  search: "search",
  help: "help",
  faq: "faq",
  status: "status",
};

export function NotFoundPage() {
  const { t } = useTranslation();
  const hash = window.location.hash.replace("#", "").toLowerCase();
  const key = messageKeys[hash];
  const ironicMessage = key ? t(`notFound.messages.${key}`) : null;

  return (
    <VStack alignItems="center" justifyContent="center" style={{ flex: 1 }} py={64} px={16} gap={24}>
      {ironicMessage && (
        <Badge variant="warning" standalone size="md">
          {t("notFound.badge")}
        </Badge>
      )}

      <Box className={styles.code}>404</Box>

      <VStack alignItems="center" gap={8} style={{ maxWidth: 480, textAlign: "center" }}>
        <h1 className={styles.title}>{t("notFound.title")}</h1>
        <p className={styles.description}>{ironicMessage ?? t("notFound.default_message")}</p>
      </VStack>

      <Button onClick={() => { window.location.hash = "home"; }}>
        {t("notFound.back_button")}
      </Button>
    </VStack>
  );
}
