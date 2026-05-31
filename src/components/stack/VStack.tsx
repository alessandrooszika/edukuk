import { Box } from "../box/Box";
import type { BoxProps } from "../box/Box";

interface VStackProps extends BoxProps {
  gap?: string | number;
}

export const VStack = ({ gap = "1rem", ...rest }: VStackProps) => (
  <Box display="flex" flexDirection="column" gap={gap} {...rest} />
);
