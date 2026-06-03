import type { ReactNode } from "react";
import type { BoxProps } from "../box";
import { Box } from "../box";
import styles from "./Card.module.css";

interface CardHeaderProps extends BoxProps {
  children: ReactNode;
}

export const CardHeader = ({
  children,
  className = "",
  ...rest
}: CardHeaderProps) => {
  return (
    <Box className={`${styles.header} ${className}`.trim()} {...rest}>
      {children}
    </Box>
  );
};
