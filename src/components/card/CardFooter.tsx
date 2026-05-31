import type { ReactNode } from "react";
import type { BoxProps } from "../box/Box";
import { Box } from "../box/Box";

interface CardFooterProps extends BoxProps {
  children: ReactNode;
}

export const CardFooter = ({
  children,
  className = "",
  ...rest
}: CardFooterProps) => {
  return (
    <Box className={className} {...rest}>
      {children}
    </Box>
  );
};
