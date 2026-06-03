import { Box } from "../box";
import type { BoxProps } from "../box";

interface HStackProps extends BoxProps {
  gap?: string | number;
}

export const HStack = ({ gap = "0.5rem", ...rest }: HStackProps) => (
  <Box display="flex" flexDirection="row" gap={gap} {...rest} />
);
