import type { ReactNode } from "react";
import type { BoxProps } from "../box/Box";
import { Box } from "../box/Box";
import styles from "./Card.module.css";

interface CardBodyProps extends BoxProps {
  children: ReactNode;
}

export const CardBody = ({
  children,
  className = "",
  ...rest
}: CardBodyProps) => {
  return (
    <Box className={`${styles.body} ${className}`.trim()} {...rest}>
      {children}
    </Box>
  );
};
