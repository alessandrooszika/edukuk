import { useEffect, type ReactNode } from "react";
import { useTranslation } from "react-i18next";
import { CloseIcon, InfoIcon, SuccessIcon, WarningIcon, ErrorIcon } from "../icons";
import { Button } from "../button/Button";
import type { AlertVariant, AlertPosition } from "../../types";
import styles from "./Alert.module.css";
import { Box } from "../box/Box";

interface AlertProps {
  isOpen: boolean;
  onClose: () => void;
  message: string;
  description?: string;
  variant?: AlertVariant;
  position?: AlertPosition;
  duration?: number;
  closable?: boolean;
}

const iconMap: Record<AlertVariant, ReactNode> = {
  info: <InfoIcon />,
  success: <SuccessIcon />,
  warning: <WarningIcon />,
  danger: <ErrorIcon />,
};

export const Alert = ({
  isOpen,
  onClose,
  message,
  description,
  variant = "info",
  position = "top-right",
  duration = 5000,
  closable = true,
}: AlertProps) => {
  const { t } = useTranslation();

  useEffect(() => {
    if (!isOpen || duration <= 0) return;
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [isOpen, duration, onClose]);

  if (!isOpen) return null;

  return (
    <Box
      className={`${styles.alert} ${styles[variant]} ${styles[position.replace("-", "")]}`}
      role="alert"
    >
      <span className={styles.icon}>{iconMap[variant]}</span>
      <Box className={styles.body}>
        <span className={styles.message}>{message}</span>
        {description && <span className={styles.desc}>{description}</span>}
      </Box>
      {closable && (
        <Button iconOnly className={styles.closeBtn} onClick={onClose} aria-label={t("complementos.alert_close_aria")}>
          <CloseIcon />
        </Button>
      )}
    </Box>
  );
};