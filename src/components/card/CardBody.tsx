import type { ReactNode } from "react";
import type { BoxProps } from "../box";
import { Box } from "../box";
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
