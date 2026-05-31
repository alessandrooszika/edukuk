import { Box } from "../box/Box";
import type { BoxProps } from "../box/Box";

interface StackProps extends BoxProps {
  direction?: "row" | "column";
}

export const Stack = ({ direction = "column", gap = "1rem", ...rest }: StackProps) => (
  <Box display="flex" flexDirection={direction} gap={gap} {...rest} />
);
