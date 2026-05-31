import { Box } from "../box/Box";
import type { BoxProps } from "../box/Box";

interface HStackProps extends BoxProps {
  gap?: string | number;
}

export const HStack = ({ gap = "0.5rem", ...rest }: HStackProps) => (
  <Box display="flex" flexDirection="row" gap={gap} {...rest} />
);
