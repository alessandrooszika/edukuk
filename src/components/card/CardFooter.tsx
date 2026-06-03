import type { ReactNode } from "react";
import type { BoxProps } from "../box";
import { Box } from "../box";
import styles from "./Card.module.css";

interface CardFooterProps extends BoxProps {
  children: ReactNode;
}

export const CardFooter = ({
  children,
  className = "",
  ...rest
}: CardFooterProps) => {
  return (
    <Box className={`${styles.footer} ${className}`.trim()} {...rest}>
      {children}
    </Box>
  );
};
