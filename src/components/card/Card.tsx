import type { ReactNode } from "react";
import type { BoxProps } from "../box";
import type { Variant } from "../../types";
import { Box } from "../box";
import styles from "./Card.module.css";

interface CardProps extends BoxProps {
  children: ReactNode;
  variant?: Variant;
}

export const Card = ({
  children,
  className = "",
  variant = "default",
  ...rest
}: CardProps) => {
  return (
    <Box
      className={`${styles.card} ${variant !== "default" ? styles[variant] : ""} ${className}`.trim()}
      {...rest}
    >
      {children}
    </Box>
  );
};
